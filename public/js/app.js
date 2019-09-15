console.log('Hola esto es la consola!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageTwo.textContent = 'Cargando..'

    const location = search.value;
    const url = '/weather?address='+ encodeURIComponent(location) 
    
    fetch(url).then((response) => {
    response.json().then((data) => {
        //console.log(data);
        if (data.error) {
            messageTwo.textContent = data.error;
        } else {
            messageOne.textContent = data.address;
            messageTwo.textContent = data.forecast
        } 
    })
})

})