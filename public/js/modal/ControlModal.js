/**
 * Bei dieser Klasse handelt es sich um eine Unterklasse von
 * Modal.
 * Stellt das Modal fuer die Steuerunginfos dar.
 */
class ControlModal extends Modal{
    constructor(scene, x, y){
        super(scene, x,y);

        this.headline = scene.add.image(505, 200, 'controlsTitle')
        this.headline.setScale(0.8);

        this.controllerImage = scene.add.image(500, 350, 'controllerInfo');
        this.controllerImage.setScale(0.5);

        //Elemente zum ControlModal hinzufuegen
        this.add(this.closeButton);
        this.add(this.headline);
        this.add(this.controllerImage);
    }


}