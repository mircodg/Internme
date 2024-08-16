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
            "CREATE TABLE `Sedi`(
                `idSede` int NOT NULL AUTO_INCREMENT,
                `Citta` varchar(255) NOT NULL,
                `Via` varchar(255) NOT NULL,
                `Numero Civico` int NOT NULL,
                `CAP` varchar(5) NOT NULL,
                `idAzienda` int NOT NULL,
                PRIMARY KEY (`idSede`),
                UNIQUE (`Citta`), 
                FOREIGN KEY (`idAzienda`) REFERENCES `Aziende`(`idAzienda`)
            )");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Sedi`");
    }
};
