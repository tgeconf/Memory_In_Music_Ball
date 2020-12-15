const SCENE_X = 4000;
const SCENE_Y = 2000;
const SCENE_Z = 2000;
const cmd = new Proxy({}, {
    set: (obj, prop, value) => {
        switch (prop) {
            case 'layoutTime':
                obj[prop] = value;
                console.log('layout according to time');
                Plate.layoutTime();
                break;
            case 'cancelLayout':
                obj[prop] = value;
                Plate.cancelLayout();
                break;
            case 'highlight':
                obj[prop] = value;
                Plate.highlight(value);
                break;
            case 'cancelHighlight':
                obj[prop] = value;
                Plate.cancelHighlight();
                Background.hideBg();
                break;
            case 'showImg':
                obj[prop] = value;
                value ? Plate.showImgs() : Plate.hideImgs();
                break;
            case 'showMyself':
                obj[prop] = value;
                value ? cameraPlate.moveTo({ x: cameraPlate.x, y: cameraPlate.y, z: cameraPlate.z }, { x: 1, y: 1 }, 2000) : cameraPlate.moveTo({ x: -3000, y: 0, z: 0 }, { x: 1, y: 1 }, 2000);
                break;
            case 'showLike':
            case 'showComment':
                obj[prop] = value;
                break;
        }

        // if (prop === 'cmdName') {
        //     console.log("set " + prop + ": " + obj[prop]);
        // }

        return true;
    }
});
