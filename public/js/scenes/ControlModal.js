class ControlModal extends Modal{
    constructor(scene, x, y){
        super(scene, x,y);

        this.headline = scene.add.text(this.headlineX, this.headlineY, 'Steuerung', {fontSize: '24px', fill: '#ffffff'});

        // Elemente zum Container hinzufügen
        this.add(this.modalWindow);
        this.add(this.closeButton);

        this.add(this.headline);




    }
}