class WinModal extends Modal{
    constructor(scene, x, y){
        super(scene, x, y);

        //Ueberschrift und Buttons hinzufuegen
        this.headline = scene.add.image(505, 200, 'winTitle');
        this.homeButton = scene.add.image(350, 400, 'homeButton');
        this.selectLvlButton = scene.add.image(350, 400, 'selectLvlButton');

        //Buttons skalieren
        this.homeButton.setScale(this.scaleFactorBtn);
        this.selectLvlButton.setScale(this.scaleFactorBtn);

        //Stellt sicher, dass die Position der Buttons unabhaengig von der Kamerabewegung bleibt
        this.homeButton.setScrollFactor(0);
        this.selectLvlButton.setScale(this.scaleFactorBtn);

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