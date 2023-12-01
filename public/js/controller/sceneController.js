/**
 * Controller-Klasse fuer die Szenen
 */



function switchScene(sceneName){
    if(sceneName === 'GameScene'){
        game.scene.start('GameScene');
    } else if(sceneName === 'StartScene') {
        console.log("Wechsel zu Startszene");
    } else if(sceneName === 'LevelScene'){
        console.log("Wechsel zu Levelszene");
    }
    else{
        console.log('Wird zu andere Szene geswitcht...');
    }
}
