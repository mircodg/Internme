<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDO;
use PDOException;
use Symfony\Component\HttpFoundation\Response;


class Candidatura extends Model
{
    use HasFactory;

    protected $pdo;

    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
    }

    public function createApplication($Matricola, $idUniversita, $idTirocinio)
    {
        try {

            # check if student has an active internship
            $sql = "SELECT idTirocinio FROM Candidature WHERE Matricola = :Matricola AND idUniversita = :idUniversita AND Stato = 'Active'";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita
            ]);
            $count = $stmnt->rowCount();
            if ($count > 0) {
                return response()->json([
                    'message' => 'Student has an active internship'
                ], Response::HTTP_BAD_REQUEST);
            }

            # if the user applied before but got rejected he can resubmit the application.
            $sql = "SELECT * FROM Candidature WHERE Matricola = :Matricola AND idTirocinio = :idTirocinio AND idUniversita = :idUniversita AND Stato='Rejected'";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Matricola' => $Matricola,
                'idTirocinio' => $idTirocinio,
                'idUniversita' => $idUniversita
            ]);
            if ($stmnt->rowCount() != 0) {
                #update the status
                $sql = "UPDATE Candidature SET Stato='Pending' WHERE idUniversita = :idUniversita AND Matricola = :Matricola AND idTirocinio = :idTirocinio";
                $stmnt = $this->pdo->prepare($sql);
                $stmnt->execute([
                    'Matricola' => $Matricola,
                    'idTirocinio' => $idTirocinio,
                    'idUniversita' => $idUniversita
                ]);
                return response()->json([
                    'message' => 'Application resubmitted successfully'
                ], Response::HTTP_OK);
            }

            # if not, create the application
            $sql = "INSERT INTO Candidature (Matricola, idUniversita, idTirocinio) VALUES (:Matricola, :idUniversita, :idTirocinio)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita,
                'idTirocinio' => $idTirocinio
            ]);
            return response()->json([
                'message' => 'Application created'
            ], Response::HTTP_CREATED);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while creating application',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getApplications($mode, $idUniversita, $idMatricola, $idAzienda)
    {
        try {

            if ($mode === 'Studente') {

                # updating the application status. Set to 'Rejected' if the internship has reached the maximum number of interns or if the student has an active internship
                /*
                                $sql = "SELECT idTirocinio FROM Studenti WHERE Matricola = :Matricola AND idUniversita = :idUniversita";
                                $stmnt = $this->pdo->prepare($sql);
                                $stmnt->execute([
                                    'Matricola' => $idMatricola,
                                    'idUniversita' => $idUniversita
                                ]);
                                $student = $stmnt->fetch(PDO::FETCH_ASSOC);
                                if ($student['idTirocinio'] != null) {
                                    $sql = "UPDATE Candidature SET Stato = 'Rejected' WHERE Matricola = :Matricola AND idUniversita = :idUniversita AND idTirocinio = :idTirocinio AND Stato = 'Pending'";
                                    $stmnt = $this->pdo->prepare($sql);
                                    $stmnt->execute([
                                        'Matricola' => $idMatricola,
                                        'idUniversita' => $idUniversita,
                                        'idTirocinio' => $student['idTirocinio']
                                    ]);
                                }
                */

                # fetching applications
                $sql = "SELECT T.idTirocinio, T.Titolo as TitoloTirocinio, A.Nome as NomeAzienda, C.Stato  FROM Candidature as C JOIN Tirocini as T on C.idTirocinio = T.idTirocinio JOIN Aziende as A on T.idAzienda = A.idAzienda WHERE C.Matricola = :Matricola AND C.idUniversita = :idUniversita";
                $stmnt = $this->pdo->prepare($sql);
                $stmnt->execute([
                    'Matricola' => $idMatricola,
                    'idUniversita' => $idUniversita
                ]);
                $count = $stmnt->rowCount();
                if ($count == 0) {
                    return response()->json([
                        'message' => 'No applications found'
                    ], Response::HTTP_NOT_FOUND);
                } else {
                    $applications = $stmnt->fetchAll(PDO::FETCH_ASSOC);
                    return response()->json([
                        'applications' => $applications
                    ], Response::HTTP_OK);
                }
            }

            if ($mode === 'Ceo') {

                #updating the application status. Set to 'Rejected' if the internship has reached the maximum number of interns or if the student has an active internship

                # fetching students from their applications 
                /*
                $sql = "SELECT C.Matricola, C.idUniversita FROM Candidature as C JOIN Tirocini as T on C.idTirocinio = T.idTirocinio WHERE T.idAzienda = :idAzienda";
                $stmnt = $this->pdo->prepare($sql);
                $stmnt->execute([
                    'idAzienda' => $idAzienda
                ]);
                $applications = $stmnt->fetchAll(PDO::FETCH_ASSOC);
                # update if the intern has an active internship
                foreach ($applications as $application) {
                    $sql = "SELECT idTirocinio FROM Studenti WHERE Matricola = :Matricola AND idUniversita = :idUniversita";
                    $stmnt = $this->pdo->prepare($sql);
                    $stmnt->execute([
                        'Matricola' => $application['Matricola'],
                        'idUniversita' => $application['idUniversita']
                    ]);
                    $student = $stmnt->fetch(PDO::FETCH_ASSOC);
                    if ($student['idTirocinio'] != null) {
                        $sql = "UPDATE Candidature SET Stato = 'Rejected' WHERE Matricola = :Matricola AND idUniversita = :idUniversita AND idTirocinio = :idTirocinio AND Stato = 'Pending'";
                        $stmnt = $this->pdo->prepare($sql);
                        $stmnt->execute([
                            'Matricola' => $application['Matricola'],
                            'idUniversita' => $application['idUniversita'],
                            'idTirocinio' => $student['idTirocinio']
                        ]);
                    }
                }
                */

                $sql = "SELECT C.Matricola, U.Nome as NomeUniversita, T.idTirocinio, T.Titolo as TitoloTirocinio, C.Stato FROM Candidature as C JOIN Tirocini as T on C.idTirocinio = T.idTirocinio JOIN Universita as U ON C.idUniversita = U.idUniversita WHERE T.idAzienda = :idAzienda";
                $stmnt = $this->pdo->prepare($sql);
                $stmnt->execute([
                    'idAzienda' => $idAzienda
                ]);
                $count = $stmnt->rowCount();
                if ($count == 0) {
                    return response()->json([
                        'message' => 'No applications found'
                    ], Response::HTTP_NOT_FOUND);
                } else {
                    $applications = $stmnt->fetchAll(PDO::FETCH_ASSOC);
                    return response()->json([
                        'applications' => $applications
                    ], Response::HTTP_OK);
                }
            }
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while fetching applications',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function removeApplication($Matricola, $idUniversita, $idTirocinio)
    {
        try {
            $sql = "DELETE FROM Candidature WHERE Matricola = :Matricola AND idUniversita = :idUniversita AND idTirocinio = :idTirocinio";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita,
                'idTirocinio' => $idTirocinio
            ]);
            return response()->json([
                'message' => 'Application removed'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while removing application',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function approveApplication($Matricola, $idUniversita, $idTirocinio, $numTirocinanti)
    {
        try {
            # checking if the internship has reached the maximum number of interns
            $sql = "SELECT MaxTirocinanti FROM Tirocini WHERE idTirocinio = :idTirocinio";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idTirocinio' => $idTirocinio
            ]);
            $maxTirocinanti = $stmnt->fetch(PDO::FETCH_ASSOC);
            if ($numTirocinanti >= $maxTirocinanti['MaxTirocinanti']) {
                return response()->json([
                    'message' => 'Maximum number of interns reached'
                ], Response::HTTP_BAD_REQUEST);
            }

            # approving the application
            $sql = "UPDATE Candidature SET Stato = 'Active' WHERE Matricola = :Matricola AND idUniversita = :idUniversita AND idTirocinio = :idTirocinio";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita,
                'idTirocinio' => $idTirocinio
            ]);

            # updating other student pending applications to rejected. This is done to avoid a student having multiple active internships
            $sql = "UPDATE Candidature SET Stato = 'Rejected' WHERE Matricola = :Matricola AND idUniversita = :idUniversita AND Stato = 'Pending'";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita,
            ]);

            return response()->json([
                'message' => 'Application approved and updated'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while approving application',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function rejectApplication($Matricola, $idUniversita, $idTirocinio)
    {
        try {
            $sql = "UPDATE Candidature SET Stato='Rejected' WHERE Matricola=:Matricola AND idUniversita=:idUniversita AND idTirocinio=:idTirocinio";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'Matricola' => $Matricola,
                'idUniversita' => $idUniversita,
                'idTirocinio' => $idTirocinio
            ]);
            return response()->json([
                'message' => 'Application rejected successfully',
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while rejecting the application',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
