/**
 * Diese Klasse dient zum Laden des Levels aus der JSON-Datei und zum
 * Zeichnen des Levels in der GameScene
 */
class Level{
    constructor(lvlNr, gameScene) {
        this.lvlNr = lvlNr;
        this.gameScene = gameScene;
        this.levelInfo = null;
        this.player = null;

    }

    /**
     * Diese Methode dient zum Laden der JSON Leveldatei
     * @param lvlNumber
     */
    loadLevel(){
        const levelConfig = this.gameScene.cache.json.get('levelConfig');
        //insbesondere auf Bezeichnung in levelConfig achten -> statt nur this.lvlNr in currentLevel zu speichern, muss der "level" ebenso uebergeben werden
        const currentLevel = "level" + this.lvlNr;
        this.levelInfo = levelConfig.levels[currentLevel];
        return this.levelInfo;
    }

    /**
     * Dieses Level dient zum Zeichnen des Levels in der GameScene
     */
    drawLevel(){
        //Zum debuggen
        if (!this.levelInfo) {
            console.error("Levelinfo nicht geladen!");
            return;
        }
        //Hintergrundobjekte erstellen
        this.levelInfo.backgroundObjects.forEach(bgData => {
            const bg = this.gameScene.add.image(bgData.x, bgData.y, bgData.type).setScale(bgData.scale);
        });


        //Plattformen erstellen
        const platforms = this.gameScene.physics.add.staticGroup();
        this.levelInfo.platforms.forEach(platformData => {
            const platform = platforms.create(platformData.x, platformData.y, platformData.type).setScale(platformData.scale);
            platform.refreshBody();


        });
        console.log("Gruppe: " + platforms);

        // Spielobjekte erstellen
        this.levelInfo.gameObjects.forEach(gameObjectData => {
            switch(gameObjectData.type) {
                case "player":
                    this.player = new Player(this.gameScene, gameObjectData.x, gameObjectData.y);
                    this.gameScene.physics.add.collider(this.player, platforms);
                    break;
                case "bus":
                    const bus = new Bus(this.gameScene, gameObjectData.x, gameObjectData.y);
                    this.gameScene.physics.add.collider(bus, platforms);
                    break;

            }
        });

        //Booster hinzufuegen, falls vorhanden
        /**
        if (this.levelInfo.booster && this.levelInfo.booster.sneakers) {
            this.levelInfo.booster.sneakers.forEach(sneakerData => {
                const sneaker = new Sneaker(this, sneakerData.x, sneakerData.y, 'sneaker');
                sneaker.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
                this.boosterGroup.add(sneaker);
            });
            this.gameScene.physics.add.collider(boosterGroup, platforms);
        }*/



        console.log("Zeichne Level");



    }

    drawHeadline(){
        //Container fuer Titel, Timer und PauseButton erstellen
        const guiContainer = this.gameScene.add.container();

        //Kamera einrichten fuer Headline-Objekte
        this.gameScene.cameras.main.startFollow(guiContainer);

        guiContainer.setScrollFactor(0);
        guiContainer.setPosition(40, 30);

        /**Levelnummer*/
        const levelNrText = this.gameScene.add.text(0,0, "Level " + this.lvlNr, {
            fontSize: "52px",
            fill: "#000000",
            fontWeight: "bold"
        })
        levelNrText.setShadow(0, 4, 'rgba(0, 0, 0, 0.25)', 4);
        guiContainer.add(levelNrText);

        /**Timer -> dynamisch*/
        this.timer = new Timer(this.gameScene, 700, 0, 60, guiContainer);

        /**Pause-Button*/
        const pauseButton = this.gameScene.add.image(900, 25,'pauseButton');
        //sorgt dafuer, dass der Button an einer festen Bildschirmposition bleibt
        pauseButton.setScrollFactor(0);
        handleButtons(pauseButton, () =>{
            if(!modalActive){
                //stoppe Timer, wenn Modal geoeffnet
                this.timer.stopTimer();
                modalActive = true;

                //PauseModal erstellen
                const pauseModal = new PauseModal(this.gameScene,0,0);
                //sorgt dafuer, dass das Modalfenster an einer festen Bildschirmposition bleibt
                pauseModal.setScrollFactor(0);

                //Zur Szene hinzufuegen
                this.gameScene.add.existing(pauseModal);
                //PauseModal zeigen
                pauseModal.showModal();

                //Setze die Callback-Funktion fuer das Pause-Modal, um den Timer fortzusetzen
                pauseModal.setOnModalClose(() =>{
                    //Spiel fortsetzen
                    this.resumeGame();
                });
            }
        });
        guiContainer.add(pauseButton);

    }

    /**
     * Funktion zum Fortsetzen des Spiels nach dem
     * Klicken auf den ContinueButton im Modalfenster
     */
    resumeGame(){
        //Szene fortsetzen
        //Timer wird fortgesetzt
        this.timer.resumeTimer();
    }

    /**get-Methode fuer Player*/
    getPlayer() {
        return this.player;
    }

    createWinModal(){

    }

    createLooseModal(){

    }
}