<?php

// namespace App\Http\Middleware;

// use Closure;
// use Illuminate\Http\Request;
// use Illuminate\Auth\Middleware\Authenticate as Middleware;

// class JwtCookieToBearer extends Middleware
// {
//     /**
//      * Handle an incoming request.
//      *
//      * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
//      */
//     public function handle(Request $request, Closure $next, ...$guards){
//         if($jwt = $request()->cookie('jwt')){
//             $request()->headers->set('Authorization', 'Bearer ' . $jwt);
//         }
        
//         $this->authenticate($request, $guards);

//         return $next($request);
//     }
// }


namespace App\Http\Middleware;

use Closure;
// use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JwtCookieToBearer 
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string[]  ...$guards
     * @return mixed
     */

    public function handle(Request $request, Closure $next)
    {
        if ($jwt = $request->cookie('jwt')) {
            $request->headers->set('Authorization', 'Bearer ' . $jwt); 
            Log::info('JwtCookieToBearer:' . $jwt);
            return $next($request);
        }
        else{
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
    }
}
