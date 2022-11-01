const host = window.location.protocol+"//"+window.location.hostname;

const form = document.getElementById("emergency-form");
const message_box = document.getElementById("message-box");
const errorText = document.getElementById("error-response");
form.addEventListener("submit", submit);

function errorDisplay(error) {
    if (error == "Message recieved. Message sent.") {
      errorText.innerHTML = '<span class=success>'+error+'</span>';
    }
    else {
      errorText.innerHTML = '<span class=error>'+error+'</span>';
    }
}

function submit(submit_form) {
    submit_form.preventDefault();
    if (message_box.value == '') {
      errorDisplay('Please input a message.');
      return;
    }
    let formData = new FormData(submit_form.target);
    let jsonFile = {'contacts':[]};
    formData.forEach((v, i) => {
        if (i=='phonenumber' && v != ''){
            jsonFile['contacts'].push("+1"+v);
        }
        else if (i=='message') {
            jsonFile[i] = v;
        }
    });
    if (jsonFile['contacts'] == ['']) {
      errorDisplay('Please input a phone number.');
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('POST', host+'/api/sos', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(JSON.stringify(jsonFile));
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            errorDisplay(xhr.response);
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

    let dummy = "<label for=\"phonenumber"+num_forms+"\">Emergency contact #"+num_forms+":</label><br><input type=\"tel\" pattern=\"[0-9]{10}\" id=\"phonenumber"+num_forms+"\" name=\"phonenumber\"  placeholder=\"1231231234\"><br><br>";
    
    document.getElementById('phone-numbers').insertAdjacentHTML("beforeend", dummy);
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

