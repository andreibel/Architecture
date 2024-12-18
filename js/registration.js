let dateChange = false;
let timeChange = false;
let date = document.getElementById("idDate");

const serviceRadios = document.querySelectorAll('input[name="services"]');
    
// Select all extra service checkboxes
const extraCheckboxes = document.querySelectorAll('input[name="extraServices"]');
    
// Select the total price display element
const totalPriceDiv = document.getElementById('totalPrice');

let timeCombobox = document.getElementById('idTime');


function register(){
    let fullname = document.getElementById("idName");
    let email = document.getElementById("idEmail");
    let phone = document.getElementById("idphoneNumber");

    let radioServices = radioChecked(document.getElementsByName("services"));
    let extras = getExtras(extraCheckboxes);

    if (fullname.value == "") { // checks if user enter name
        alert("enter name");
        return;
    }
    if(!isValidEmail(email.value)){ // check Email with regex
        alert( "Enter correct Email"); 
        return;
    }
    if (!isValidPhoneNumber(phone.value)){// check phone Number with regex
        alert("Invalid phone number");
        return;
    }
    if (dateChange == false) { // no enter date
        alert("need to enter date");
        return;
    }
    if (timeCombobox.value == "")
    {
        alert("change date");
        return;
    }
    if (radioServices == "no time"){ // no enter servise
        alert("need to enter service");
        return;
    }
    let personRegistration = {
        name: fullname.value,
        email: email.value,
        phone: phone.value,
        date: date.value,
        time: time.value,
        service: radioServices,
        extras: extras
    };
    //{name: "", Email: "", phone:"",date:"",time"",service:"",extra:["",""]} 
    saveRegistration(personRegistration);
    clearTime();
    //alert(`thank you Mr,/Mrs, ${fullname.value} for Book hair cut on date: ${date.value} in time: ${time.value}. we will call you to this number ${phone.value}`);
    document.getElementById("appointment-form").reset();
    
}


// if user enter his date and time (not default date/time)
date.addEventListener("change", function(){ 
    clearTime();
    dateChange = true;
    updateTimesByDate(date.value);
});

// TODO: change this function after every time that we change the date we will add or remove time in drop box

function calculateTotal() {
    let total = 0;

    // Iterate through main services and add the price of the selected one
    serviceRadios.forEach(radio => {
        if (radio.checked) {
            total += parseFloat(radio.getAttribute('data-price')) || 0;
        }
    });

    // Iterate through extra services and add the prices of the selected ones
    extraCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.getAttribute('data-price')) || 0;
        }
    });

    // Update the total price display
    totalPriceDiv.textContent = `Total Price: $${total}`;
}
serviceRadios.forEach(radio => {
    radio.addEventListener('change', calculateTotal);
});

// Attach event listeners to extra service checkboxes
extraCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculateTotal);
});

//getting customer's selected service:
function radioChecked(radioServices){
    for (let i = 0; i < radioServices.length; i++) {
        if (radioServices[i].checked) 
            return radioServices[i].value; //select
    }
    return ''; // not select 
}

//getting all of the customer's selected extra services
function getExtras(checkboxes){
    selected = []
    for (let i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked)
            selected.push(checkboxes[i].value);
    }
    return selected;
}

function clearTime(){
    while (timeCombobox.length > 0) timeCombobox.remove(0);
}

function updateTimesByDate(date){
    let used = getAllUsedTimesByDate(date);
    for (let i = 8; i < 17; i++){
        let timeUsed = false;
        for (let j = 0; j < used.length; j++){
            if (Number(used[j].substring(0, 2)) == i){
                timeUsed = true;
                break;
            }
        }
        if (!timeUsed){
            let option = document.createElement("option");
            option.text = (i < 10) ? `0${i}:00` : `${i}:00`;
            timeCombobox.add(option);
        }
    }
    if (timeCombobox.options.length == 0){
        document.getElementById('timelbl').value = "No Time Available";
        timeCombobox.add("no time");
    } 
}

// check valid phone with regular expression 
function isValidPhoneNumber(number){
    const pattern = /^05\d{8}$/;
    return pattern.test(number);
}

// check valid Email with regular expression 
function isValidEmail(email){
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(email);
}




