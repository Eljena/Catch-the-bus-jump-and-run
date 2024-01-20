/**
 * Der Button-Controller behandelt Ereignisse, bei denen Buttons geklickt werden.
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

