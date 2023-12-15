
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
        this.add.image(400, 400, 'sky');
        //this.bg = this.add.tileSprite(0, 0, width, height, 'sky').setOrigin(0, 0);
        //this.trees = this.add.tileSprite(0, 0, width, height, 'trees').setOrigin(0, 0);

        /**Lvl Title -> Level Nr. dynamisch*/
        const lvlNr = "1"
        this.levelNr = this.add.text(40,30, "Level " + lvlNr, {fontSize: "52px", fill: "#000000", fontWeight: "bold"});
        this.levelNr.setShadow(0, 4, 'rgba(0, 0, 0, 0.25)', 4);

        /**Timer -> dynamisch*/
        this.timer = new Timer(this, 730, 30, 60);

        /****Hintergrundobjekte erstellen***/
        const backgroundObjects = this.physics.add.staticGroup();
        backgroundObjects.create(50, 490, 'bush').setScale(0.7).refreshBody();
        backgroundObjects.create(500, 490, 'bush').setScale(0.7).refreshBody();
        backgroundObjects.create(650, 490, 'bush').setScale(0.7).refreshBody();
        backgroundObjects.create(550, 375, 'tree').setScale(1).refreshBody();
        backgroundObjects.create(250, 360, 'house').setScale(0.3).refreshBody();
        backgroundObjects.create(602, 480, 'busSign').setScale(0.6).refreshBody();


        /**Plattform -> dynamisch erstellen***/
        const platforms = this.physics.add.staticGroup();
        platforms.create(800, 445, 'busstop').setScale(0.4).refreshBody();
        platforms.create(0, 600, 'ground').setScale(1).refreshBody();

        /****Spielobjekte erstellen***/
        //Bus erstellen
        this.bus = new Bus(this, 700, 405, 'bus');
        //Kollision zwischen Bus und Plattform
        this.physics.add.collider(this.bus, platforms);

        /**Spieler*/
        //Spielfigur erstellen
        this.player = new Player(this, 100, 460, 'player2');

        //Plattformen kollidieren mit Spieler
        this.physics.add.collider(this.player, platforms);

        /**Booster (Sneaker)**/
        //Sneaker-Gruppe erstellen
        this.sneakerGroup = this.physics.add.group();

        //Schleife, um Sneaker-Objekte zur Gruppe hinzuzufuegen
        for(let i = 0; i < 5; i++){
            const sneaker = new Sneaker(this, 300 + i * 150, 200, 'sneaker');
            sneaker.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            this.sneakerGroup.add(sneaker);
        }
        this.physics.add.collider(this.sneakerGroup, platforms);


        /**Kamera*/
        this.cameras.main.setBounds(0,0, width, height);
        this.cameras.main.startFollow(this.player);

        /**Pause-Button*/
        const pauseButton = this.add.image(950, 55,'pauseButton');
        handleButtons(pauseButton, () =>{
            if(!modalActive){
                //GameScene pausieren
                //this.scene.pause();

                this.timer.stopTimer();
                updateModalStatus(true);

                //PauseModal erstellen
                const pauseModal = new PauseModal(this,10,10);
                //Zur Szene hinzufuegen
                this.add.existing(pauseModal);
                //PauseModal zeigen
                pauseModal.showModal();

                //Setze die Callback-Funktion fuer das Pause-Modal, um den Timer fortzusetzen
                pauseModal.setOnModalClose(() =>{
                    //Spiel fortsetzen
                    this.resumeGame();
                });
            }

        });
    }


    /**
     * Funktion zum Fortsetzen des Spiels nach dem
     * Klicken auf den ContinueButton im Modalfenster
     */
    resumeGame(){
        //Szene fortsetzen
        //Timer wird fortgesetzt
        this.timer.resumeTimer();
        updateModalStatus(false);
    }

    //Hier wird das Spiel in jedem Frame aktualisiert
    update() {

        /**Hintergrund*/
        //zum Skalieren der Geschwindigkeit des Hintergrunds
        const skySpeed = 0;  //3
        const treeSpeed = 0;  //6

        //this.bg.tilePositionX += skySpeed;
        //this.trees.tilePositionX += treeSpeed;

        /**Steuerungselemente*/
        const cursors = this.input.keyboard.createCursorKeys();
        const keyboard = this.input.keyboard;
        const moveSpeed = 210;
        const jumpSpeed = 330;
        const slideSpeed = 100;

        //Spielerbewegungsmethode aufrufen
        this.player.movePlayer(cursors, keyboard, moveSpeed, jumpSpeed, slideSpeed);

        //Kamerabewegung entsprechend der Spielerbewegung anpassen
        this.cameras.main.scrollX = this.player.x - this.cameras.main.width * 0.5;
        this.cameras.main.scrollY = this.player.y - this.cameras.main.height * 0.5 - 50;

        /**Booster aufsammeln**/
        // Kollisionsueberpruefung zwischen Spieler und Boostern
        this.physics.add.overlap(this.player, this.sneakerGroup, this.collectSneaker, null, this);

    }
    collectSneaker(player, sneaker){
        //Sneaker entfernen, wenn er eingesammelt wird
        sneaker.disableBody(true, true);
        //soll dem Player kurzzeitig einen Boost geben
        sneaker.applyEffect(player);
    }


}
