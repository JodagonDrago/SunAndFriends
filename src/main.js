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

//Creative Tilt:
//Technically Interesting: Added bodies that follow the player and rotate about the player at various speeds to make a solar system, and also serve as earnable lives
//Visual Style: We implemented paralax movement in the scrolling stars, as well as 'friends' orbitting bodies around the sun