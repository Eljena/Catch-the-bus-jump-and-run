
/**
 * In dieser Szene wird das Spiel dargestellt*/

class GameScene extends Phaser.Scene{
    constructor() {
        super({ key: 'GameScene' });
    }
    preload() {
        //In PreloadScene ausgelagert
    }

    // Hier wird die Logik für die Gameszene initialisiert
    create(data) {
        //Fenstergroesse des Spiels
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        const gameWidth = 8000;


        //Aendere die Grenzen des Spielbereichs
        this.physics.world.setBounds(0, 0, gameWidth, height);

        //Zugriff auf das uebergebene Level-Objekt
        const level = data.level;


        /**Hintergrund*/
        //Hintergrund erstellen
        const background = this.add.image(0, 0, 'gameBackground');
        background.setOrigin(0);

        //Berechnet das Verhaeltnis zwischen der Breite des Bildschirms und der Breite des Hintergrundbilds
        const scaleX = width / background.width;
        //Berechnet das Verhaeltnis zwischen der Hoehe des Bildschirms und der Hoehe des Hintergrundbilds
        const scaleY = height / background.height;
        //Berechnet den groesseren Skalierungsfaktor zwischen scaleX und scaleY
        const scale = Math.max(scaleX, scaleY);

        background.setScale(1);

        // Positioniere den Hintergrund an die Kamera background.width * scale
        this.cameras.main.setBounds(0, 0, gameWidth, background.height * scale);

        //Je nachdem welches Level in LevelScene ausgewaehlt wurde, wird ein Level Objekt erstellt
        switch(level){
            case 1:
                this.level1 = new Level(level, this);
                //Zeichne Levelnummer,Timer und PauseButton
                this.level1.loadLevel();
                this.level1.drawLevel();
                this.level1.drawHeadline();
                //Spieler aus Levelklasse holen
                this.player = this.level1.getPlayer();
                break;
            case 2:
                this.level2 = new Level(level, this);
                this.level2.loadLevel();
                this.level2.drawLevel();
                this.level2.drawHeadline();
                this.player = this.level2.getPlayer();
                break;
            case 3:
                this.level3 = new Level(level, this);
                this.level3.loadLevel();
                this.level3.drawLevel();
                this.level3.drawHeadline();
                this.player = this.level3.getPlayer();
                break;
        }



        //this.physics.add.collider(this.player, platforms);


        /**Kamera -> verfolgt den Spieler*/
        //Kamera der Szene folgt dem Spieler
        if(this.player != null){
            this.cameras.main.startFollow(this.player);
            this.cameras.main.setFollowOffset(0, 0);
        }else {
            console.error("Player nicht geladen");
        }




    }

    //Hier wird das Spiel in jedem Frame aktualisiert
    update() {
        /**Steuerungselemente*/
        const cursors = this.input.keyboard.createCursorKeys();
        const keyboard = this.input.keyboard;
        const moveSpeed = 210;
        const jumpSpeed = 330;

        this.player.movePlayer(cursors, keyboard, 0, 0);

        //Verzoegert die Spielerbewegung um 2 Sekunden (Dauer bis der Bus verschwunden ist)
        this.time.delayedCall(2000, () => {
            //Spielerbewegungsmethode aufrufen
            if(!modalActive){
                this.player.movePlayer(cursors, keyboard, moveSpeed, jumpSpeed);
                //Kamerabewegung entsprechend der Spielerbewegung anpassen
                this.cameras.main.scrollX = this.player.x - this.cameras.main.width * 0.5;
                this.cameras.main.scrollY = this.player.y - this.cameras.main.height * 0.5 - 50;
            }
        });


        //Wenn Spieler Ziel (Position 7600) erreicht, dann erstelle ein WinModal-Objekt)
        if(this.player.x >= 7600){
            gameplayMusic.stop();
            //Erstelle WinModal-Objekt, je nach Level
            if(this.level1 != null){
                winSound.play();
                this.level1.createModal("winModal", WinModal);
                //Nur wenn playerProgress kleiner als 2, setze playerProgress gleich 2
                // -> notwendig damit beim erneuten Spiel des ersten Levels alle zuvor gespielten Level freigeschaltet bleiben
                if(playerProgress < 2){
                    //Setzt playerProgress auf 2, anhanddessen wird in LevelScene geprueft, ob das naechste Level in LevelScene freigeschaltet werden kann
                    playerProgress = 2;
                }
                console.log(playerProgress);
                //this.level1 auf null setzen, um anzuzeigen, dass das Level abgeschlossen ist
                this.level1 = null;
            } else if(this.level2 != null){
                winSound.play();
                this.level2.createModal("winModal", WinModal);
                if(playerProgress < 3){
                    //Spielerfortschritt auf 3 setzen
                    playerProgress = 3;
                }

                this.level2 = null;
            } else if(this.level3 != null){
                winSound.play();
                this.level3.createModal("winModal", WinModal);
                this.level3 = null;
            }
        }

    }

}
