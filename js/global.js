const SCENE_X = 4000;
const SCENE_Y = 2000;
const SCENE_Z = 2000;
const cmd = new Proxy({}, {
    set: (obj, prop, value) => {
        switch (prop) {
            case 'layoutTime':
                obj[prop] = value;
                console.log('layout according to time');
                break;
        }

        // if (prop === 'cmdName') {
        //     console.log("set " + prop + ": " + obj[prop]);
        // }

        return true;
    }
});
