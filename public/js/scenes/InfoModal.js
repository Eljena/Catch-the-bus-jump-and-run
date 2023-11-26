class InfoModal extends Modal{
    constructor(scene, x, y){
        super(scene, x,y);

        this.headline = scene.add.text(300, 120, 'Headline', {fontSize: '24px', fill: '#ffffff'});

        // Elemente zum Container hinzufügen
        this.add(this.modalBackground);
        this.add(this.modalWindow);
        this.add(this.closeButton);

        this.add(this.headline);




    }
}