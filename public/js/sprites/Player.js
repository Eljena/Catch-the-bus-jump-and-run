class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(5);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
    }
}