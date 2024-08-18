<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $pdo = DB::connection()->getPdo(); 
        $pdo->exec(
            "CREATE TABLE `Aziende` (
                `idAzienda` int NOT NULL AUTO_INCREMENT,
                `Nome` varchar(255) NOT NULL,
                `SettoreLavoro` varchar(255) NOT NULL,
                `PartitaIva` varchar(255) NOT NULL,
                `idUtente` int NOT NULL,
                PRIMARY KEY (`idAzienda`),
                UNIQUE (`PartitaIva`),
                FOREIGN KEY (`idUtente`) REFERENCES `Utenti` (`idUtente`)
            )"
        );  
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Aziende`");
    }
};
