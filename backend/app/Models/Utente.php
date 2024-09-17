<?php

namespace App\Models;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use PDO;
use PDOException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\PersonalAccessToken;

class Utente extends Authenticatable
{

    protected $pdo;
    protected $table = 'Utenti';
    protected $primaryKey = 'idUtente';

    use HasApiTokens;

    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
    }

    public function createCEO($nome, $cognome, $email, $password, $dataNascita)
    {
        try {
            $sql = "INSERT INTO Utenti (Nome, Cognome, Email, Password, DataNascita, TipoUtente) VALUES (:nome, :cognome, :email, :password, :dataNascita, 'Ceo')";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                'nome' => $nome,
                'cognome' => $cognome,
                'email' => $email,
                'password' => Hash::make($password),
                'dataNascita' => $dataNascita
            ]);
            return response()->json([
                'message' => 'User created successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Error while creating user'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function createDataStudente($nome, $cognome, $email, $password, $dataNascita)
    {
        try {
            $sql = "INSERT INTO Utenti (Nome, Cognome, Email, Password, DataNascita, TipoUtente) VALUES (:nome, :cognome, :email, :password, :dataNascita, 'Studente')";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                'nome' => $nome,
                'cognome' => $cognome,
                'email' => $email,
                'password' => Hash::make($password),
                'dataNascita' => $dataNascita
            ]);
            return response()->json([
                'message' => 'User created successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Error while creating user'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function createDirettore($nome, $cognome, $email, $password, $dataNascita)
    {
        try {
            $sql = "INSERT INTO Utenti (Nome, Cognome, Email, Password, DataNascita, TipoUtente) VALUES (:nome, :cognome, :email, :password, :dataNascita, 'Direttore')";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                'nome' => $nome,
                'cognome' => $cognome,
                'email' => $email,
                'password' => Hash::make($password),
                'dataNascita' => $dataNascita
            ]);
            return response()->json([
                'message' => 'User created successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Error while creating user'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function Login($email, $password, $jwt)
    {
        try {
            $sql = 'SELECT * FROM Utenti WHERE Email = :email';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && Hash::check($password, $user['Password'])) {
                if ($jwt && PersonalAccessToken::findToken($jwt)) {
                    return response()->json([
                        'message' => 'Already logged in'
                    ], Response::HTTP_OK);
                }
                // $token = $this->generateAuthToken($user);
                $authToken = $this->generateAuthToken($user);
                $token = $authToken['token'];
                $tipoUtente = $authToken['tipoUtente'];
                $cookie = cookie('jwt', $token, 60 * 24);

                return response()->json([
                    'message' => 'Successfully logged in',
                    'tipoUtente' => $tipoUtente,
                ], Response::HTTP_OK)->withCookie($cookie);
            } else {
                return response()->json([
                    'message' => 'Invalid credentials'
                ], Response::HTTP_UNAUTHORIZED);
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Error while logging in'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getUser($email)
    {
        try {
            $sql = "SELECT idUtente, Nome, Cognome, Email, DataNascita, TipoUtente  FROM Utenti WHERE Email = :email";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute(['email' => $email]);
            $user = $stmnt->fetch(PDO::FETCH_ASSOC);
            if ($user) {
                return response()->json([
                    'user' => $user
                ], Response::HTTP_OK);
            }
            return response()->json([
                'message' => 'User not found',
            ], Response::HTTP_NOT_FOUND);
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Error while getting user'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function generateAuthToken($userData)
    {
        $this->id = $userData['idUtente'];
        $this->Nome = $userData['Nome'];
        $this->Cognome = $userData['Cognome'];
        $this->Email = $userData['Email'];
        $this->Password = $userData['Password'];
        $this->DataNascita = $userData['DataNascita'];
        $this->TipoUtente = $userData['TipoUtente'];
        if (!$this->exists) {
            $this->setAttribute($this->getKeyName(), $userData['idUtente']);
            $this->exists = true;
        }

        // return $this->createToken('authToken')->plainTextToken;
        $token = $this->createToken('authToken')->plainTextToken;
        return ['token' => $token, 'tipoUtente' => $userData['TipoUtente']];
    }

    public function Logout($request)
    {
        try {
            $token = $request->cookie('jwt');
            $user = PersonalAccessToken::findToken($token);
            $user->delete();
            return response()->json([
                'message' => 'Successfully logged out'
            ], Response::HTTP_OK)->withoutCookie('jwt');
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Error while logging out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getUserByToken($jwt)
    {
        try {
            $token = PersonalAccessToken::findToken($jwt);
            $user_id = $token['tokenable_id'];
            $sql = "SELECT idUtente, Nome, Cognome, Email, DataNascita, TipoUtente FROM Utenti WHERE idUtente = :id";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute(['id' => $user_id]);
            $user = $stmnt->fetch(PDO::FETCH_ASSOC);
            return response()->json([
                'user' => $user
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while getting user',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function setAddress($idUtente, $via, $numeroCivico, $cap, $citta, $provincia)
    {
        try {
            $sql = "INSERT INTO Residenze (idUtente, Via, NumeroCivico, CAP, Citta, Provincia) VALUES (:idUtente, :via, :numeroCivico, :cap, :citta, :provincia)";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'idUtente' => $idUtente,
                'via' => $via,
                'numeroCivico' => $numeroCivico,
                'cap' => $cap,
                'citta' => $citta,
                'provincia' => $provincia
            ]);
            return response()->json([
                'message' => 'Address added successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Error while adding address',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getUserAddress($idUtente)
    {
        try {
            $sql = "SELECT * FROM Residenze WHERE idUtente = :idUtente";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute(['idUtente' => $idUtente]);
            if ($stmnt->rowCount() == 0) {
                return response()->json([
                    'message' => 'User has no address'
                ], Response::HTTP_NOT_FOUND);
            }
            $address = $stmnt->fetch(PDO::FETCH_ASSOC);
            return response()->json([
                'address' => $address
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while getting address',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getUserInfo($idUtente, $token)
    {
        # check if user have an address with the previous function. I have to make two query for better handling on the frontend. So no JOIN
        $address = $this->getUserAddress($idUtente);
        if ($address->getStatusCode() == 404) {
            # return user info without address
            try {
                $response = $this->getUserByToken($token);
                $data = $response->getData(true);
                $user = $data['user'];
                return response()->json([
                    'message' => 'User data retrieved successfully',
                    'user' => $user,
                    'address' => null
                ], Response::HTTP_OK);
            } catch (PDOException $e) {
                return response()->json([
                    'message' => 'Error while getting user data',
                    'error' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            # return user info and address
            try {
                $response = $this->getUserByToken($token);
                $data = $response->getData(true);
                $user = $data['user'];
                $idUtente = $user['idUtente'];
                $response = $this->getUserAddress($idUtente);
                $data = $address->getData(true);
                $address = $data['address'];
                return response()->json([
                    'message' => 'User data retrieved successfully',
                    'user' => $user,
                    'address' => $address
                ], Response::HTTP_OK);
            } catch (PDOException $e) {
                return response()->json([
                    'message' => 'Error while getting user data',
                    'error' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
        //     $sql = "SELECT * FROM Utenti JOIN Residenze ON Utenti.idUtente = Residenze.idUtente WHERE Utenti.idUtente = :idUtente";
        //     $stmnt = $this->pdo->prepare($sql);
        //     $stmnt->execute(['idUtente' => $idUtente]);
        //     $userData = $stmnt->fetch(PDO::FETCH_ASSOC);
        //     return response()->json([
        //         'message' => 'User data retrieved successfully',
        //         'userData' => $userData
        //     ], Response::HTTP_OK);
        // } catch (PDOException $e) {
        //     return response()->json([
        //         'message' => 'Error while getting user data',
        //         'error' => $e->getMessage()
        //     ], Response::HTTP_INTERNAL_SERVER_ERROR);
        // }
    }

    function updateAddress($idUtente, $Via, $NumeroCivico, $CAP, $Citta, $Provincia)
    {
        try {
            $sql = "UPDATE Residenze SET Via = :via, NumeroCivico = :numeroCivico, CAP = :cap, Citta = :citta, Provincia = :provincia WHERE idUtente = :idUtente";
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute([
                'via' => $Via,
                'numeroCivico' => $NumeroCivico,
                'cap' => $CAP,
                'citta' => $Citta,
                'provincia' => $Provincia,
                'idUtente' => $idUtente
            ]);
            return response()->json([
                'message' => 'Address updated successfully'
            ], Response::HTTP_OK);
        } catch (PDOException $e) {
            return response()->json([
                'message' => 'Error while updating address',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
