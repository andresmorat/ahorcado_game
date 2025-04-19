<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ahorcado Multijugador - Tecnología</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Pantallas -->
  <div id="setup-screen" class="active">
    <h1>Ahorcado Multijugador</h1>
    <div class="input-group">
      <input type="text" id="jugador1" placeholder="Nombre Jugador 1">
      <input type="text" id="jugador2" placeholder="Nombre Jugador 2">
    </div>
    <button onclick="iniciarPartida()" class="key">Empezar Partida</button>
  </div>
  <div id="word-screen">
    <h1>¡<span id="current-writer"></span>, escribe una palabra tecnológica!</h1>
    <div class="input-group">
      <input type="text" id="custom-word" placeholder="Palabra secreta...">
    </div>
    <button onclick="guardarPalabra()" class="key">Guardar Palabra</button>
  </div>
  <div id="game-screen">
    <div id="score-board">
      <div>Puntos <span id="p1-name"></span>: <span id="p1-score">0</span></div>
      <div>Puntos <span id="p2-name"></span>: <span id="p2-score">0</span></div>
    </div>
    <h2>Turno de <span id="current-guesser"></span></h2>
    <div id="word-display"></div>
    <div id="hangman"></div>
    <div id="failed-letters">Letras fallidas: </div>
    <div id="keyboard"></div>
    <button id="next-turn" onclick="siguienteRonda()"></button>
  </div>
  <div id="result-screen">
    <h1>¡Partida Finalizada!</h1>
    <div id="winner-message"></div>
    <!-- Botones finales con la clase final-buttons -->
    <div class="final-buttons">
      <button onclick="mostrarLeaderboard()" class="key">Ver Top 10</button>
      <button onclick="reiniciarJuego()" class="key">Nueva Partida</button>
    </div>
  </div>
  <div id="leaderboard-screen">
    <h1 class="leaderboard-header">Top 10 Jugadores</h1>
    <div id="leaderboard"></div>
    <button onclick="volverResultados()" class="key">Volver</button>
  </div>
  <div id="version">Grupo 3 - Versión 0.20.5</div>

  <!-- Modal -->
  <div id="modal" class="modal">
    <div class="modal-content">
      <span id="modal-message"></span>
      <button id="modal-close" class="key">Cerrar</button>
    </div>
  </div>

  <!-- Elementos de audio -->
  <audio id="round-win" src="./sounds/aplausos.mp3" preload="auto"></audio>
  <audio id="round-loss" src="./sounds/perdiste.mp3" preload="auto"></audio>
  <audio id="victory-sound" src="./sounds/victory.mp3" preload="auto"></audio>
  <script src="script.js"></script>
</body>
</html>