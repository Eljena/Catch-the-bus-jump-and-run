class LooseModal extends Modal{
    constructor(scene, x, y){
        super(scene, x, y);

        //Ueberschrift und Buttons hinzufuegen
        this.headline = scene.add.image(505, 200, 'looseTitle');
        this.restartButton = scene.add.image(500, 400, 'restartButton');
        this.homeButton = scene.add.image(450, 400, 'homeButton');

        //Buttons skalieren
        const scaleFactor = 0.75;
        this.homeButton.setScale(scaleFactor);

        //Stellt sicher, dass die Position der Buttons unabhaengig von der Kamerabewegung bleibt
        this.homeButton.setScrollFactor(0);

        //Elemente zu WinModal hinzufuegen
        this.add(this.closeButton);
        this.add(this.headline);
        this.add(this.homeButton);

        //Szenenwechselhandler
        this.sceneChangeHandler('StartScene');

    }
    getButtonForScene(sceneKey){
        if(sceneKey === 'StartScene'){
            return this.homeButton;
        }
    }
}