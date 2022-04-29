class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }

    create(){
        //menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#fcba03',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'How to play:', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#000000';
        menuConfig.color = '#fcba03';
        this.add.text(game.config.width/2, game.config.height/4, 'Use arrow keys to move. In space, you keep your momentum.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize + borderPadding, 'Collect enough space dust and you will form planets.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize *2 + borderPadding *2, 'Getting hit by an asteroid will lose a planet.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize *3 + borderPadding *3, 'Getting hit without a planet is game over.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize *4 + borderPadding *4, 'Press T to return to main menu.', menuConfig).setOrigin(0.5);

        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyT)) {
          this.sound.play('sfx_select');
          this.scene.start('menuScene');    
        }
    }

}