<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\JwtCookieToBearer;
use App\Http\Controllers\UniversitaController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

 Route::middleware([JwtCookieToBearer::class], 'auth:sanctum')->group(function () {
     Route::get('/user/{email}', [UserController::class, 'getUserByEmail']);
     Route::post('/logout', [AuthController::class, 'logout']);
     Route::get('/user', [UserController::class, 'returnUser']);
     Route::post('/university', [UniversitaController::class, 'addUniversita']);
     Route::get('/university', [UniversitaController::class, 'getUni']);
     Route::get('/university/students', [UniversitaController::class, 'getStudentsCount']);
     
});


