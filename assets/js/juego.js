/**
 * 2C = Tow of Clubes
 * 2D = Tow of Diamons
 * 2H = Tow of Hearts
 * 2S = Tow of Spades
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

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
    console.log( deck );

    deck = _.shuffle( deck);
    console.log( deck );
}

crearDeck();