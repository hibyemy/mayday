const form = document.getElementById("emergency-form");
form.addEventListener("submit", submit);

var errorText = document.getElementById("error-response");

function errorDisplay(error) {
    errorText.innerHTML = '<span>'+error+'</span>';
}

function submit(submit_form) {
    submit_form.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:7116/api/sos', true);
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
    if (num_forms > 5) {
        errorDisplay('Error: Max 5 contacts.')
        return;
    }
    var dummy = "<label for=\"phonenumber"+num_forms+"\">Emergency contact #"+num_forms+":</label><br><input type=\"tel\" pattern=\"\\+1[0-9]{10}\" id=\"phonenumber"+num_forms+"\" name=\"phonenumber\"  placeholder=\"+11231231234\"><br><br>";
    document.getElementById('phone-numbers').innerHTML += dummy;
    num_forms += 1;    
}

var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}
console.log(x.innerHTML);
