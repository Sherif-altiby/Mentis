<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $roles)
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Unauthorized. Please log in to access this resource.',
                'status' => 401,
            ], 401);
        }
    
        $userRole = Auth::user()->role;
        $roles = is_array($roles) ? $roles : explode('|', $roles);
    
        if (!in_array($userRole, $roles)) {
            return response()->json([
                'message' => 'Access Denied. You do not have the required permissions.',
                'required_roles' => $roles,
                'your_role' => $userRole,
                'status' => 403,
            ], 403);
        }
    
        return $next($request);
    }
    
}
