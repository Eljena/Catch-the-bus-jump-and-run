/**
 * Bei dieser Klasse handelt es sich um die Oberklasse der sich bewegenden Hindernisse.
 *
 * Vererbt weiter an Passerby und Pigeon.
 */
class Obstacle extends Phaser.Physics. Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);


        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);


    }
}