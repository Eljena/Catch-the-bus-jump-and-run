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

    init(data) {
        //uebergebene SoundController-Instanz
        this.soundController = data.soundController;
        this.selectedCharacter = data.selectedCharacter;
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

        //prueft, ob introMusik spielt -> wenn Spieler aus der GameScene wieder zur LevelScene gelangt, soll die Intromusik abgespielt werden
        if(!this.soundController.introMusic.isPlaying){
            this.soundController.playIntroMusic();
        }

        /**LevelController-Ueberschrift */
        const chooseLvlTitle = this.add.image(width / 2,150, 'chooseLvl');
        chooseLvlTitle.setScale(0.5);


        /**Zurueck-Button Handling*/
        const backBtn = this.add.image(100, 50, 'backBtn');
        handleButtons(backBtn,() =>{
            this.soundController.playButtonClick();
            this.scene.start('ChooseCharacterScene');
        });

        /**LevelController-Buttons Handling*/
        const lvl1Button = this.add.image(300, 300, 'firstLvl');
        handleButtons(lvl1Button, () => {
            //hier wird playerProgress nicht geprueft, da das erste LevelController immer freigeschaltet ist
            this.soundController.playButtonClick();
            this.scene.start('GameScene', {level: 1, selectedCharacter: this.selectedCharacter, soundController: this.soundController});
        });

        const lvl2Button = this.add.image(500, 300, 'secondLvl');
        handleButtons(lvl2Button, () => {
            this.soundController.playButtonClick();
            //prueft, ob das erste LevelController durchgespielt wurde
            if(playerProgress >= 2){
                this.scene.start('GameScene', {level: 2, selectedCharacter: this.selectedCharacter, soundController: this.soundController});
            }

        });

        const lvl3Button = this.add.image(700, 300, 'thirdLvl');
        handleButtons(lvl3Button, () => {
            this.soundController.playButtonClick();
            //prueft, ob das zweite LevelController durchgespielt wurde
            if(playerProgress >= 3){
                this.scene.start('GameScene', {level: 3, selectedCharacter: this.selectedCharacter, soundController: this.soundController});
            }

        });

        /**Level-Buttons Styling, wenn das Level blockiert ist*/
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

    }
}

