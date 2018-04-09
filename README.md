# pyfi-client [![CircleCI](https://circleci.com/gh/IDEO-coLAB/pyfi-client/tree/master.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/IDEO-coLAB/pyfi-client/tree/master) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/IDEO-coLAB/pyfi-client/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/pyfi-client.svg)](https://www.npmjs.com/package/pyfi-client)

Quickly make Python functions available to a javascript client when used along with [PyFi](https://github.com/ideo-colab/pyfi) ✨

## Usage

Pyfi-Client duplicates the functionality exposed to the server and makes it available to the client via Socket.io.


### Setting up a server
Getting up and running is pretty simple. From your Node PyFi instance, attach a socket.io instance:
```js
py._.attachClientSocketIO(io)
```

Here's a full example using express:
```js
const express = require('express');
const PyFi = require('pyfi');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));


const py = PyFi({
    path: './python',
    imports: [{
      import: ['tell_me_the_time'],
      from: 'timing',
    }],
  });

py._.attachClientSocketIO(io);

// wait for PyFi to init
py._.onReady(() => {
  server.listen(3000, () => {
    console.log('listening on port 3000!');
  });
});
```
You can find the full working example [here](https://github.com/IDEO-coLAB/pyfi-client/tree/master/example).

### Connecting a Client

Once you have a server set up, it's quite straightforward to connect a client.

```js
const PyFiClient = require('pyfi-client');
// or
import PyFiClient from 'pyfi-client';

const py = PyFiClient(http://localhost:3000)

py._.onReady(()=>{
  py.tell_me_the_time().then(result => {
    console.log(result)
  })
})
```
PyFiClient automatically duplicates all of the Python functions imported on the server on the client.

## Reference

### PyFiClient([address])
Returns a `PyFiClient` instance and initializes callables that match those available in the server instance of PyFi.

You may provide an address for the serer (i.e. `http://localhost:3000`), or if no server is provided, the client will connect to the host address. This matches the functionality of [socket.io](https://socket.io/).


### Methods
**`_.onReady(callback)`**
Attach a callback function to call when the instance of PyFiClient is ready.


## Contributing
We welcome issues and pull requests.

If you spot a bug, please provide as much context as possible – including your OS, which versions of Node and Python you're running on, how you're managing your Python environment, and anything else that could be relevant.

## License
MIT License (c) 2018 - Present IDEO CoLab
