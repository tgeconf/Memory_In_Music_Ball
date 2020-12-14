class Cloud {
    static clouds = [];
    static C_WIDTH;
    static C_HEIGHT;
    static context;
    static ani;

    static initAllClouds() {
        const canvas = document.getElementById("bgContainer");
        this.context = canvas.getContext("2d");
        this.context.globalAlpha = 0.01;
        this.C_WIDTH = canvas.width = document.body.offsetWidth;
        this.C_HEIGHT = canvas.height = document.body.offsetHeight;

        for (let i = 0; i < 16; i++) {
            const c = new Cloud();
            c.drawCloud(true);
            this.clouds.push(c);
        }
    }

    static animateAllClouds() {
        Cloud.updateAllClouds();
        Cloud.context.clearRect(0, 0, Cloud.C_WIDTH, Cloud.C_HEIGHT);
        for (let i = 0; i < Cloud.clouds.length; i++) {
            Cloud.clouds[i].drawCloud();
        }
        Cloud.ani = requestAnimationFrame(Cloud.animateAllClouds);
    }

    static updateAllClouds() {
        this.clouds.forEach(c => {
            c.update();
        })
    }

    constructor() {
        this.xSpeed = Math.random() * (Math.random() > 0.5 ? 1 : -1);
        this.img = document.getElementById('testImg');
        this.w = Math.random() * 100 + 80;
        this.h = this.w * this.img.height / this.img.width;
        this.x = Math.random() * (Cloud.C_WIDTH - this.w);
        this.y = Math.random() * (Cloud.C_HEIGHT - this.h);
    }

    drawCloud() {
        Cloud.context.globalAlpha = 0.5;
        Cloud.context.drawImage(this.img, this.x, this.y, this.w, this.h); // Or at whatever offset you like
    }

    update() {
        this.x += this.xSpeed;
        if (this.x + this.w < 0 || this.x > Cloud.C_WIDTH) {
            this.xSpeed *= -1;
        }
    }
}