//TODO: print table of all registration by date
//TODO: print chart of all the regisration of the week
//TODO: print chart of all the money ernd in week / day (choise)

// Fetch all registrations and populate the Appointments Table
// צריך לבנות טבלה רספונסיבית כך שכל פעם שלוחצים רענן כל הנתונים מתווספים לטבלה
// Function to populate the table with data

//          ******** Table data *********

function populateTable(data) {
    let tableBody = document.getElementById('infoTable').querySelector('tbody');

    // Clear existing rows
    tableBody.innerHTML = '';
    for (let key in data) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${data[key].name}</td>
            <td>${data[key].email}</td>
            <td>${data[key].phone}</td>
            <td>${data[key].service}</td>
            <td>${data[key].extras}</td>
            <td>${data[key].time}</td>
            <td>${data[key].date}</td>
        `; 
        tableBody.appendChild(newRow);
    } 
}

// get all data.
let tableData = getAllRegistration();

let tableDataArr = [];

// need to build a func which add data to tableData.


//console.log(registrationArray);


// Populate the table with example data on page load
document.addEventListener('DOMContentLoaded', () => {
   populateTable(tableData);
});


//          ******** BAR CHART *********
// Get the canvas element
let ctx = document.getElementById('myBarChart').getContext('2d');

// create function that sum each of the service and push it to data by order.
let services = getServices();
let rawData = [];
for(let key in services){
    rawData.push(services[key]);
}
// Create the bar chart
let myBarChart = new Chart(ctx, {
    type: 'bar', // Specifies the chart type
    data: {
        labels: ['Haircut', 'Beard Trim', 'Full Package', 'head washing', 'eyebrows trim'], // X-axis labels
        datasets: [{
            label: 'Amount',
            data: rawData, // Y-axis data
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1 // Width of the bar borders
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true // Ensure the Y-axis starts at zero
                //TODO: change-scale in in y (only integer)
            }
        }
    }
});