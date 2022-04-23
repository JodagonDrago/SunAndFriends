// Rocket prefab
class Sun extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);

      //some parameters
      this.isFiring = false;
      this.moveSpeedX = 0.0;
      this.moveSpeedY = 0.0;
      this.maxSpeed = 4.0;
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update(){
        //movement
        this.x +=this.moveSpeedX;
        this.y +=this.moveSpeedY;
        if(keyLEFT.isDown && this.x >= borderUISize + this.width && this.moveSpeedX > -this.maxSpeed){
            this.moveSpeedX -= 0.2;
        }
        if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width && this.moveSpeedX < this.maxSpeed){
            this.moveSpeedX += 0.2;
        }
        if(keyUP.isDown && this.y >= borderUISize && this.moveSpeedY > -this.maxSpeed){
            this.moveSpeedY -= 0.2;
        }
        if(keyDOWN.isDown && this.y <= game.config.height - borderUISize - this.height && this.moveSpeedY < this.maxSpeed){
            this.moveSpeedY += 0.2;
        }
        //stop acceleration if hitting a border
        if(this.x < borderUISize + this.width){
            this.moveSpeedX = 0.2;
        }
        if(this.x > game.config.width - borderUISize - this.width){
            this.moveSpeedX = -0.2;
        }
        if(this.y < borderUISize){
            this.moveSpeedY = 0.2;
        }
        if(this.y > game.config.height - borderUISize - this.height){
            this.moveSpeedY = -0.2;
        }
    }

    //reset sun
    reset(){
        this.y = game.config.height/2;
        this.x = game.config.width/2;
    }
}