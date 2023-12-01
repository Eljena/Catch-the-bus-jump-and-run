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
        this.load.image('background', 'images/background.png'); //Hintergrundbild laden
        this.load.image('startButton', 'images/startBtn.png');  //StartButton laden
        this.load.image('infoButton', 'images/infoBtn.png');
        this.load.image('controlButton', 'images/controlBtn.png');
        this.load.image('soundButton', 'images/soundBtn.png');
        this.load.image('musicButton', 'images/musicBtn.png');

        this.load.image('noMusicButton', 'images/noMusicBtn.png');
        this.load.image('noSoundButton', 'images/noSoundBtn.png');
    }

    //Hier wird die Logik fuer die Startszene initiliasiert
    create(){
        //TODO Progessbar zum Laden der Ressourcen

        //Hintergrundbild hinzufuegen
        const background = this.add.image(0,0, 'background').setOrigin(0,0);

        // Anpassen der Bildgroesse, um auf das Game-Fenster zu passen
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        background.setDisplaySize(width, height);



        /**Spielueberschrift*/
        //const title = this.add.text(275, 50, "Back to school", { fontSize: '56px', fill: '#ffffff', backgroundColor: '#e85555'});


        /*****Menue Buttons ***/

        //Start Button
        const startButton = this.add.image(500, 300, 'startButton').setInteractive({useHandCursor: true});
        handleButtons(startButton, () => {
            if(!modalActive){
                this.scene.start('GameScene');
                //switchScene('GameScene');
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
        const soundButton = this.add.image(800,50, 'soundButton');
        handleButtons(soundButton, () =>{
            if(!modalActive){
                console.log('Sound Button wurde geklickt');
            }

        });

        //Music Button
        //const musicButton = this.add.image(900,50, 'musicButton');

        const buttonImages = ['musicButton', 'noMusicBtn'];
        let currentButtonImageIndex = 0;

        const musicButton = this.add.image(900, 50, buttonImages[currentButtonImageIndex]);

        handleButtons(musicButton, () =>{
            if(!modalActive){
                // Toggle zwischen den Bildern
                currentButtonImageIndex = (currentButtonImageIndex + 1) % buttonImages.length;

                // Setze das Bild des Buttons entsprechend dem Index im Array
                musicButton.setTexture(buttonImages[currentButtonImageIndex]);

                console.log('Musik Button wurde geklickt')
            }

        });





    }
}

