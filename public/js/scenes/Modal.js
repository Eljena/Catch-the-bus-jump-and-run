class Modal extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        //Hintergrund des Modalfensters zeichnen
        this.modalBackground = this.scene.add.graphics();
        this.modalBackground.fillStyle(0x000000, 0.7);
        this.modalBackground.fillRect(0, 0, this.scene.sys.game.config.width, this.scene.sys.game.config.height);
        this.modalBackground.setInteractive();
        //ModalBackground dem PauseModal-Objekt hinzufuegen
        this.add(this.modalBackground);

        // Container unsichtbar machen, bis es angezeigt werden soll
        this.setVisible(false);

        //Modal-Fenster
        const modalWidth = 600; //Breite des Modal-Fensters
        const modalX = 200; //X-Position des Modal-Fensters
        this.modalWindow = scene.add.graphics();
        this.modalWindow.fillStyle(0xFD3636, 1);
        this.modalWindow.fillRect(modalX, 100, modalWidth, 400);
        //ModalWindow dem PauseModal-Objekt hinzufuegen
        this.add(this.modalWindow);

        // Headline Positionen
        this.headlineX = modalX + 50;  //Links zentriert
        this.headlineY = 120;

        //Headline Text-Style
        this.textStyle = {fontSize: '36px', fill: '#ffffff'};

        //Schliessen Schaltflaeche
        this.closeButton = scene.add.text(750, 120, 'X', {fontSize: '24px', fill: '#ffffff'});
        this.closeButton.setInteractive({useHandCursor: true});
        this.add(this.closeButton);

        // Schliessen EventHandler
        this.closeButton.on('pointerdown', () => {
            this.hideModal();
            //Aufruf der Callback-Funktion, wenn das Modal geschlossen wird
            this.onModalClose();
        });

        this.closeButton.on('pointerover', () => {
            this.closeButton.setTint(0x555555);
        });

        this.closeButton.on('pointerout', () => {
            this.closeButton.clearTint();
        });
    }



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
    //Diese Methode wird in den Unterklassen ueberschrieben
    getButtonForScene(sceneKey){
        //Hier wird der entsprechende Button fuer die Szene zurueckgegeben
    }

    showModal(){
        //Pause-Modal anzeigen
        this.setVisible(true);
        updateModalStatus(true);
    }

    hideModal(){
        //Pause-Modal verstecken
        this.setVisible(false);
        //Status des Modals wieder auf false setzen
        updateModalStatus(false);
    }

    //Callback-Funktion
    setOnModalClose(callback){
        this.onModalClose = callback;
    }
    
}