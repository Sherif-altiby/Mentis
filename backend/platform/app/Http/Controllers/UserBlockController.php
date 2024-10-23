<?php

namespace App\Http\Controllers;

use App\Models\UserBlock;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserBlockController extends Controller
{
    // Block a user with smart error handling
    public function blockUser(Request $request, $userId)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'reason' => 'nullable|string|max:255',
            'blocked_until' => 'nullable|date|after_or_equal:today',
        ]);

        // Handle validation errors with detailed response
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'error' => 'Validation failed',
                'details' => $errors
            ], 422);
        }

        // Check if the user exists
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Block the user and provide a more detailed message
        $block = UserBlock::updateOrCreate(
            ['user_id' => $user->id],
            [
                'is_blocked' => 1,
                'reason' => $request->input('reason'),
                'blocked_until' => $request->input('blocked_until')
            ]
        );

        // Optionally deactivate the user immediately
        $user->is_active = 0;
        $user->save();

        return response()->json([
            'success' => 'User has been blocked',
            'block_info' => $block
        ], 200);
    }

    // Unblock a user with smart error handling
    public function unblockUser($userId)
    {
        // Check if the user exists
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Find the block record and provide detailed responses
        $block = UserBlock::where('user_id', $userId)->first();
        if (!$block || !$block->is_blocked) {
            return response()->json(['error' => 'User is not currently blocked'], 400);
        }

        // Unblock the user
        $block->is_blocked = 0;
        $block->reason = null;
        $block->blocked_until = null;
        $block->save();

        // Optionally reactivate the user
        $user->is_active = 1;
        $user->save();

        return response()->json(['success' => 'User has been unblocked'], 200);
    }

    // Check if the user is blocked with detailed response
    public function isBlocked($userId)
    {
        // Find the block record
        $block = UserBlock::where('user_id', $userId)->first();

        // Provide detailed block information
        if ($block && $block->is_blocked) {
            return response()->json([
                'blocked' => true,
                'reason' => $block->reason,
                'blocked_until' => $block->blocked_until
            ], 200);
        }

        return response()->json(['blocked' => false], 200);
    }
    // Get all users who are blocked
    public function getAllBlockedUsers()
    {
        // Fetch users who are blocked
        $blockedUsers = UserBlock::where('is_blocked', 1)
            ->with('user') // Assuming there is a relationship defined in UserBlock model
            ->get();

        // Return a response with the list of blocked users
        return response()->json([
            'blocked_users' => $blockedUsers
        ], 200);
    }
}
