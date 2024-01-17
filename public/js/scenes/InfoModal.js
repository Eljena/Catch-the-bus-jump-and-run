class InfoModal extends Modal{
    constructor(scene, x, y){
        super(scene, x,y);

        this.headline = scene.add.image(505, 150, 'tutorialTitle');
        this.headline.setScale(0.8);

        this.tutorialText = scene.add.image(500, 340, 'tutorialText');
        this.tutorialText.setScale(0.8);

        // Elemente zum Container hinzufuegen
        this.add(this.modalWindow);
        this.add(this.closeButton);
        this.add(this.headline);
        this.add(this.tutorialText);




    }
}