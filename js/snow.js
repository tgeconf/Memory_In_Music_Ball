class Snow {
    static ctx;
    static canvasW;
    static canvasH;
    static snows = [];

    static init() {
        const canvas = document.getElementById('musicPatternContainer');
        this.canvasW = canvas.width = document.body.offsetWidth;
        this.canvasH = canvas.height = document.body.offsetHeight;
        this.ctx = canvas.getContext('2d');
        window.requestAnimationFrame(this.updateAll);
    }

    static updateAll() {
        Snow.ctx.clearRect(0, 0, Snow.canvasW, Snow.canvasH);
        const removeIdx = [];
        Snow.snows.forEach((p, i) => {
            const inScene = p.update();
            if (!inScene) {
                removeIdx.push(i);
            }
        })
        removeIdx.reverse().forEach(i => {
            Snow.snows.splice(i, 1);
        })
        window.requestAnimationFrame(Snow.updateAll);
    }

    constructor(x, y, rotation) {
        this.baseX = x;
        this.x = x;
        this.y = y;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.width = Math.random() * 3 + 6;
        this.rotation = rotation;
        this.xSpeed = Math.random() - 0.5;
        this.ySpeed = Math.random() * 0.2 + 0.5;
        this.rSpeed = Math.PI / 180;
        Snow.snows.push(this);
    }
    update() {
        this.x += this.xSpeed;
        if (this.x > this.baseX + 100 || this.x < this.baseX - 100) {
            this.xSpeed *= -1;
        }
        this.y += this.ySpeed;
        this.rotation += this.rSpeed;

        // Snow.ctx.globalOpacity = 0.5;
        Snow.ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
        Snow.ctx.shadowBlur = 6;
        Snow.ctx.shadowColor = 'rgba(255, 255, 255, 1)';
        Snow.ctx.beginPath();
        Snow.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        Snow.ctx.closePath();

        // var gradient = Snow.ctx.createLinearGradient(0, 0, 170, 0);
        // gradient.addColorStop(0, "rgba(238, 59, 11, .8)");
        // gradient.addColorStop(1, "rgba(238, 17, 11, .8)");

        // Snow.ctx.lineJoin = "round";
        // Snow.ctx.fillStyle = gradient;
        Snow.ctx.fill();


        if (this.y > Snow.canvasH + 30) {
            return false;
        }
        return true;
    }
}