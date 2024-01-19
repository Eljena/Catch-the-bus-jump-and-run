//Globale Variable, um den Spielfortschritt zu verfolgen
let playerProgress = 1;
/**
 * Diese Klasse dient zum Darstellen der Levelauswahlszene.
 */
class LevelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelScene' });
    }

    preload(){
        //in Preload Scene ausgelagert
    }

    create(){
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        //Hintergrundbild hinzufuegen
        const background = this.add.image(0,0, 'startBackground').setOrigin(0,0);
        background.setDisplaySize(width, height);
        const levelBgOverlay = this.add.graphics();
        levelBgOverlay.fillStyle(0x000000, 0.7);
        levelBgOverlay.fillRect(0,0, width, height);

        /**LevelController-Ueberschrift */
        const chooseLvlTitle = this.add.image(width / 2,150, 'chooseLvl');
        chooseLvlTitle.setScale(0.5);


        /**Zurueck-Button Handling*/
        const backBtn = this.add.image(100, 50, 'backBtn');
        handleButtons(backBtn, () =>{
            buttonClick.play();
            this.scene.start('ChooseCharacterScene');
        });

        /**LevelController-Buttons Handling*/
        const lvl1Button = this.add.image(300, 300, 'firstLvl');
        handleButtons(lvl1Button, () => {
            //hier wird playerProgress nicht geprueft, da das erste LevelController immer freigeschaltet ist
            buttonClick.play();
            introMusic.stop();
            this.scene.start('GameScene', { level: 1 });
        });

        const lvl2Button = this.add.image(500, 300, 'secondLvl');
        handleButtons(lvl2Button, () => {
            buttonClick.play();
            //prueft, ob das erste LevelController durchgespielt wurde
            if(playerProgress >= 2){
                introMusic.stop();
                this.scene.start('GameScene', { level: 2 });
            }

        });

        const lvl3Button = this.add.image(700, 300, 'thirdLvl');
        handleButtons(lvl3Button, () => {
            buttonClick.play();
            //prueft, ob das zweite LevelController durchgespielt wurde
            if(playerProgress >= 3){
                introMusic.stop();
                this.scene.start('GameScene', { level: 3 });
            }

        });

        /**LevelController-Buttons Styling, wenn das LevelController blockiert ist*/
        if (playerProgress < 2) {
            //Interaktion deaktivieren
            lvl2Button.disableInteractive();
            //Aendere die Transparenz des Buttons
            lvl2Button.setAlpha(0.5);
        }

        if(playerProgress < 3) {
            lvl3Button.disableInteractive();
            lvl3Button.setAlpha(0.5);
        }

        //Pruefe, ob introMusic abgespielt wird
        if (!introMusic.isPlaying) {
            //Starte introMusic
            introMusic.play();
        }



    }
}

