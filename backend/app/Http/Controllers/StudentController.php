<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Studente;
use App\Models\Utente;
use App\Models\Universita;
use App\Models\Candidatura;

class StudentController extends Controller
{
    public function checkStudentInfo(Request $request)
    {
        $student = new Studente();
        return $student->checkStudentInfo($request->cookie('jwt'));
    }

    public function createStudent(Request $request)
    {
        try {
            $validateData = $request->validate([
                'Matricola' => 'required|integer|digits:6', // convert back to number 
                'Universita' => 'required|string',
                'CorsoDiLaurea' => 'required|string',
                'CV' => 'required|file|mimes:pdf|max:2048' // max file size 2MB
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 400);
        }
        $student = new Studente();
        $path = $request->file('CV')->store('cvs', 'public');
        $utente = new Utente();
        $response = $utente->getUserByToken($request->cookie('jwt'));
        $data = $response->getData(true);
        if ($data['user']['TipoUtente'] != 'Studente') {
            return response()->json([
                'message' => 'You are not authorized to create a student'
            ], 401);
        }
        $idUtente = $data['user']['idUtente'];
        $universita = new Universita();
        $responseUni = $universita->getUniIDByName($validateData['Universita']);
        $dataUni = $responseUni->getData(true);
        if ($dataUni['university'] == null) {
            return response()->json([
                'message' => 'University not found'
            ], 404);
        }
        $idUniversita = $dataUni['university']['idUniversita'];
        return $student->createStudent($validateData['Matricola'], $idUniversita, $idUtente, $path, $validateData['CorsoDiLaurea']);
    }

    function getInternships(Request $request)
    {
        $student = new Studente();
        try {
            $response = $student->getStudentIDsByToken($request->cookie('jwt'));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while fetching student id',
                'error' => $e->getMessage()
            ], 500);
        }
        $data = $response->getData(true);
        $idUniversita = $data['student']['idUniversita'];
        $Matricola = $data['student']['Matricola'];
        return $student->getInternships($idUniversita, $Matricola);
    }

    function createApplication(Request $request, $idTirocinio)
    {
        $student = new Studente();
        try {
            $response = $student->getStudentIDsByToken($request->cookie('jwt'));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while fetching student id',
                'error' => $e->getMessage()
            ], 500);
        }
        $data = $response->getData(true);
        $Matricola = $data['student']['Matricola'];
        $idUniversita = $data['student']['idUniversita'];
        $candidatura = new Candidatura();
        return $candidatura->createApplication($Matricola, $idUniversita, $idTirocinio);
    }

    function getApplications(Request $request)
    {
        $student = new Studente();
        $response = $student->getStudentIDsByToken($request->cookie('jwt'));
        $data = $response->getData(true);
        $Matricola = $data['student']['Matricola'];
        $idUniversita = $data['student']['idUniversita'];
        $candidatura = new Candidatura();
        return $candidatura->getApplications('Studente', $idUniversita, $Matricola, null);
    }

    function removeApplication(Request $request, $idTirocinio)
    {
        $student = new Studente();
        $response = $student->getStudentIDsByToken($request->cookie('jwt'));
        $data = $response->getData(true);
        $Matricola = $data['student']['Matricola'];
        $idUniversita = $data['student']['idUniversita'];
        $candidatura = new Candidatura();
        return $candidatura->removeApplication($Matricola, $idUniversita, $idTirocinio);
    }

    function studentEnrollment(Request $request)
    {
        $student = new Studente();
        $response = $student->getStudentIDsByToken($request->cookie('jwt'));
        $data = $response->getData(true);
        $Matricola = $data['student']['Matricola'];
        $idUniversita = $data['student']['idUniversita'];
        return $student->studentEnrollment($Matricola, $idUniversita);
    }

    function fetchAllStudentsEmails(){
        $student = new Studente();
        return $student->fetchAllStudentsEmails();  
    }
}
