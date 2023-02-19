AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bullet.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        bullet.setAttribute("dynamic-body",{
          shape:"sphere",
          mass:0,

        })
        
        bullet.addEventListener("collide",this.removeBullet)

        scene.appendChild(bullet);

        this.shootSound()
      }
    });
  },

  removeBullet: function (e) {
    //Original entity (bullet) 
    console.log(e.detail.target.el);

    //Other entity, which bullet touched.
    console.log(e.detail.body.el);

    var element=e.detail.target.el
    var element_hit=e.detail.body.el

    
    //bullet element


    //element which is hit
 

    if (element_hit.id.includes("wall")) 
      {
        //set material attribute
       element_hit.setAttribute("material",{
        opacity:1,
        transparent:true,
        color:"Black"
       })

       
        //impulse and point vector
        var impulse=new CANNON.Vec3(-2,2,1);
        var worldpoint=new CANNON.Vec3().copy(element_hit.getAttribute("position"))
        element_hit.body.applyImpulse(impulse,worldpoint)

        

        //remove event listener
        
        
        //remove the bullets from the scene
      
    }
  },

  shootSound:function(){
    var entity=document.querySelector("#sound1")
    entity.components.sound.playSound()
  }
});


