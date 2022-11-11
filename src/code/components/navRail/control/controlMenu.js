import Util from '../../../util/util.js';

class controlMenu {
    html = {
        win32: `<div class="menu" id="settings-menu">
                    <span data-item="create" class="item" id="create-devices">
                        <img src="">imagen</img>
                        <h3>Agregar dispositivo</h3>
                    </span>
                    <span data-item="delete" class="item" id="delete-devices">
                        <img src="">imagen</img>
                        <h3>Borrar dispositivo</h3>
                    </span>
                    <span data-item="read" class="item" id="read-devices">
                        <img src="">imagen</img>
                        <h3>Ver dispositivos</h3>
                    </span>
                    <span data-item="update" class="item" id="update-devices">
                        <img src="">imagen</img>
                        <h3>Modificar dispositivos</h3>
                    </span>
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

export default controlMenu;