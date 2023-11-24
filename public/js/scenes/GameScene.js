let player = this.player;
class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene' });
        this.moveCam = false;
    }

    // Hier werden die Ressourcen für die Startszene geladen
    preload() {
        /**Hintergrund*/
        //Sky-Bild laden
        this.load.image('sky', 'images/sky.png');
        //Tree-Bild laden
        this.load.image('trees', 'images/trees.png');

        /**Spieler*/
        //Player-Bild laden
        this.load.image('player', 'images/player.png');


    }

    // Hier wird die Logik für die Gameszene initialisiert
    create() {

        /**Hintergrund*/
        //Hintergrund erstellen
        this.bg = this.add.tileSprite(0, -100, 1000, 600, 'sky').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 140, 1000, 600, 'trees').setOrigin(0, 0);

        /**Spieler*/
        //Spielfigur erstellen
        player = this.physics.add.sprite(100, 400, 'player');  //"player" (Name des Bildes fuer Player)
        player.setScale(5);   //Hier wird die Grosse des Spielers veraendert/gesetzt -> 1 = urspruengliche Groesse
        player.setBounce(0.2);  //sorgt dafuer, dass etwas abprallt beim Springen
        player.setCollideWorldBounds(true); //sorgt dafuer, dass der Spieler mit der Spielfeldgrenze kollidiert

    }


    // Hier wird das Spiel in jedem Frame aktualisiert
    update() {
        /**Kamera*/
        const cam = this.cameras.main;

        /**Hintergrund*/
        // zum Skalieren der Geschwindigkeit des Hintergrunds
        const skySpeed = 3;
        const treeSpeed = 6;

        /**Steuerungselemente*/
        const cursors = this.input.keyboard.createCursorKeys();
        const keyboard = this.input.keyboard;
        const moveSpeed = 160;
        const jumpSpeed = 200;

        handleCamera(cam, cursors, keyboard);
        handlePlayerMovement(player, cursors, keyboard, moveSpeed, skySpeed, treeSpeed, jumpSpeed);
    }


    

}
