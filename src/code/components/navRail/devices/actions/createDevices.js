import Util from '../../util/util.js';

class createDevices{
    html = {
        win32: `<div>
                    <form class="create-device-form" id="create-device-form">
                        <label>
                        <input type="text" name="name">
                        <label>
                        <input type="text" name="protocoloType">
                        <label>
                        <input type="text" name="adressFormatType">
                        <label>
                        <input type="text" name="adress">
                        <label>
                        <input type="text" name="portNo">
                        <label>
                        <input type="text" name="userName">
                        <label>
                        <input type="text" name="password">
                        <label>
                        <input type="text" name="devType">
                        <button type="submit"></button>
                    </form>
                </div>`
    }

    constructor() {
        this.element = Util.createComponent(this.html['win32'])
        this.element.addEventListener('submit', event => {
            event.preventDefault();
            create();
        })
    }
}

from = document.getElementById('create-device-form')

function create() {
    headers = {
        DeviceInList: [{
            Ddevice:form.name.value,
            protocolType: form.protocolType.value,
            ISAPIParams: {
                addresssingFormatType: form.adressFormatType.value,
                address: form.adress.value,
                portNo: form.portNo.value,
                userName: form.userName.value,
                password: form.password.value
        },
        devType: form.devType.value
        }
    ]
    }
    
    fetch("GET","https://192.168.0.254/ISAPI/AccessControl/UserInfoDetail/Delete?format=json&devIndex=<uuid>", headers)
        .then( res => res.json())
        .then( json => {
            console.log(json)
        })
        .catch( error => {
            console.log(error)
        })
        .finally()
}

export default createDevices;