class ColorPicker {
    static colorNum = 20;
    constructor(img) {
        this.colorThief = new ColorThief();
        this.img = img;
        this.palette;
    }

    // assignImg(imgId) {
    //     this.img = document.getElementById(imgId);
    // }

    pickPalette() {
        if (this.img.complete) {
            this.palette = this.colorThief.getPalette(this.img, ColorPicker.colorNum);
        } else {
            const that = this;
            image.addEventListener('load', () => {
                that.palette = that.colorThief.getPalette(that.img, ColorPicker.colorNum);
            });
        }

    }
}