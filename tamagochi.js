let hambre = 0;
let felicidad = 10;
let cooldownComida = false;
let cooldownJuego = false;

function vista() {
    let estaMuerto = (hambre >= 10 || felicidad <= 0);

    let caraHTML;
    if (estaMuerto) {
        caraHTML = "Angry Dog (1).json"
    } else {
        caraHTML = "Smiling Dog.json"
    }

    let mensaje = estaMuerto ? "<div class='game-over'>GAME OVER</div>" : "";

    document.getElementById("app").innerHTML = `
        <div class="pet-screen">
            <h1>PIXEL PET</h1>
            
            <div class="pet-face">
                <lottie-player src="${caraHTML}" background="transparent" speed="1" style="width: 150px; height: 150px; margin: 0 auto;" loop autoplay></lottie-player>
            </div>
            
            ${mensaje}

            <div class="stats">
                <div>🍗 Hambre: ${hambre}</div>
                <div>❤️ Felicidad: ${felicidad}</div>
            </div>

            <div class="controls">
                <!-- Atributo disabled basado en variables de Cooldown (Fase 8) -->
                <button class="boton" id="btn-comer" ${cooldownComida ? 'disabled' : ''}>Dar Comida</button>
                <button class="boton" id="btn-jugar" ${cooldownJuego ? 'disabled' : ''}>Jugar</button>
            </div>
        </div>
    `;



    document.getElementById("btn-comer").onclick = () => {

        if (!estaMuerto && !cooldownComida) {
            if (hambre > 0) {
                hambre--;
            }

            cooldownComida = true;
            vista();

            setTimeout(() => {
                cooldownComida = false;
                vista();
            }, 3000);
        }
    }

    document.getElementById("btn-jugar").onclick = () => {

        if (!estaMuerto && !cooldownJuego) {
            if (felicidad < 10) {
                felicidad++;
            }

            cooldownJuego = true;
            vista();

            setTimeout(() => {
                cooldownJuego = false;
                vista();
            }, 3000);
        }
    }
}

vista();


function pasoDelTiempo() {
    setTimeout(() => {

        hambre++;
        felicidad--;

        if (hambre > 10) hambre = 10;
        if (felicidad < 0) felicidad = 0;

        vista();

        pasoDelTiempo();

    }, 2000);
}

pasoDelTiempo();