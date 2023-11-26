/**
 * Controller-Klasse fuer die Spielereingaben
 */

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

const handleCamera = (cam, cursors, keyboard) => {
    const moveCam = true;

    if(moveCam){
        /**TODO Kamerabewegung -> Spieler soll immer in Mitte des Spielfeldes zu sehen sein*/
    }
}


/**Tastatureingabe handeln*/
const handlePlayerMovement = (player, cursors, keyboard) => {

    const keys = {
        left: cursors.left,
        right: cursors.right,
        up: cursors.up
    };

    const wasd = {
        leftA: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        rightD: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        upW: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    };

    const { left, right, up } = keys;
    const { leftA, rightD, upW } = wasd;

    if (left.isDown || leftA.isDown) {
        player.setVelocityX(-160);
    } else if (right.isDown || rightD.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if ((up.isDown || upW.isDown) && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}