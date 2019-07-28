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
    this.load.image("tiles", "assets/images/tilemap.png");
    this.load.tilemapTiledJSON("map", "assets/tilemap/tilemap.json");
}

function create()
{
    const map = this.make.tilemap({ key: "map" });

    const tiles = map.addTilesetImage("tilemap", "tiles");
    const backgroundLayer = map.createStaticLayer("belowPlayer", tiles, 0, 0);
    const tvLayer = map.createStaticLayer("tvLayer", tiles, 0, 0);
}

function update()
{
    // TODO
}
