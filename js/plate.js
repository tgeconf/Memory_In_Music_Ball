class Plate {
    static angleStep = 0.1;
    static plates = [];
    static updateAll() {
        this.plates.forEach(p => {
            p.update();
        })
    }

    static moveTo(target, duration) {
        // const stepNum = duration;
        // target.forEach((t, i) => {
        //     Plate.plates[i].targetX = t.position.x;
        //     Plate.plates[i].targetY = t.position.y;
        //     Plate.plates[i].targetZ = t.position.z;
        //     Plate.plates[i].targetRotationX = t.rotation.x;
        //     Plate.plates[i].targetRotationY = t.rotation.y;
        //     Plate.plates[i].targetRotationZ = t.rotation.z;
        //     Plate.plates[i].xSpeed = (t.position.x - Plate.plates[i].plateObj.position.x) / stepNum;
        //     Plate.plates[i].ySpeed = (t.position.y - Plate.plates[i].plateObj.position.y) / stepNum;
        //     Plate.plates[i].zSpeed = (t.position.z - Plate.plates[i].plateObj.position.z) / stepNum;
        //     Plate.plates[i].xRotateSpeed = (t.rotation.x - Plate.plates[i].plateObj.rotation.x) / stepNum;
        //     Plate.plates[i].yRotateSpeed = (t.rotation.y - Plate.plates[i].plateObj.rotation.y) / stepNum;
        //     Plate.plates[i].zRotateSpeed = (t.rotation.z - Plate.plates[i].plateObj.rotation.z) / stepNum;
        // })
    }

    constructor(data, scene) {
        this.data = data;
        this.plateDiv;
        this.plateObj;
        this.scene = scene;
        this.initOpacitySpeed = 0.01;
        this.opacity = 0;
        this.xSpeed = (Math.random() >= 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.5) / 5;
        this.ySpeed = (Math.random() >= 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.5) / 5;
        this.zSpeed = (Math.random() >= 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.5) / 5;
        this.xRotateSpeed = 0;
        this.yRotateSpeed = 0;
        this.zRotateSpeed = 0;
        this.targetX;
        this.targetY;
        this.targetZ;
        this.targetRotationX;
        this.targetRotationY;
        this.targetRotationZ;
    }

    init(x, y, z, rx, ry, rz, size, color) {
        this.plateDiv = document.createElement('div');
        this.plateDiv.className = 'element ani-bubble';
        this.plateDiv.style.animationDuration = (Math.random() * 1 + 1) + 's';
        this.plateDiv.style.opacity = this.opacity;
        // this.plateDiv.style.width = size + 'px';
        // this.plateDiv.style.height = size + 'px';
        // this.plateDiv.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
        this.plateDiv.style.backgroundColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + (Math.random() * 0.3 + 0.1) + ')';
        this.plateDiv.style.boxShadow = '0px 0px 6px rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + (Math.random() * 0.2 + 0.01) + ')';
        const that = this;
        this.plateDiv.onclick = (evt) => {
            that.handleClick(evt);
        }

        const plateImg = document.createElement('div');
        plateImg.className = 'element-img';
        plateImg.style.backgroundImage = 'url(' + this.data.src + ')';
        this.plateDiv.appendChild(plateImg);

        const plateCover = document.createElement('div');
        plateCover.className = 'element-cover';
        this.plateDiv.appendChild(plateCover);

        this.plateObj = new THREE.CSS3DObject(this.plateDiv);
        // this.plateObj.position.x = Math.random() * 4000 - 2000;
        // this.plateObj.position.y = Math.random() * 4000 - 2000;
        // this.plateObj.position.z = Math.random() * 4000 - 2000;
        this.plateObj.position.x = x;
        this.plateObj.position.y = y;
        this.plateObj.position.z = z;
        this.plateObj.rotation.x = rx;
        this.plateObj.rotation.y = ry;
        this.plateObj.rotation.z = rz;
        Plate.plates.push(this);
        this.scene.add(this.plateObj);
    }

    handleClick(evt) {
        if (this.plateDiv.classList.contains('focus-ani-bubble')) {
            this.moveTo({ x: 0, y: 0, z: 0 }, { x: 1, y: 1 }, 2000);
            this.plateDiv.classList.add('ani-bubble');
            this.plateDiv.classList.remove('focus-ani-bubble');
            this.xSpeed = this._xSpeed;
            this.ySpeed = this._ySpeed;
            this.zSpeed = this._zSpeed;
            this.plateObj.position.x = this._position.x;
            this.plateObj.position.y = this._position.y;
            this.plateObj.position.z = this._position.z;
        } else {
            this.moveTo({ x: 0, y: 0, z: 0 }, { x: 3, y: 3 }, 2000);
            this.plateDiv.classList.remove('ani-bubble');
            this.plateDiv.classList.add('focus-ani-bubble');
            this._xSpeed = this.xSpeed;
            this._ySpeed = this.ySpeed;
            this._zSpeed = this.zSpeed;
            this._position = { x: this.plateObj.position.x, y: this.plateObj.position.y, z: this.plateObj.position.z };
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.zSpeed = 0;
            console.log(this.xSpeed, this.ySpeed);
        }
    }

    moveTo(targetPosi, targetScale, duration) {
        TWEEN.removeAll();

        new TWEEN.Tween(this.plateObj.position)
            .to({ x: targetPosi.x, y: targetPosi.y, z: targetPosi.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        new TWEEN.Tween(this.plateObj.scale)
            .to({ x: targetScale.x, y: targetScale.y, z: 1 }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        // for (var i = 0; i < Plate.plates.length; i++) {

        //     var object = Plate.plates[i].plateObj;
        //     var target = targets[i];

        //     new TWEEN.Tween(object.position)
        //         .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
        //         .easing(TWEEN.Easing.Exponential.InOut)
        //         .start();

        //     new TWEEN.Tween(object.rotation)
        //         .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
        //         .easing(TWEEN.Easing.Exponential.InOut)
        //         .start();

        // }

        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(render)
            .start();
    }

    update() {
        if (this.opacity < 1) {
            this.opacity += this.initOpacitySpeed;
            this.plateDiv.style.opacity = this.opacity;
        }

        // console.log(this.xSpeed);
        this.plateObj.position.x += this.xSpeed;
        this.plateObj.position.y += this.ySpeed;
        this.plateObj.position.z += this.zSpeed;
        this.plateObj.rotation.x += this.xRotateSpeed;
        this.plateObj.rotation.y += this.yRotateSpeed;
        this.plateObj.rotation.z += this.zRotateSpeed;
        if (this.plateObj.position.x < -SCENE_X / 2 || this.plateObj.position.x > SCENE_X / 2) {
            this.xSpeed *= -1;
        }
        if (this.plateObj.position.y < -SCENE_Y / 2 || this.plateObj.position.y > SCENE_Y / 2) {
            this.ySpeed *= -1;
        }
        if (this.plateObj.position.z < -SCENE_Z || this.plateObj.position.z > -2) {
            this.zSpeed *= -1;
        }
        // if (Math.abs(this.plateObj.position.x - this.targetX) < 1) {
        //     this.plateObj.position.x = this.targetX;
        //     this.xSpeed = 0;
        // }
        // if (Math.abs(this.plateObj.position.y - this.targetY) < 1) {
        //     this.plateObj.position.y = this.targetY;
        //     this.ySpeed = 0;
        // }
        // if (Math.abs(this.plateObj.position.z - this.targetZ) < 1) {
        //     this.plateObj.position.z = this.targetZ;
        //     this.zSpeed = 0;
        // }
        // if (Math.abs(this.plateObj.rotation.x - this.targetRotationX) < 1) {
        //     this.plateObj.rotation.x = this.targetRotationX;
        //     this.xRotateSpeed = 0;
        // }
        // if (Math.abs(this.plateObj.rotation.y - this.targetRotationY) < 1) {
        //     this.plateObj.rotation.y = this.targetRotationY;
        //     this.yRotateSpeed = 0;
        // }
        // if (Math.abs(this.plateObj.rotation.z - this.targetRotationZ) < 1) {
        //     this.plateObj.rotation.z = this.targetRotationZ;
        //     this.zRotateSpeed = 0;
        // }
    }
}