import { eventEmitter } from '../../../events/eventEmitter.js';
import Util from '../../../util/util.js';

class usersMenu {
  html = {
    win32: 
    `<div class="cont">
      <span class="header">Home</span>
      <div class="content col">
      <table class="surface" id="log-table">
      </table>
      </div>
    </div>`
  }

  constructor() {
    this.j = 0;
    this.element = Util.createComponent(this.html['win32']);
    this.logTable = this.element.querySelector('#log-table');
    this.devices = [];
    this.generalLog = [];

    this.logTable.innerHTML = `<thead>
      <tr>
        <th style="width: 20%;">
          Id
        </th>
        <th>
          Tiempo de acceso
        </th>
        <th>
          Tipo de acceso
        </th>
      </tr>
    </thead>
    <tbody>`;
    this.loadData();
  }

  loadData() {
    
    this.loadDevices();

  }

  loadDevices() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = 
    `{
      "SearchDescription": {
        "position": 0,
        "maxResult": 100
      }
    }`;

    const requestOptions = {
      method: 'POST',
      headers: headers,
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
          this.devices.push(dispositivos[i].Device);
        }

        for (let i = 0; i < this.devices.length; i++) {
          const device = this.devices[i];
          this.getTotalMatches(device.devIndex);
        }
      }
    );


  }

  getTotalMatches(deviceUUID) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const raw = `
    {
      "AcsEventCond": {
        "searchID": "123",
        "searchResultPosition": 0,
        "maxResults": 100 
      }
    }`;

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    };

    const DigestFetch = window.DigestFetch;
    const client = new DigestFetch('admin', '8LRMw@809!', { algorithm: 'md5' });


    client.fetch(`http://192.168.0.254/ISAPI/AccessControl/AcsEvent?format=json&devIndex=${deviceUUID}`, requestOptions)
    .then(value => value.json())
    .then(result => {
      const matches = result.AcsEvent.totalMatches;
      console.log(matches);
      this.loadLogs(matches, deviceUUID);      
    })
    .catch(error => console.log('error', error));
  }

  loadLogs(numberOfMatches, deviceUUID) {
    const searchPosition = 0;
    let i = 0;
    for (i = searchPosition; i < numberOfMatches; i += 30 ) {
      const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const raw = `
    {
      "AcsEventCond": {
        "searchID": "123",
        "searchResultPosition": ${i},
        "maxResults": 100 
      }
    }`;

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    };

    const DigestFetch = window.DigestFetch;
    const client = new DigestFetch('admin', '8LRMw@809!', { algorithm: 'md5' });


    client.fetch(`http://192.168.0.254/ISAPI/AccessControl/AcsEvent?format=json&devIndex=${deviceUUID}`, requestOptions)
    .then(value => value.json())
    .then(result => {
      this.generalLog.push(...result.AcsEvent.InfoList);
      this.loadTable(result.AcsEvent.InfoList);
    })
    .catch(error => console.log('errasadasdasdasdasdasdasdasdsdaor', error));
    }
  }

  loadTable(renderLogs) {

    let html = '';
    
    for (let i = 0; i < renderLogs.length; i++) {
      const log = this.generalLog[i];
      html += 
      `<tr>
        <td>${this.j + 1}</td>
        <td>${new Date(log.time).toLocaleString()}</td>
        <td>${this.getType(log)}</td>
      </tr>`;
      this.j++;
    }
    this.logTable.innerHTML += `${html}`;
  }

  getType(log) {
    if (!log.userType && log.currentVerifyMode === 'invalid') {
      return 'Inválido';
    }

    if (!log.userType && log.currentVerifyMode !== 'invalid') {
      return 'Invitado';
    }

    if (log.userType) {
      return log.userType;
    }

    return '';
  }
}

export default usersMenu;