// script.js
const jugadores = {
    j1: { nombre: '', puntos: 0 },
    j2: { nombre: '', puntos: 0 }
};
let ronda = 0;
let turno = 'j1';
let palabraSecreta = '';
let letrasAdivinadas = [];
let letrasFallidas = [];
let intentosFallidos = 0;
const maxIntentos = 11;

function iniciarPartida() {
    const j1 = document.getElementById('jugador1').value.trim();
    const j2 = document.getElementById('jugador2').value.trim();
    if (j1 && j2) {
        jugadores.j1.nombre = j1;
        jugadores.j2.nombre = j2;
        document.getElementById('p1-name').textContent = j1;
        document.getElementById('p2-name').textContent = j2;
        cambiarPantalla('setup-screen', 'word-screen');
        document.getElementById('current-writer').textContent = j1;
    }
}

function guardarPalabra() {
    const palabra = document.getElementById('custom-word').value.toLowerCase().trim();
    if (palabra && /^[a-zñ]+$/.test(palabra)) {
        palabraSecreta = palabra;
        document.getElementById('custom-word').value = '';
        document.getElementById('current-guesser').textContent =
            turno === 'j1' ? jugadores.j2.nombre : jugadores.j1.nombre;
        cambiarPantalla('word-screen', 'game-screen');
        iniciarRonda();
    } else {
        alert('¡Solo letras minúsculas sin espacios!');
    }
}

function cambiarPantalla(ocultar, mostrar) {
    document.getElementById(ocultar).classList.remove('active');
    document.getElementById(mostrar).classList.add('active');
}

function iniciarRonda() {
    letrasAdivinadas = [];
    letrasFallidas = [];
    intentosFallidos = 0;
    document.getElementById("word-display").textContent = "_ ".repeat(palabraSecreta.length);
    document.getElementById("failed-letters").textContent = "Letras fallidas: ";
    document.getElementById("hangman").innerHTML = "";
    dibujarAhorcado();
    crearTeclado();
}

function crearTeclado() {
    const keyboardDiv = document.getElementById("keyboard");
    keyboardDiv.innerHTML = "";
    const letras = "abcdefghijklmnñopqrstuvwxyz".split("");
    const filas = [[], [], []];
    const letrasPorFila = Math.ceil(letras.length / 3);
    letras.forEach((letra, index) => {
        filas[Math.floor(index / letrasPorFila)].push(letra);
    });
    filas.forEach(fila => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "key-row";
        fila.forEach(letra => {
            const btn = document.createElement("button");
            btn.className = "key";
            btn.textContent = letra.toUpperCase();
            btn.onclick = () => adivinarLetra(letra);
            rowDiv.appendChild(btn);
        });
        keyboardDiv.appendChild(rowDiv);
    });
}

function adivinarLetra(letra) {
    if (letrasAdivinadas.includes(letra) || letrasFallidas.includes(letra)) return;
    if (!palabraSecreta.includes(letra)) {
        letrasFallidas.push(letra);
        intentosFallidos++;
        actualizarLetrasFallidas();
        dibujarAhorcado();
    } else {
        letrasAdivinadas.push(letra);
    }
    actualizarPalabraMostrada();
    if (intentosFallidos >= maxIntentos) {
        finalizarRonda(false);
    } else if (!document.getElementById("word-display").textContent.includes("_")) {
        finalizarRonda(true);
    }
}

function actualizarPalabraMostrada() {
    const display = palabraSecreta
        .split("")
        .map(l => letrasAdivinadas.includes(l) ? l : "_")
        .join(" ")
        .toUpperCase();
    document.getElementById("word-display").textContent = display;
}

function actualizarLetrasFallidas() {
    document.getElementById("failed-letters").textContent =
        `Letras fallidas: ${letrasFallidas.join(", ").toUpperCase()}`;
}

