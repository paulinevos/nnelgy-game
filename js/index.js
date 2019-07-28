var config = {
    type: Phaser.AUTO,
    width: 384,
    height: 256,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {debug: true}
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
var walls;
var floor;

function preload() 
{
}

function create()
{
}

function update()
{
    // TODO
}
