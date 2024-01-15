class Pigeon extends Obstacle {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);
        this.setBounce(0.1);
        this.setSize(240, 150);

        //Multiplikator fuer die Geschwindigkeit der Taube
        this.speedMultiplier = 1.0;

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
        //Hoehe der Bewegung
        const movementHeight = 70;
        //Geschwindigkeit der Bewegung
        const movementSpeed = 2500;


        const pigeonTween = this.scene.tweens.add({
            targets: this,
            y: this.y + movementHeight, //Vertikalbewegung
            ease: 'Sine.easeInOut',
            duration: movementSpeed,
            yoyo: true,
            repeat: -1 //infinity-loop
        });

    }
}