function dibujarAhorcado() {
    const hangmanDiv = document.getElementById("hangman");
    hangmanDiv.innerHTML = "";
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 300 300");
    svg.setAttribute("width", "300");
    svg.setAttribute("height", "300");

    const partes = [
        () => {
            const base = document.createElementNS(svgNS, "line");
            base.setAttribute("x1", "50");
            base.setAttribute("y1", "250");
            base.setAttribute("x2", "250");
            base.setAttribute("y2", "250");
            base.setAttribute("stroke", "black");
            base.setAttribute("stroke-width", "5");
            svg.appendChild(base);
        },
        () => {
            const poste = document.createElementNS(svgNS, "line");
            poste.setAttribute("x1", "75");
            poste.setAttribute("y1", "250");
            poste.setAttribute("x2", "75");
            poste.setAttribute("y2", "50");
            poste.setAttribute("stroke", "black");
            poste.setAttribute("stroke-width", "5");
            svg.appendChild(poste);
        },
        () => {
            const travesaño = document.createElementNS(svgNS, "line");
            travesaño.setAttribute("x1", "75");
            travesaño.setAttribute("y1", "50");
            travesaño.setAttribute("x2", "175");
            travesaño.setAttribute("y2", "50");
            travesaño.setAttribute("stroke", "black");
            travesaño.setAttribute("stroke-width", "5");
            svg.appendChild(travesaño);
        },
        () => {
            const soga = document.createElementNS(svgNS, "line");
            soga.setAttribute("x1", "175");
            soga.setAttribute("y1", "50");
            soga.setAttribute("x2", "175");
            soga.setAttribute("y2", "80");
            soga.setAttribute("stroke", "black");
            soga.setAttribute("stroke-width", "3");
            svg.appendChild(soga);
        },
        () => {
            const cabeza = document.createElementNS(svgNS, "circle");
            cabeza.setAttribute("cx", "175");
            cabeza.setAttribute("cy", "100");
            cabeza.setAttribute("r", "20");
            cabeza.setAttribute("fill", "none");
            cabeza.setAttribute("stroke", "black");
            cabeza.setAttribute("stroke-width", "3");
            svg.appendChild(cabeza);
        },
        () => {
            const torso = document.createElementNS(svgNS, "line");
            torso.setAttribute("x1", "175");
            torso.setAttribute("y1", "120");
            torso.setAttribute("x2", "175");
            torso.setAttribute("y2", "180");
            torso.setAttribute("stroke", "black");
            torso.setAttribute("stroke-width", "3");
            svg.appendChild(torso);
        },
        () => {
            const brazoIzq = document.createElementNS(svgNS, "line");
            brazoIzq.setAttribute("x1", "175");
            brazoIzq.setAttribute("y1", "140");
            brazoIzq.setAttribute("x2", "150");
            brazoIzq.setAttribute("y2", "160");
            brazoIzq.setAttribute("stroke", "black");
            brazoIzq.setAttribute("stroke-width", "3");
            svg.appendChild(brazoIzq);
        },
        () => {
            const brazoDer = document.createElementNS(svgNS, "line");
            brazoDer.setAttribute("x1", "175");
            brazoDer.setAttribute("y1", "140");
            brazoDer.setAttribute("x2", "200");
            brazoDer.setAttribute("y2", "160");
            brazoDer.setAttribute("stroke", "black");
            brazoDer.setAttribute("stroke-width", "3");
            svg.appendChild(brazoDer);
        },
        () => {
            const piernaIzq = document.createElementNS(svgNS, "line");
            piernaIzq.setAttribute("x1", "175");
            piernaIzq.setAttribute("y1", "180");
            piernaIzq.setAttribute("x2", "150");
            piernaIzq.setAttribute("y2", "220");
            piernaIzq.setAttribute("stroke", "black");
            piernaIzq.setAttribute("stroke-width", "3");
            svg.appendChild(piernaIzq);
        },
        () => {
            const piernaDer = document.createElementNS(svgNS, "line");
            piernaDer.setAttribute("x1", "175");
            piernaDer.setAttribute("y1", "180");
            piernaDer.setAttribute("x2", "200");
            piernaDer.setAttribute("y2", "220");
            piernaDer.setAttribute("stroke", "black");
            piernaDer.setAttribute("stroke-width", "3");
            svg.appendChild(piernaDer);
        },
        () => {
            // Dibujar cara con ojos en "X" y boca horizontal
            const ojoIzq1 = document.createElementNS(svgNS, "line");
            ojoIzq1.setAttribute("x1", "165");
            ojoIzq1.setAttribute("y1", "90");
            ojoIzq1.setAttribute("x2", "175");
            ojoIzq1.setAttribute("y2", "100");
            ojoIzq1.setAttribute("stroke", "black");
            ojoIzq1.setAttribute("stroke-width", "2");
            svg.appendChild(ojoIzq1);

            const ojoIzq2 = document.createElementNS(svgNS, "line");
            ojoIzq2.setAttribute("x1", "175");
            ojoIzq2.setAttribute("y1", "90");
            ojoIzq2.setAttribute("x2", "165");
            ojoIzq2.setAttribute("y2", "100");
            ojoIzq2.setAttribute("stroke", "black");
            ojoIzq2.setAttribute("stroke-width", "2");
            svg.appendChild(ojoIzq2);

            const ojoDer1 = document.createElementNS(svgNS, "line");
            ojoDer1.setAttribute("x1", "185");
            ojoDer1.setAttribute("y1", "90");
            ojoDer1.setAttribute("x2", "175");
            ojoDer1.setAttribute("y2", "100");
            ojoDer1.setAttribute("stroke", "black");
            ojoDer1.setAttribute("stroke-width", "2");
            svg.appendChild(ojoDer1);

            const ojoDer2 = document.createElementNS(svgNS, "line");
            ojoDer2.setAttribute("x1", "175");
            ojoDer2.setAttribute("y1", "90");
            ojoDer2.setAttribute("x2", "185");
            ojoDer2.setAttribute("y2", "100");
            ojoDer2.setAttribute("stroke", "black");
            ojoDer2.setAttribute("stroke-width", "2");
            svg.appendChild(ojoDer2);

            const boca = document.createElementNS(svgNS, "line");
            boca.setAttribute("x1", "165");
            boca.setAttribute("y1", "110");
            boca.setAttribute("x2", "185");
            boca.setAttribute("y2", "110");
            boca.setAttribute("stroke", "black");
            boca.setAttribute("stroke-width", "2");
            svg.appendChild(boca);
        }
    ];

    for (let i = 0; i < intentosFallidos && i < partes.length; i++) {
        partes[i]();
    }

    hangmanDiv.appendChild(svg);
}

