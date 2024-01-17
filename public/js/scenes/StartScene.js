//Globale Variable, um auf Musik und Sound ausserhalb von StartScene zuzugreifen
let introMusic;
let gameplayMusic;
let winSound;
let looseSound;
let buttonClick;
class StartScene extends Phaser.Scene{
    constructor() {
        super({key: 'StartScene'});
    }

    preload(){
        //In PreloadScene ausgelagert
    }

    //Hier wird die Logik fuer die Startszene initiliasiert
    create(){
        //Hintergrundbild zur Startszene hinzufuegen
        const background = this.add.image(0,0, 'startBackground').setOrigin(0,0);

        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        //Anpassen der Groesse des Hintergrundbilds auf das Game-Fenster
        background.setDisplaySize(width, height);

        /**Intro Musik*/
        // Der Audio-Manager wird verwendet, um das Audio abzuspielen
        introMusic = this.sound.add('introMusic', { loop: true, volume: 0.5 });
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
            if(!modalActive){
                this.scene.start('ChooseCharacterScene');
            }

        });

        //Info Button
        const infoButton = this.add.image(100,50, 'infoButton');
        handleButtons(infoButton, () => {
            buttonClick.play();
            if(!modalActive){
                modalActive = true;
                const infoModal = new InfoModal(this,0,0);

                //setzt Modalstatus auf false, wenn das Modalfenster geschlossen wurde
                infoModal.setOnModalClose(() =>{
                    modalActive = false;
                });

                this.add.existing(infoModal);
                infoModal.showModal();
            }
        });

        //Control Button
        const controlButton = this.add.image(200,50, 'controlButton');
        handleButtons(controlButton, () =>{
            buttonClick.play();
            if(!modalActive) {
                 modalActive = true;
                 const controlModal = new ControlModal(this, 0, 0);
                 this.add.existing(controlModal);
                 controlModal.showModal();

                 controlModal.setOnModalClose(() =>{
                     modalActive = false;
                 });
             }
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
            if(!modalActive){
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
            if(!modalActive){
                toggleMusicButton();
            }
        });

    }
}

