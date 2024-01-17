/**
 * In dieser Klasse werden die Grundelemente (config) des Spiels definiert
 * und ein neues Phaser-Spiel erstellt
 */

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: [
        PreloadScene, //Fuege die PreloadSzene hinzu
        StartScene, // Fuege die StartSzene hinzu
        GameScene,  // Fuege die GameScene hinzu
        LevelScene,  // Fuege die LevelScene hinzu
        ChooseCharacterScene

    ],
    backgroundColor: '#898080',
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: { y: 350 }
        }
    }
}

const game = new Phaser.Game(config);



