import Util from '../../util/util.js';

class readDevices{
    html = {
        win32: `<div>
                    <h1>Ver un dispositivo</h1>
                </div>`
    }

    constructor() {
        this.element = Util.createComponent(this.html['win32'])
    }
}

fetch("POST","https://192.168.0.254/ISAPI/ContentMgmt/deviceList?format=json")
    .then( res => res.json())
    .then( json => {

    })
    .catch( error => {

    })
    .finally()

export default readDevices;