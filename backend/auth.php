<?php
// auth.php
require 'headers.php';
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    // Leemos el JSON que envía Angular
    $data = json_decode(file_get_contents("php://input"));

    // Verificamos qué acción queremos hacer: 'register' o 'login'
    // Angular debe enviar: { "action": "login", ... } o { "action": "register", ... }
    
    if (!isset($data->action)) {
        http_response_code(400);
        echo json_encode(['error' => 'Acción no especificada']);
        exit;
    }

    // --- REGISTRO ---
    if ($data->action === 'register') {
        if (!empty($data->username) && !empty($data->email) && !empty($data->password)) {
            // 1. Comprobar si el email ya existe
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$data->email]);
            if ($stmt->fetch()) {
                http_response_code(409); // Conflict
                echo json_encode(['error' => 'El email ya está registrado']);
                exit;
            }

            // 2. Encriptar contraseña
            $passwordHash = password_hash($data->password, PASSWORD_DEFAULT);

            // 3. Insertar usuario
            $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            
            try {
                $stmt->execute([$data->username, $data->email, $passwordHash]);
                echo json_encode(['message' => 'Usuario registrado correctamente']);
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Error al registrar']);
            }
        } else {
            echo json_encode(['error' => 'Faltan datos']);
        }
    }

    // --- LOGIN ---
    elseif ($data->action === 'login') {
        if (!empty($data->email) && !empty($data->password)) {
            // 1. Buscar usuario por email
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$data->email]);
            $user = $stmt->fetch();

            // 2. Verificar si existe y si la contraseña coincide
            if ($user && password_verify($data->password, $user['password'])) {
                // ¡Login correcto!
                // Devolvemos los datos del usuario (menos la contraseña) para que Angular los guarde
                unset($user['password']); 
                echo json_encode([
                    'message' => 'Login exitoso',
                    'user' => $user // Angular guardará esto en localStorage
                ]);
            } else {
                http_response_code(401); // Unauthorized
                echo json_encode(['error' => 'Email o contraseña incorrectos']);
            }
        }
    }
}
?>