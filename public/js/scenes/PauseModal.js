class PauseModal extends Modal {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.headline = scene.add.text(this.headlineX, this.headlineY, "Pausiert", this.textStyle);
        this.homeButton = (scene.add.image(350, 400, 'homeButton'));
        this.restartButton = scene.add.image(500, 400, 'restartButton');
        this.continueButton = scene.add.image(650, 400, 'continueButton');

        //Buttons skalieren
        const scaleFactor = 0.75;
        this.homeButton.setScale(scaleFactor);
        this.restartButton.setScale(scaleFactor);
        this.continueButton.setScale(scaleFactor);

        //Elemente zum Container hinzufügen
        this.add(this.modalWindow);
        this.add(this.closeButton);
        this.add(this.headline);
        this.add(this.homeButton);
        this.add(this.restartButton);
        this.add(this.continueButton);

        //Szenenwechselhandler
        this.sceneChangeHandler('StartScene');
        this.sceneChangeHandler('GameScene');
        //TODO Spiel fortfahren

    }

    getButtonForScene(sceneKey){
        if(sceneKey === 'StartScene'){
            return this.homeButton;
        } else if(sceneKey === 'GameScene'){
            //GameScene wird neu gestartet
            return this.restartButton;
        } //TODO GameScene soll fortfahren

    }

    preload(){

    }

    create(){

    }
}