//Collaborators:
//Joseph Squires, Syvan Novom, Aaron Gonzales

//Game title:
//Sun and Friends

//Completed: 5/1/2022

//Creative Tilt:
//Technically Interesting: Added bodies that share a prefab to follow the player and rotate about the player at various speeds to visually make a solar system, and mechanicly serve as earnable lives
//Visual Style: We implemented paralax movement in the scrolling stars, as well as 'friends' orbitting bodies around the sun

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