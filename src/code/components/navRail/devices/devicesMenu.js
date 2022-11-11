import Util from '../../../util/util.js';

class devicesMenu {
    html = {
        win32: `<div class="cont">
                    <span class="header">Devices</span>
                    <div class="user-grid">
                        <span data-item="create-user" class="item" id="create-user">
                        <p>Agregar Usuario</p>
                        <img src="">imagen</img>
                        </span>
                        <span data-item="update-set" class="item" id="update-user">
                            <p>Modificar Usuario</p>
                            <img src="">imagen</img>
                        </span>
                        <span data-item="delete-user" class="item" id="delete-user">
                            <p>Eliminar Usuario</p>
                            <img src="">imagen</img>
                        </span>
                        <span data-item="read-user" class="item" id="read-user">
                            <p>Ver Usuario</p>
                            <img src="">imagen</img>
                        </span>
                    </div>
                </div>`
    }
    
    constructor() {
        this.element = Util.createComponent(this.html['win32']);
        window.addEventListener('click', (e) => {
            if(e.target && e.target.getAttribute('data-item') === 'create-user') {
                 
            }
 
            if(e.target && e.target.getAttribute('data-item') === 'update-user') {
 
            }
 
            if(e.target && e.target.getAttribute('data-item') === 'delete-user') {
 
            }
 
            if(e.target && e.target.getAttribute('data-item') === 'read-user') {
 
            }
         });
    }
}

export default devicesMenu;