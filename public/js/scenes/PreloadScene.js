/**
 * Diese Klasse dient zum Darstellen eines
 * Ladebalkens, sobald das Spiel gestartet wird.
 * Der Ladebalken soll dem User einen Hinweis geben,
 * wie viel Prozent der Ressourcen bereits geladen wurden
 *
 * Code uebernommen aus: https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/*/

class PreloadScene extends Phaser.Scene{
    constructor() {
        super({key: 'PreloadScene'});
    }

    preload() {
        //Alle Ressourcen laden
        /*****Assets von StartScene*****/
        this.load.image('startBackground', 'assets/images/startBackground.png');
        this.load.image('startButton', 'assets/images/startBtn.png');
        this.load.image('infoButton', 'assets/images/infoBtn.png');
        this.load.image('controlButton', 'assets/images/controlBtn.png');
        this.load.image('soundButton', 'assets/images/soundBtn.png');
        this.load.image('musicButton', 'assets/images/musicBtn.png');
        this.load.image('noMusicButton', 'assets/images/noMusicBtn.png');
        this.load.image('noSoundButton', 'assets/images/noSoundBtn.png');
        this.load.image('controllerInfo', 'assets/images/controller.png');
        this.load.image('tutorialText', 'assets/images/tutorialText.png');

        //Musik
        this.load.audio('introMusic',
            [
                'assets/audio/introMusic.mp3',
                'assets/audio/introMusic.ogg'
                ]
        );

        //Sound
        this.load.audio('buttonClick', 'assets/audio/buttonClick.mp3');


        //Modalfenster Titel laden
        this.load.image('tutorialTitle', 'assets/images/tutorialTitle.png');
        this.load.image('controlsTitle','assets/images/controlsTitle.png');

        /******Assets von LevelScene***/
        this.load.image('chooseLvl', 'assets/images/chooseLvlTitle.png');
        this.load.image('firstLvl', 'assets/images/lvl1Btn.png');
        this.load.image('secondLvl', 'assets/images/lvl2Btn.png');
        this.load.image('thirdLvl', 'assets/images/lvl3Btn.png');

        /******Assets von GameScene***/
        /**Hintergrund*/
        this.load.image('gameBackground', "assets/images/gameBackground.png");
        this.load.image('clouds', 'assets/images/clouds.png');
        this.load.image('tree', 'assets/images/tree.png');
        this.load.image('bushes', 'assets/images/bushes.png');
        this.load.image('ground', 'assets/images/ground.png');

        this.load.image('house', 'assets/images/house.png');
        this.load.image('school', 'assets/images/school.png');

        //Player-Bilder laden
        this.load.spritesheet('player1', 'assets/images/player1.png', {frameWidth: 45, frameHeight: 55});
        this.load.spritesheet('player2', 'assets/images/player2.png', {frameWidth: 42, frameHeight: 55});

        //Passant-Bild laden (Hindernis)
        this.load.spritesheet('passerby', 'assets/images/passerby.png', {frameWidth: 47, frameHeight: 50});

        //Tauben-Bild laden (Hindernis)
        this.load.spritesheet('pigeon', 'assets/images/pigeon.png', {frameWidth: 250, frameHeight: 205});

        //Verkehrshuettchen-Bild laden
        this.load.image('trafficCone', 'assets/images/trafficCone.png');

        //Muellhaufen-Bild laden
        this.load.image('garbageHeap', 'assets/images/garbageHeap.png');


        //Plattform (Busstation) laden
        this.load.image('busstop', 'assets/images/busstop.png');

        //Busschild laden
        this.load.image('busSign', 'assets/images/busSign.png');

        //Bus laden
        this.load.spritesheet('bus', 'assets/images/bus.png', {frameWidth: 1390, frameHeight: 550});

        //Obstacles laden

        //Booster laden (Sneaker)
        this.load.image('sneaker','assets/images/sneaker.png');

        //Level laden
        this.load.json('levelConfig', 'assets/levelConfig.json');

        //Buttons laden
        this.load.image('pauseButton', 'assets/images/pauseBtn.png');
        this.load.image('homeButton', 'assets/images/homeBtn.png');
        this.load.image('restartButton', 'assets/images/restartBtn.png');
        this.load.image('continueButton', 'assets/images/continueBtn.png');
        this.load.image('selectLvlButton', 'assets/images/selectLvlBtn.png');

        //Modalfenster Titel laden
        this.load.image('pauseTitle', 'assets/images/pausiertTitle.png');
        this.load.image('winTitle', 'assets/images/winTitle.png');
        this.load.image('looseTitle', 'assets/images/looseTitle.png');


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