class InfoModal extends Modal{
    constructor(scene, x, y){
        super(scene, x,y);

        this.headline = scene.add.image(505, 200, 'tutorialTitle');
        this.headline.setScale(0.8);

        // Elemente zum Container hinzufügen
        this.add(this.modalWindow);
        this.add(this.closeButton);
        this.add(this.headline);




    }
}