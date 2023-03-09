AFRAME.registerComponent("bullets", { 
  init: function () { 
    this.shootBullet(); 
  }, 
  
  shootBullet: function () { 
    window.addEventListener("keydown", (e) => { 
      if (e.key === "z") { 
        var bullet = document.createElement("a-entity"); 
        bullet.setAttribute("geometry", 
        { primitive: "sphere", radius: 0.1, }); 
        bullet.setAttribute("material", "color", "black"); 
        var cam = document.querySelector("#camera"); 
        pos = cam.getAttribute("position"); 
        bullet.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z, }); 
        var camera = document.querySelector("#camera").object3D; 
       var direction = new THREE.Vector3(); 
       camera.getWorldDirection(direction); 
        bullet.setAttribute("velocity", direction.multiplyScalar(-20)); 
        var scene = document.querySelector("#scene"); 
         bullet.setAttribute("dynamic-body", { shape: "sphere", mass: "0", }); 
         bullet.setAttribute("visible", false); 
          bullet.addEventListener("collide", this.removeBullet);
           scene.appendChild(bullet); 
          ; } }); }, 
           
           removeBullet: function (e) {
             var scene = document.querySelector("#scene"); 
              var element = e.detail.target.el; 
               var elementHit = e.detail.body.el; 
                var paint = document.createElement("a-entity");
                 var pos = element.getAttribute("position") 
                 var rotate = elementHit.getAttribute("rotation") 
                 paint.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z, }); 
                 paint.setAttribute("rotation", { x: rotate.x, y: rotate.y, z: rotate.z, }); 
           }
          })