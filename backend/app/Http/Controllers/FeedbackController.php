<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Studente;
use App\Models\Feedback;
use App\Models\Utente;
use App\Models\Azienda;

class FeedbackController extends Controller
{
    function createFeedback(Request $request)
    {
        $studente = new Studente();
        try {
            $response = $studente->checkStudentInfo($request->cookie('jwt'));
            $data = $response->getData(true);
            $idUniversita = $data['student']['idUniversita'];
            $Matricola = $data['student']['Matricola'];
            $idTirocinio = $request->idTirocinio;
            $Descrizione = $request->Descrizione;
            $Stelle = $request->Stelle;
            $feedback = new Feedback();
            return $feedback->createFeedback($Matricola, $idUniversita, $idTirocinio, $Descrizione, $Stelle);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while fetching student info',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    function fetchFeedbacks(Request $request)
    {
        $utente = new Utente();
        $response = $utente->getUserByToken($request->cookie('jwt'));
        $data = $response->getData(true);
        # check if the user is a student or a ceo
        $userType = $data['user']['TipoUtente'];
        if ($userType == 'Studente') {
            $studente = new Studente();
            $response = $studente->checkStudentInfo($request->cookie('jwt'));
            $data = $response->getData(true);
            $Matricola = $data['student']['Matricola'];
            $idUniversita = $data['student']['idUniversita'];
            $feedback = new Feedback();
            return $feedback->fetchFeedbacks($Matricola, $idUniversita, null);
        } else {
            $azienda = new Azienda();
            $response = $azienda->getAziendaByToken($request->cookie('jwt'));
            $data = $response->getData(true);
            $idAzienda = $data['azienda']['idAzienda'];
            $feedback = new Feedback();
            return $feedback->fetchFeedbacks(null, null, $idAzienda);
        }
    }
}
