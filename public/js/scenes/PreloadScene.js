/**
 * Diese Klasse dient zum Darstellen eines
 * Ladebalkens, sobald das Spiel gestartet wird.
 * Der Ladebalken soll das Laden der Ressourcen symbolisieren*/

class PreloadScene extends Phaser.Scene{
    constructor() {
        super({key: 'PreloadScene'});
    }

    preload() {
        //Alle Ressourcen laden
        /*****Assets von StartScene*****/
        //TODO Font hinzufügen
        // this.load.bitmapFont('RetroGaming', 'fonts/');
        this.load.image('background', 'images/background.png'); //Hintergrundbild laden
        this.load.image('startButton', 'images/startBtn.png');  //StartButton laden
        this.load.image('infoButton', 'images/infoBtn.png');
        this.load.image('controlButton', 'images/controlBtn.png');
        this.load.image('soundButton', 'images/soundBtn.png');
        this.load.image('musicButton', 'images/musicBtn.png');
        this.load.image('noMusicButton', 'images/noMusicBtn.png');
        this.load.image('noSoundButton', 'images/noSoundBtn.png');
        this.load.image('controllerInfo', 'images/controller.png');

        /******Assets von LevelScene***/
        this.load.image('firstLvl', 'images/lvl1Btn.png');
        this.load.image('secondLvl', 'images/lvl2Btn.png');
        this.load.image('thirdLvl', 'images/lvl3Btn.png');

        /******Assets von GameScene***/
        /**Hintergrund*/
        this.load.image('sky', 'images/sky.png');
        this.load.image('tree', 'images/tree.png');
        this.load.image('bush', 'images/bush.png');
        this.load.image('ground', 'images/ground.png');

        this.load.image('house', 'images/house.png');


        //Player-Bilder laden
        this.load.spritesheet('player1', 'images/player1.png', {frameWidth: 45, frameHeight: 55});
        this.load.spritesheet('player2', 'images/player2.png', {frameWidth: 42, frameHeight: 55});

        //Plattform (Busstation) laden
        this.load.image('busstop', 'images/busstop.png');

        //Busschild laden
        this.load.image('busSign', 'images/busSign.png');

        //Bus laden
        this.load.spritesheet('bus', 'images/bus.png', {frameWidth: 1390, frameHeight: 550});

        //Obstacles laden

        //Booster laden (Sneaker)
        this.load.image('sneaker','images/sneaker.png');

        //Buttons laden
        this.load.image('pauseButton', 'images/pauseBtn.png');
        this.load.image('homeButton', 'images/homeBtn.png');
        this.load.image('restartButton', 'images/restartBtn.png');
        this.load.image('continueButton', 'images/continueBtn.png');



        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();

        // Hier wird die Farbe als Hexadezimalwert definiert (Weiß)
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(330, 270, 320, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        //Hier wird ein "Lädt..." Text erstellt
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 60,
            text: 'Lädt...',
            style: {
                font: '24px Verdana',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        //Hier wird ein Prozent-Text erstellt
        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px Verdana',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            percentText.setText(parseInt(value * 100)+ "%");
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(350, 280, 280 * value, 30);
        });

        this.load.on('fileprogress', function(file) {
            //console.log(file.src);
        });

        this.load.on('complete', function() {
            //console.log("complete");

            // Nach einer Verzögerung von 1000ms zur Anzeige des Ladebalkens, bevor die Szene gewechselt wird
            this.time.delayedCall(1000, function() {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();

                // Nachdem alle Ressourcen geladen wurden, StartScene starten
                this.scene.start('StartScene');
            }, [], this);
        }, this);
    }
    create() {
        // Hintergrundfarbe wird auf schwarz gestellt
        this.cameras.main.setBackgroundColor(0, 0, 0);
    }


}