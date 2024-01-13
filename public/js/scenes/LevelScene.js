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
        // Anpassen der Bildgroesse, um auf das Game-Fenster zu passen
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        //Hintergrundbild hinzufuegen
        const background = this.add.image(0,0, 'startBackground').setOrigin(0,0);
        background.setDisplaySize(width, height);
        const levelBgOverlay = this.add.graphics();
        levelBgOverlay.fillStyle(0x000000, 0.7);
        levelBgOverlay.fillRect(0,0, width, height);

        /**Level-Ueberschrift */
        const chooseLvlTitle = this.add.image(width / 2,150, 'chooseLvl');
        chooseLvlTitle.setScale(0.5);


        /**Level-Buttons*/
        const lvl1Button = this.add.image(300, 300, 'firstLvl');
        handleButtons(lvl1Button, () => {
            // Hier die Logik einfügen, die beim Klicken des Buttons ausgeführt werden soll
            console.log('Level 1 wird geladen');
            this.scene.start('GameScene', { level: 1 });
        });

        const lvl2Button = this.add.image(500, 300, 'secondLvl');
        handleButtons(lvl2Button, () => {
            // Hier die Logik einfügen, die beim Klicken des Buttons ausgeführt werden soll
            console.log('Level 2 wird geladen');
            this.scene.start('GameScene', { level: 2 });
        });

        const lvl3Button = this.add.image(700, 300, 'thirdLvl');
        handleButtons(lvl3Button, () => {
            // Hier die Logik einfügen, die beim Klicken des Buttons ausgeführt werden soll
            console.log('Level 3 wird geladen');
            this.scene.start('GameScene', { level: 3 });
        });



    }
}

