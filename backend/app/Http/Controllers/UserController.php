<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utente;

class UserController extends Controller
{
    public function getUserByEmail($email){
        $utente = new Utente(); 
        return $utente->getUser($email); 
    }

    public function returnUser(Request $request){
        $utente = new Utente(); 
        return $utente->getUserByToken($request->cookie('jwt')); 
    }

}
