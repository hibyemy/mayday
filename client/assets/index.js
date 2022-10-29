const host = 'http://localhost:7116'

const form = document.getElementById("emergency-form");
const message_box = document.getElementById("message-box");
const errorText = document.getElementById("error-response");
form.addEventListener("submit", submit);

function errorDisplay(error) {
    errorText.innerHTML = '<span>'+error+'</span>';
}

function submit(submit_form) {
    submit_form.preventDefault();
    if (message_box.value == '') {
      errorDisplay('Please input a message.')
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('POST', host+'/api/sos', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    var formData = new FormData(submit_form.target);
    var jsonFile = {'contacts':[]};
    formData.forEach((v, i) => {
        if (i=='phonenumber'){
            jsonFile['contacts'].push(v);
        }
        else {
            jsonFile[i] = v;
        }
    });
    xhr.send(JSON.stringify(jsonFile));
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            errorDisplay(xhr.response)
        }
      }
}

const addNumberButton = document.getElementById("add-number");
addNumberButton.addEventListener("click", addNewNumberForm);

let num_forms = 2;

function addNewNumberForm() {
    if (num_forms >= 5) {
        addNumberButton.style.display = 'none';
    }
    var dummy = "<label for=\"phonenumber"+num_forms+"\">Emergency contact #"+num_forms+":</label><br><input type=\"tel\" pattern=\"\\+1[0-9]{10}\" id=\"phonenumber"+num_forms+"\" name=\"phonenumber\"  placeholder=\"+11231231234\"><br><br>";
    document.getElementById('phone-numbers').innerHTML += dummy;
    num_forms += 1;    
}

const x = document.getElementById("demo");
x.addEventListener("click", getLocation);

function geolocationError(error) {
  x.innerHTML = (error.message);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, geolocationError);
  } else { 
    x.innerHTML = ("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  let string = "Latitude: " + position.coords.latitude.toString() + 
  "<br>Longitude: " + position.coords.longitude.toString();
  console.log(string);
  x.innerHTML = string;
  message_box.value += string.replace(/\<br\>/g, ", ");
}

