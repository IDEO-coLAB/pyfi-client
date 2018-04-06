const test = require('tape');

const PyFi = require('pyfi');
const PyFiClient = require('../');


test('start server, test client', (t) => {
  t.plan(1);

    const express = require('express');

    const app = require('express')();
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    const py = PyFi({
      path: './',
      imports: [{
        from: 'time',
        import: 'time',
      }],
    });

    py._.attachSocketIO(io);

    py._.onReady(() => {
      server.listen(3000, () => {

        const pyc = PyFiClient('http://localhost:3000');

        pyc._.onReady(()=>{
          pyc.time().then((res)=>{
            t.pass(`time: ${res}`);
            py._.end()
            t.end();
            process.exit(0)
          }).catch((err) => {
            t.fail(err);
            py._.end()
            t.end();
            process.exit(1)
          })
        })

      });
    });


});
