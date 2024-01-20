class StartScene extends Phaser.Scene{
    constructor() {
        super({key: 'StartScene'});
        this.modalController = new ModalController();
        this.soundController = new SoundController();
    }

    preload(){
        //In PreloadScene ausgelagert
    }

    //Hier wird die Logik fuer die Startszene initiliasiert
    create(){
        //Hintergrundbild zur Startszene hinzufuegen
        const background = this.add.image(0,0, 'startBackground').setOrigin(0,0);

        //Anpassen der Groesse des Hintergrundbilds auf das Game-Fenster
        background.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.soundController.initializeSounds(this);
        //Spielt Intromusik ab
        this.soundController.playIntroMusic();

        /*****Menue Buttons ***/
        //Start Button
        const startButton = this.add.image(500, 300, 'startButton');
        handleButtons(startButton, () => {
            this.soundController.playButtonClick();
            if(!this.modalController.isModalActive()){
                this.scene.start('ChooseCharacterScene', {soundController: this.soundController});
            }
        });

        //Info Button
        const infoButton = this.add.image(100,50, 'infoButton');
        handleButtons(infoButton, () => {
            this.soundController.playButtonClick();
            this.modalController.createModal(this, InfoModal, 0,0, null);
        });

        //Control Button
        const controlButton = this.add.image(200,50, 'controlButton');
        handleButtons(controlButton, () =>{
            this.soundController.playButtonClick();
            this.modalController.createModal(this, ControlModal, 0,0, null);
        });

        //Sound Button
        this.soundController.soundButton = this.add.image(800, 50, 'soundButton');
        handleButtons(this.soundController.soundButton, () =>{
            if(!this.modalController.isModalActive()){
                //Sound ein- und ausschalten
                this.soundController.toggleSound();

            }
        });

        //Musik Button
        this.soundController.musicButton = this.add.image(900, 50, 'musicButton');
        handleButtons(this.soundController.musicButton, () =>{
            if(!this.modalController.isModalActive()){
                //Musik ein- und ausschalten
                this.soundController.toggleMusic();
            }
        });

        //Aktualisiere den Sound-Status und Musik-Status anhand des internen Status
        this.soundController.updateSoundStatus();
        this.soundController.updateMusicStatus();
    }


}

