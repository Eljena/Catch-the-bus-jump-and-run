/**
 * Bei dieser Klasse handelt es sich um eine Unterklasse von
 * Modal.
 * Stellt das Modal, wenn der Spieler gewonnen hat, dar.
 */
class WinModal extends Modal{
    constructor(scene, x, y){
        super(scene, x, y);

        //Ueberschrift, Confetti und Buttons hinzufuegen
        this.headline = scene.add.image(505, 200, 'winTitle');
        this.homeButton = scene.add.image(450, 400, 'homeButton');
        this.selectLvlButton = scene.add.image(550, 400, 'selectLvlButton');
        this.confetti = scene.add.image(0, 0, 'confetti').setOrigin(0, 0).setDisplaySize(this.scene.sys.game.config.width, this.scene.sys.game.config.height);

        //Buttons skalieren
        this.homeButton.setScale(this.scaleFactorBtn);
        this.selectLvlButton.setScale(0.7);

        //Stellt sicher, dass die Position der Buttons unabhaengig von der Kamerabewegung bleibt
        this.homeButton.setScrollFactor(0);
        this.selectLvlButton.setScrollFactor(0);

        //Elemente zu WinModal hinzufuegen
        this.add(this.confetti);
        this.add(this.headline);
        this.add(this.homeButton);
        this.add(this.selectLvlButton);

        //Szenenwechselhandler
        this.sceneChangeHandler('StartScene');
        this.sceneChangeHandler('LevelScene');



    }
    getButtonForScene(sceneKey){
        if(sceneKey === 'StartScene'){
            return this.homeButton;
        }else if(sceneKey === 'LevelScene'){
            return this.selectLvlButton;
        }
    }
}