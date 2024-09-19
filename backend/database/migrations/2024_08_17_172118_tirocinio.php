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
                `TipoTirocinio` enum('Intra-curricular', 'Extra-curricular') NOT NULL DEFAULT 'Intra-curricular',
                `TipoSvolgimento` enum('In place', 'Remote') NOT NULL DEFAULT 'In place',
                `MaxTirocinanti` int NOT NULL,
                `CDL_Richiesto` varchar(255) NOT NULL,
                `Retribuzione` float DEFAULT NULL,
                `idAzienda` int NOT NULL,
                PRIMARY KEY (`idTirocinio`), 
                FOREIGN KEY (`idAzienda`) REFERENCES `Aziende` (`idAzienda`) ON DELETE CASCADE ON UPDATE CASCADE
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
