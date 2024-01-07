/**
 * Bei dieser Klasse handelt es sich um die Oberklasse
 * der Modalfenster.
 *
 * Vererbt aktuell weiter an InfoModal, ControlModal, PauseModal
 */
class Modal extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        //Default-Sichtbarkeit von Modal auf false setzen
        this.setVisible(false);


        //Hintergrund des Modalfensters zeichnen
        this.modalBackground = this.scene.add.graphics();
        this.modalBackground.fillStyle(0x000000, 0.7);
        this.modalBackground.fillRect(-10, -10, this.scene.sys.game.config.width, this.scene.sys.game.config.height);
        this.modalBackground.setInteractive();

        //Modal-Fenster
        this.modalWidth = 600; //Breite des Modal-Fensters
        this.modalX = 200; //X-Position des Modal-Fensters
        this.modalWindow = scene.add.graphics();
        this.modalWindow.fillStyle(0xFD3636, 1);    //Farbe, Transparenz
        this.modalWindow.fillRect(this.modalX, 100, this.modalWidth, 400);

        //Schliessen-Button erstellen und hinzufuegen
        this.closeButton = scene.add.text(750, 120, 'X', {fontSize: '24px', fill: '#ffffff'});
        this.closeButton.setInteractive({useHandCursor: true});

        //Schliessen EventHandler
        this.closeButton.on('pointerdown', () => {
            this.hideModal();
            //Aufruf der Callback-Funktion, wenn das Modal geschlossen wird
            this.onModalClose();
        });

        /**
         * Dieser Eventhandler sorgt dafuer, dass der CloseButton dunkelgrau gefaerbt
         * wird, sobald die Maus ueber diesen faehrt
         */
        this.closeButton.on('pointerover', () => {
            this.closeButton.setTint(0x555555);
        });

        /**
         * Dieser Eventhandler soergt dafuer, dass die dunkelgraue Farbe
         * beim Verlassen des Bereichs vom CloseButton mit der Maus
         * wieder entfernt wird
         */
        this.closeButton.on('pointerout', () => {
            this.closeButton.clearTint();
        });

        //Elemente zum Modal hinzufuegen
        this.add(this.modalBackground);
        this.add(this.modalWindow);

    }

    /**
     * Aendert den Modalstatus und startet die angegebene Szene
     * @param sceneKey  Name der Szene
     */
    sceneChangeHandler(sceneKey){
        const button = this.getButtonForScene(sceneKey);
        if(button){
            button.setInteractive({useHandCursor: true});
            button.on('pointerdown', () => {
                modalActive = false;
                this.scene.scene.start(sceneKey);
            });
        }
    }

    /**
     * Diese Methode wird in den Unterklassen ueberschrieben
     */
    getButtonForScene(sceneKey){
        //Hier wird der entsprechende Button fuer die Szene zurueckgegeben
    }

    /**
     * Diese Methode soergt dafuer, dass die
     * Sichtabrkeit des Modals und der Status auf true gesetzt wird
     */
    showModal(){
        this.setVisible(true);
        modalActive = true;
    }

    /**
     * Diese Methode soergt dafuer, dass die
     * Sichtabrkeit des Modals und der Status auf false gesetzt wird
     */
    hideModal(){
        this.setVisible(false);
        modalActive = false;
    }

    //Callback-Funktion
    setOnModalClose(callback){
        this.onModalClose = callback;
    }
    
}