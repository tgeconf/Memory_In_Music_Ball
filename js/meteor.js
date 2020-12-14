class Meteor {
    static ctx;
    static canvasW;
    static canvasH;
    static meteors = [];

    static init() {
        const canvas = document.getElementById('musicPatternContainer');
        this.canvasW = canvas.width = document.body.offsetWidth;
        this.canvasH = canvas.height = document.body.offsetHeight;
        this.ctx = canvas.getContext('2d');
        window.requestAnimationFrame(this.updateAll);
    }

    static updateAll() {
        Meteor.ctx.clearRect(0, 0, Meteor.canvasW, Meteor.canvasH);
        const removeIdx = [];
        Meteor.meteors.forEach((p, i) => {
            const inScene = p.update();
            if (!inScene) {
                removeIdx.push(i);
            }
        })
        removeIdx.reverse().forEach(i => {
            Meteor.meteors.splice(i, 1);
        })
        window.requestAnimationFrame(Meteor.updateAll);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = Math.random() * 100 + 100;
        this.speed = -(Math.random() * 10 + 10);
        Meteor.meteors.push(this);
    }
    update() {
        this.x += this.speed;
        this.y += -this.speed;

        Meteor.ctx.save();
        Meteor.ctx.translate(this.x, this.y);
        Meteor.ctx.rotate(-Math.PI / 4);
        Meteor.ctx.fillStyle = 'rgba(255, 255, 255, .7)';
        Meteor.ctx.shadowBlur = 10;
        Meteor.ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        Meteor.ctx.beginPath();
        Meteor.ctx.arc(0, 0, 4, 0, Math.PI * 2);
        Meteor.ctx.closePath();
        Meteor.ctx.fill();

        const gradient = Meteor.ctx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, "rgba(255, 255, 255, .5)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        Meteor.ctx.fillStyle = gradient;
        Meteor.ctx.beginPath();
        Meteor.ctx.rect(2, -2, this.width, 4);
        Meteor.ctx.fill();

        Meteor.ctx.restore();

        if (this.y > Meteor.canvasH + 30) {
            return false;
        }
        return true;
    }
}