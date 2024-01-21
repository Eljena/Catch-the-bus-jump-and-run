/**
 * Der Button-Controller behandelt Ereignisse, bei denen Buttons geklickt werden.
 */

/**
 * Der Button-Controller behandelt Ereignisse, bei denen Buttons geklickt werden.
 * @param button    Der interaktive Button.
 * @param onClick   Die Funktion, die bei einem Klick auf den Button ausgefuehrt wird.
 */
const handleButtons = (button, onClick) =>{
    button.setInteractive({useHandCursor: true});
    button.setScale(0.5);

    button.on('pointerdown', () => {
        onClick();
    });
    button.on('pointerover', () => {
        button.setTint(0xCCCCCC);
    });
    button.on('pointerout', () => {
        button.clearTint();
    });
}

