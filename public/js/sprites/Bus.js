/**
 * Model-Klasse fuer das Bus-Objekt
 */
class Bus extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);
        this.setCollideWorldBounds(true);

        //Animation fuer Bus erstellen
        this.anims.create({
            key: 'busDriveAway',
            frames: this.anims.generateFrameNumbers('bus', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        setTimeout(() => {
            //Bewegung des Busses nach einer Verzoegerung von 2 Sekunden
            this.setVelocityX(300);
            this.play('busDriveAway');
        }, 500); //Delay
    }

}