/**
 * Bei dieser Klasse handelt es sich um eine Unterklasse von
 * Modal.
 *
 */
class PauseModal extends Modal{
    constructor(scene, x, y) {
        super(scene, x, y);

        //Ueberschrift und Buttons hinzufuegen
        this.headline = scene.add.image(505, 200, 'pauseTitle')
        this.homeButton = scene.add.image(350, 400, 'homeButton');
        this.restartButton = scene.add.image(500, 400, 'restartButton');
        this.continueButton = scene.add.image(650, 400, 'continueButton');

        //Buttons skalieren
        const scaleFactor = 0.75;
        this.homeButton.setScale(scaleFactor);
        this.restartButton.setScale(scaleFactor);
        this.continueButton.setScale(scaleFactor);

        this.continueButton.setInteractive({useHandCursor: true});
        //EventHandler fuer continueButton
        this.continueButton.on('pointerdown', () => {
            // Modal ausblenden
            this.hideModal();
            //Aufruf der Callback-Funktion, wenn das Modal geschlossen wird
            this.onModalClose();
        });

        //Elemente zu PauseModal hinzufuegen
        this.add(this.closeButton);
        this.add(this.headline);
        this.add(this.homeButton);
        this.add(this.restartButton);
        this.add(this.continueButton);

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