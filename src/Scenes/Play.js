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
        this.load.image('planet1', './assets/planet1.png');
        this.load.image('planet2', './assets/planet2.png');
        this.load.image('planet3', './assets/planet3.png');

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
    
        // add sun (p1)
        this.sun = new Sun(this, game.config.width/2, game.config.height/2, 'sun').setOrigin(0.5, 0.5);

        //add asteroids (x3)
        this.asteroid01 = new Asteroid(this, game.config.width + borderUISize*6, borderUISize*4, 'asteroid', 0, 30).setOrigin(0, 0);
        this.asteroid02 = new Asteroid(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'asteroid', 0, 20).setOrigin(0,0);
        this.asteroid03 = new Asteroid(this, game.config.width, borderUISize*6 + borderPadding*4, 'asteroid', 0, 10).setOrigin(0,0);
        
        // Add stardust FIXME
        this.stardust01 = new Stardust(this, game.config.width, game.config.height/2, 'stardust', 0, 20).setOrigin(0,0);

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

        // Initialize progress bar for stardust
        this.healthBar = this.makeBar(140,100,0x2ecc71);
        this.setValue(this.healthBar, 0);

        // initialize player life and planets
        life = 1;
        planetCount = 0;

        //Game Over flag
        this.gameOver  = false;
        this.scoreConfig.fixedWidth = 0;
    }

    update() {
        // End game when life = 0. Life will go up when collecting enough dust to make a planet
        if (life <= 0){
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
            // update sun sprite
            this.sun.update();
            // update asteroids (x3)
            this.asteroid01.update();
            this.asteroid02.update();
            this.asteroid03.update();
            // Update stardust
            this.stardust01.update();
            // update any planets
            if (planetCount >= 1){
                this.planet1.update(this.sun);
            }
            if (planetCount >= 2){
                this.planet2.update(this.sun);
            }
            if (planetCount == 3){
                this.planet3.update(this.sun);
            }
        }

        // check collisions for asteroids
        if(this.checkCollision(this.sun, this.asteroid03)) {
            this.hitAsteroid(this.asteroid03);
        }
        if (this.checkCollision(this.sun, this.asteroid02)) {
            this.hitAsteroid(this.asteroid02);
        }
        if (this.checkCollision(this.sun, this.asteroid01)) {
            this.hitAsteroid(this.asteroid01);
        }

        // Check collisions for stardust
        if (this.checkCollision(this.sun, this.stardust01)) {
            this.collectStardust(this.stardust01);
            if (life == 6 || life == 11 || life == 16){ //determines when the planets spawn, offset by 1 because sun starts at 1 life
                this.addPlanet();
            }
        }
    }

    checkCollision(theSun, asteroid) {
        // simple AABB checking
        if (theSun.x - theSun.width/2 < asteroid.x + asteroid.width && 
            theSun.x + theSun.width/2 > asteroid.x && 
            theSun.y - theSun.height/2 < asteroid.y + asteroid.height &&
            theSun.height/2 + theSun.y > asteroid. y) {
                return true;
        } else {
            return false;
        }
    }

    asteroidExplode(asteroid) {
        // temporarily hide asteroid
        asteroid.alpha = 0;
        this.sound.play('sfx_explosion');
        // create explosion sprite at asteroid's position
        let boom = this.add.sprite(asteroid.x, asteroid.y, 'explosion').setOrigin(0, 0);
        asteroid.reset();                         // reset asteroid position
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          asteroid.alpha = 1;                       // make asteroid visible again
          boom.destroy();                       // remove explosion sprite
        });
      }

    hitAsteroid(asteroid) {
        this.asteroidExplode(asteroid);
        life -= 5; //damage to player (should equal increment when planets appear)

        // Update health bar
        this.setValue(this.healthBar, life);

        //kill a planet if there is one
        if (planetCount == 1){
            this.planet1.destroy();
            planetCount -= 1;
        } else if (planetCount == 2){
            this.planet2.destroy();
            planetCount -= 1;
        } else if (planetCount == 3){
            this.planet3.destroy();
            planetCount -= 1;
        }
    }

    collectStardust(stardust) {
        stardust.reset(); //only resetting it to mess with alpha and such with timer in the Prefab for Stardust
        if (life != 15){
            life += 1;
        }
        console.log("gathered dust");
        console.log(life);

        // Increase progress bar
        this.setValue(this.healthBar, life);

        // score add and repaint
        this.p1Score += stardust.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion'); 
    }

    addPlanet() {
        if (planetCount == 0){
            this.planet1 = new Planet(this, this.sun.x, this.sun.y, 'planet1', 0, -2).setOrigin(0.5, 0.5);
            planetCount += 1;
        } else if (planetCount == 1){
            this.planet2 = new Planet(this, this.sun.x, this.sun.y, 'planet2', 0, -0.9).setOrigin(0.5, 0.5);
            planetCount += 1;
        } else if (planetCount == 2){
            this.planet3 = new Planet(this, this.sun.x, this.sun.y, 'planet3', 0, -0.6).setOrigin(0.5, 0.5);
            planetCount += 1;
        }
    }

    makeBar(x, y, color) {
        //draw the bar
        let bar = this.add.graphics();

        //color the bar
        bar.fillStyle(color, 1);

        //fill the bar with a rectangle
        bar.fillRect(0, 0, 200, 50);
        
        //position the bar
        bar.x = x;
        bar.y = y;

        //return the bar
        return bar;
    }
    setValue(bar,percentage) {
        //scale the bar
        bar.scaleX = percentage/15;
    }
}