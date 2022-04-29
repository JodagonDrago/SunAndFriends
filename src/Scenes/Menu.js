class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('music', './assets/space_track.wav');
    }

    create(){
        //menu text configuration
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '72px',
            backgroundColor: '#fcba03',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize - borderPadding, 'Sun and Friends', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#000000';
        menuConfig.color = '#fcba03';
        menuConfig.fontSize = '28px';
        this.add.text(game.config.width/2, game.config.height/2, 'Press T for tutorial', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        //get some music going
          this.game.sound.stopAll();
          music = this.sound.add('music', {volume: 0.5});
          music.setLoop(true);
          music.play();

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            asteroidSpeed: 6,
            stardustSpeed: 3,  
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            asteroidSpeed: 8,
            stardustSpeed: 4,   
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyT)) {
          this.sound.play('sfx_select');
          this.scene.start('tutorialScene');
        }
      }
}