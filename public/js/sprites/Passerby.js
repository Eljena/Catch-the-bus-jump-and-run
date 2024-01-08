class Passerby extends Obstacle{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(3);
        this.setBounce(0.1);

        // Multiplikator fuer die Geschwindigkeit
        this.speedMultiplier = 1.0;

        // Animation fuer Passanten hinzufuegen
        const passerbyFrames = "passerby"


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(passerbyFrames, {start: 1, end: 3}),
            frameRate: 10,
            repeat: -1  //unendlich

        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(passerbyFrames, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //Starte die 'left' Animation fuer Passanten
        this.play('left');

        //Bewegung starten
        this.toggleMovement();


    }

    toggleMovement() {
        this.rightToLeftMovement();
        setTimeout(() => {
            this.changeAnimation();
            this.leftToRightMovement();
            setTimeout(() => {
                this.changeAnimation();
                this.rightToLeftMovement();
                this.toggleMovement();
            }, 2000); //2 Sekunden nach rechts
        }, 2000); //2 Sekunden nach links
    }

    leftToRightMovement() {
        const initialX = this.x;
        this.scene.tweens.add({
            targets: this,
            x: initialX + 100, //Horizontale Bewegung nach rechts
            ease: 'Linear',
            duration: 2000, //Dauer für die Bewegung
        });
    }

    rightToLeftMovement() {
        const initialX = this.x;
        this.scene.tweens.add({
            targets: this,
            x: initialX - 100, //Horizontale Bewegung nach links
            ease: 'Linear',
            duration: 2000, //Dauer für die Bewegung
        });
    }

    changeAnimation() {
        if (this.anims.currentAnim.key === 'left') {
            this.play('right');
        } else if (this.anims.currentAnim.key === 'right') {
            this.play('left');
        }
    }
}