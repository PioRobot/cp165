AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //obtener todos los enemigos usando el nombre de la clase
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //Entidad de la bala del enemigo
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var v1=new THREE.Vecror3()
            var v2=new THREE.Vector3()

            //Obtener la posición del enemigo y jugador usando el método Three.js 
            var player_pos=document.querySelector("#weapon").object3D
            var enemy_pos=els[i].object3D
            player_pos.getWorldPosition(v1)
            enemy_pos.getWorldPosition(v2)
            //Establecer la velocidad y su dirección
            var velocBullet=new THREE.Vector3()
            velocBullet.subVector(v1,v2).normalize()
            enemyBullet.setAttribute("velocity",velocBullet.multiplyScalar(10))
            //Establecer el atributo del cuerpo dinámico
            enemyBullet.setAttribute("dynamic-body",{shape:"sphere", mass:"0"})
            //Obtener atributo de texto
            var lc=document.querySelector("#countLife")
            var flc=parseInt(lc.getAttribute("text").value)
            //Evento de colisión con las balas enemigas
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon"){
                    if (flc>0) {
                        flc-=1
                        lc.setAttribute("text",{value:flc})
                    }
                    if (flc<=0) {
                        var sod=document.querySelector("#over")
                        sod.setAttribute("visible",true)
                        var kt1=document.querySelectorAll(".enemy")
                        for(var i=0; i<kt1.length; i++){
                            scene.removeChild(kt1[i])
                        }
                    }
                }
            });

        }
    },

});
