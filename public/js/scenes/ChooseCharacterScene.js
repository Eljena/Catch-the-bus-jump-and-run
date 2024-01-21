/**
 * Diese Klasse dient zum Darstellen der Charakterauswahlszene.
 */
class ChooseCharacterScene extends Phaser.Scene{
    constructor(){
        super({key: 'ChooseCharacterScene'});
    }

    preload(){
        //in Preload Scene ausgelagert
    }

    /**
     * Initialisiert die Szene mit den uebergebenen Daten.
     * @param data      Daten, die fuer die Initialisierung der Szene benoetigt werden.
     */
    init(data) {
        //uebergebene SoundController-Instanz
        this.soundController = data.soundController;
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



        /**ChooseCharacter-Ueberschrift */
        const chooseCharacterTitle = this.add.image(width / 2,150, 'chooseCharacterTitle');
        chooseCharacterTitle.setScale(0.5);

        /**Zurueck-Button Handling*/
        const backBtn = this.add.image(100, 50, 'backBtn');
        handleButtons(backBtn, () =>{
            this.soundController.playButtonClick();
            this.scene.start('StartScene');
        });

        /**PlayerCard Handling*/
        const player1Card = this.add.image(350, 350, 'player1Card');
        const characterName1 = this.add.image(350,490, 'characterName1');
        characterName1.setScale(0.5);
        handleButtons(player1Card, () =>{
            this.soundController.playButtonClick();
            this.scene.start('LevelScene',{ selectedCharacter: 'player1', soundController: this.soundController });
        });

        const player2Card = this.add.image(650, 350, 'player2Card');
        const characterName2 = this.add.image(650,490, 'characterName2');
        characterName2.setScale(0.5);
        handleButtons(player2Card, () =>{
            this.soundController.playButtonClick();
            this.scene.start('LevelScene',{ selectedCharacter: 'player2',soundController: this.soundController });
        });

    }
}