/**
 * Die Booster-Klasse repraesentiert ein Spielobjekt, das dem Spieler einen kurzzeitigen Boost verleiht.
 * Der Booster wird auf dem Spielfeld platziert, um vom Spieler gesammelt zu werden
 */
class Booster extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.2);
        this.setCollideWorldBounds(true);
    }

    /**
     * Wendet den Booster-Effekt auf den Spieler an, indem dessen Geschwindigkeit kurzzeitig erhoeht wird
     * @param player    Der Spieler, der den Booster eingesammelt hat
     */
    applyEffect(player) {
        //Erhoeht die Geschwindigkeit des Spielers um den Faktor 2.
        player.increaseSpeed(2);
    }
}