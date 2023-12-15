
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
        const background = this.add.image(0,0, 'background').setOrigin(0,0);
        background.setDisplaySize(width, height);
        const levelBgOverlay = this.add.graphics();
        levelBgOverlay.fillStyle(0x000000, 0.7);
        levelBgOverlay.fillRect(0,0, width, height);

        /**Level-Ueberschrift*/
        const lvlText = this.add.text(0, 100, "Wähle ein Level aus", {fontFamily:'RetroGaming', fontSize: '56px', fill: '#ffffff'});
        //Textgrenze abrufen
        const lvlTextBounds = lvlText.getBounds();
        //Breite des Textes
        const lvlTextWidth = lvlTextBounds.width;
        //X-Position, um den Text mittig zu platzieren
        const centerX = (width - lvlTextWidth) / 2;
        //Text, auf die zentrierte X-Position setzen
        lvlText.setX(centerX);



        /**Level-Buttons**/
        const lvl1Button = this.add.image(300, 300, 'firstLvl');
        handleButtons(lvl1Button, () =>{
            this.scene.start('GameScene');  //TODO Level 1 starten
        });

        const lvl2Button = this.add.image(500, 300, 'secondLvl');
        handleButtons(lvl2Button, () =>{
            //this.scene.start('Level2');
        });

        const lvl3Button = this.add.image(700, 300, 'thirdLvl');
        handleButtons(lvl3Button, () =>{
            //this.scene.start(Level3);
        });

    }
}

