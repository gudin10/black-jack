/**
 * 2C = Tow of Clubes
 * 2D = Tow of Diamons
 * 2H = Tow of Hearts
 * 2S = Tow of Spades
 */
//simple funcion anonima - PATRON MODULO
(()=>{
    'use strict'
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    //let puntosJugador = 0;
    //let puntosCOM = 0;
    let puntosJugadores = [];
    //Referencias de HTML

    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnnuevo');

    const puntosHTML = document.querySelectorAll('small');
    const divCartasJugador = document.querySelectorAll('.divCartas');
    //#const divCartasCOM = document.querySelector('#computadora-cartas');

    //Esta funcion crea un nuevo decko baraja
    const crearDeck = () => {
        deck= [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
            //deck.push( i + 'C');
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }
        return _.shuffle(deck);// establece orden aleatorio del arreglo;
    }

    
    const iniciarJuego =(numJugadores =2 )=>{
        deck = crearDeck();
        for( let i=0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

    }
    const pedirCarta = () => {
        deck = crearDeck();

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        
        return deck.pop();
    }


    const valorCarta = (carta) => {
        //let puntos = 0;
        // if( isNaN( valor) ){
        //     puntos = (valor === 'A') ? 11 : 10;

        //     console.log('No es un numero');
        // }else{
        //     console.log('Es un numero');
        //     puntos = valor * 1;//tranformarlo en entero
        // }

        // console.log(puntos);
        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1

    }

    //turno 0:1 jugador , ultimo cera COM
    const acumularPuntos = (carta, turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta ,turno)=>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append( imgCarta );
        //divCartasCOM.append(imgCarta);
    }
    const turnoComputadora = (puntosMinimos) => {

        let puntosCOM = 0;
        do {
            const carta = pedirCarta();

            puntosCOM = acumularPuntos(carta ,puntosJugadores.length -1);
            crearCarta( carta , puntosJugadores.length -1)
            //puntosCOM += valorCarta(carta);
            //puntosHTML[1].innerText = puntosCOM;

            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasCOM.append(imgCarta);

            if (puntosMinimos > 21) break;

        } while ((puntosCOM < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosCOM === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('COM Win!');
            } else if (puntosCOM > 21) {
                alert('Winner :3');
            } else {
                alert('COM gana');
            }
        }, 10)

    }

    const valor = valorCarta(pedirCarta());

    //EVENTOS 
    //Callback
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta ,0);
        
        crearCarta(carta,0);
        //puntosJugador += valorCarta(carta);
        //puntosHTML[0].innerText = puntosJugador;

        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Lo sentimos Game Over');
            btnPedir.disable = true;
            btnDetener.disable = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21, Genial');
            btnPedir.disable = true;
            btnDetener.disable = true;
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disable = true;
        btnDetener.disable = true;

        turnoComputadora(puntosJugador);
    })

    btnNuevo.addEventListener('click', () => {
        console.clear();
        iniciarJuego();

        // btnPedir.disable = true;
        // btnDetener.disable = true;

        

        // //puntosJugador = 0;
        // //puntosCOM = 0;

        // puntosHTML[0].innerText = puntosJugador;
        // puntosHTML[1].innerText = puntosJugador;

        // divCartasCOM.innerHTML = '';
        // divCartasJugador.innerHTML = '';

    })
})();

// (function(){

// })();

//TOD : Borrar 

