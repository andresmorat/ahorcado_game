<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "user"; // Usuario de BD
$password = "ahorcado"; // Contraseña
$dbname = "ahorcado";

// Obtener datos
$data = json_decode(file_get_contents('php://input'), true);
$nombre = $data['nombre'] ?? '';

if(empty($nombre)) {
  echo json_encode(['error' => 'Nombre no válido']);
  exit;
}

// Conectar
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  echo json_encode(['error' => 'Conexión fallida']);
  exit;
}

// Actualizar/insertar
$stmt = $conn->prepare("INSERT INTO jugadores (nombre, victorias) VALUES (?, 1) 
                       ON DUPLICATE KEY UPDATE victorias = victorias + 1");
$stmt->bind_param("s", $nombre);
$stmt->execute();

echo json_encode(['success' => true]);
$stmt->close();
$conn->close();
?>