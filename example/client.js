import PyFiClient from '../'
console.log(PyFiClient);
const py = PyFiClient();

console.log(py)

const timeTarget = document.getElementById('time-target');


py._.onReady(()=>{
  console.log('Pythonic Ready!')
})

document.getElementById("time-button").addEventListener("click", function(){
  py.tell_me_the_time().then(result => {
    timeTarget.innerHTML = result
  })
});
