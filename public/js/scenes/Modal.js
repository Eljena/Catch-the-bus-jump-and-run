class Modal extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        // Hintergrund für das Modal
        this.modalBackground = scene.add.graphics();
        this.modalBackground.fillStyle(0x000000, 0.7);
        this.modalBackground.fillRect(0, 0, scene.sys.game.config.width, scene.sys.game.config.height);
        this.modalBackground.setInteractive();

        // Container unsichtbar machen, bis es angezeigt werden soll
        this.setVisible(false);

        //Modal-Fenster
        const modalWidth = 600; //Breite des Modal-Fensters
        const modalX = 200; //X-Position des Modal-Fensters
        this.modalWindow = scene.add.graphics();
        this.modalWindow.fillStyle(0xFD3636, 1);
        this.modalWindow.fillRect(modalX, 100, modalWidth, 400);
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
            this.onModalClose();    //Aufruf der Callback-Funktion, wenn das Modal geschlossen wird
        });

        this.closeButton.on('pointerover', () => {
            this.closeButton.setTint(0x555555);
        });

        this.closeButton.on('pointerout', () => {
            this.closeButton.clearTint();
        });

        //Methode fuer Szenenwechsel definieren
        this.sceneChangeHandler();
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
        //this.modalBackground.setVisible(true);
        //this.modalWindow.setVisible(true);
        this.setVisible(true);
    }

    hideModal(){
        console.log("hideModal");
        this.setVisible(false);
        this.modalBackground.destroy();     //entfernt den Hintergrund von Modal

        //Status des Modals wieder auf false setzen
        updateModalStatus(false);
    }

    //Callback-Funktion
    setOnModalClose(callback){
        this.onModalClose = callback;
    }
    
}