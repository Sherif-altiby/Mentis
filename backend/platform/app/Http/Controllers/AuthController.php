<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;  // Add this line
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(Request $request)
{
    // Define validation rules for different user types
    $rules = [
        'role' => 'required|string|in:student,parent,teacher,admin',
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
    ];

    // Add additional rules based on user role
    if ($request->role == 'student') {
        $rules['parent_name'] = 'required|string|max:255';
        $rules['parent_phone'] = 'required|string|max:20';
    }

    // Validate the request
    $validator = Validator::make($request->all(), $rules);

    // Return validation errors if any
    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422);
    }

    try {
        // Generate unique IDs and passwords
        $user_id = $this->generateUniqueId();
        $password = $this->generatePassword();

        // Create a unique email address
        $email = $user_id . '@gmail.com';

        // Check if a user with this ID or phone number already exists
        $existingUser = User::where('id', $user_id)->orWhere('phone_number', $request->phone)->first();
        if ($existingUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'User with this ID or phone number already exists'
            ], 409);
        }

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $email,
            'password' => Hash::make($password),
            'phone_number' => $request->phone,
            'role' => $request->role,
            'id' => $user_id,
        ]);

        // If the user is a student, create the parent user and relationship
        if ($request->role == 'student') {
            // Create a new parent user
            $parent_id = $this->generateUniqueId();
            $parent_email = $parent_id . '@gmail.com';

            $parent = User::create([
                'name' => $request->parent_name,
                'email' => $parent_email,
                'password' => Hash::make($this->generatePassword()),
                'phone_number' => $request->parent_phone,
                'role' => 'parent',
                'id' => $parent_id,
            ]);

            // Create the relationship in the parent_student table
            DB::table('parent_student')->insert([
                'parent_id' => $parent->id,
                'student_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Generate an API token for the newly created user
        $token = $user->createToken($request->name)->plainTextToken;

        // Return response with message, status, and token
        return response()->json([
            'status' => 'success',
            'message' => 'User registered successfully!',
            'user_id' => $user_id,
            'user_password' => $password,
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

    
    private function generateUniqueId()
    {
        do {
            $id = random_int(100000, 999999);
        } while (User::where('id', $id)->exists());
    
        return $id;
    }
    
    private function generatePassword($length = 8)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $password = '';
        for ($i = 0; $i < $length; $i++) {
            $password .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $password;
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
        $user = auth()->user();

        // Revoke existing tokens
        $user->tokens()->delete();

        // Generate an API token for the authenticated user
        $token = auth()->user()->createToken('API Token')->plainTextToken;
     
        return response()->json(['token' => $token], 200);
    }
    public function logout(Request $request)
    {
        // Ensure the user is authenticated
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Get the current user's tokens
        $user = Auth::user();
        $user->tokens()->delete();

        // Return a response indicating the user has been logged out
        return response()->json(['message' => 'Logged out successfully!'], 200);
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
                'phone_number'=>$user->phone_number,
                'role'=>$user->role,
                
                // Add other user fields you need
            ]);
        }

        return response()->json(['error' => 'Token not found'], 404);
    }
    public function resetPassword(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'new_password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        // Check if the user has the admin role
        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Only admins can reset passwords.'], 403);
        }

        // Hash and update the new password
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password reset successfully.'], 200);
    }
}
