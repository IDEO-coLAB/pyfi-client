const io = require('socket.io-client');
const randomstring = require('randomstring');

class MessagePromise {
  constructor(cb) {
    const promiseCb = cb.bind(this, (m) => {
      if (this.messageHandler) {
        this.messageHandler(m);
      }
    });
    this.innerPromise = new Promise(promiseCb);
  }
  then(...args) {
    this.innerPromise.then(...args);
    return this;
  }
  catch(...args) {
    this.innerPromise.catch(...args);
    return this;
  }
  onMessage(handler) {
    this.messageHandler = handler;
    return this;
  }
}

class PyFiClient {
  constructor(uri){
    this.uri = uri;
    this.run = {};
    this.pythonProcesses = {};
    this.startSocket();
  }
  startSocket(){
    this.socket = io(this.uri);
    this.socket.on('pyfi-modules', (data) => {
      this.initModules(data)
    })
    this.socket.on('connect', ()=>{
      this.socket.emit('pyfi-get-modules')
    })
    this.socket.on('pyfi-run-data', (res) => {
      this.pythonProcesses[res.rid].resolve(res.data)
    })
    this.socket.on('pyfi-run-error', (res) => {
      this.pythonProcesses[res.rid].reject(res.error)
    })
    this.socket.on('pyfi-run-message', (res) => {
      this.pythonProcesses[res.rid].message(res.message)
    })
  }
  initModules(moduleTree){
    this.run = this.getCallables(moduleTree);
    if(this.readyCallback){
      this.readyCallback();
    }
  }
  getCallables(moduleTree, treeLoc){
    return moduleTree.reduce((result, element) => {
      const isFunc = typeof element === 'string';
      const modName = treeLoc ? treeLoc : '';
      if(isFunc){
        result[element] = (args=[], kwargs={}) => {
          return this.callPython({
            action: 'RUN',
            module: modName,
            function: element,
            args: Array.isArray(args) ? args : [],
            kwargs: Array.isArray(args) ? kwargs : args
          })
        }
      }else{
        const subModName = Object.keys(element)[0];
        const nextSubModName = modName ? `${modName}.${subModName}` : subModName;
        result[subModName] = this.getCallables(element[subModName], nextSubModName)
      }
      return result;
    }, {})
  }
  callPython(request){
    const rid = randomstring.generate(5)
    this.socket.emit('pyfi-run', {rid, request})
    return new MessagePromise((message, resolve, reject) => {
      this.pythonProcesses[rid] = {message, resolve, reject}
    })
  }
  onReady(callback){
    this.readyCallback = callback;
  }

}

const proxyHandler = {
  get: (target, key, receiver) => {
    if (key === '_') {
      return target;
    } else if (target.run && key in target.run) {
      return target.run[key];
    }
    return undefined;
  },
};

module.exports = function(uri){ return new Proxy(new PyFiClient(uri), proxyHandler) };
