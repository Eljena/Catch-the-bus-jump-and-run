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
        try {
            const levelConfig = this.gameScene.cache.json.get('levelConfig');
            //insbesondere auf Bezeichnung in levelConfig achten -> statt nur this.lvlNr in currentLevel zu speichern, muss der "level" ebenso uebergeben werden
            const currentLevel = "level" + this.lvlNr;

            if(!levelConfig || !levelConfig.levels || !levelConfig.levels[currentLevel]){
                throw new Error("Ungültige Levelkonfiguration oder Level nicht gefunden.")
            }

            this.levelInfo = levelConfig.levels[currentLevel];
            return this.levelInfo;
        } catch (error){
            console.error("Error beim Laden des Levels: ", error.message);
            return null;
        }

    }

    /**
     * Dieses Level dient zum Zeichnen des Levels in der GameScene
     */
    drawLevel(){
        gameplayMusic.play();
        //Zum debuggen
        if (!this.levelInfo) {
            console.error("Levelinfo nicht geladen!");
            return;
        }
        //Hintergrundobjekte erstellen
        this.levelInfo.backgroundObjects.forEach(bgData => {
            this.gameScene.add.image(bgData.x, bgData.y, bgData.type).setScale(bgData.scale);
        });

        const busColliderPlatforms = this.gameScene.physics.add.staticGroup();

        //Plattformen erstellen
        const platforms = this.gameScene.physics.add.staticGroup();
        this.levelInfo.platforms.forEach(platformData => {
            const platform = platforms.create(platformData.x, platformData.y, platformData.type).setScale(platformData.scale);
            platform.refreshBody();

            //Wenn Boden Platform dann fuege zu busColliderPlatform platform hinzu
            if(platformData.type === 'ground'){
                busColliderPlatforms.add(platform);
            }

        });

        //Hindernisse erstellen
        const obstacleGroup = this.gameScene.physics.add.staticGroup();
        this.levelInfo.obstacles.forEach(obstacleData =>{
            const obstacle = obstacleGroup.create(obstacleData.x, obstacleData.y, obstacleData.type).setScale(obstacleData.scale);

            //Setze Hindernis als unbeweglich
            obstacle.setImmovable(true);

            //Kollidiere mit statischen Plattformen
            this.gameScene.physics.add.collider(obstacle, platforms);

            //stellt sicher, dass der Koerper des Sprites den neuen Abmessungen od. Position entspricht
            obstacle.refreshBody();

        });

        //Spielobjekte erstellen
        this.levelInfo.gameObjects.forEach(gameObjectData => {
            switch(gameObjectData.type) {
                case "player":
                    this.player = new Player(this.gameScene, gameObjectData.x, gameObjectData.y, selectedCharacter);
                    this.gameScene.physics.add.collider(this.player, platforms);
                    this.gameScene.physics.add.collider(this.player, obstacleGroup);
                    break;
                case "bus":
                    const bus = new Bus(this.gameScene, gameObjectData.x, gameObjectData.y, 'bus');
                    this.gameScene.physics.add.collider(bus, busColliderPlatforms);
                    break;
                case "pigeon":
                    const pigeon = new Pigeon(this.gameScene, gameObjectData.x, gameObjectData.y, 'pigeon');
                    this.gameScene.physics.add.collider(pigeon, platforms);
                    //Wenn Spieler und Taube ueberlappen, dann rufe handelPigeonCollision
                    this.gameScene.physics.add.overlap(this.player, pigeon, this.handleEnemyCollision, null, this);

                    break;
                case "passerby":
                    const passerby = new Passerby(this.gameScene, gameObjectData.x, gameObjectData.y, 'passerby');
                    this.gameScene.physics.add.collider(passerby, platforms);
                    //Wenn Spieler und Taube ueberlappen, dann rufe handelPigeonCollision
                    this.gameScene.physics.add.overlap(this.player, passerby, this.handleEnemyCollision, null, this);
                    break;
            }

        });

        // Booster hinzufuegen, falls vorhanden
        if(this.levelInfo.booster) {
            const boosterGroup = this.gameScene.physics.add.group();
            this.levelInfo.booster.forEach(boosterData => {
                const boost = new Booster(this.gameScene, boosterData.x, boosterData.y, boosterData.type);
                boosterGroup.add(boost);
            });
            this.gameScene.physics.add.collider(boosterGroup, platforms);
            this.gameScene.physics.add.overlap(this.player, boosterGroup, this.player.collectBooster, null, this);
        }
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

        /**Timer*/
        this.timer = new Timer(this.gameScene, 700, 0, 60, guiContainer, this.handleTimeExpired.bind(this));



        /**Pause-Button*/
        const pauseButton = this.gameScene.add.image(900, 25,'pauseButton');
        //sorgt dafuer, dass der Button an einer festen Bildschirmposition bleibt
        pauseButton.setScrollFactor(0);
        handleButtons(pauseButton, () =>{
            this.createModal("pauseModal", PauseModal);
        });
        guiContainer.add(pauseButton);
    }

    createModal(modalName, modalClass){
        if(!modalActive){
            //stoppe Timer, wenn Modal geoeffnet
            this.timer.stopTimer();
            //stoppe Sprites, wenn Modal geoeffnet ist

            modalActive = true;

            //Erstelle Modal
            const modalName = new modalClass(this.gameScene, 0,0);

            //Stellt sicher, dass Modalfenster an einer fixierten Position auf dem Bildschirm bleibt
            modalName.setScrollFactor(0);

            //Fuege Modal zur Szene hinzu
            this.gameScene.add.existing(modalName);
            //Zeige Modal
            modalName.showModal();

            //Setze die Callback-Funktion fuer das Pause-Modal, um den Timer fortzusetzen
            modalName.setOnModalClose(() =>{
               if(modalName instanceof PauseModal){
                   //Spiel fortsetzen
                   this.resumeGame();
               } else if(modalName instanceof WinModal){
                   //WinModal wurde gezeigt
                   //this.isWinModalShown = true;
               }
            });

        }
    }


    /**
     * Funktion zum Fortsetzen des Spiels nach dem
     * Klicken auf den ContinueButton im Modalfenster
     */
    resumeGame(){
        //Szene fortsetzen
        //gameplayMusic fortsetzen
        gameplayMusic.play();
        //Timer wird fortgesetzt
        this.timer.resumeTimer();
    }

    handleTimeExpired() {
        gameplayMusic.stop();
        looseSound.play();
        //looseModal erstellen, wenn Timer abgelaufen ist
        this.createModal("looseModal", LooseModal);
    }

    /**
     * Hier wird gehandelt was passiert, wenn Spieler mit Taube kollidiert
     *
     */
    handleEnemyCollision(){
        if(!modalActive){
            gameplayMusic.stop();
            looseSound.play();
            this.createModal("looseModal", LooseModal);
            modalActive = true;
        }

    }

    /**get-Methode fuer Player -> wird fuer update-Methode in GameScene gebraucht*/
    getPlayer() {
        return this.player;
    }

}