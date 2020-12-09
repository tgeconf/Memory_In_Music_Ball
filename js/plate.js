class Plate {
    static angleStep = 0.1;
    static plates = [];
    static updateAll() {
        this.plates.forEach(p => {
            p.update();
        })
    }

    static moveTo(target, duration) {
        const stepNum = duration;
        target.forEach((t, i) => {
            Plate.plates[i].targetX = t.position.x;
            Plate.plates[i].targetY = t.position.y;
            Plate.plates[i].targetZ = t.position.z;
            Plate.plates[i].targetRotationX = t.rotation.x;
            Plate.plates[i].targetRotationY = t.rotation.y;
            Plate.plates[i].targetRotationZ = t.rotation.z;
            Plate.plates[i].xSpeed = (t.position.x - Plate.plates[i].plateObj.position.x) / stepNum;
            Plate.plates[i].ySpeed = (t.position.y - Plate.plates[i].plateObj.position.y) / stepNum;
            Plate.plates[i].zSpeed = (t.position.z - Plate.plates[i].plateObj.position.z) / stepNum;
            Plate.plates[i].xRotateSpeed = (t.rotation.x - Plate.plates[i].plateObj.rotation.x) / stepNum;
            Plate.plates[i].yRotateSpeed = (t.rotation.y - Plate.plates[i].plateObj.rotation.y) / stepNum;
            Plate.plates[i].zRotateSpeed = (t.rotation.z - Plate.plates[i].plateObj.rotation.z) / stepNum;
        })
    }

    constructor() {
        this.plateDiv;
        this.plateObj;
        this.scene;
        this.initOpacitySpeed = 0.01;
        this.opacity = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.zSpeed = 0;
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
        this.plateDiv.className = 'element';
        this.plateDiv.style.opacity = this.opacity;
        this.plateDiv.style.width = size + 'px';
        this.plateDiv.style.height = size + 'px';
        // this.plateDiv.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
        this.plateDiv.style.backgroundColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + (Math.random() * 0.1 + 0.2) + ')';
        this.plateDiv.style.boxShadow = '0px 0px 6px rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + (Math.random() * 0.1 + 0.1) + ')';
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
        if (Math.abs(this.plateObj.position.x - this.targetX) < 1) {
            this.plateObj.position.x = this.targetX;
            this.xSpeed = 0;
        }
        if (Math.abs(this.plateObj.position.y - this.targetY) < 1) {
            this.plateObj.position.y = this.targetY;
            this.ySpeed = 0;
        }
        if (Math.abs(this.plateObj.position.z - this.targetZ) < 1) {
            this.plateObj.position.z = this.targetZ;
            this.zSpeed = 0;
        }
        if (Math.abs(this.plateObj.rotation.x - this.targetRotationX) < 1) {
            this.plateObj.rotation.x = this.targetRotationX;
            this.xRotateSpeed = 0;
        }
        if (Math.abs(this.plateObj.rotation.y - this.targetRotationY) < 1) {
            this.plateObj.rotation.y = this.targetRotationY;
            this.yRotateSpeed = 0;
        }
        if (Math.abs(this.plateObj.rotation.z - this.targetRotationZ) < 1) {
            this.plateObj.rotation.z = this.targetRotationZ;
            this.zRotateSpeed = 0;
        }
    }
}