<?php

namespace App\Models;
use Illuminate\Support\Facades\DB;
use PDO;
use PDOException;

class Utente{
    protected $pdo; 

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
                'password' => password_hash($password, PASSWORD_BCRYPT),
                'dataNascita' => $dataNascita
            ]);
            return $stmt->rowCount();
        } catch (PDOException $e){
            return $e->getMessage();
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
                'password' => password_hash($password, PASSWORD_BCRYPT),
                'dataNascita' => $dataNascita
            ]);
            return $stmt->rowCount();
        } catch (PDOException $e){
            return $e->getMessage();
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
                'password' => password_hash($password, PASSWORD_BCRYPT),
                'dataNascita' => $dataNascita
            ]);
            return $stmt->rowCount();
        } catch (PDOException $e){
            return $e->getMessage();
        }
    }

    public function getUser($email){
        try{
            $sql = "SELECT * FROM Utenti WHERE Email = :email"; 
            $stmnt = $this->pdo->prepare($sql);
            $stmnt->execute(['email' => $email]); 
            return ($stmnt->fetch(PDO::FETCH_ASSOC)); 
        } catch (PDOException $e){
            return $e->getMessage();
        }
    }
}
