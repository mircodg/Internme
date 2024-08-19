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
            "CREATE TABLE `Feedback` (
                `Matricola` int NOT NULL,
                `idUniversità` int NOT NULL,
                `idTirocinio` int NOT NULL,
                `Stelle` int NOT NULL CHECK(Stelle BETWEEN 1 AND 5),
                `Descrizione` varchar(255) NOT NULL,
                PRIMARY KEY (`Matricola`, `idUniversità`, `idTirocinio`),
                FOREIGN KEY (`Matricola`, `idUniversità`) REFERENCES `Studenti` (`Matricola`, `idUniversità`),
                FOREIGN KEY (`idTirocinio`) REFERENCES `Tirocini` (`idTirocinio`)
            )"
        );
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