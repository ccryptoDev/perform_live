/* eslint-disable no-underscore-dangle */
// import firebase from 'firebase/app';
// import 'firebase/auth'; // Firebase Authentication (optional).
// import 'firebase/database'; // The Firebase Realtime Database (optional).
// import 'firebase/firestore'; // Cloud Firestore (optional).
// import 'firebase/storage'; // Firebase Storage (optional).
// import 'firebase/messaging'; // Firebase Cloud Messaging (optional).
// import 'firebase/functions'; // Firebase Cloud Functions (optional).

// import config from 'app/config/index.config';

// export default firebase.initializeApp(config.FIREBASE.WEB);

import EventEmitter from 'events';
import firebase from 'firebase/app';
import 'firebase/database';
import config from 'app/config/index.config';

// interface callBackProps {
//   type: string;
//   key: any;
//   value: any;
// }

class FirebaseClient {
  _dataRefs = {};

  _childDataRefs = {};

  _typeBaseData = {};

  _typeCallbacks = {};

  _emitter = null;

  _channel = '';

  app;

  _typeCallback = data => {
    if (this._typeCallbacks[data.type]) {
      for (const callback of this._typeCallbacks[data.type]) {
        callback({ key: data.key, value: data.value });
      }
    }
  };

  constructor({ appName = 'perform-live', channel = 'test-event' }) {
    const app = firebase.apps.find(app => app.name === appName);
    this.app = app || firebase.initializeApp(config.FIREBASE.WEB, appName);

    this._channel = channel;
    this._dataRefs = {};
    this._typeBaseData = {};
    this._childDataRefs = {};
    this._emitter = new EventEmitter();

    this._emitter.setMaxListeners(50);
  }

  getEmitter() {
    return this._emitter;
  }

  getServerTimestampRef() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  ref(type) {
    return firebase.database(this.app).ref(`${type}`);
  }

  getDataRef(type) {
    // cache data refs
    if (this._dataRefs[type]) {
      return this._dataRefs[type];
    }
    // if not in cache create one
    const dataRef = this.ref(type);
    this._dataRefs[type] = dataRef;

    dataRef.on('child_added', snapshot => {
      console.groupCollapsed(
        '%cFIREBASE CHILD_ADDED =>' + ` %c${type}\n`,
        'color:green',
        'color:green',
      );
      console.log(snapshot.val());
      console.groupEnd();

      this._emitter.emit('child_added', {
        type,
        key: snapshot.key,
        value: snapshot.val(),
      });
      // this._emitter.emit(`${type}_child_added`, {
      //   key: snapshot.key,
      //   value: snapshot.val(),
      // });
      // this._emitter.emit(`${type}/${snapshot.key}_changed`, {
      //   key: snapshot.key,
      //   value: snapshot.val(),
      // });
    });

    dataRef.on('child_changed', snapshot => {
      this._emitter.emit('child_changed', {
        type,
        key: snapshot.key,
        value: snapshot.val(),
      });

      // this._emitter.emit(`${type}_child_changed`, {
      //   key: snapshot.key,
      //   value: snapshot.val(),
      // });

      // this._emitter.emit(`${type}/${snapshot.key}_changed`, {
      //   key: snapshot.key,
      //   value: snapshot.val(),
      // });
    });

    dataRef.on('value', snapshot => {
      console.groupCollapsed(
        '%cFIREBASE VALUE =>' + ` %c${type}\n`,
        'color:green',
        'color:green',
      );
      console.log(snapshot.val());
      console.groupEnd();
      this._typeBaseData[type] = snapshot.val();

      this._emitter.emit('value', {
        type,
        key: snapshot.key,
        value: snapshot.val(),
      });
      this._emitter.emit(`${type}_value`, {
        type,
        key: snapshot.key,
        value: snapshot.val(),
      });
    });

    return dataRef;
  }

  async getValue(type) {
    if (!this.hasAlreadyLoadedDataRef(type)) {
      this.getDataRef(type);
      await new Promise(res => this._emitter.on(`${type}_value`, res));
    }

    return this.getLoadedValues(type);
  }

  getLoadedValues(type) {
    if (typeof this._typeBaseData[type] === 'undefined') {
      return;
    }
    return this._typeBaseData[type];
  }

  hasAlreadyLoadedDataRef(type) {
    return !!this._dataRefs[type];
  }

  getDataOnce(type, callback) {
    if (this.hasAlreadyLoadedDataRef(type)) {
      callback({ value: this.getLoadedValues(type) });
    } else {
      this.getDataRef(type);
      this._emitter.once(`${type}_value`, callback);
    }
  }

  getDataSync(type, callback) {
    if (!this._typeCallbacks[type]) {
      this._typeCallbacks[type] = [];
      this._emitter.on(`${type}_value`, this._typeCallback);
    }

    this._typeCallbacks[type].push(callback);

    if (this.hasAlreadyLoadedDataRef(type)) {
      callback({ value: this.getLoadedValues(type) });
    } else {
      this.getDataRef(type);
    }
  }

  clearDataSync(type, callback) {
    if (this._typeCallbacks[type]) {
      this._typeCallbacks[type].splice(
        this._typeCallbacks[type].indexOf(callback),
        1,
      );

      if (this._typeCallbacks[type].length <= 0) {
        this._emitter.off(`${type}_value`, this._typeCallback);
        this.unload(type);
      }
    }
  }

  setData(type, data, unbind = false) {
    this.getDataRef(type);
    const itemRef = this._dataRefs[type].set(data);
    if (unbind) {
      this.offEvents(type);
    }

    return itemRef;
  }

  sendPeerMessage(peerId, message, channel = '') {
    // need to make it dyanmic
    const path = `channel_events/${this._channel}/messageFromPeer/${peerId}`;
    const itemRef = this.pushData(path, message);
    return itemRef;
  }

  sendChannelMessage(channel = 'channel_name', message) {
    // get refrence of channel_events -> channel child reference
    const path = `channel_events/${this._channel}/channelMessage`;
    // this.updateData(type, 'channelMessage', message);
    const itemRef = this.pushData(path, message);
    return itemRef;
  }

  pushData(type, data) {
    console.groupCollapsed(
      '%cFIREBASE PUSH <=' + ` %c${data.messageType}\n`,
      'color:green',
      'color:green',
    );
    console.log(type);
    console.log(data);
    console.groupEnd();

    this.getDataRef(type);
    return this._dataRefs[type].push(data);
  }

  updateData(type, data) {
    this.getDataRef(type);
    // const updatedData = {};
    // updatedData[key] = data;
    return this._dataRefs[type].update(data);
  }

  deleteData(type, key, data) {}

  setOnDisconnect(type, data) {
    this.getDataRef(type);
    this._dataRefs[type].onDisconnect().set(data);
  }

  cancelOnDisconnect(type) {
    this.getDataRef(type);
    this._dataRefs[type].onDisconnect().cancel();
  }

  offEvents(type) {
    this.getDataRef(type);
    this._dataRefs[type].off();
    delete this._dataRefs[type];
  }

  unload(type) {
    if (this._dataRefs[type]) {
      this._dataRefs[type].off();
      delete this._dataRefs[type];
    }

    if (this._typeCallbacks[type]) {
      delete this._typeCallbacks[type];
    }
  }

  deleteNode(type) {
    this.getDataRef(type);
    return this._dataRefs[type].remove();
  }
}

export const firebaseClient = new FirebaseClient({
  appName: 'perform-live',
  channel: 'test-live',
});
