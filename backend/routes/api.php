<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Middleware\JwtCookieToBearer;
use App\Http\Controllers\UniversitaController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\InternshipController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware([JwtCookieToBearer::class], 'auth:sanctum')->group(function () {
    Route::get('/user/{email}', [UserController::class, 'getUserByEmail']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'returnUser']);
    Route::post('/university', [UniversitaController::class, 'addUniversita']);
    Route::get('/university', [UniversitaController::class, 'getUni']);
    Route::get('/universities', [UniversitaController::class, 'showAllUni']);
    Route::get('/university/students/list', [UniversitaController::class, 'getStudentsByUni']);
    Route::get('/university/students/count', [UniversitaController::class, 'getStudentsCount']);
    Route::get('university/companies', [UniversitaController::class, 'getCompaniesCount']);
    Route::get('/university/conventions', [UniversitaController::class, 'getConventions']);
    Route::get('/university/conventions/number', [UniversitaController::class, 'fetchConventionNumberForUniversity']);
    Route::get('/university/interns/number', [UniversitaController::class, 'fetchInternsNumber']);
    Route::post('/university/convention/accept/{partitaiva}', [UniversitaController::class, 'acceptConvention']);
    Route::post('/university/convention/decline/{partitaiva}', [UniversitaController::class, 'declineConvention']);
    Route::get('/company', [CompanyController::class, 'getCompanies']);
    Route::post('/company', [CompanyController::class, 'addCompany']);
    Route::get('/company/conventions', [CompanyController::class, 'getConventionData']);
    Route::post('/company/convention/renew/{nomeUniversita}', [CompanyController::class, 'requestRenew']);
    Route::get('/company/conventions/available', [CompanyController::class, 'fetchAvailableUniversities']);
    Route::post('/company/convention/add/{nomeUniversita}', [CompanyController::class, 'createConvention']);
    Route::post('/company/convention/remove/{nomeUniversita}', [CompanyController::class, 'deleteConvention']);
    Route::get('/student', [StudentController::class, 'checkStudentInfo']);
    Route::post('/student', [StudentController::class, 'createStudent']);
    Route::post('/internship', [InternshipController::class, 'createInternship']);
    Route::get('/internship', [InternshipController::class, 'getInternships']);
});
