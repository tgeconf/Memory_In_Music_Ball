class Maple {
    static ctx;
    static canvasW;
    static canvasH;
    static leaves = [];

    static init() {
        const canvas = document.getElementById('musicPatternContainer');
        this.canvasW = canvas.width = document.body.offsetWidth;
        this.canvasH = canvas.height = document.body.offsetHeight;
        this.ctx = canvas.getContext('2d');
        window.requestAnimationFrame(this.updateAll);
    }

    static updateAll() {
        Maple.ctx.clearRect(0, 0, Maple.canvasW, Maple.canvasH);
        const removeIdx = [];
        Maple.leaves.forEach((p, i) => {
            const inScene = p.update();
            if (!inScene) {
                removeIdx.push(i);
            }
        })
        removeIdx.reverse().forEach(i => {
            Maple.leaves.splice(i, 1);
        })
        window.requestAnimationFrame(Maple.updateAll);
    }

    constructor(x, y, rotation) {
        this.x = x;
        this.y = y;
        this.width = Math.random() * 6 + 18;
        this.rotation = rotation;
        this.xSpeed = Math.random() - 0.5;
        this.ySpeed = Math.random() * 0.5 + 1;
        this.rSpeed = Math.PI / 180;
        Maple.leaves.push(this);
    }
    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.rotation += this.rSpeed;

        Maple.ctx.save();
        Maple.ctx.translate(this.x, this.y);
        Maple.ctx.rotate(this.rotation);
        Maple.ctx.beginPath();
        Maple.ctx.moveTo(0, 0);
        Maple.ctx.quadraticCurveTo(this.width / 2, this.width / 2, this.width, 0);
        Maple.ctx.quadraticCurveTo(this.width / 2, -1 * (this.width / 2), 0, 0);
        Maple.ctx.closePath();

        var gradient = Maple.ctx.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop(0, "rgba(238, 59, 11, .8)");
        gradient.addColorStop(1, "rgba(238, 17, 11, .8)");

        Maple.ctx.lineJoin = "round";
        Maple.ctx.fillStyle = gradient;
        Maple.ctx.fill();

        Maple.ctx.restore();

        if (this.y > Maple.canvasH + 30) {
            return false;
        }
        return true;
    }
}