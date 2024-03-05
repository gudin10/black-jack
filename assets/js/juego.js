/**
 * 2C = Tow of Clubes
 * 2D = Tow of Diamons
 * 2H = Tow of Hearts
 * 2S = Tow of Spades
 */


let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosCOM = 0;
//Referencias de HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnnuevo');

const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasCOM = document.querySelector('#computadora-cartas');
//Esta funcion crea un nuevo decko baraja
const crearDeck = ()=>{
    for( let i =2; i<=10 ;i++){
        for( let tipo of tipos){
            deck.push( i + tipo);
        }
        //deck.push( i + 'C');
    }

    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push( especial + tipo);
        }
    }
    //console.log( deck );

    deck = _.shuffle( deck);// establece orden aleatorio del arreglo
    console.log( deck );

    return deck;
}

crearDeck();

const pedirCarta = ()=>{

    if( deck.length ===0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop(); 

    return carta;
}

//pedirCarta();

const valorCarta = (carta)=>{
    //let puntos = 0;
    // if( isNaN( valor) ){
    //     puntos = (valor === 'A') ? 11 : 10;

    //     console.log('No es un numero');
    // }else{
    //     console.log('Es un numero');
    //     puntos = valor * 1;//tranformarlo en entero
    // }

    // console.log(puntos);
    const valor = carta.substring(0,carta.length -1);

    return (isNaN(valor)) ?
            (valor==='A') ? 11 :10
            : valor *1

}

const turnoComputadora = (puntosMinimos)=>{
    
    do {
        const carta = pedirCarta();
    
        puntosCOM += valorCarta(carta);
        puntosHTML[1].innerText= puntosCOM;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasCOM.append( imgCarta );
        
        if (puntosMinimos > 21) break;

    }while( (puntosCOM < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(()=>{
        if ( puntosCOM === puntosMinimos){
            alert('Nadie gana :(');
        }else if( puntosMinimos > 21){
            alert('COM Win!');
        }else if( puntosCOM > 21){
            alert('Winner :3');
        }else{
            alert('COM gana');
        }
    },10)
    
}

const valor = valorCarta(pedirCarta());


//EVENTOS 
//Callback
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();
    
    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText= puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if(puntosJugador > 21){
        console.warn('Lo sentimos Game Over');
        btnPedir.disable =true;
        btnDetener.disable = true;    
        turnoComputadora(puntosJugador);

    }else if( puntosJugador ===21){
        console.warn('21, Genial');
        btnPedir.disable = true;
        btnDetener.disable = true;    
    }

});

btnDetener.addEventListener('click', ()=>{
    btnPedir.disable =true;
    btnDetener.disable = true;    

    turnoComputadora( puntosJugador);
})

btnNuevo.addEventListener('click', ()=>{
    console.clear();
    
    btnPedir.enable =true;
    btnDetener.enable = true;    

    deck = [];
    crearDeck();
    puntosJugador = 0;
    puntosCOM = 0;
    puntosHTML[0].innerText= puntosJugador;

    puntosHTML[1].innerText= puntosJugador;

    divCartasCOM.innerHTML = '';
    divCartasJugador.innerHTML = '';
    
})
//TOD : Borrar 

