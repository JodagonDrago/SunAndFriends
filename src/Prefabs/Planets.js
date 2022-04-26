// Planet prefab
class Planet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, rotation) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);

      this.spin = rotation;

    }

    update(sun){
        //follow the sun

        this.x = sun.x;
        this.y = sun.y;

        //rotate
        this.angle += this.spin;
    }

 
}