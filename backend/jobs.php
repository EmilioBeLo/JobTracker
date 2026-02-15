<?php
require 'headers.php';
require 'db.php';
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"));
// -- GET: Listar ofertas --
if ($method == 'GET') {
    if (isset($_GET['user_id'])) {
        $stmt = $pdo->prepare("SELECT * FROM jobs WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$_GET['user_id']]);
        echo json_encode($stmt->fetchAll());
    } else {
        echo json_encode([]);
    }
}
// -- POST: Crear nueva oferta --
if ($method == 'POST') {
    if (!empty($data->user_id) && !empty($data->company) && !empty($data->position)) {
        $sql = "INSERT INTO jobs (user_id, company, position, status, applied_date, notes) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        
        // Valores por defecto si no vienen
        $status = $data->status ?? 'Applied';
        $applied_date = $data->applied_date ?? date('Y-m-d');
        $notes = $data->notes ?? '';
        
        try {
            $stmt->execute([$data->user_id, $data->company, $data->position, $status, $applied_date, $notes]);
            echo json_encode(['message' => 'Oferta guardada correctamente']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al guardar en la BD']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan datos obligatorios']);
    }
}


// -- PUT: Actualizar oferta --
if ($method == 'PUT') {
    if (!empty($data->id)) {
        $updates = [];
        $params = [];
        
        if (isset($data->company)) {
            $updates[] = "company = ?";
            $params[] = $data->company;
        }
        if (isset($data->position)) {
            $updates[] = "position = ?";
            $params[] = $data->position;
        }
        if (isset($data->status)) {
            $updates[] = "status = ?";
            $params[] = $data->status;
        }
        if (isset($data->applied_date)) {
            $updates[] = "applied_date = ?";
            $params[] = $data->applied_date;
        }
        if (isset($data->notes)) {
            $updates[] = "notes = ?";
            $params[] = $data->notes;
        }
        
        if (count($updates) > 0) {
            $params[] = $data->id;
            $sql = "UPDATE jobs SET " . implode(", ", $updates) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            
            try {
                $stmt->execute($params);
                echo json_encode(['message' => 'Oferta actualizada correctamente']);
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Error al actualizar']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'No hay datos para actualizar']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el ID de la oferta']);
    }
}


// -- DELETE: Eliminar oferta --
if ($method == 'DELETE') {
    if (!empty($data->id)) {
        $sql = "DELETE FROM jobs WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        
        try {
            $stmt->execute([$data->id]);
            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Oferta eliminada correctamente']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Oferta no encontrada']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el ID de la oferta']);
    }
}

?>