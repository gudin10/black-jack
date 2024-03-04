/**
 * 2C = Tow of Clubes
 * 2D = Tow of Diamons
 * 2H = Tow of Hearts
 * 2S = Tow of Spades
 */


let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

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

    deck = _.shuffle( deck);
    console.log( deck );

    return deck;
}

crearDeck();

const pedirCarta = ()=>{

    if( deck.length ===0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop(); 

    console.log( carta );
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

const valor = valorCarta(pedirCarta());
console.log(valor);