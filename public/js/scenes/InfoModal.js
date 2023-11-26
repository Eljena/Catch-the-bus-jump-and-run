class InfoModal extends Modal{
    constructor(scene, x, y){
       super(scene, x,y);

        //Info-Modal-Fenster
        this.modalWindow = scene.add.graphics();
        this.modalWindow.fillStyle(0xFD3636, 1);
        this.modalWindow.fillRect(200, 100, 600, 400);

        // Schließen-Schaltfläche
        this.closeButton = scene.add.text(750, 120, 'X', { fontSize: '24px', fill: '#ffffff' });
        this.closeButton.setInteractive();

        // Elemente zum Container hinzufügen
        this.add(this.modalBackground);
        this.add(this.modalWindow);
        this.add(this.closeButton);

        // Schließen-Schaltfläche Event-Handler
        this.closeButton.on('pointerdown', () => {
            this.hideModal();
        });

    }
}