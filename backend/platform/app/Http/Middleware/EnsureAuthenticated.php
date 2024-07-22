<?php
namespace App\Http\Middleware;

use Closure;

class EnsureAuthenticated
{
    public function handle($request, Closure $next)
    {
        // Your authentication logic here

        return "ok";
    }
}
