<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Middleware\JwtCookieToBearer;
use App\Http\Controllers\UniversitaController;
use App\Http\Controllers\StudentController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware([JwtCookieToBearer::class], 'auth:sanctum')->group(function () {
    Route::get('/user/{email}', [UserController::class, 'getUserByEmail']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'returnUser']);
    Route::post('/university', [UniversitaController::class, 'addUniversita']);
    Route::get('/university', [UniversitaController::class, 'getUni']);
    Route::get('/universities', [UniversitaController::class, 'showAllUni']);
    Route::get('/university/students', [UniversitaController::class, 'getStudentsCount']);
    Route::get('university/companies', [UniversitaController::class, 'getCompaniesCount']);
    Route::get('/company', [CompanyController::class, 'getCompanies']);
    Route::post('/company', [CompanyController::class, 'addCompany']);
    Route::get('/student', [StudentController::class, 'checkStudentInfo']);
    Route::post('/student', [StudentController::class, 'createStudent']);
});
