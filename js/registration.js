let dateChange = false;
let date = document.getElementById("idDate");
const serviceRadios = document.querySelectorAll('input[name="services"]');
const extraCheckboxes = document.querySelectorAll('input[name="extraServices"]');
const totalPriceDiv = document.getElementById('totalPrice');


function register(){
    let fullname = document.getElementById("idName");
    let email = document.getElementById("idEmail");
    let phone = document.getElementById("idphoneNumber");
    const timeCombobox = document.getElementById('idTime');

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
    if (timeCombobox.value == "no time")
    {
        alert("change date");
        return;
    }
    if (radioServices == ""){ // no enter servise
        alert("need to enter service");
        return;
    }
    let personRegistration = {
        name: fullname.value,
        email: email.value,
        phone: phone.value,
        date: date.value,
        time: timeCombobox.value,
        service: radioServices,
        extras: extras
    };
    saveRegistration(personRegistration);
    clearTime();
    document.getElementById("appointment-form").reset();
    
}


// if user enter his date and time (not default date/time)
date.addEventListener("change", function(){ 
    clearTime();
    dateChange = true;
    updateTimesByDate(date.value);
});


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
/**
 * Removes all options from the time select dropdown.
 */
function clearTime(){
    let timeCombobox = document.getElementById('idTime');
    while (timeCombobox.length > 0) timeCombobox.remove(0);
}
/**
 * Updates the time select dropdown based on the selected date.
 * Adds available times and handles the scenario when no times are available.
 *
 * @param {string} selectedDate - The date for which to update available times.
 */
function updateTimesByDate(date){
    let timeCombobox = document.getElementById('idTime');
    let used = getAllUsedTimesByDate(date);
    let listPossibleHour = [];
    for (let hour = 8; hour < 17; hour++){
        listPossibleHour.push((hour < 10) ? `0${hour}:00` : `${hour}:00`);
    }
    let notUsedTime = listPossibleHour.filter(usedTime => !used.includes(usedTime));

    for(let k = 0; k < notUsedTime.length; k++){
        let option = document.createElement("option");
        option.text = notUsedTime[k];
        timeCombobox.add(option);
    }

    if (timeCombobox.options.length === 0){
        let option = document.createElement("option");
        document.getElementById('timelbl').value = "No Time Available";
        option.text = "no time";
        timeCombobox.add(option);
    } 
}

// check valid phone with regular expression 
function isValidPhoneNumber(number){
    const pattern = /^05\d{8}$/;
    return pattern.test(number);
}

// check valid Email with regular expression 
function isValidEmail(email){
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}




