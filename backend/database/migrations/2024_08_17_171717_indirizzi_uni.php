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
            "CREATE TABLE `IndirizziUni` (
                `Via` varchar(255) NOT NULL,
                `NumeroCivico` int NOT NULL,
                `CAP` int NOT NULL,
                `Citta` varchar(255) NOT NULL,
                `Provincia` varchar(255) NOT NULL,
                `idUniversità` int NOT NULL,
                UNIQUE (`Citta`),
                PRIMARY KEY (`idUniversità`),
                FOREIGN KEY (`idUniversità`) REFERENCES `Università` (`idUniversità`)
            )"
        ); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `IndirizziUni`");
    }
};