import Util from '../../util/util.js';

class readUser{
    html = {
        win32: `<div>
                    <h1>Leer un usuario</h1>
                </div>`
    }

    constructor() {
        this.element = Util.createComponent(this.html['win32'])
    }
}

fetch("GET","https://192.168.0.254/ISAPI/AccessControl/UserInfo/Count?format=json&devIndex=<uuid>")
    .then( res => res.json())
    .then( json => {

    })
    .catch( error => {

    })
    .finally()

export default readUser;