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
            "CREATE TABLE `Tirocini`(
                `idTirocinio` int NOT NULL AUTO_INCREMENT,
                `Titolo` varchar(255) NOT NULL,
                `Descrizione` varchar(255) NOT NULL,
                `TipoSvolgimento` enum('Remoto', 'In sede') NOT NULL DEFAULT 'In sede',
                `TipoTirocinio` enum('Curriculare', 'Extracurriculare') NOT NULL DEFAULT 'Curriculare',
                `CDL Richiesto` varchar(255) NOT NULL,
                `Max Tirocinanti` int NOT NULL,
                `Retribuzione` decimal(10, 2) NULL,
                `idAzienda` int NOT NULL,
                PRIMARY KEY (`idTirocinio`),
                FOREIGN KEY (`idAzienda`) REFERENCES `Aziende`(`idAzienda`)
            )"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Tirocini`");
    }
};
