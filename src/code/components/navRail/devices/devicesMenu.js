import Util from '../../../util/util.js';

class devicesMenu {
  html = {
    win32:
      `<div class="cont">
      <span class="header">${window.lang.devices}</span>
      <div class="content col">
        <div class="row">
          <button id="add-device" class="button tonal" style="margin-bottom: 1rem;">${window.lang.add}</button>
        </div>
        <table class="surface" id="device-table">
        </table>
        <form id="add-device-form" class="form hide">
          <div class="col" style="gap: 1rem;">
            <span class="form-header">${window.lang.add}</span>
            <div class="col" style="align-items: start; gap: 0.25rem; margin: 1rem 0rem; width: 100%">
              <label class="input-label">ID</label>
              <input name="deviceId" type="text" class="input" required maxlength="31">
            </div>
            <div class="col" style="align-items: start; gap: 0.25rem; margin: 1rem 0rem; width: 100%">
              <label class="input-label">${window.lang.name}</label>
              <input name="deviceName" type="text" class="input" required>
            </div>
            <div class="col" style="align-items: start; gap: 0.25rem; margin: 1rem 0rem; width: 100%">
              <label class="input-label">${window.lang.password}</label>
              <input name="devicePassword" type="password" class="input" required>
            </div>
            <div class="row" style="gap: 1rem;">
              <button id="cancel-add-device" type="button" class="button tonal">${window.lang.cancel}</button>
              <button type="submit" class="button filled">${window.lang.submit}</button>
            </div>
          </div>
        </form>
      </div>
      <div id="device-delete-modal" class="alert-container hidden">
        <div class="alert">
          <h3 class="header">${window.lang.deleteMessage}</h3>
          <div class="delete-buttons">
            <button id="delete-device" class="button filled">${window.lang.yes}</button>
            <button id="cancel-delete-device" class="button filled">${window.lang.no}</button>
          </div>
        </div>
      </div>
    </div>
    `
  };

  dispositivos = [];

  constructor() {
    this.element = Util.createComponent(this.html['win32']);
    this.form = this.element.querySelector('#add-device-form');
    this.onSubmit = this.onSubmit.bind(this);
    this.form.onsubmit = this.onSubmit;
    this.isEditing = false;

    this.deleteDeviceUUID = '';

    this.loadData();

    this.addDevice = this.element.querySelector('#add-device');
    this.addDevice.addEventListener('click', (event) => {
      this.showForm();
    });

    this.cancelAddDevice = this.element.querySelector('#cancel-add-device');
    this.cancelAddDevice.addEventListener('click', (event) => {
      if (this.isEditing) {
        this.isEditing = false;
        this.addDevice.disabled = false;
        this.form.classList.toggle('hide');
        this.element.querySelector('.form-header').innerText = window.lang.add;
        this.form.elements['deviceId'].value = '';
        this.form.elements['deviceName'].value = '';
        this.form.elements['devicePassword'].value = '';
      } else {
        this.addDevice.disabled = false;
        this.form.classList.toggle('hide');
      }
    });

    this.alertContainer = this.element.querySelector('#device-delete-modal');

    this.cancelDeleteDevice = this.element.querySelector('#cancel-delete-device');
    this.cancelDeleteDevice.addEventListener('click', (event) => {
      this.alertContainer.classList.add('hidden');
      this.deleteDeviceUUID = '';
    });

    this.deleteDeviceButton = this.element.querySelector('#delete-device');
    this.deleteDeviceButton.addEventListener('click', (event) => {
      this.deleteDevice();
    });
  }

