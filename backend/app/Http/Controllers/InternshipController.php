<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tirocinio;
use App\Models\Azienda;
use App\Models\Universita;

class InternshipController extends Controller
{
    function createInternship(Request $request)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $data = $response->getData(true);
        $idAzienda = $data['azienda']['idAzienda'];
        $tirocinio = new Tirocinio();
        return $tirocinio->createTirocinio(
            $request->input('title'),
            $request->input('description'),
            $request->input('type'),
            $request->input('mode'),
            $request->input('maxInterns'),
            $request->input('cdl'),
            $request->input('pay'),
            $idAzienda
        );
    }

    function getInternships(Request $request)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $data = $response->getData(true);
        $idAzienda = $data['azienda']['idAzienda'];
        $tirocinio = new Tirocinio();
        return $tirocinio->getTirocini($idAzienda);
    }

    function getActiveInterns(Request $request, $idTirocinio)
    {
        // $azienda = new Azienda();
        // $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        // if ($response->getStatusCode() != 200) {
        //     return $response;
        // }
        // $data = $response->getData(true);
        // $idAzienda = $data['azienda']['idAzienda'];
        $tirocinio = new Tirocinio();
        return $tirocinio->getActiveInterns($idTirocinio);
    }

    function endInternship(Request $request)
    {
        $idTirocinio = $request->idTirocinio;
        $Matricola = $request->Matricola;
        $NomeUniversita = $request->NomeUniversita;
        $universita = new Universita();
        try {
            $response = $universita->getUniIDByName($NomeUniversita);
        } catch (\Exception $e) {
            return $e;
        }
        $idUniversita = $response->getData(true)['university']['idUniversita'];
        $internship = new Tirocinio();
        return $internship->endInternship($idTirocinio, $Matricola, $idUniversita);
    }

    function getFullCompanyInternship(Request $request)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $data = $response->getData(true);
        $idAzienda = $data['azienda']['idAzienda'];
        $tirocinio = new Tirocinio();
        return $tirocinio->getFullCompanyInternship($idAzienda);
    }

    function getActiveCompanyInternship(Request $request)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $data = $response->getData(true);
        $idAzienda = $data['azienda']['idAzienda'];
        $tirocinio = new Tirocinio();
        return $tirocinio->getActiveCompanyInternship($idAzienda);
    }

    function removeInternship(Request $request, $idTirocinio)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $data = $response->getData(true);
        $idAzienda = $data['azienda']['idAzienda'];
        $tirocinio = new Tirocinio();
        return $tirocinio->removeInternship($idTirocinio, $idAzienda);
    }

    function internshipNotificationEmails($idAzienda){
        $internship = new Tirocinio(); 
        return $internship->internshipNotificationEmails($idAzienda);
    }
}
