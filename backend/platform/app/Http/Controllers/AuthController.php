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
        // Validate the request
        $validator = Validator::make($request->all(), [
            'student_name' => 'required|string|max:255',
            'parent_name' => 'required|string|max:255',
            'student_phone' => 'required|string|max:20',
            'parent_phone' => 'required|string|max:20',
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
            // Generate unique 6-digit IDs
            $student_id = $this->generateUniqueId();
            $parent_id = $this->generateUniqueId();
    
            // Generate passwords
            $student_password = $this->generatePassword();
            $parent_password = $this->generatePassword();
    
            // Create email addresses
            $student_email = $student_id . '@gmail.com';
            $parent_email = $parent_id . '@gmail.com';
    
            // Create a new student user
            $student = User::create([
                'name' => $request->student_name,
                'email' => $student_email,
                'password' => Hash::make($student_password),
                'phone_number' => $request->student_phone,
                'role' => 'student',
                'id' => $student_id,
            ]);
    
            // Create a new parent user
            $parent = User::create([
                'name' => $request->parent_name,
                'email' => $parent_email,
                'password' => Hash::make($parent_password),
                'phone_number' => $request->parent_phone,
                'role' => 'parent',
                'id' => $parent_id,
            ]);
    
            // Create the relationship in the parent_student table
            DB::table('parent_student')->insert([
                'parent_id' => $parent->id,
                'student_id' => $student->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
    
            // Generate an API token for the newly created student
            $token = $student->createToken('API Token')->plainTextToken;
    
            // Return response with message, status, and token
            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully!',
                'student_id' => $student_id,
                'student_password' => $student_password,
                'parent_id' => $parent_id,
                'parent_password' => $parent_password,
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
                // Add other user fields you need
            ]);
        }

        return response()->json(['error' => 'Token not found'], 404);
    }
}