  loadData() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "{\"SearchDescription\": {  \"position\": 0 , \r\n /*required, int, index, which starts from 0*/\r\n \"maxResult\": 100 /*Si le colocas 1 solo te da el especifico */\r\n /*required, int, the maximum number of searched results in a single search*/\r\n }\r\n }";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',

    };

    const DigestFetch = window.DigestFetch;

    const client = new DigestFetch('admin', '8LRMw@809!', { algorithm: 'md5' });


    client.fetch('http://192.168.0.254/ISAPI/ContentMgmt/DeviceMgmt/deviceList?format=json', requestOptions)
      .then(value => value.json())
      .then((result) => {
        const dispositivos = result.SearchResult.MatchList;

        for (let i = 0; i < dispositivos.length; i++) {
          this.dispositivos.push(dispositivos[i].Device);
        }
        this.loadTable();
      }
      );

  }

  loadTable() {
    this.deviceTable = this.element.querySelector('#device-table');

    this.deviceTable.innerHTML =
      `<thead>
      <tr>
        <th style="width: 40%;">
          UUID
        </th>
        <th>
          ID
        </th>
        <th>
          ${window.lang.name}
        </th>
        <th>
          ${window.lang.status}
        </th>
        <th>
          ${window.lang.actions}
        </th>
      </tr>
    </thead>
    <tbody>`;

    for (let i = 0; i < this.dispositivos.length; i++) {
      const dispositivo = this.dispositivos[i];
      this.deviceTable.innerHTML +=
        `<tr>
        <td>${dispositivo.devIndex}</td>
        <td>${dispositivo.EhomeParams.EhomeID}</td>
        <td>${dispositivo.devName}</td>       
        <td style="color: ${dispositivo.devStatus === 'online' ? '#00C277' : '#CC0000'};">${dispositivo.devStatus === 'online' ? window.lang.online : window.lang.offline}</td>        
        <td>
          <button class="edit-device action" device-uuid="${dispositivo.devIndex}">
            e
          </button>
          <button class="delete-device action" device-uuid="${dispositivo.devIndex}">
            b
          </button>
        </td>
      </tr>`;
    }

    this.deviceTable.innerHTML += '</tbody>';

    this.element.addEventListener('click', (event) => {
      if (event.target && event.target.getAttribute('device-uuid') && event.target.matches('button.delete-device')) {
        this.alertContainer.classList.remove('hidden');
        this.deleteDeviceUUID = event.target.getAttribute('device-uuid');
      }

      if (event.target && event.target.getAttribute('device-uuid') && event.target.matches('button.edit-device')) {
        this.isEditing = true;
        this.editDeviceUUID = event.target.getAttribute('device-uuid');

        let editingDevice = undefined;

        for (let i = 0; i < this.dispositivos.length; i++) {
          console.log(this.dispositivos[i]);
          if (this.dispositivos[i].devIndex === this.editDeviceUUID) {
            editingDevice = this.dispositivos[i];
            break;
          }
        }

        this.form.elements['deviceName'].value = editingDevice.devName;
        this.form.elements['deviceId'].value = editingDevice.EhomeParams.EhomeID;
        this.form.elements['devicePassword'].disabled = true;
        this.form.elements['devicePassword'].value = 'asdasdasd';

        this.form.classList.remove('hide');
        this.element.querySelector('.form-header').innerText = window.lang.update;
      }
    });
  }

  showForm() {
    this.addDevice.disabled = true;
    this.form.classList.toggle('hide');
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.isEditing) {
      const deviceId = this.form.elements['deviceId'].value;
      const deviceName = this.form.elements['deviceName'].value;

      let editingDevice = undefined;

        for (let i = 0; i < this.dispositivos.length; i++) {
          console.log(this.dispositivos[i]);
          if (this.dispositivos[i].devIndex === this.editDeviceUUID) {
            editingDevice = this.dispositivos[i];
            break;
          }
        }

      const DigestFetch = window.DigestFetch;
      const client = new DigestFetch('admin', '8LRMw@809!', { algorithm: 'md5' });

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const body = `
      {
        "DeviceInfo": {
          "devIndex": "${editingDevice.devIndex}",
          "protocolType": "ehomeV5",
          "EhomeParams": {
            "EhomeID": "${deviceId}",
            "EhomeKey": "A1B2C3D4" 
          },
          "devName": "${deviceName}"
        }
      }
      `;

      const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: body,
        redirect: 'follow'
      };
      
      client.fetch("http://192.168.0.254:80/ISAPI/ContentMgmt/DeviceMgmt/modDevice?format=json", requestOptions)
        .then(response => response.text())
        .then(result => {
          this.isEditing = false;
          this.addDevice.disabled = false;
          this.form.classList.toggle('hide');
          this.element.querySelector('.form-header').innerText = window.lang.add;
          this.form.elements['deviceId'].value = '';
          this.form.elements['deviceName'].value = '';
          this.form.elements['devicePassword'].value = '';

          this.dispositivos = [];
          this.loadData();
        })
        .catch(error => console.log('error', error));

    } else {
      const deviceId = this.form.elements['deviceId'].value;
      const deviceName = this.form.elements['deviceName'].value;
      const devicePassword = this.form.elements['devicePassword'].value;

      const DigestFetch = window.DigestFetch;

      const client = new DigestFetch('admin', '8LRMw@809!', { algorithm: 'md5' });

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const body =
        `{
      "DeviceInList": [
        {
          "Device": {
            "protocolType": "ehomeV5",
            "EhomeParams": {
              "EhomeID": "${deviceId}",
              "EhomeKey": "${devicePassword}"
            },
            "devName": "${deviceName}",
            "devType": "AccessControl"
          }
        }
      ]
    }`;

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body,
        redirect: 'follow'
      };


      client.fetch('http://192.168.0.254/ISAPI/ContentMgmt/DeviceMgmt/addDevice?format=json', requestOptions)
        .then(value => value.json())
        .then((result) => {
          console.log(result);
        }
        ).finally(() => {
          if (this.deviceTable.innerHTML) {
            this.deviceTable.innerHTML = '';
          }

          this.dispositivos = [];
          this.loadData();
          this.form.classList.toggle('hide');
          this.addDevice.disabled = false;
        });
    }

  }

  deleteDevice() {
    console.log('borrar');
    const DigestFetch = window.DigestFetch;

    const client = new DigestFetch('admin', '8LRMw@809!', { algorithm: 'md5' });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body =
      `{
      "DevIndexList": ["${this.deleteDeviceUUID}"]
    }`;

    const requestOptions = {
      method: 'DELETE',
      headers: headers,
      body,
      redirect: 'follow'
    };


    client.fetch(`http://192.168.0.254/ISAPI/ContentMgmt/DeviceMgmt/delDevice?format=json&devIndex=${this.deleteDeviceUUID}`, requestOptions)
      .then(value => value.json())
      .then((result) => {
        console.log(result);
      }
      ).finally(() => {
        if (this.deviceTable.innerHTML) {
          this.deviceTable.innerHTML = '';
        }

        this.dispositivos = [];
        this.loadData();
        this.alertContainer.classList.toggle('hidden');
        this.addDevice.disabled = false;
      });
    this.deleteDeviceUUID = '';
  }
}

export default devicesMenu;