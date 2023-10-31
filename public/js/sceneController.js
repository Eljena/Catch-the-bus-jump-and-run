/**
 * Controller-Klasse fuer die Szenen
 */

document.getElementById('startButton').addEventListener('click', function(){
    switchScene('GameScene');
});

function switchScene(sceneName){
    if(sceneName === 'GameScene'){
        game.scene.start('GameScene');

    } else {
        console.log('Wird zu andere Szene geswitcht...');
    }
}