/**
 * In dieser Szene wird das Spiel dargestellt*/
class GameScene extends Phaser.Scene{
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

        /**Pause-Button*/
        this.load.image('pauseButton', 'images/pauseBtn.png');


    }

    // Hier wird die Logik für die Gameszene initialisiert
    create() {

        /**Hintergrund*/
        //Hintergrund erstellen
        this.bg = this.add.tileSprite(0, -100, 1000, 600, 'sky').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 140, 1000, 600, 'trees').setOrigin(0, 0);

        /**Lvl Title -> Level Nr. dynamisch*/
        this.levelNr = this.add.text(40,30, "Level 1", {fontSize: "52px", fill: "#000000", fontWeight: "bold"});
        this.levelNr.setShadow(0, 4, 'rgba(0, 0, 0, 0.25)', 4);

        /**Timer -> dynamisch*/
        this.timer = this.add.text(730,30, "00:00", {fontSize: "52px", fill: "#000000", fontWeight: "bold"});
        this.timer.setShadow(0, 4, 'rgba(0, 0, 0, 0.25)', 4);

        /**Spieler*/
        //Spielfigur erstellen
        this.player = this.physics.add.sprite(100, 400, 'player');  //"player" (Name des Bildes fuer Player)
        this.player.setScale(5);   //Hier wird die Grosse des Spielers veraendert/gesetzt -> 1 = urspruengliche Groesse
        this.player.setBounce(0.2);  //sorgt dafuer, dass etwas abprallt beim Springen
        this.player.setCollideWorldBounds(true); //sorgt dafuer, dass der Spieler mit der Spielfeldgrenze kollidiert

        /**Pause Button*/
        const pauseButton = this.add.image(950, 55,'pauseButton');
        handleButtons(pauseButton, () =>{
            if(!modalActive){
                updateModalStatus(true);
                const pauseModal = new PauseModal(this,10,10);
                this.add.existing(pauseModal);
                pauseModal.showModal();

                console.log("Pause Button wurde geklickt");
            }
        });
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
