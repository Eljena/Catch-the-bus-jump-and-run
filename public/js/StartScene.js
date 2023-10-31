class StartScene extends Phaser.Scene{
    constructor() {
        super({key: 'StartScene'});
    }

    //Hier werden die Ressourcen fuer die Startszene geladen
    preload(){
        this.load.image('background', 'images/background.png'); //Hintergrundbild laden
    }

    //Hier wird die Logik fuer die Startszene initiliasiert
    create(){
        //Hintergrundbild hinzufuegen
        const background = this.add.image(0,0, 'background').setOrigin(0,0);

        // Anpassen der Größe, um auf das Fenster zu passen
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        background.setDisplaySize(width, height);

    }
}

