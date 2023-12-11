
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
    create() {
        //Fenstergroesse des Spiels
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        /**Hintergrund*/
        //Hintergrund erstellen
        this.bg = this.add.tileSprite(0, 0, width, height, 'sky').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, width, height, 'trees').setOrigin(0, 0);

        /**Lvl Title -> Level Nr. dynamisch*/
        const lvlNr = "1"
        this.levelNr = this.add.text(40,30, "Level " + lvlNr, {fontSize: "52px", fill: "#000000", fontWeight: "bold"});
        this.levelNr.setShadow(0, 4, 'rgba(0, 0, 0, 0.25)', 4);

        /**Timer -> dynamisch*/
        this.timer = new Timer(this, 730, 30, 60);

        /**Plattform -> dynamisch erstellen***/
        const platforms = this.physics.add.staticGroup();
        platforms.create(800, 400, 'busstop').setScale(0.5).refreshBody();

        /**Spieler*/
        //Spielfigur erstellen TODO mit Player Klasse
        this.player = new Player(this, width / 2, height, 'player2');

        this.physics.add.collider(this.player, platforms);

        /**Kamera*/
        this.cameras.main.setBounds(0,0, width, height);
        this.cameras.main.startFollow(this.player);

        /**Pause-Button*/
        const pauseButton = this.add.image(950, 55,'pauseButton');
        handleButtons(pauseButton, () =>{
            if(!modalActive){
                this.timer.stopTimer();
                updateModalStatus(true);

                const pauseModal = new PauseModal(this,10,10);
                this.add.existing(pauseModal);
                pauseModal.showModal();

                //Setze die Callback-Funktion fuer das Pause-Modal, um den Timer fortzusetzen
                pauseModal.setOnModalClose(() =>{
                    this.timer.resumeTimer();
                    updateModalStatus(false);
                });

                console.log("Pause Button wurde geklickt");
            }

        });
    }


    // Hier wird das Spiel in jedem Frame aktualisiert
    update() {

        /**Hintergrund*/
        // zum Skalieren der Geschwindigkeit des Hintergrunds
        const skySpeed = 0;  //3
        const treeSpeed = 0;  //6

        this.bg.tilePositionX += skySpeed;
        this.trees.tilePositionX += treeSpeed;

        /**Steuerungselemente*/
        const cursors = this.input.keyboard.createCursorKeys();
        const keyboard = this.input.keyboard;
        const moveSpeed = 160;
        const jumpSpeed = 330;
        const slideSpeed = 100;

        //Spielerbewegungsmethode aufrufen
        this.player.movePlayer(cursors, keyboard, moveSpeed, jumpSpeed, slideSpeed);

        //Kamerabewegung entsprechend der Spielerbewegung anpassen
        this.cameras.main.scrollX = this.player.x - this.cameras.main.width * 0.5;
        this.cameras.main.scrollY = this.player.y - this.cameras.main.height * 0.5 - 50;
    }
}
