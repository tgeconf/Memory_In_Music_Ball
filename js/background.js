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

    static drawStars() {
        Star.initAllStars();
        Star.animateAllStars();
    }
}