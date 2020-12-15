class Petal {
    static ctx;
    static canvasW;
    static canvasH;
    static patels = [];

    static init() {
        const canvas = document.getElementById('musicPatternContainer');
        this.canvasW = canvas.width = document.body.offsetWidth;
        this.canvasH = canvas.height = document.body.offsetHeight;
        this.ctx = canvas.getContext('2d');
        window.requestAnimationFrame(this.updateAll);
    }

    static updateAll() {
        Petal.ctx.clearRect(0, 0, Petal.canvasW, Petal.canvasH);
        const removeIdx = [];
        Petal.patels.forEach((p, i) => {
            const inScene = p.update();
            if (!inScene) {
                removeIdx.push(i);
            }
        })
        removeIdx.reverse().forEach(i => {
            Petal.patels.splice(i, 1);
        })
        window.requestAnimationFrame(Petal.updateAll);
    }

    constructor(x, y, rotation) {
        this.x = x;
        this.y = y;
        this.width = Math.random() * 10 + 8;
        this.rotation = rotation;
        this.xSpeed = Math.random() - 0.5;
        this.ySpeed = Math.random() * 0.5 + 1;
        this.rSpeed = Math.PI / 180;
        Petal.patels.push(this);
    }
    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.rotation += this.rSpeed;

        Petal.ctx.save();
        Petal.ctx.translate(this.x, this.y);
        Petal.ctx.rotate(this.rotation);
        Petal.ctx.beginPath();
        Petal.ctx.moveTo(0, 0);
        Petal.ctx.quadraticCurveTo(this.width / 2, this.width / 2, this.width, 0);
        Petal.ctx.quadraticCurveTo(this.width / 2, -1 * (this.width / 2), 0, 0);
        Petal.ctx.closePath();

        var gradient = Petal.ctx.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop(0, "rgba(255, 183, 197, .8)");
        gradient.addColorStop(1, "rgba(255, 183, 197, .8)");

        Petal.ctx.lineJoin = "round";
        Petal.ctx.fillStyle = gradient;
        Petal.ctx.fill();

        Petal.ctx.restore();

        if (this.y > Petal.canvasH + 30) {
            return false;
        }
        return true;
    }
}