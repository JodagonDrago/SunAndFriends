let config = {
    type: Phaser.CANVAS,
    width: window.innerWidth,
    height: window.innerHeight,
    autoCenter: true, //this centers the game in the window
    scene: [Menu, Play, Tutorial]
}
let game = new Phaser.Game(config)

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyT;

//reserve global variables
let life, planetCount, music, musicOff;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;