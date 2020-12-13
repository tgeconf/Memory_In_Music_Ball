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
                break;
        }

        // if (prop === 'cmdName') {
        //     console.log("set " + prop + ": " + obj[prop]);
        // }

        return true;
    }
});
