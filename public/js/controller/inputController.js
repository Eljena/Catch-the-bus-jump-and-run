/**
 * Controller-Klasse fuer die Nutzereingaben
 */
//Variable zum Pruefen, ob Modalfenster geoeffnet ist
let modalActive= false;

//Methode, die modalActive auf true setzt
const updateModalStatus = (isActive) => {
    modalActive = isActive;
};

const handleButtons = (button, onClick) =>{
    button.setInteractive({useHandCursor: true});
    button.setScale(0.5);

    button.on('pointerdown', () => {
        onClick();
    });
    button.on('pointerover', () => {
        button.setTint(0xCCCCCC);
    });
    button.on('pointerout', () => {
        button.clearTint();
    });
}

