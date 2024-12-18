let dateChange = false;
let tiemChange = false;
let date = document.getElementById("idDate");
let time = document.getElementById("idTime");
const serviceRadios = document.querySelectorAll('input[name="services"]');
    
// Select all extra service checkboxes
const extraCheckboxes = document.querySelectorAll('input[name="extraServices"]');
    
// Select the total price display element
const totalPriceDiv = document.getElementById('totalPrice');


function register(){
    let fullname = document.getElementById("idName");
    let email = document.getElementById("idEmail");
    let phone = document.getElementById("idphoneNumber");

    let radioServis = document.getElementsByName("services");
    //TODO: save the extra service
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
    if (tiemChange == false){// no enter time 
        alert("need to enter time");
        return;
    }
    if (!radioCheckd(radioServis)){ // no enter servise
        alert("need to enter service");
        return;
    }
    //TODO: change the this to make dicunary and save it with dataAccess.js
    alert(`thank you Mr,/Mrs, ${fullname.value} for Book hair cut on date: ${date.value} in time: ${time.value}. we will call you to this number ${phone.value}`);
    document.getElementById("appointment-form").reset();
    
}


// if user enter his date and time (not defult date/time)
date.addEventListener("change", function(){ dateChange = true;}) // TODO: change this function aftet every time that we change the date we will add or remove time in drop box
time.addEventListener("change", function(){ tiemChange = true;})

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


// check if the user select servise
function radioCheckd(radioServis){
    for (let i = 0; i < radioServis.length; i++) {
        if (radioServis[i].checked) 
            return true; //select
    }
    return false; // not celect 
}


// check valid phone with regular exprestion 
function isValidPhoneNumber(number){
    const pattern = /^05\d{8}$/;
    return pattern.test(number);
}

// check valid Email with regular exprestion 
function isValidEmail(email){
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(email);
}




