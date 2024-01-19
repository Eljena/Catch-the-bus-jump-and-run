//Variable zum Pruefen, ob Modalfenster geoeffnet ist
let modalActive= false;

/**
 * Diese Klasse verwaltet Methoden zum Status eines Modals sowie zum Erstellen eines Modals
 */
class ModalController {
    constructor() {
        this.modalActive = false;   //Default modal nicht aktiv
    }
    /**
     * Erstellt ein Modalfenster
     * @param scene             Szene
     * @param modalType         Typ des Modals
     * @param x                 Position auf der x-Achse
     * @param y                 Position auf der y-Achse
     * @param onCloseCallback   Callback-Methode
     */
    createModal(scene, modalType, x, y, onCloseCallback) {
        if(!this.isModalActive()) {
            this.setModalActive(true);

            const modal = new modalType(scene, x, y);

            if(modalType === LooseModal){
                //Stoppt die Hintergrundmusik vom gameplay
                gameplayMusic.stop();
                //Spielt den Verloren-Sound ab
                looseSound.play();
                if(onCloseCallback !== null){
                    onCloseCallback();  //Hier wird der Callback aufgerufen
                }
            } else if(modalType === WinModal){
                //Stoppt die Hintergrundmusik vom gameplay
                gameplayMusic.stop();
                //Spielt den Gewonnen-Sound ab
                winSound.play();
                if(onCloseCallback !== null){
                    onCloseCallback();  //Hier wird der Callback aufgerufen
                }
            }

            if(modalType === PauseModal || modalType === WinModal || modalType === LooseModal){
                modal.setScrollFactor(0);
                scene.add.existing(modal);
            }

            modal.setOnModalClose(() => {
                this.setModalActive(false);
                if(onCloseCallback !== null){
                    onCloseCallback();  //Hier wird der Callback aufgerufen
                }
            });

            scene.add.existing(modal);
            modal.showModal();
        }
    }

    /**
     * set-Methode fuer den Modalstatus
     */
    setModalActive(value) {
        this.modalActive = value;
    }

    /**
     * get-Methode fuer den Modalstatus
     */
    isModalActive() {
        return this.modalActive;
    }
}