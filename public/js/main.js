/**
 * Hier werden die Grundelemente des Spiels definiert
 */
const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: [
        StartScene, // Füge die Startszene hinzu
        GameScene,  // Füge die GameScene hinzu
        LevelScene  // Füge die LevelScene hinzu
    ],
    backgroundColor: '#898080',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },   //umso hoeher y, desto schneller faellt der Spieler auf den Boden
            debug: false
        }
    }
}

const game = new Phaser.Game(config);



//Hier werden Spielressourcen geladen, z.B. Bilder & Audiodateien
function preload(){


}

//Hier werden die Spielobjekte und -logik initialisiert
function create(){


}



