import Util from '../../util/util.js';

class createUser{
    html = {
        win32: `<div>
                    <h1>Crear un usuario</h1>
                </div>`
    }

    constructor() {
        this.element = Util.createComponent(this.html['win32'])
    }
}

fetch("POST","https://192.168.0.254/ISAPI/AccessControl/UserInfo/Record?format=json&devIndex=<uuid>")
    .then( res => res.json())
    .then( json => {

    })
    .catch( error => {

    })
    .finally()

export default createUser;