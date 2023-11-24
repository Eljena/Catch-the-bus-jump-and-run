/**
 * Controller-Klasse fuer die Szenen
 */



function switchScene(sceneName){
    if(sceneName === 'GameScene'){
        game.scene.start('GameScene');
    } else {
        console.log('Wird zu andere Szene geswitcht...');
    }
}
