class Plate {
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
            console.log('speed: ', i, Plate.plates[i].xSpeed, Plate.plates[i].ySpeed, Plate.plates[i].zSpeed);
        })
    }

    constructor() {
        this.plateObj;
        this.scene;
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

    init() {
        const element = document.createElement('div');
        element.className = 'element';
        element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
        this.plateObj = new THREE.CSS3DObject(element);
        this.plateObj.position.x = Math.random() * 4000 - 2000;
        this.plateObj.position.y = Math.random() * 4000 - 2000;
        this.plateObj.position.z = Math.random() * 4000 - 2000;
        Plate.plates.push(this);
    }

    update() {
        // console.log(this.xSpeed);
        this.plateObj.position.x += this.xSpeed;
        this.plateObj.position.y += this.ySpeed;
        this.plateObj.position.z += this.zSpeed;
        this.plateObj.rotation.x += this.xRotateSpeed;
        this.plateObj.rotation.y += this.yRotateSpeed;
        this.plateObj.rotation.z += this.zRotateSpeed;
        if (Math.abs(this.plateObj.position.x - this.targetX) < 1) {
            console.log(this.plateObj.position.x, this.targetX);
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