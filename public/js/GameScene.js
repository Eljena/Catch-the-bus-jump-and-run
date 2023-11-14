//Spielfigur/Sprite erstellen
let player;
//Hier wird der aktuelle Springzustand verfolgt
let canJump = true;
class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene' });
    }

    // Hier werden die Ressourcen für die Startszene geladen
    preload() {
        //Player-Bild laden
        this.load.image('player', 'images/player.png');

        //Sky-Bild laden
        this.load.image('sky', 'images/sky.png');
        //Tree-Bild laden
        this.load.image('trees', 'images/trees.png');

    }

    // Hier wird die Logik für die Startszene initialisiert
    create() {
        //Hintergrund erstellen
        this.bg = this.add.tileSprite(0, -100, 1000, 600, 'sky').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 140, 1000, 600, 'trees').setOrigin(0, 0);

        //Start-button wird unsichtbar gemacht
        const startButton = document.getElementById('startButton');
        startButton.style.display = 'none';

        //Spielfigur erstellen
        player = this.physics.add.sprite(100, 500, 'player');  //"player" (Name des Bildes fuer Player)
        player.setScale(3);   //Hier wird die Grosse des Spielers veraendert/gesetzt -> 1 = urspruengliche Groesse
        player.setBounce(0.2);  //sorgt dafuer, dass etwas abprallt beim Springen
        player.setCollideWorldBounds(true); //sorgt dafuer, dass der Spieler mit der Spielfeldgrenze kollidiert

    }


    //Hier wird das Spiel in jedem Frame aktualisiert
    update() {
        //zum Skalieren der Geschwindigkeit des Hintergrunds
        const skySpeed = 1.5;
        const treeSpeed = 5;

        const cursors = this.input.keyboard.createCursorKeys();
        const keyboard = this.input.keyboard;
        const moveSpeed = 160;
        const jumpSpeed = 250;

        // Bewegung mit Pfeiltasten oder den WASD-Tasten
        if (cursors.left.isDown || keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            player.setVelocityX(-moveSpeed);  // Links
            this.bg.tilePositionX -= skySpeed;
            this.trees.tilePositionX -= treeSpeed;
        } else if (cursors.right.isDown || keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            player.setVelocityX(moveSpeed);   // Rechts
            this.bg.tilePositionX += skySpeed;
            this.trees.tilePositionX += treeSpeed;
        } else {
            player.setVelocityX(0);
        }

        // Springen und Doppel-Springen
        if (player.body.onFloor()) {
            canJump = true;
        }

        /**TO-DO Doppelsprung*/
        if ((cursors.up.isDown || keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) && canJump) {
            player.setVelocityY(-jumpSpeed);  // Springen
            canJump = false;
        }
    }

}
