class Passerby extends Obstacle{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(3);
        this.setBounce(0.1);
        //Kollisionsbox-Groesse einstellen
        this.setSize(38,52);


        //Geschwindigkeit fuer Passerby
        this.movementSpeed = 2000;
        //Laufbreite fuer Passerby
        this.movementWidth = 100;

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
        this.play('right');

        //Bewegung starten
        this.leftAndRightMovement();


    }

    leftAndRightMovement() {
        //Callback-Funktion wird aufgerufen, wenn die aktuelle Bewegung (Tween) abgeschlossen ist
        const onCompleteCallback = () => {
            //Animation wechseln, wenn die Tween abgeschlossen ist
            this.changeAnimation();

            //Neue Tween für die entgegengesetzte Richtung starten
            this.scene.tweens.add({
                targets: this,
                x: this.x + (this.movementWidth * (this.flipDirection ? -1 : 1)),
                ease: 'Sine.easeInOut',
                duration: this.movementSpeed,
                onComplete: onCompleteCallback  //Aufruf, wenn Bewegung abgeschlossen ist
            });

            //Die Richtung umkehren
            this.flipDirection = !this.flipDirection;
        };

        //Starte die erste Tween mit der aktuellen X-Position
        this.scene.tweens.add({
            targets: this,
            x: this.x + (this.movementWidth * (this.flipDirection ? -1 : 1)),
            ease: 'Sine.easeInOut',
            duration: this.movementSpeed,
            onComplete: onCompleteCallback
        });

        //Initialisiere die Richtung (true für Rechtsbewegung, false fuer Linksbewegung)
        this.flipDirection = true;
    }

    changeAnimation() {
        //prueft, ob currentAnim definiert ist, bevor auf seine Schluesseleignschaft
        if (this.anims.currentAnim && this.anims.currentAnim.key) {
            if (this.anims.currentAnim.key === 'left') {
                this.play('right');
            } else if (this.anims.currentAnim.key === 'right') {
                this.play('left');
            }
        }
    }

}