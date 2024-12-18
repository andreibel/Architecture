let dateChange = false;
let tiemChange = false;

function register(){
    let fullname = document.getElementById("idName");
    let email = document.getElementById("idEmail");
    let phone = document.getElementById("idphoneNumber");
    let date = document.getElementById("idDate");
    let time = document.getElementById("idTime");
    let radioServis = document.getElementsByName("services");
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
    alert(`thank you Mr,/Mrs, ${fullname.value} for Book hair cut on date: ${date.value} in time: ${time.value}. we will call you to this number ${phone.value}`);
    document.getElementById("appointment-form").reset();
    
}


// if user enter his date and time (not defult date/time)
date.addEventListener("change", function(){ dateChange = true;})
time.addEventListener("change", function(){ tiemChange = true;})


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




