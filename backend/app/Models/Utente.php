<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Notifications\Notifiable;

use Faker\Provider\ar_EG\Person;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use PDO;
use PDOException;
use Symfony\Component\HttpFoundation\Response; 
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\PersonalAccessToken; 

class Utente extends Authenticatable{

    // use HasFactory, Notifiable;
    
    // protected $fillable = [
    //     'Nome', 'Cognome', 'Email', 'DataNascita', 'TipoUtente'
    // ];

    // protected $hidden = [
    //     'Password'
    // ];

    protected $pdo; 
    protected $table = 'Utenti';
    protected $primaryKey = 'idUtente';

    use HasApiTokens; 

    public function __construct(){
        $this->pdo = DB::connection()->getPdo(); 
    }

    public function createCEO($nome, $cognome, $email, $password, $dataNascita){
        try{
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
                'message' => 'Utente creato con successo'
            ], Response::HTTP_OK);
        } catch (PDOException $e){
            echo $e->getMessage();
            return response()->json([
                'message' => 'Errore nella creazione dell\'utente'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function createDataStudente($nome, $cognome, $email, $password, $dataNascita){
        try{
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
                'message' => 'Utente creato con successo'
            ], Response::HTTP_OK);
        } catch (PDOException $e){
            echo $e->getMessage();
            return response()->json([
                'message' => 'Errore nella creazione dell\'utente'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function createDirettore($nome, $cognome, $email, $password, $dataNascita){
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
                'message' => 'Utente creato con successo'
            ], Response::HTTP_OK);
        } catch (PDOException $e){
            echo $e->getMessage();
            return response()->json([
                'message' => 'Errore nella creazione dell\'utente'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

    public function Login($email, $password, $jwt){
        if($jwt){
            return response()->json([
                'message' => 'Utente già loggato'
            ], Response::HTTP_OK);
        }
        try {
            $sql = 'SELECT * FROM Utenti WHERE Email = :email';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && Hash::check($password, $user['Password'])) {


                $token = $this->generateAuthToken($user);
                $cookie = cookie('jwt', $token, 60 * 24);

                return response()->json([
                    'message' => 'Login effettuato con successo',
                ], Response::HTTP_OK)->withCookie($cookie);
            } else {
                return response()->json([
                    'message' => 'Credenziali errate'
                ], Response::HTTP_UNAUTHORIZED);
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
            return response()->json([
                'message' => 'Errore nel login'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getUser($email){
        try{
            $sql = "SELECT idUtente, Nome, Cognome, Email, DataNascita, TipoUtente  FROM Utenti WHERE Email = :email"; 
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute(['email' => $email]);
            $user = $stmnt->fetch(PDO::FETCH_ASSOC); 
            if($user){
                return response()->json([
                    'user' => $user
                ], Response::HTTP_OK);
            }
            return response()->json([
                'message' => 'Utente insesistente',
            ], Response::HTTP_NOT_FOUND);
        } catch (PDOException $e){
            echo $e->getMessage();
            return response()->json([
                'message' => 'Errore nella ricerca dell\'utente'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function generateAuthToken($userData){
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

        return $this->createToken('authToken')->plainTextToken;
    }

    public function Logout($request){
        try{
            $token = $request->cookie('jwt');
            $user = PersonalAccessToken::findToken($token);
            $user->delete();
            return response()->json([
                'message' => 'Logout effettuato con successo'
            ], Response::HTTP_OK)->withoutCookie('jwt');
        } catch (PDOException $e){
            echo $e->getMessage();
            return response()->json([
                'message' => 'Errore nel logout'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
