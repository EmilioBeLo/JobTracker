<?php
// db.php

$host = 'localhost';
$db   = 'job_tracker';  // Asegúrate de que tu BD se llame exactamente así
$user = 'root';         // Usuario por defecto en XAMPP
$pass = '';             // Contraseña por defecto en XAMPP (vacía)
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Lanza errores si falla SQL
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,      // Devuelve arrays asociativos (clave => valor)
    PDO::ATTR_EMULATE_PREPARES   => false,                 // Seguridad real contra inyecciones SQL
];

try {
    // Intentamos conectar
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // Si falla la conexión, devolvemos un error JSON y paramos todo
    http_response_code(500);
    echo json_encode([
        'error' => 'Error crítico de conexión a la Base de Datos',
        'details' => $e->getMessage()
    ]);
    exit; // Detenemos la ejecución para que no siga procesando nada
}
?>