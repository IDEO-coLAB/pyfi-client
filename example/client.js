import PyFiClient from '../'
const py = PyFiClient();


const timeTarget = document.getElementById('time-target');


py._.onReady(()=>{
  console.log('Pythonic Ready!')
})


document.getElementById("time-button").addEventListener("click", function(){
  py.tell_me_the_time().then(result => {
    timeTarget.innerHTML = result
  })
});
