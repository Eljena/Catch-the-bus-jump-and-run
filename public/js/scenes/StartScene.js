class StartScene extends Phaser.Scene{
    constructor() {
        super({key: 'StartScene'});
        this.modalController = new ModalController();
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

        /**Intro Musik*/
        //sorgt dafuer, dass introMusic nur erstellt wird, wenn es bisher noch nicht erstellt wurde
        //wichtig, damit introMusic nicht erneut erstellt (abgespielt) wird, wenn Nutzer von der ChooseCharacterScene in die StartScene wechselt
        if(introMusic === undefined){
            introMusic = this.sound.add('introMusic', { loop: true, volume: 0.5 }); 
        }
        if(!introMusic.isPlaying) {
            //Starte introMusic
            introMusic.play();
        }

        /**Gameplay Musik -> wird waehrend des Spiels abgespielt*/
        gameplayMusic = this.sound.add('gameplayMusic', { loop: true, volume: 0.5 });

        //Sound Button
        buttonClick = this.sound.add('buttonClick');

        /**Gameplay Sound*/
        //Win Sound
        winSound = this.sound.add('winSound');

        //Loose Sound
        looseSound = this.sound.add('looseSound');

        /*****Menue Buttons ***/
        //Start Button
        const startButton = this.add.image(500, 300, 'startButton');
        handleButtons(startButton, () => {
            buttonClick.play();
            if(!this.modalController.isModalActive()){
                this.scene.start('ChooseCharacterScene');
            }

        });

        //Info Button
        const infoButton = this.add.image(100,50, 'infoButton');
        handleButtons(infoButton, () => {
            buttonClick.play();
            this.modalController.createModal(this, InfoModal, 0,0, null);
        });

        //Control Button
        const controlButton = this.add.image(200,50, 'controlButton');
        handleButtons(controlButton, () =>{
            buttonClick.play();
            this.modalController.createModal(this, ControlModal, 0,0, null);
        });

        //Sound Button
        let soundButtonActive = true;
        let soundButton;
        soundButton = this.add.image(800,50, 'soundButton');
        function toggleSoundButton(){
            soundButtonActive = !soundButtonActive; //kehrt den Wert um
            if(soundButtonActive){
                soundButton.setTexture('soundButton');
                //Sound aktivieren
                buttonClick.setMute(false);
                winSound.setMute(false);
                looseSound.setMute(false);
            }else{
                soundButton.setTexture('noSoundButton');
                //Sound aktivieren
                buttonClick.setMute(true);
                winSound.setMute(true);
                looseSound.setMute(true);
            }
        }
        handleButtons(soundButton, () =>{
            if(!this.modalController.isModalActive()){
                toggleSoundButton();
            }

        });

        //Music Button
        let musicButtonActive = true;
        let musicButton;
        musicButton = this.add.image(900, 50, 'musicButton');
        function toggleMusicButton() {
            musicButtonActive = !musicButtonActive; //kehrt den Wert um
            if (musicButtonActive) {
                musicButton.setTexture('musicButton');
                //Musik aktivieren
                introMusic.setMute(false);
                gameplayMusic.setMute(false);
            } else {
                musicButton.setTexture('noMusicButton');
                //Musik deaktivieren
                introMusic.setMute(true);
                gameplayMusic.setMute(true);
            }
        }

        handleButtons(musicButton, () =>{
            if(!this.modalController.isModalActive()){
                toggleMusicButton();
            }
        });

    }


}

