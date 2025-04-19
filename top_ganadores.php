<?php
$servername = "localhost";
$username = "user";
$password = "ahorcado";
$dbname = "ahorcado";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("<div class='leaderboard-entry'>Error de conexión</div>");
}

// Consultar top 10
$sql = "SELECT nombre, victorias FROM jugadores ORDER BY victorias DESC LIMIT 10";
$result = $conn->query($sql);

echo '<div class="leaderboard-header">Nombre | Victorias</div>';
if ($result->num_rows > 0) {
  $posicion = 1;
  while($row = $result->fetch_assoc()) {
    echo '<div class="leaderboard-entry">' .
         '<span>' . $posicion . '° ' . htmlspecialchars($row['nombre']) . '</span>' .
         '<span>' . $row['victorias'] . ' victorias</span>' .
         '</div>';
    $posicion++;
  }
} else {
  echo '<div class="leaderboard-entry">Sin registros</div>';
}

$conn->close();
?>