// Sun prefab
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
        if(keyLEFT.isDown && this.x - this.width/2 >= borderUISize && this.moveSpeedX > -this.maxSpeed){
            this.moveSpeedX -= 0.2;
        }
        if(keyRIGHT.isDown && this.x + this.width/2 <= game.config.width - borderUISize && this.moveSpeedX < this.maxSpeed){
            this.moveSpeedX += 0.2;
        }
        if(keyUP.isDown && this.y - this.height/2 >= borderUISize && this.moveSpeedY > -this.maxSpeed){
            this.moveSpeedY -= 0.2;
        }
        if(keyDOWN.isDown && this.y + this.height/2 <= game.config.height - borderUISize && this.moveSpeedY < this.maxSpeed){
            this.moveSpeedY += 0.2;
        }
        //stop acceleration if hitting a border
        if(this.x - this.width/2 < borderUISize){
            this.moveSpeedX = 0.2;
        }
        if(this.x + this.width/2 > game.config.width - borderUISize){
            this.moveSpeedX = -0.2;
        }
        if(this.y - this.height/2 < borderUISize){
            this.moveSpeedY = 0.2;
        }
        if(this.y + this.height/2 > game.config.height - borderUISize){
            this.moveSpeedY = -0.2;
        }

        //rotate it
        this.angle--;
    }

    //reset sun
    reset(){
        this.y = game.config.height/2;
        this.x = game.config.width/2;
    }
}