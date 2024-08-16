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
            "CREATE TABLE `Feedback`(
            `idFeedback` int NOT NULL AUTO_INCREMENT,
            `Descrizione` varchar(255) NOT NULL,
            `Stelle` int NOT NULL,
            `idTirocinio` int NOT NULL,
            `idUtente` int NOT NULL,
            PRIMARY KEY (`idFeedback`),
            FOREIGN KEY (`idTirocinio`) REFERENCES `Tirocini`(`idTirocinio`),
            FOREIGN KEY (`idUtente`) REFERENCES `Utenti`(`idUtente`),
            CHECK (`Stelle` BETWEEN 1 AND 5)
        )"); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `Feedback`");
    }
};
