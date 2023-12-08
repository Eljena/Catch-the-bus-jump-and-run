//Variable zum Pruefen, ob Modalfenster geoeffnet ist
let modalActive= false;

//Methode, die modalActive auf true setzt
const updateModalStatus = (isActive) => {
    modalActive = isActive;
};
class StartScene extends Phaser.Scene{
    constructor() {
        super({key: 'StartScene'});
    }

    //Hier werden die Ressourcen fuer die Startszene geladen
    preload(){
        //In PreloadScene ausgelagert

    }

    //Hier wird die Logik fuer die Startszene initiliasiert
    create(){
        //Hintergrundbild hinzufuegen
        const background = this.add.image(0,0, 'background').setOrigin(0,0);

        // Anpassen der Bildgroesse, um auf das Game-Fenster zu passen
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        background.setDisplaySize(width, height);



        /**Spielueberschrift*/
        //this.add.text(275, 50, "Back to school", {fontFamily:'RetroGaming', fontSize: '56px', fill: '#ffffff'});


        /*****Menue Buttons ***/

        //Start Button
        const startButton = this.add.image(500, 300, 'startButton');
        handleButtons(startButton, () => {
            if(!modalActive){
                this.scene.start('GameScene');
                console.log('Start-button wurde geklickt');
            }

        });

        //Info Button
        const infoButton = this.add.image(100,50, 'infoButton');
        handleButtons(infoButton, () => {
            if(!modalActive){
                updateModalStatus(true);
                const infoModal = new InfoModal(this,10,10);
                this.add.existing(infoModal);
                infoModal.showModal();

                console.log('Info-button wurde geklickt');
            }

        });

        //Control Button
        const controlButton = this.add.image(200,50, 'controlButton');
        handleButtons(controlButton, () =>{
             if(!modalActive) {
                 updateModalStatus(true);
                 const controlModal = new ControlModal(this, 10, 10);
                 this.add.existing(controlModal);
                 controlModal.showModal();

                 console.log('Control-button wurde geklickt');
             }
        });

        //Sound Button
        let soundButtonActive = true;
        //let soundButton;


        const soundButton = this.add.image(800,50, 'soundButton');
        function toggleSoundButton(){
            soundButtonActive = !soundButtonActive;
            if(soundButtonActive){
                soundButton.setTexture('soundButton');
                console.log('Sound Button wurde geklickt');
                //TODO Logik Sounds
            }else{
                soundButton.setTexture('noSoundButton');
                console.log("Ohne Sound Button wurde geklickt");
                //TODO Logik fuer Deaktivieren der Sounds
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

        function toggleMusicButton() {
            musicButtonActive = !musicButtonActive;
            if (musicButtonActive) {
                musicButton.setTexture('musicButton');
                console.log('Musik Button wurde geklickt');
                // TODO Hier die Logik für das Aktivieren der Musik hinzufuegen
            } else {
                musicButton.setTexture('noMusicButton');
                console.log('Ohne Musik Button wurde geklickt');
                // TODO Hier die Logik für das Deaktivieren der Musik hinzufuegen
            }
        }

        musicButton = this.add.image(900, 50, 'musicButton').setInteractive({ useHandCursor: true });
        handleButtons(musicButton, () =>{
            if(!modalActive){
                toggleMusicButton();
            }
        });

    }
}

