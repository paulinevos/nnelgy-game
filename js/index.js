var config = {
    type: Phaser.AUTO,
    width: 384,
    height: 256,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }   
};

let game = new Phaser.Game(config);
let player;
let cursors;
let speed;

function preload() 
{
    this.load.image("tiles", "assets/images/tilemap.png");
    this.load.image("player", "assets/images/sprite.png");
    this.load.tilemapTiledJSON("map", "assets/tilemap/tilemap.json");
}

function create()
{
    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage("tilemap", "tiles");

    const backgroundLayer = map.createStaticLayer("belowPlayer", tiles, 0, 0);
    const tvLayer = map.createStaticLayer("tvLayer", tiles, 0, 0);
    tvLayer.setCollisionByProperty({ collides: true });

    player = this.physics.add.sprite(16, 64, "player");
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, tvLayer);

    cursors = this.input.keyboard.createCursorKeys();
    speed = 100;
}

function update()
{
    // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
        player.body.setVelocityX(-100);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(100);
    }

    // Vertical movement
    if (cursors.up.isDown) {
        player.body.setVelocityY(-100);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(100);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);
}
