/**
 * Bei dieser Klasse handelt es sich um eine Unterklasse von Modal.
 * Stellt das Modal, wenn der Spieler verloren hat, dar.
 */
class LooseModal extends Modal{
    constructor(scene, x, y){
        super(scene, x, y);

        //Ueberschrift und Buttons hinzufuegen
        this.headline = scene.add.image(505, 200, 'looseTitle');
        this.homeButton = scene.add.image(450, 400, 'homeButton');
        this.restartButton = scene.add.image(550, 400, 'restartButton');

        //Buttons skalieren
        this.homeButton.setScale(this.scaleFactorBtn);
        this.restartButton.setScale(this.scaleFactorBtn);

        //Stellt sicher, dass die Position der Buttons unabhaengig von der Kamerabewegung bleibt
        this.homeButton.setScrollFactor(0);
        this.restartButton.setScrollFactor(0);

        //Elemente zu LooseModal hinzufuegen
        this.add(this.headline);
        this.add(this.homeButton);
        this.add(this.restartButton);

        //Szenenwechselhandler
        this.sceneChangeHandler('StartScene');
        this.sceneChangeHandler('GameScene');

    }
    getButtonForScene(sceneKey){
        if(sceneKey === 'StartScene'){
            return this.homeButton;
        } else if(sceneKey === 'GameScene'){
            //GameScene wird neu gestartet
            return this.restartButton;
        }
    }
}