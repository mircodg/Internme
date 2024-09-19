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
            "CREATE TABLE `Universita` (
                `idUniversita` int NOT NULL AUTO_INCREMENT,
                `Nome` varchar(255) NOT NULL,
                `Via` varchar(255) NOT NULL,
                `NumeroCivico` int NOT NULL,
                `CAP` int NOT NULL,
                `Citta` varchar(255) NOT NULL,
                `Provincia` varchar(255) NOT NULL,
                `idUtente` int NOT NULL,
                PRIMARY KEY (`idUniversita`), 
                UNIQUE(`Nome`), 
                UNIQUE (`Via`, `NumeroCivico`, `CAP`, `Citta`, `Provincia`),
                FOREIGN KEY (`idUtente`) REFERENCES `Utenti`(`idUtente`) ON DELETE CASCADE ON UPDATE CASCADE
            )"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Università`");
    }
};
