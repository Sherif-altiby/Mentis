<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone_number' => 'required|string|max:20',
            'role' => 'required|in:student,teacher,parent,admin',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create a new user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone_number' => $request->phone_number,
                'role' => $request->role,
            ]);

            // Generate an API token for the newly created user
            $token = $user->createToken('API Token')->plainTextToken;

            // Return response with message, status, and token
            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully!',
                'token' => $token
            ], 201);

        } catch (\Exception $e) {
            // Handle any exceptions
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Attempt to authenticate the user
        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Generate an API token for the authenticated user
        $token = auth()->user()->createToken('API Token')->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    public function getUserFromToken($token)
    {
        // Find the token using the static method
        $personalAccessToken = PersonalAccessToken::findToken($token);

        if ($personalAccessToken) {
            // Get the associated user
            $user = $personalAccessToken->tokenable;

            return response()->json([
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                // Add other user fields you need
            ]);
        }

        return response()->json(['error' => 'Token not found'], 404);
    }
}
