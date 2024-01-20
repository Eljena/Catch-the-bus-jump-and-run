/**
 * Diese Klasse verwaltet Methoden zum Status eines Modals sowie zum Erstellen eines Modals
 */
class ModalController {
    constructor() {
        //Default: Modalstatus auf false
        this.modalActive = false;
    }
    /**
     * Erstellt ein Modalfenster
     * @param scene             Szene
     * @param modalType         Typ des Modals
     * @param x                 Position auf der x-Achse
     * @param y                 Position auf der y-Achse
     * @param callback          Callback-Methode
     */
    createModal(scene, modalType, x, y, callback) {
        if(!this.isModalActive()) {
            this.setModalActive(true);

            //Erstelle neues Modalfenster
            const modal = new modalType(scene, x, y);

            if(modalType === LooseModal || modalType === WinModal){
                //Wenn die Callback-Methode nicht gleich null ist, dann rufe sie aus
                if(callback !== null){
                    callback();
                }
            }

            //Prueft, ob es sich beim Erstellen um ein Modalfenster aus der GameScene handelt
            if(modalType === PauseModal || modalType === WinModal || modalType === LooseModal){
                //stellt sicher, dass Modal an einer festen Position im Spielbereich bleibt, unabhaengig davon wohin die Kamera sich bewegt
                modal.setScrollFactor(0);
            }

            //wird ausgefuehrt, wenn Spieler das Modalfenster schliesst
            modal.setOnModalClose(() => {
                //setze Modalstatus auf false
                this.setModalActive(false);
                //wenn Callback-Methode nicht null ist, rufe ihn aus -> wird fuer Pause-Modal verwendet (resumeGame)
                if(callback !== null){
                    callback();
                }
            });

            //fuege Modal zur Szene hinzu
            scene.add.existing(modal);
            //zeige Modal
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