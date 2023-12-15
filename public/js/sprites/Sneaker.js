class Sneaker extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.2);
        this.setCollideWorldBounds(true);
    }

    applyEffect(player) {
        //Hier soll der kurzzeitige boost fuer den Player implementiert werden
        player.increaseSpeed(2);
        console.log("Boost eingesammelt");

    }
}