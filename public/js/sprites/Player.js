class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(3);
        this.setBounce(0.1);
        this.setCollideWorldBounds(true);
        //Multiplikator fuer die Geschwindigkeit des Spielers
        this.speedMultiplier = 1.0;

        //Animation fuer Spieler hinzufuegen
        const player = "player1";

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(player, {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1  //unendlich

        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: player, frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(player, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'slide',
            frames: this.anims.generateFrameNumbers(player, {start: 9, end: 9}),
            frameRate: 10,
            repeat: -1
        });
    }

    increaseSpeed(multiplier){
        this.speedMultiplier *=multiplier;
        this.isBoosted = true;

        //Timer fuer den Boost starten
        this.scene.time.delayedCall(5000, () =>{
            this.isBoosted = false;
            this.speedMultiplier = 1.0;
        });
    }

    movePlayer(cursors, keyboard, moveSpeed, jumpSpeed, slideSpeed){
        //finalMoveSpeed initialisieren
        let finalMoveSpeed = moveSpeed;
        //Pruefen, ob Spieler geboostet wird
        if(this.isBoosted){
            finalMoveSpeed = moveSpeed * this.speedMultiplier;
            console.log(finalMoveSpeed);
        }

        const keys = {
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down
        };

        const wasd = {
            leftA: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            rightD: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            upW: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            downS: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        };

        const { left, right, up, down } = keys;
        const { leftA, rightD, upW, downS } = wasd;

        //if-Abfrage fuer Links-, Rechts-Bewegung
        if (left.isDown || leftA.isDown) {
            this.setVelocityX(-finalMoveSpeed);
            this.anims.play('left', true);
        } else if (right.isDown || rightD.isDown) {
            this.setVelocityX(finalMoveSpeed);
            this.anims.play('right', true);
        } else {
            this.setVelocityX(0);
            this.anims.play('turn');
        }

        //if-Abfrage fuer Jump-Bewegung
        if ((up.isDown || upW.isDown) && this.body.onFloor()) {
            this.setVelocityY(-jumpSpeed);
        }

        //if-Abfrage fuer Slide-Bewegung
        if((down.isDown || downS.isDown) && this.body.touching.down){
            this.setVelocityY(finalMoveSpeed);
            this.setVelocityX(moveSpeed);
        }
    }
}