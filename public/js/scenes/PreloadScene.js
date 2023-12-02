/**
 * Diese Klasse dient zum Darstellen eines
 * Ladebalkens, sobald das Spiel gestartet wird.
 * Der Ladebalken soll das Laden der Ressourcen symbolisieren*/

class PreloadScene extends Phaser.Scene{
    constructor() {
        super({key: 'PreloadScene'});
    }

    preload(){

        // Ladebalken hinzufügen
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', () => {
            // Entferne den Ladebalken und starte die nächste Szene
            progressBar.destroy();
            progressBox.destroy();
            //this.scene.start('StartScene');
        });

    }

    create(){

    }

    update(){

    }
}