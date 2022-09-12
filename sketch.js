let xCuerpo = [];
let yCuerpo = [];

let segmentosSnake = 10;
const diferencia = 10;
let direccion = 'derecha';

let xInicio = 100;
let yInicio = 100;

let xFruta = 100;
let yFruta = 100;

const h = 500;
const w = 500;

let frames = 15.5;
let elementoDiv;

function setup() {

    elementoDiv = createDiv('Puntaje = 0');
    elementoDiv.position(20, 20);
    elementoDiv.id = 'div';
    elementoDiv.style('color', 'white');

    createCanvas(w, h);
    frameRate(frames);
    stroke(220);
    strokeWeight(10);
    for(let x=0; x < segmentosSnake;x++){
    xCuerpo.push(xInicio + x * diferencia);
    yCuerpo.push(yInicio);
    }
}

function draw() {
    background(0);
    frameRate(frames);
    keyPresed();
    actualizarSnake();
    comprobarFruta();
    estadoJuego();
    colisionSnake();
}

function actualizarSnake(){
    for(let x=0;x<segmentosSnake-1;x++){
        line(xCuerpo[x], yCuerpo[x], xCuerpo[x+1], yCuerpo[x+1]); 
    }
    for (let i = 0; i < segmentosSnake - 1; i++) {
        xCuerpo[i] = xCuerpo[i + 1];
        yCuerpo[i] = yCuerpo[i + 1];
    }
    switch (direccion) {
        case 'derecha':
            xCuerpo[segmentosSnake - 1] = xCuerpo[segmentosSnake - 1] + diferencia;
            yCuerpo[segmentosSnake - 1] = yCuerpo[segmentosSnake - 1];
            break;
        case 'arriba':
            xCuerpo[segmentosSnake - 1] = xCuerpo[segmentosSnake - 1];
            yCuerpo[segmentosSnake - 1] = yCuerpo[segmentosSnake - 1] - diferencia;
            break;
        case 'izquierda':
            xCuerpo[segmentosSnake - 1] = xCuerpo[segmentosSnake - 1] - diferencia;
            yCuerpo[segmentosSnake - 1] = yCuerpo[segmentosSnake - 1];
            break;
        case 'abajo':
            xCuerpo[segmentosSnake - 1] = xCuerpo[segmentosSnake - 1];
            yCuerpo[segmentosSnake - 1] = yCuerpo[segmentosSnake - 1] + diferencia;
            break;
    }
}

function actualizarCoordenadasFruta() {
    xFruta = floor(random(10, (width - 100) / 10)) * 10;
    yFruta = floor(random(10, (height - 100) / 10)) * 10;
}

function comprobarFruta() {
    point(xFruta, yFruta);
    if (xCuerpo[xCuerpo.length - 1] === xFruta && yCuerpo[yCuerpo.length - 1] === yFruta) {
        xCuerpo.unshift(xCuerpo[0]);
        yCuerpo.unshift(yCuerpo[0]);
        segmentosSnake++;
        frames+=1;
        const prevScore = parseInt(elementoDiv.html().substring(10));
        elementoDiv.html('Puntaje = ' + (prevScore + 1));
        actualizarCoordenadasFruta();
    }
}

function keyPresed(){
    switch (keyCode) {
        case 39:
            if(direccion !== 'izquierda'){
                direccion = 'derecha';
            }
          break;
        case 38:
            if(direccion !== 'abajo'){
                direccion = 'arriba';
            }
          break;
        case 37:
            if(direccion !== 'derecha'){
                direccion = 'izquierda';
            }
          break;
        case 40:
            if(direccion !== 'arriba'){
                direccion = 'abajo';
            }
          break;
    }
}

function colisionSnake(){
    const cabezaSerpienteX = xCuerpo[xCuerpo.length - 1];
    const cabezaSerpienteY = yCuerpo[yCuerpo.length - 1];
    for (let i = 0; i < xCuerpo.length - 1; i++) {
        if (xCuerpo[i] === cabezaSerpienteX && yCuerpo[i] === cabezaSerpienteY) {
            //return true;
            noLoop();
        }
    }
}

function estadoJuego(){
    if(xCuerpo[xCuerpo.length-1] < 0 || xCuerpo[xCuerpo.length-1] >= w+1 ||
        yCuerpo[yCuerpo.length-1] < 0 || yCuerpo[yCuerpo.length-1] >= h+1 ||
        colisionSnake()){
        noLoop();
    }
}