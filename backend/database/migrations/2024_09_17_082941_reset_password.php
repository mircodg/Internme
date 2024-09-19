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
            "CREATE TABLE `ResetPassword` (
                `Email` varchar(255) NOT NULL,
                `Token` varchar(255) NOT NULL,
                `Utilizzato` TINYINT(1) NOT NULL DEFAULT false,
                `Timestamp` timestamp NOT NULL,
                PRIMARY KEY  (`Token`), 
                FOREIGN KEY (`Email`) REFERENCES `Utenti` (`Email`) 
            )"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $pdo = DB::connection()->getPdo();
        $pdo->exec("DROP TABLE `ResetPassword`");
    }
};
