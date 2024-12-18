//this js code will handle database on local storage 
//the build of the data will be in this structure:
// local storage:{
// registrations:
// {
// key: {name: "", Email: "", phone:"",date:"",time"",service:"",extra:[1,2,3]},
// key: {name: "", Email: "", phone:"",date:"",time"",service:"",extra:[1,2,3]},
// key: {name: "", Email: "", phone:"",date:"",time"",service:"",extra:[1,2,3]},
// key: {name: "", Email: "", phone:"",date:"",time"",service:"",extra:[1,2,3]},
// }
// services§:
//{}
//
//}
// {name: "", Email: "", phone:"",date:"",time"",service:"",extra:[1,2,3]} is json structure that we will named registration

//get json of person and enter it into the local storage
function saveRegistration(personRegistration){
    let registrations = getAllRegistration();
    let uniqueKey = idMaker();
    registrations[uniqueKey] = personRegistration;
    localStorage.setItem('registrations', JSON.stringify(registrations));
    return uniqueKey;
} 
// give a unique key to 
function idMaker(){
    return 'reg_' + Date.now() + '_' + Math.random().toString(36);
} 
//get from the local storage all the Registration
function getAllRegistration(){
    return JSON.parse(localStorage.getItem('registrations')) || {};
} 
//get all the Registration in date 
function getAllRegistrationByDate(date){
    let registrations = getAllRegistration();
    let filteredRegistrations = {};
    for( let key in registrations) {
        let registration  = registrations[key];
        if(registration.date === date){
            filteredRegistrations[key] = registration;
        }
    }
    return filteredRegistrations;
} 

function getAllUsedTimesByDate(date){
    let allRegInDate = getAllRegistrationByDate(date);
    let usedTime = []
    for(let key in allRegInDate)
    {
        usedTime.push(allRegInDate[key].time);
    }
    return usedTime;
}

// function getServices(){
//     let registrations = getAllRegistration();
//     let services = {"haircut":0,"beard_trim":0,"full_package":0};
//     for (let key in registrations) {
        
//     }
// }

