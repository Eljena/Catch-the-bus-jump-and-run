/**
 * Die SoundController-Klasse verwaltet alle Audio-Elemente des Spiels,
 * einschließlich Musik und Soundeffekten. Sie implementiert das Singleton-Muster,
 * um sicherzustellen, dass nur eine Instanz der Klasse existiert.
 */
class SoundController{
    //Instanzvariabel fuer das Singleton-Muster
    static instance;
    constructor(){
        if (SoundController.instance) {
            return SoundController.instance;
        }
        this.introMusic = null;
        this.gameplayMusic = null;
        this.winSound = null;
        this.looseSound = null;
        this.buttonClick = null;
        this.soundButtonActive = true;
        this.musicButtonActive = true;
        this.soundButton = null;
        this.musicButton = null;
        this.looseSoundPlayed = false;

        SoundController.instance = this;
    }

    initializeSounds(scene){
        //Intro Musik
        if(!this.introMusic){
            this.introMusic = scene.sound.add('introMusic', { loop: true, volume: 0.5 });
        }
        //Gameplay Musik
        this.gameplayMusic = scene.sound.add('gameplayMusic', { loop: true, volume: 0.5 });
        //Sounds
        this.buttonClick = scene.sound.add('buttonClick');
        this.winSound = scene.sound.add('winSound');
        this.looseSound = scene.sound.add('looseSound');

    }

    playButtonClick() {
        if(this.buttonClick) {
            this.buttonClick.play();
        }
    }

    playWinSound(){
        if(this.winSound) {
            this.winSound.play();
        }
    }

    playLooseSound(){
        if(this.looseSound && !this.looseSoundPlayed) {
            this.looseSound.play();
            this.looseSoundPlayed = true;
        }
    }

    /**
     * Methode zum Zuruecksetzen des Status von looseSoundPlayed
     */
    resetLooseSoundStatus() {
        this.looseSoundPlayed = false;
    }

    /**
     * Startet die Intro-Musik.
     */
    playIntroMusic() {
        if (this.introMusic && !this.introMusic.isPlaying) {
            this.introMusic.play();
        }
    }

    /**
     * Startet die Gameplay-Musik.
     */
    playGameplayMusic() {
        if (this.gameplayMusic && !this.gameplayMusic.isPlaying) {
            this.gameplayMusic.play();
        }
    }

    /**
     * Stoppt die Intro-Musik.
     */
    stopIntroMusic() {
        if (this.introMusic && this.introMusic.isPlaying) {
            this.introMusic.stop();
        }
    }

    /**
     * Stoppt die Gameplay-Musik.
     */
    stopGameplayMusic() {
        if (this.gameplayMusic && this.gameplayMusic.isPlaying) {
            this.gameplayMusic.stop();
        }
    }

    /**
     * Diese Methode soergt dafuer, dass der Sound deaktiviert wird
     */
    toggleSound(){
        this.soundButtonActive = !this.soundButtonActive;
        if(this.soundButton){
            if(this.soundButtonActive){
                this.soundButton.setTexture('soundButton');
            } else{
                this.soundButton.setTexture('noSoundButton');
            }
        }
        // Sound aktivieren/deaktivieren
        this.buttonClick.setMute(!this.soundButtonActive);
        this.winSound.setMute(!this.soundButtonActive);
        this.looseSound.setMute(!this.soundButtonActive);
    }

    /**
     * Diese Methode soergt dafuer, dass die Musik deaktiviert wird
     */
    toggleMusic(){
        this.musicButtonActive = !this.musicButtonActive;
        if(this.musicButton){
            if(this.musicButtonActive) {
                this.musicButton.setTexture('musicButton');
            } else {
                this.musicButton.setTexture('noMusicButton');
            }
        }
        // Musik aktivieren/deaktivieren
        this.introMusic.setMute(!this.musicButtonActive);
        this.gameplayMusic.setMute(!this.musicButtonActive);
    }

    /**
     * Aktualisiert den visuellen Status des Soundbuttons und passt die Sounds entsprechend an.
     * Wenn der Soundbutton aktiv ist, wird das Bild auf 'soundButton' gesetzt und der Sound wird aktiviert.
     * Wenn der Soundbutton deaktiviert ist, wird das Bild auf 'noSoundButton' gesetzt und der Sound wird deaktiviert.
     */
    updateSoundStatus(){
        if (this.soundButtonActive) {
            this.soundButton.setTexture('soundButton');
            //Sound aktivieren
            this.buttonClick.setMute(false);
            this.winSound.setMute(false);
            this.looseSound.setMute(false);
        } else {
            this.soundButton.setTexture('noSoundButton');
            //Sound deaktivieren
            this.buttonClick.setMute(true);
            this.winSound.setMute(true);
            this.looseSound.setMute(true);
        }
    }

    /**
     * Aktualisiert den visuellen Status des Musikbuttons und passt die Musik entsprechend an.
     * Wenn der Musikbutton aktiv ist, wird das Bild auf 'musicButton' gesetzt und die Musik wird aktiviert.
     * Wenn der Musikbutton deaktiviert ist, wird das Bild auf 'noMusicButton' gesetzt und die Musik wird deaktiviert.
     */
    updateMusicStatus(){
        if(this.musicButtonActive){
            this.musicButton.setTexture('musicButton');
            //Musik aktivieren
            this.introMusic.setMute(false);
            this.gameplayMusic.setMute(false);
        } else{
            this.musicButton.setTexture('noMusicButton');
            //Musik deaktivieren
            this.introMusic.setMute(true);
            this.gameplayMusic.setMute(true);
        }
    }

}