<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Azienda;
use App\Models\Convenzione;
use App\Models\Candidatura;
use App\Models\Tirocinio;
use App\Models\Universita;
use App\Models\Studente;
use App\Models\Utente;
use PDOException;
use Symfony\Component\HttpFoundation\Response;

class CompanyController extends Controller
{

    function addCompany(Request $req)
    {
        $azienda = new Azienda();
        return $azienda->insertAzienda($req->cookie('jwt'), $req->Nome, $req->SettoreLavoro, $req->PartitaIva, $req->Via, $req->NumeroCivico, $req->CAP, $req->Citta, $req->Provincia);
    }

    function getCompanies(Request $req)
    {
        $azienda = new Azienda();
        return $azienda->getAziendaByToken($req->cookie('jwt'));
    }

    function getConventionsFromCompany(Request $req)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($req->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $azienda = $response->getData()->azienda;
        $convenzione = new Convenzione();
        return $convenzione->showCompanyConventions($req->idAzienda);
    }

    function getConventionData(Request $req)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($req->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $idAzienda = $response->getData()->azienda->idAzienda;
        $convenzione = new Convenzione();
        return $convenzione->showCompanyConventionListData($idAzienda);
    }

    function requestRenew(Request $req, $nomeUniversita)
    {
        $nomeUniversita = str_replace('%20', ' ', $nomeUniversita);
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($req->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $idAzienda = $response->getData()->azienda->idAzienda;
        $convenzione = new Convenzione();
        return $convenzione->renewConvention($nomeUniversita, $idAzienda);
    }

    function fetchAvailableUniversities(Request $request)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $idAzienda = $response->getData()->azienda->idAzienda;
        $convenzione = new Convenzione();
        return $convenzione->fetchAvailableUniversities($idAzienda);
    }

    function createConvention(Request $request, $nomeUniversita)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $idAzienda = $response->getData()->azienda->idAzienda;
        $convenzione = new Convenzione();
        return $convenzione->createConvention($idAzienda, $nomeUniversita);
    }

    function deleteConvention(Request $request, $nomeUniversita)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $idAzienda = $response->getData()->azienda->idAzienda;
        $convenzione = new Convenzione();
        return $convenzione->deleteConvention($idAzienda, $nomeUniversita);
    }

    function getApplications(Request $request)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $idAzienda = $response->getData()->azienda->idAzienda;
        $candidatura = new Candidatura();
        return $candidatura->getApplications('Ceo', null, null, $idAzienda);
    }

    function approveApplication(Request $request)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $idAzienda = $response->getData()->azienda->idAzienda;
        $idTirocinio = $request->idTirocinio;
        $Matricola = $request->Matricola;
        $nomeUniversita = $request->NomeUniversita;
        $tirocinante = new Tirocinio();
        $response = $tirocinante->getActiveInterns($idAzienda, $idTirocinio);
        $NumTirocinanti = $response->getData()->count->count;
        $universita = new Universita();
        $response = $universita->getUniIDByName($nomeUniversita);
        $idUniversita = $response->getData()->university->idUniversita;
        $candidatura = new Candidatura();
        return $candidatura->approveApplication($Matricola, $idUniversita, $idTirocinio, $NumTirocinanti);
    }

    function downloadCV(Request $request, $Matricola, $nomeUniversita)
    {
        // checl if the user is a ceo
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $universita = new Universita();
        $response = $universita->getUniIDByName($nomeUniversita);
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $idUniversita = $response->getData()->university->idUniversita;
        $studente = new Studente();
        return $studente->downloadCV($Matricola, $idUniversita);
    }

    function getCompanyInfoAndSites(Request $request)
    {
        $azienda = new Azienda();
        $utente = new Utente();
        $response = $utente->getUserByToken($request->cookie('jwt'));
        $data = $response->getData(true);
        $tipoUtente = $data['user']['TipoUtente'];
        if ($tipoUtente !== 'Ceo') {
            return response()->json([
                'message' => 'Only ceos can access this informations'
            ], Response::HTTP_UNAUTHORIZED);
        } else {
            return $azienda->getCompanyInfoAndSites($request->cookie('jwt'));
        }
    }

    function getActiveConvention(Request $request)
    {
        $azienda = new Azienda();
        $response = $azienda->getAziendaByToken($request->cookie('jwt'));
        if ($response->getStatusCode() != 200) {
            return $response;
        }
        $data = $response->getData(true);
        $idAzienda = $data['azienda']['idAzienda'];
        $convenzione = new Convenzione();
        return $convenzione->getActiveConvention($idAzienda);
    }
}
