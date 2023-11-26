class Modal extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        // Hintergrund für das Modal
        this.modalBackground = scene.add.graphics();
        this.modalBackground.fillStyle(0x000000, 0.7);
        this.modalBackground.fillRect(-10, -10, scene.sys.game.config.width, scene.sys.game.config.height);
        this.modalBackground.setInteractive();

        // Container unsichtbar machen, bis es angezeigt werden soll
        this.setVisible(false);

        // Hintergrundklick zum Schließen des Modals
        this.modalBackground.on('pointerdown', () => {
            this.setVisible(false);
        });

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
    }

    showModal(){
        this.setVisible(true);
    }

    hideModal(){
        this.setVisible(false);
    }

    
}