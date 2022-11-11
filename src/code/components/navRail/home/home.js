import { eventEmitter } from '../../../events/eventEmitter.js';
import Util from '../../../util/util.js';

class usersMenu {
    html = {
        win32: `<div class="cont">
                    <span class="header">Home</span>
                    <table></table>
                </div>`
    }
    
    constructor() {
        this.element = Util.createComponent(this.html['win32']);
    }
}

export default usersMenu;