class Pigeon extends Obstacle {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.setScale(0.5);
        this.setBounce(0.1);
        this.setSize(230, 150);

        //Geschwindigkeit fuer Pigeon
        this.movementSpeed = 2500;
        //Flughoehe fuer Pigeon
        this.movementHeight = 70

        //Animation fuer Taube hinzufuegen
        const pigeonFrames = scene.anims.generateFrameNumbers(texture, { start: 1, end: 5 });

        this.anims.create({
            key: 'up',
            frames: pigeonFrames,
            frameRate: 10,
            repeat: -1
        });

        //Deaktiviert die Schwerkraft fuer die Taube
        this.body.setAllowGravity(false);

        // Starte die 'up'-Animation für die Taube
        this.play('up');

        // Auf-und-Ab-Bewegung der Taube
        this.upAndDownMovement();

    }

    upAndDownMovement() {
        this.scene.tweens.add({
            targets: this,
            y: this.y + this.movementHeight, //Vertikalbewegung
            ease: 'Sine.easeInOut',
            duration: this.movementSpeed,
            yoyo: true,
            repeat: -1 //infinity-loop
        });

    }
}