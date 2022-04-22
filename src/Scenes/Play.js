class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('sun', './assets/sun.png'); //this will need to be changed when the sun asset is made
        this.load.image('asteroid', './assets/asteroid.png');
        this.load.image('stardust', './assets/stardust.png');
        this.load.image('starfield', './assets/starfield.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
    
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height/2, 'sun').setOrigin(0.5, 0);

        //add asteroids (x3)
        this.asteroid01 = new Asteroid(this, game.config.width + borderUISize*6, borderUISize*4, 'asteroid', 0, 30).setOrigin(0, 0);
        this.asteroid02 = new Asteroid(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'asteroid', 0, 20).setOrigin(0,0);
        this.asteroid03 = new Asteroid(this, game.config.width, borderUISize*6 + borderPadding*4, 'asteroid', 0, 10).setOrigin(0,0);
        
        // Add stardust FIXME
        this.stardust01 = new Stardust(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'stardust', 0, 20).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        // display score
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderPadding, borderPadding, this.p1Score, this.scoreConfig);

        // initialize player life
        life = 1;

        //Game Over flag
        this.gameOver  = false;
        this.scoreConfig.fixedWidth = 0;
    }

    update() {
        // End game when life = 0. Life will go up when collecting enough dust to make a planet
        if (life == 0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if (!this.gameOver){
            // update rocket sprite
            this.p1Rocket.update();
            // update asteroids (x3)
            this.asteroid01.update();
            this.asteroid02.update();
            this.asteroid03.update();
            // Update stardust
            this.stardust01.update();
        }

        // check collisions for asteroids
        if(this.checkCollision(this.p1Rocket, this.asteroid03)) {
            this.hitAsteroid(this.asteroid03);
        }
        if (this.checkCollision(this.p1Rocket, this.asteroid02)) {
            this.hitAsteroid(this.asteroid02);
        }
        if (this.checkCollision(this.p1Rocket, this.asteroid01)) {
            this.hitAsteroid(this.asteroid01);
        }

        // Check collisions for stardust
        if (this.checkCollision(this.p1Rocket, this.stardust01)) {
            this.collectStardust(this.stardust01);
            console.log("gathered dust");
            console.log(life);
        }
    }

    checkCollision(rocket, asteroid) {
        // simple AABB checking
        if (rocket.x < asteroid.x + asteroid.width && 
            rocket.x + rocket.width > asteroid.x && 
            rocket.y < asteroid.y + asteroid.height &&
            rocket.height + rocket.y > asteroid. y) {
                return true;
        } else {
            return false;
        }
    }

    asteroidExplode(asteroid) {
        // temporarily hide asteroid
        asteroid.alpha = 0;
        // create explosion sprite at asteroid's position
        let boom = this.add.sprite(asteroid.x, asteroid.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          asteroid.reset();                         // reset asteroid position
          asteroid.alpha = 1;                       // make asteroid visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += asteroid.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion'); 
      }

      hitAsteroid(asteroid) {
        asteroid.alpha = 0;
        asteroid.reset();
        asteroid.alpha = 1;
        life -= 1;
      }

      collectStardust(stardust) {
          stardust.alpha = 0;
          stardust.reset();
          stardust.alpha = 1;
          life += 1;
      }
}