class Background {
    constructor(scene) {
        this.scene = scene;
    }

    static changeBgColor(colors) {
        let bgColorStr = '';
        if (colors.length > 1) {
            bgColorStr = 'linear-gradient(to bottom,';
            colors.forEach((c, i) => {
                bgColorStr += 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')' + (i === colors.length - 1 ? ')' : ',');
            })
        } else {
            bgColorStr = 'rgb(' + colors[0][0] + ',' + colors[0][1] + ',' + colors[0][2] + ')';
        }
        console.log(bgColorStr);
        document.body.style.background = bgColorStr;
    }

    static hideBg() {
        window.cancelAnimationFrame(Star.ani);
        window.cancelAnimationFrame(Cloud.ani);
        const canvas = document.getElementById('bgContainer');
        const ctx = canvas.getContext('2d');
        // console.log(document.body.offsetWidth, canvas, ctx);
        ctx.clearRect(0, 0, document.body.offsetWidth, document.body.offsetHeight);
        document.body.className = 'default-bg';
        Plate.plates.forEach(p => {
            p.plateCover.src = './img/bubble.png';
        })
        cameraPlate.plateCover.src = './img/bubble.png';
    }

    static drawStars() {
        Star.initAllStars();
        Star.animateAllStars();
    }

    static drawClouds() {
        Cloud.initAllClouds();
        Cloud.animateAllClouds();
    }
}