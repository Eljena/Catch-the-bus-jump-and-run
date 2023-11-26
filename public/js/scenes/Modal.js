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
    }

    showModal(){
        this.setVisible(true);
    }

    hideModal(){
        this.setVisible(false);
    }

    
}