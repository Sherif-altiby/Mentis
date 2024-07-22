<?php
namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;

class Authenticate extends Middleware
{
    protected function unauthenticated($request, array $guards)
    {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    protected function redirectTo($request)
    {
        // This method won't be called if the request expects a JSON response
        if (!$request->expectsJson()) {
            // return route('login');
        }
    }
}
