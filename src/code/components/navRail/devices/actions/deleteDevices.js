import Util from '../../util/util.js';

class deleteDevices{
    html = {
        win32: `<div>
                    <h1>Eliminar un dispositivo</h1>
                </div>`
    }

    constructor() {
        this.element = Util.createComponent(this.html['win32'])
    }
}

fetch("DELETE","https://192.168.0.254/ISAPI/DeviceMgmt/delDevice?format=json&devIndex=<uuid>")
    .then( res => res.json())
    .then( json => {

    })
    .catch( error => {

    })
    .finally()

export default deleteDevices;