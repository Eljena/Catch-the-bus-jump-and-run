class InfoModal extends Modal{
    constructor(scene, x, y){
        super(scene, x,y);

        this.headline = scene.add.text(this.headlineX, this.headlineY, 'Game Info', this.textStyle);

        // Elemente zum Container hinzufügen
        this.add(this.modalWindow);
        this.add(this.closeButton);
        this.add(this.headline);




    }
}