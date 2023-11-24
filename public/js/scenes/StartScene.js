//import {switchScene} from "../controller/sceneController";

class StartScene extends Phaser.Scene{
    constructor() {
        super({key: 'StartScene'});
    }

    //Hier werden die Ressourcen fuer die Startszene geladen
    preload(){
        this.load.image('background', 'images/background.png'); //Hintergrundbild laden
        this.load.image('startButton', 'images/startBtn.png');  //StartButton laden
        this.load.image('infoButton', 'images/infoBtn.png');
        this.load.image('controlButton', 'images/controlBtn.png');
        this.load.image('soundButton', 'images/soundBtn.png');
        this.load.image('musicButton', 'images/musicBtn.png');
    }

    //Hier wird die Logik fuer die Startszene initiliasiert
    create(){
        //Hintergrundbild hinzufuegen
        const background = this.add.image(0,0, 'background').setOrigin(0,0);

        // Anpassen der Bildgroesse, um auf das Game-Fenster zu passen
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        background.setDisplaySize(width, height);

        /*****Menue Buttons ***/
        //Start Button
        const startButton = this.add.image(500, 300, 'startButton').setInteractive({useHandCursor: true});
        handleButtons(startButton, () => {
            switchScene('GameScene');
            console.log('Start-button wurde geklickt');
        });

        //Info Button
        const infoButton = this.add.image(100,50, 'infoButton');
        handleButtons(infoButton, () => {
            console.log('Info-button wurde geklickt');
        });

        //Control Button
        const controlButton = this.add.image(200,50, 'controlButton');
        handleButtons(controlButton, () =>{
            console.log('Control-button wurde geklickt');
        });

        //Sound Button
        const soundButton = this.add.image(800,50, 'soundButton');
        handleButtons(soundButton, () =>{
            console.log('Sound Button wurde geklickt');
        });

        //Music Button
        const musicButton = this.add.image(900,50, 'musicButton');
        handleButtons(musicButton, () =>{
            console.log('Musik Button wurde geklickt')
        });





    }
}

