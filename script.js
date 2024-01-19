// variable to hold current date and time
var today = dayjs();
// get page objects
var tableBody = $('#table-body');
var projectName = $('#project-name');
var projectType = $('#project-type');
var hourlyWage = $('#hourly-wage');
var dueDate = $("#date-picker");
var projectForm = $('#project-form');
var deleteBtn;
var newRow;
var daysLeft;
// variable to number rows
var i = 1;
dueDate.datepicker();

var formData = [projectName, projectType, hourlyWage, dueDate];
// function to display time
function displayTime() {
    var currentTime = dayjs().format('DD-MM-YYYY hh:mm:ss a');
    console.log(currentTime);
    $('#current-time').text(currentTime);
};

// set interval to update time every second
setInterval(displayTime, 100);
function handleFormSubmit(event) {
    // Prevent the default behavior
    event.preventDefault();
    newRow = $('<tr>');
    newRow.attr('data-number', i);
    newRow.attr('class', 'new-row');
    daysLeft = dayjs(dueDate.val()).diff(today, 'day');
    tableBody.append(newRow);
    newRow.append($('<th>').attr('scope', 'row').text(i));
    i++;
    newRow.append($('<td>').text(projectName.val()));
    newRow.append($('<td>').text(projectType.val()));
    newRow.append($('<td>').text(hourlyWage.val()));
    newRow.append($('<td>').text(dayjs(dueDate.val()).format('DD-MM-YYYY')));
    newRow.append($('<td>').text(daysLeft));
    newRow.append($('<td>').text(daysLeft * hourlyWage.val()));
    deleteBtn = $('<button>');
    deleteBtn.addClass('delete-project-btn');
    deleteBtn.text('x');
    newRow.append($('<td>')).append(deleteBtn);
    projectName.val('');
    projectType.val('');
    hourlyWage.val('');
    dueDate.val('');
    $('#exampleModal').modal('hide');
    saveTable();

};

function deleteProject(event) {
    $(event.target).parent().remove();
};

loadData()

projectForm.on('submit', handleFormSubmit);
tableBody.on('click', '.delete-project-btn', deleteProject);
function saveTable() {
    // Retrieve the table contents
    const rows = $('.new-row');
    var tableData;
    if (!tableData) {
        tableData = [];
    };
    // Iterate through the rows and cells to extract the data
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowData = [];
        for (let j = 0; j < cells.length; j++) {
            rowData.push(cells[j].innerText);
        };
        tableData.push(rowData);
    };
    // Convert the data to a suitable format (e.g., JSON)
    const jsonData = JSON.stringify(tableData);

    // Store the data in local storage
    localStorage.setItem('tableData', jsonData);
};
