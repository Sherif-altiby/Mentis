<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;  // Add this line
use Illuminate\Support\Facades\DB;

// registration ---login---logout----

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Get the current user's token from the request headers
        $token = $request->bearerToken();
        if ($request->role != 'student' && !$token) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        // Get the user associated with the token, if token is provided
        if ($token) {
            $personalAccessToken = PersonalAccessToken::findToken($token);
            if (!$personalAccessToken) {
                return response()->json(['error' => 'Token not found'], 404);
            }

            $currentUser = $personalAccessToken->tokenable;

            // Check if the current user is an admin if a teacher is being registered
            if ($request->role == 'teacher' && $currentUser->role != 'admin') {
                return response()->json(['error' => 'Only admins can register a teacher'], 403);
            }
        }

        // Define base validation rules
        $rules = [
            'role' => 'required|string|in:student,parent,teacher,admin',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|unique:users,phone_number',
        ];

        // Add additional rules based on user role
        if ($request->role == 'student') {
            $rules['parent_name'] = 'required|string|max:255';
            $rules['parent_phone'] = 'required|string|max:20|unique:users,phone_number';
            $rules['grade_level'] = 'required|integer|min:1|max:12';
        }

        // Validate the request
        $validator = Validator::make($request->all(), $rules);

        // Return validation errors with specific role-related messages
        if ($validator->fails()) {
            $messages = $validator->errors();

            // Specific messages based on role
            if ($request->role == 'student') {
                if ($messages->has('parent_name')) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Parent name is required for student registration',
                        'errors' => $messages
                    ], 422);
                }
                if ($messages->has('parent_phone')) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Parent phone number is required and must be unique',
                        'errors' => $messages
                    ], 422);
                }
                if ($messages->has('grade_level')) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Grade level is required and must be between 1 and 12',
                        'errors' => $messages
                    ], 422);
                }
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $messages
            ], 422);
        }

        try {
            // Generate unique IDs and passwords
            $user_id = $this->generateUniqueId();
            $password = $this->generatePassword();

            // Create a unique email address
            $email = $user_id . '@Mentis.com';

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

            $response = [
                'status' => 'success',
                'message' => 'User registered successfully!',
                'user_id' => $user_id . '@Mentis.com',
                'user_password' => $password
            ];

            // If the user is a student, store their grade level
            if ($request->role == 'student') {
                DB::table('students')->insert([
                    'user_id' => $user->id,
                    'grade_level' => $request->grade_level,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Generate a unique ID and password for the parent
                $parent_id = $this->generateUniqueId();
                $parent_password = $this->generatePassword();
                $parent_email = $parent_id . '@gmail.com';

                // Check if a parent with this ID or phone number already exists
                $existingParent = User::where('id', $parent_id)->orWhere('phone_number', $request->parent_phone)->first();
                if ($existingParent) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Parent with this ID or phone number already exists'
                    ], 409);
                }

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
                    'student_id' => $user->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Add parent information to the response
                $response['parent_id'] = $parent_id;
                $response['parent_password'] = $parent_password;
            }

            // Only include a token in the response if the role is not student
            $response['token'] = $user->createToken($request->name)->plainTextToken;

            // Return response with message, status, and token
            return response()->json($response, 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to register user',
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

    // Check if the token is found
    if (!$personalAccessToken) {
        return response()->json(['error' => 'Token not found'], 404);
    }

    // Get the associated user
    $user = $personalAccessToken->tokenable;

    if (!$user) {
        return response()->json(['error' => 'User not found for the given token'], 404);
    }

    $userDetails = [
        'user_id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'phone_number' => $user->phone_number,
        'role' => $user->role,
    ];

    // Fetch additional details based on user role
    try {
        switch ($user->role) {
            case 'student':
                $studentDetails = DB::table('students')
                    ->where('user_id', $user->id)
                    ->first();

                if (!$studentDetails) {
                    return response()->json(['error' => 'Student details not found'], 404);
                }

                $userDetails['grade_level'] = $studentDetails->grade_level;
                break;

            case 'teacher':
                // Fetch teacher-specific details if required
                // Add relevant code here for teacher details
                break;

            case 'parent':
                // Fetch parent-specific details if required
                // Add relevant code here for parent details
                break;

            case 'admin':
                // Fetch admin-specific details if required
                // Add relevant code here for admin details
                break;

            default:
                return response()->json(['error' => 'Invalid user role'], 400);
        }
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'An error occurred while fetching user details',
            'message' => $e->getMessage(),
        ], 500);
    }

    return response()->json($userDetails, 200);
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
