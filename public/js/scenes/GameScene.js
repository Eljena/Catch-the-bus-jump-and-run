/**
 * In dieser Szene wird das Spiel dargestellt.
 * Hierbei werden Methoden zum Laden und Zeichnen des Levels aus dem LevelController aufgerufen
 */
class GameScene extends Phaser.Scene{
    constructor() {
        super({ key: 'GameScene' });
    }
    preload() {
        //In PreloadScene ausgelagert
    }

    /**
     * Initialisiert die Szene mit den uebergebenen Daten.
     * @param data      Daten, die fuer die Initialisierung der Szene benoetigt werden.
     */
    init(data) {
        //uebergebene SoundController-Instanz
        this.level = data.level;
        this.soundController = data.soundController;
        this.selectedCharacter = data.selectedCharacter;
    }

    //Hier wird die Logik für die Gameszene initialisiert
    create() {
        const width = this.sys.game.config.width;
        const gameWidth = 8000;
        const height = this.sys.game.config.height;

        //Aendere die Grenzen des Spielbereichs
        this.physics.world.setBounds(0, 0, gameWidth, height);

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

        //Positioniere den Hintergrund an die Kamera background.width * scale
        this.cameras.main.setBounds(0, 0, gameWidth, background.height * scale);

        //Je nachdem welches LevelController in LevelScene ausgewaehlt wurde, wird ein LevelController Objekt erstellt
        switch(this.level){
            case 1:
                this.level1 = new LevelController(this.level, this, this.selectedCharacter,this.soundController);
                //Lade Level aus levelConfig.json
                this.level1.loadLevel();
                //Zeichne Levelobjekte
                this.level1.drawLevel();
                //Zeichne Levelnummer, Timer und PauseButton
                this.level1.drawHeadline();
                //Spieler aus LevelController-Klasse holen
                this.player = this.level1.player;
                break;
            case 2:
                this.level2 = new LevelController(this.level, this, this.selectedCharacter,this.soundController);
                this.level2.loadLevel();
                this.level2.drawLevel();
                this.level2.drawHeadline();
                this.player = this.level2.player;
                break;
            case 3:
                this.level3 = new LevelController(this.level, this, this.selectedCharacter,this.soundController);
                this.level3.loadLevel();
                this.level3.drawLevel();
                this.level3.drawHeadline();
                this.player = this.level3.player;
                break;
        }

        /**Kamera -> verfolgt den Spieler*/
        //Kamera der Szene folgt dem Spieler, wenn Spieler vorhanden
        if (this.player !== null) {
            this.cameras.main.startFollow(this.player);
            this.cameras.main.setFollowOffset(0, 0);
        } else {
            console.error("Fehler: Player nicht geladen");
        }


    }

    //Hier wird das Spiel in jedem Frame aktualisiert
    update() {
        /**Steuerungselemente*/
        const cursors = this.input.keyboard.createCursorKeys();
        const keyboard = this.input.keyboard;
        const moveSpeed = 210;
        const jumpSpeed = 330;

        //Default: Player bewegt sich nicht fort, wichtig fuer das Handling, wenn Modal aktiv ist
        this.player.movePlayer(cursors, keyboard, 0, 0);

        //Verzoegert die Spielerbewegung um 2 Sekunden (Dauer bis der Bus verschwunden ist)
        this.time.delayedCall(2000, () => {
            //Spielerbewegungsmethode aufrufen, wenn Modal deaktiviert ist -> Spieler erhaelt nun moveSpeed > 0, jumpSpeed > 0, um sich bewegen zu koennen
            if(this.level1 != null && !this.level1.modalController.isModalActive()){
                this.moveCameraAndPlayer(cursors, keyboard, moveSpeed, jumpSpeed);
            } else if(this.level2 != null && !this.level2.modalController.isModalActive()){
                this.moveCameraAndPlayer(cursors, keyboard, moveSpeed, jumpSpeed);
            } else if(this.level3 != null && !this.level3.modalController.isModalActive()){
                this.moveCameraAndPlayer(cursors, keyboard, moveSpeed, jumpSpeed);
            }

        });


        //Wenn Spieler Ziel (Position 7600) erreicht, dann rufe handleWin auf)
        if(this.player.x >= 7600){
            //Erstelle WinModal-Objekt, je nach LevelController-Objekt
            if(this.level1 != null){
                this.level1.handleWin();
                //Nur wenn playerProgress kleiner als 2, setze playerProgress gleich 2
                // -> notwendig damit beim erneuten Spiel des ersten Levels alle zuvor gespielten Level freigeschaltet bleiben
                if(playerProgress < 2){
                    //Setzt playerProgress auf 2, anhanddessen wird in LevelScene geprueft, ob das naechste Level in LevelScene freigeschaltet werden kann
                    playerProgress = 2;
                }
                //this.level1 auf null setzen, um anzuzeigen, dass das Level abgeschlossen ist
                this.level1 = null;
            } else if(this.level2 != null){
                this.level2.handleWin();
                if(playerProgress < 3){
                    //Spielerfortschritt auf 3 setzen
                    playerProgress = 3;
                }
                this.level2 = null;
            } else if(this.level3 != null){
                this.level3.handleWin();
                this.level3 = null;
            }
        }

    }

    moveCameraAndPlayer(cursors, keyboard, moveSpeed, jumpSpeed){
        this.player.movePlayer(cursors, keyboard, moveSpeed, jumpSpeed);
        //Kamerabewegung entsprechend der Spielerbewegung anpassen
        this.cameras.main.scrollX = this.player.x - this.cameras.main.width * 0.5;
        this.cameras.main.scrollY = this.player.y - this.cameras.main.height * 0.5 - 50;

    }

}
