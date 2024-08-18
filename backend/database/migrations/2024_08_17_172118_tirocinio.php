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
            "CREATE TABLE `Tirocini` (
                `idTirocinio` int NOT NULL AUTO_INCREMENT,
                `Titolo` varchar(255) NOT NULL,
                `Descrizione` varchar(255) NOT NULL,
                `TipoTirocinio` enum('Curriculare', 'Extracurriculare') NOT NULL DEFAULT 'Curriculare',
                `TipoSvolgimento` enum('In presenza', 'Da remoto') NOT NULL DEFAULT 'In presenza',
                `MaxTirocinanti` int NOT NULL,
                `CDL_Richiesto` varchar(255) NOT NULL,
                `Retribuzione` float DEFAULT NULL,
                `idAzienda` int NOT NULL,
                PRIMARY KEY (`idTirocinio`),
                FOREIGN KEY (`idAzienda`) REFERENCES `Aziende` (`idAzienda`)
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
