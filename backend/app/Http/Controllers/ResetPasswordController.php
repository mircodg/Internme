<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ResetPassword;

class ResetPasswordController extends Controller
{
    function addToken(Request $request)
    {
        $Email = $request->input('Email');
        $Token = $request->input('Token');
        $resetPassword = new ResetPassword();
        $check = $resetPassword->checkRequest($Email);
        if($check->status() !== 200){
            return $check;
        }
        return $resetPassword->addToken($Email, $Token);
    }

    function resetPassword(Request $request)
    {
        $Token = $request->input('Token');
        $Password = $request->input('Password');
        $resetPassword = new ResetPassword();
        return $resetPassword->resetPassword($Token, $Password);
    }

    function checkToken($Token)
    {
        $resetPassword = new ResetPassword();
        return $resetPassword->checkToken($Token);
    }
}
