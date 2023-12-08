class Timer {
    constructor(scene, x, y, initialTime){
        this.scene = scene;
        this.initialTime = initialTime;


        this.timerStyle = {
            fontSize: "52px",
            fill: "#000000",
            fontWeight: "bold"
        };

        this.timer = this.scene.add.text(x ,y, this.formatTime(this.initialTime), this.timerStyle);
        this.timer.setShadow(0, 4, 'rgba(0, 0, 0, 0.25)', 4);

        this.timedEvent = this.scene.time.addEvent({
           delay: 1000,
           callback: this.onTimerTick,
           callbackScope: this,
           loop: true
        });
    }

    onTimerTick() {
        if(this.initialTime > 0){
            this.initialTime -= 1;
        } else{
            this.gameOver();
        }

        this.timer.setText(this.formatTime(this.initialTime));
    }

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

    gameOver(){
        console.log('Zeit abgelaufen');
    }
}