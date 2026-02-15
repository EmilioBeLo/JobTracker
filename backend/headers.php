<?php
// headers.php

// 1. Permitir acceso desde cualquier origen (necesario para Angular localhost:4200)
header("Access-Control-Allow-Origin: *");

// 2. Indicar que siempre vamos a devolver JSON y usar UTF-8 (tildes, ñ)
header("Content-Type: application/json; charset=UTF-8");

// 3. Permitir los métodos HTTP que usaremos en la API
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// 4. Permitir cabeceras específicas que Angular envía
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// 5. Manejo de la petición "OPTIONS" (Pre-flight)
// Cuando Angular hace un POST o DELETE, primero envía una petición OPTIONS para preguntar
// "Oye, ¿puedo enviar esto?". Aquí respondemos "Sí" y cerramos la conexión.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>