<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Middleware\JwtCookieToBearer;
use App\Http\Controllers\UniversitaController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\ResetPasswordController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/password/reset', [ResetPasswordController::class, 'addToken']);
Route::put('/password/reset', [ResetPasswordController::class, 'resetPassword']);
Route::get('/check/token/{token}', [ResetPasswordController::class, 'checkToken']);

// the following requests are all server side, so i can call them without them being protected.  
Route::get('/company/ceo/emails', [CompanyController::class, 'fetchCeoEmails']);
Route::get('/students/emails', [StudentController::class, 'fetchAllStudentsEmails']);
Route::get('/internship/notification/{idAzienda}', [InternshipController::class, 'internshipNotificationEmails']);
Route::post('/student/notification/info', [StudentController::class, 'getStudentInfo']);  


Route::middleware([JwtCookieToBearer::class], 'auth:sanctum')->group(function () {
    Route::get('/user/{email}', [UserController::class, 'getUserByEmail']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'returnUser']);
    Route::get('/users/data', [UserController::class, 'getUserInfo']);
    Route::post('/user/address', [UserController::class, 'setAddress']);
    Route::put('user/address', [UserController::class, 'updateAddress']);
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
    Route::get('/company/sites', [CompanyController::class, 'getCompanyInfoAndSites']);
    // Route::get('/company/ceo/emails', [CompanyController::class, 'fetchCeoEmails']); 
    Route::get('/company/conventions', [CompanyController::class, 'getConventionData']);
    Route::post('/company/convention/renew/{nomeUniversita}', [CompanyController::class, 'requestRenew']);
    Route::get('/company/conventions/available', [CompanyController::class, 'fetchAvailableUniversities']);
    Route::get('/company/conventions/active/list', [CompanyController::class, 'getActiveConvention']);
    Route::post('/company/convention/add/{nomeUniversita}', [CompanyController::class, 'createConvention']);
    Route::delete('/company/convention/remove/{nomeUniversita}', [CompanyController::class, 'deleteConvention']);
    Route::get('/company/applications', [CompanyController::class, 'getApplications']);
    Route::post('/company/applications/approve', [CompanyController::class, 'approveApplication']);
    Route::post('/company/applications/reject', [ApplicationController::class, 'rejectApplication']);
    Route::get('/company/applications/cv/{Matricola}/{NomeUniversita}', [CompanyController::class, 'downloadCV']);
    Route::post('/company/site/add', [SiteController::class, 'addSede']);
    Route::delete('company/site/remove', [SiteController::class, 'removeSede']);
    Route::put('company/site/edit', [SiteController::class, 'editSede']);
    Route::post('/company/internship/end', [InternshipController::class, 'endInternship']);
    Route::get('/company/internship/activeinterns/{idTirocinio}', [InternshipController::class, 'getActiveInterns']);
    Route::get('/company/internship/full', [InternshipController::class, 'getFullCompanyInternship']);
    Route::get('/company/internship/active', [InternshipController::class, 'getActiveCompanyInternship']);
    Route::get('/student', [StudentController::class, 'checkStudentInfo']);
    Route::post('/student', [StudentController::class, 'createStudent']);
    Route::get('/student/enrollment', [StudentController::class, 'studentEnrollment']);
    Route::get('/student/internships', [StudentController::class, 'getInternships']);
    Route::post('/student/apply/{idTirocinio}', [StudentController::class, 'createApplication']);
    Route::get('/student/applications', [StudentController::class, 'getApplications']);
    Route::post('/student/applications/remove/{idTirocinio}', [StudentController::class, 'removeApplication']);
    Route::post('/student/feedback', [FeedbackController::class, 'createFeedback']);
    Route::get('/student/feedbacks', [FeedbackController::class, 'fetchFeedbacks']);
    Route::get('company/feedbacks', [FeedbackController::class, 'fetchFeedbacks']);
    Route::post('/internship', [InternshipController::class, 'createInternship']);
    Route::get('/internship', [InternshipController::class, 'getInternships']);
    Route::delete('/internship/remove/{idTirocinio}', [InternshipController::class, 'removeInternship']);
});
