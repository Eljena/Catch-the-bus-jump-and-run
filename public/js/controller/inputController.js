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
        //TODO
    }
}

const handlePlayerMovement = (player, cursors, keyboard,
                              moveSpeed, skySpeed, treeSpeed, jumpSpeed) => {
    if(cursors.left.isDown || keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown){
        player.setVelocityX(-moveSpeed);    //Links
        // weitere Bewegungen fuer Hintergrundelemente hier -> bg, sky, tree
    } else if(cursors.right.isDown || keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown){
        player.setVelocityX(moveSpeed); //Rechts
        // weitere Bewegungen fuer Hintergrundelemente hier -> bg, sky, tree
    } else if((cursors.up.isDown || keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) && player.body.onFloor()){
        player.setVelocityY(-jumpSpeed);  // Springen
    } else {
        player.setVelocityX(0);
    }
}