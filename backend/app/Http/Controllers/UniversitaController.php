<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Universita;
use App\Models\Azienda;
use App\Models\Studente;
use App\Models\IndirizziUniversita;
use App\Models\Convenzione;

class UniversitaController extends Controller
{
    function addUniversita(Request $req)
    {
        $universita = new Universita();
        $indirizzoUni = new IndirizziUniversita();
        $response = $universita->insertUniversita($req->NomeUniversita, $req->cookie('jwt'));
        $newUni = $response->getData(true);
        return $indirizzoUni->insertUniAddress($req->Via, $req->NumeroCivico, $req->CAP, $req->Citta, $req->Provincia, $newUni['university']['idUniversita']);
    }

    function getUni(Request $req)
    {
        $universita = new Universita();
        return $universita->getUniFromToken($req->cookie('jwt'));
    }

    function getStudentsCount(Request $req)
    {
        $universita = new Universita();
        return $universita->studentsCount($req->cookie('jwt'));
    }

    function getCompaniesCount(Request $req)
    {
        $universita = new Universita();
        $response = $universita->getUniFromToken($req->cookie('jwt'));
        $data = $response->getData(true);
        $idUniversita = $data['university']['idUniversita'];
        //TODO: get companies count through model Stipulazioni 
    }

    function showAllUni()
    {
        $universita = new Universita();
        return $universita->showAll();
    }

    function getStudentsByUni(Request $req)
    {

        $universita = new Universita();
        $response =  $universita->getUniFromToken($req->cookie('jwt'));
        $data = $response->getData(true);
        $idUniversita = $data['university']['idUniversita'];
        $student =  new Studente();
        return $student->showStudentsInfoByUni($idUniversita);
    }

    function getConventions(Request $req)
    {
        $universita = new Universita();
        $response =  $universita->getUniFromToken($req->cookie('jwt'));
        $data = $response->getData(true);
        $idUniversita = $data['university']['idUniversita'];
        $convenzione = new Convenzione();
        return $convenzione->showUniversityConventions($idUniversita);
    }

    function fetchConventionNumberForUniversity(Request $request)
    {
        $universita = new Universita();
        $response =  $universita->getUniFromToken($request->cookie('jwt'));
        $data = $response->getData(true);
        $idUniversita = $data['university']['idUniversita'];
        $convenzione = new Convenzione();
        $response = $convenzione->getActiveConventionUniversityNumber($idUniversita);
        return $response;
    }

    function fetchInternsNumber(Request $request)
    {
        $universita = new Universita();
        $response =  $universita->getUniFromToken($request->cookie('jwt'));
        $data = $response->getData(true);
        $idUniversita = $data['university']['idUniversita'];
        $student = new Studente();
        $response = $student->fetchInternsNumber($idUniversita);
        return $response;
    }

    function acceptConvention(Request $request, $PartitaIva)
    {
        $universita = new Universita();
        $response =  $universita->getUniFromToken($request->cookie('jwt'));
        $data = $response->getData(true);
        $idUniversita = $data['university']['idUniversita'];
        $convenzione = new Convenzione();
        return $convenzione->acceptConvention($PartitaIva, $idUniversita);
    }
}
