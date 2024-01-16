/**
 * Diese Klasse verwaltet den Timer in der GameScene
 * Erstellt einen Timer mit einer bestimmten initialen Zeit
 * und aktualisiert die Anzeige alle Sekunde.
 * Enthaelt Methoden zum Aktualisieren, Anhalten, Fortsetzen des Timers und zur Behandlung,
 * wenn der Timer ablaeuft
 */
class Timer {
    constructor(scene, x, y, initialTime, guiContainer, onTimeExpiredCallback){
        this.scene = scene;
        this.initialTime = initialTime;

        this.guiContainer = guiContainer;

        this.onTimeExpiredCallback = onTimeExpiredCallback;


        this.timerStyle = {
            fontSize: "52px",
            fill: "#000000",
            fontWeight: "bold"
        };

        this.timer = this.scene.add.text(x ,y, this.formatTime(this.initialTime), this.timerStyle);
        this.timer.setShadow(0, 4, 'rgba(0, 0, 0, 0.25)', 4);
        this.guiContainer.add(this.timer);

        this.timedEvent = this.scene.time.addEvent({
           delay: 1000,     //Legt fest, dass das Ereignis alle 1000 Milisekunden ausgeloest wird
           callback: this.onTimerTick,  //Gibt die Methode an, die jedes Mal aufgerufen wird
           callbackScope: this,     //Definiert den Kontext, in dem Callback-Funktion aufgerufen wird
           loop: true   //Event laueft in einer Endlosschleife ab
        });
    }

    /**
     * Aktualisiert den Timer, verringert die verbleibende Zeit und aktualisiert die Anzeige.
     * Ruft gameOver auf, wenn die Zeit abgelaufen ist
     */
    onTimerTick() {
        if(this.initialTime > 0){
            this.initialTime -= 1;
        } else{
            this.timeExpired();
        }
        this.timer.setText(this.formatTime(this.initialTime));
    }

    /**
     * Methode zum Formatieren der Minuten-Anzeige
     * @param seconds
     * @returns {string}
     */
    formatTime(seconds){
        const minutes = Math.floor(seconds / 60);   //berechnet die verbleibenden Minuten
        const partInSeconds = seconds % 60; //berechnet die verbleibenden Sekunden
        const partInSecondsStr = partInSeconds.toString().padStart(2, '0'); //wandelt Wert in Strings um
        return minutes + ':' + partInSecondsStr;
    }

    /**
     * Methode, um den Timer zu stoppen
     */
    stopTimer() {
        if (this.timedEvent) {
            this.timedEvent.remove();
        }
    }

    /**
     * Methode, um den Timer fortzusetzen
     */
    resumeTimer() {
        this.timedEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        });
    }

    timeExpired(){
        console.log('Zeit abgelaufen');
        //Rufe das Callback auf, um die Level-Klasse zu informieren
        if (this.onTimeExpiredCallback) {
            this.onTimeExpiredCallback();
        }
    }
}