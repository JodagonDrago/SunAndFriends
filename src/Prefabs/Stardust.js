//Asteroid prefab
class Stardust extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store pointValue
        this.moveSpeed = game.settings.stardustSpeed; //pixels per frame
        this.timer = 0;
    }

    update(){
        //move asteroid left
        if (this.timer >= 400){
            this.x -= this.moveSpeed;
        }
        this.timer += 1;
        //wrap around from left to right
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    //reset position
    reset(){
        this.timer = 0;
        this.x = game.config.width + this.width;
        this.y = this.randomY();

    }

    randomY() {
        return Phaser.Math.Between(borderPadding * 2, game.config.height - (borderPadding * 2));
    }
}