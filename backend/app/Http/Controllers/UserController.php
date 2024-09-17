<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utente;

class UserController extends Controller
{
    public function getUserByEmail($email)
    {
        $utente = new Utente();
        return $utente->getUser($email);
    }

    public function returnUser(Request $request)
    {
        $utente = new Utente();
        return $utente->getUserByToken($request->cookie('jwt'));
    }

    public function getUserInfo(Request $request)
    {
        $utente = new Utente();
        $response = $utente->getUserByToken($request->cookie('jwt'));
        $data = $response->getData(true);
        $idUtente = $data['user']['idUtente'];
        return $utente->getUserInfo($idUtente, $request->cookie('jwt'));
    }

    public function setAddress(Request $request)
    {
        $utente = new Utente();
        $response = $utente->getUserByToken($request->cookie('jwt'));
        $data = $response->getData(true);
        $idUtente = $data['user']['idUtente'];
        return $utente->setAddress($idUtente, $request->input('Via'), $request->input('NumeroCivico'), $request->input('CAP'), $request->input('Citta'), $request->input('Provincia'));
    }

    public function updateAddress(Request $request)
    {
        $utente = new Utente();
        $response = $utente->getUserByToken($request->cookie('jwt'));
        $data = $response->getData(true);
        $idUtente = $data['user']['idUtente'];
        return $utente->updateAddress($idUtente, $request->input('Via'), $request->input('NumeroCivico'), $request->input('CAP'), $request->input('Citta'), $request->input('Provincia'));
    }
}
