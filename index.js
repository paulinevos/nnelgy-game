var config = {
    type: Phaser.AUTO,
    width: 384,
    height: 256,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: true,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },

};

let game = new Phaser.Game(config);
let player;
let cursors;
let speed;
let television;

function preload() 
{
    this.load.image("tiles", "assets/images/tilemap.png");
    this.load.tilemapTiledJSON("map", "assets/tilemap/tilemap.json");

    this.load.image("player", "assets/images/sprite.png");
    this.load.image("halo", "assets/images/transparent.png");
}

function create()
{
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("Living room", "tiles");

    const spawnPoint = map.findObject("Objects", obj => obj.name === "spawnPoint");
    const television = map.findObject("Objects", obj => obj.name === "television");

    objects = map.getObjectLayer('Objects');
    console.log(objects);

    const backgroundLayer = map.createStaticLayer("belowPlayer", tileset, 0, 0);
    const abovePlayer = map.createStaticLayer("abovePlayer", tileset, 0, 0);

    backgroundLayer.setCollisionByProperty({ collides: true });
    abovePlayer.setCollisionByProperty({ collides: true });

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player")
        .setSize(16, 32);

    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, backgroundLayer);
    this.physics.add.collider(player, abovePlayer);

    this.physics.add.overlap(player, objects, handleOverlap, null, this);

    abovePlayer.setDepth(10);

    cursors = this.input.keyboard.createCursorKeys();
    speed = 100;
}

function handleOverlap(player, object)
{
    console.log(object);
}

function update()
{    
    this.physics.overlap(player, television, handleOverlap, null, this);
    // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
        player.body.setVelocityX(-100);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(100);
    }

    // // Vertical movement
    if (cursors.up.isDown) {
        player.body.setVelocityY(-100);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(100);
    }

    // // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);
}

function checkNear(chkObject)
{
    console.log(chkObject, 'is near')
}
