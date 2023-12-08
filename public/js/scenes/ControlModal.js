class ControlModal extends Modal{
    constructor(scene, x, y){
        super(scene, x,y);

        this.headline = scene.add.text(this.headlineX, this.headlineY, 'Steuerung', this.textStyle);

        // Elemente zum Container hinzufügen
        this.add(this.modalWindow);
        this.add(this.closeButton);

        this.add(this.headline);

        this.controllerImage = scene.add.image(x + 500,y + 300, 'controllerInfo');
        this.controllerImage.setScale(0.5);
        this.add(this.controllerImage); // Bild zum Modal hinzufügen

    }


}