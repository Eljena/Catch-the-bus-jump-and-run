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

        // Headline Positionen
        this.headlineX = 250;
        this.headlineY = 120;


        //Modal-Fenster
        this.modalWindow = scene.add.graphics();
        this.modalWindow.fillStyle(0xFD3636, 1);
        this.modalWindow.fillRect(200, 100, 600, 400);
        this.add(this.modalWindow);

        //Schliessen Schaltflaeche
        this.closeButton = scene.add.text(750, 120, 'X', {fontSize: '24px', fill: '#ffffff'});
        this.closeButton.setInteractive({useHandCursor: true});
        this.add(this.closeButton);


        // Schliessen EventHandler
        this.closeButton.on('pointerdown', () => {
            this.hideModal();
        });

        this.closeButton.on('pointerover', () => {
            this.closeButton.setTint(0x555555);
        });

        this.closeButton.on('pointerout', () => {
            this.closeButton.clearTint();
        });
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

    
}