function finalizarRonda(gano) {
    const ganadorRonda = gano
        ? (turno === 'j1' ? 'j2' : 'j1')
        : turno;
    jugadores[ganadorRonda].puntos++;
    document.getElementById("p1-score").textContent = jugadores.j1.puntos;
    document.getElementById("p2-score").textContent = jugadores.j2.puntos;
    fetch('guardar_ganador.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: jugadores[ganadorRonda].nombre })
    });
    const mensaje = gano
        ? `¡${jugadores[ganadorRonda].nombre} adivinó la palabra!`
        : `¡${jugadores[ganadorRonda].nombre} falló! La palabra era: ${palabraSecreta.toUpperCase()}`;
    mostrarModal(mensaje);
    const nextTurnBtn = document.getElementById("next-turn");
    nextTurnBtn.style.display = 'inline-block';
    nextTurnBtn.textContent = ronda < 1
        ? `Turno de ${jugadores.j2.nombre}`
        : 'Fin de la Ronda';
}

function mostrarModal(mensaje) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = mensaje;
    modal.style.display = 'flex';

    document.getElementById('modal-close').onclick = () => {
        modal.style.display = 'none';
    };
}

function siguienteRonda() {
    document.getElementById('next-turn').style.display = 'none';
    ronda++;
    if (ronda < 2) {
        turno = turno === 'j1' ? 'j2' : 'j1';
        document.getElementById('current-writer').textContent = jugadores[turno].nombre;
        cambiarPantalla('game-screen', 'word-screen');
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    const winnerMessage = document.getElementById('winner-message');
    let ganadorFinal = '';
    if (jugadores.j1.puntos > jugadores.j2.puntos) {
        ganadorFinal = jugadores.j1.nombre;
    } else if (jugadores.j2.puntos > jugadores.j1.puntos) {
        ganadorFinal = jugadores.j2.nombre;
    }
    if (ganadorFinal) {
        document.getElementById('victory-sound').play();
        lanzarConfetis(); // Lanzar confeti
        fetch('guardar_ganador.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: ganadorFinal })
        });
    } else {
        document.getElementById('round-loss').play();
    }
    winnerMessage.textContent =
        ganadorFinal ? `¡${ganadorFinal} gana la partida!` : '¡Empate técnico!';
    cambiarPantalla('game-screen', 'result-screen');
}

function lanzarConfetis() {
    const colores = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];
    for (let i = 0; i < 100; i++) {
        const confeti = document.createElement("div");
        confeti.className = "confetti";
        confeti.style.left = `${Math.random() * window.innerWidth}px`;
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * 5)];
        confeti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        document.body.appendChild(confeti);
        setTimeout(() => confeti.remove(), 3000);
    }
}

function reiniciarJuego() {
    jugadores.j1.puntos = 0;
    jugadores.j2.puntos = 0;
    ronda = 0;
    turno = 'j1';
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('setup-screen').classList.add('active');
}

function mostrarLeaderboard() {
    fetch('top_ganadores.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('leaderboard').innerHTML = data;
            cambiarPantalla('result-screen', 'leaderboard-screen');
        });
}

function volverResultados() {
    cambiarPantalla('leaderboard-screen', 'result-screen');
}