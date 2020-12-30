// Fetch the summary of the article from our Express API
const fetchFilteredEvents = (event) => {
    const filters = event.target.value;

    fetch(`/userApi/filter/${filters}`)
    .then(res => res.json())
    .then((data) => {
        const eventsFilteredData = data.eventData;
        updateRows(eventsFilteredData);
    })
    .catch((error) => console.log(error));
};

// Updates rows to reflect filters 
function updateRows( eventsData ){
    // Remove current DOM elements
    const tableOfEvents = document.getElementById("tableOfEvents"); 
    const rows = tableOfEvents.rows;
    const rowCount = rows.length;
    // delete existing rows
    for ( let rInd = rowCount-1; rInd > 0; rInd-- ){
        tableOfEvents.deleteRow( rInd );
    }
    // add updated rows from data 
    tableBody = tableOfEvents.getElementsByTagName('tbody')[0]; 
    for (let ev of eventsData){
        let imageHTML = " "; 
        if ( typeof ev.eventImage !== 'undefined' ){
            imageHTML = `<img class="image" src="${ev.eventImage.url}"></img>`;
        }
        // insert
        tableBody.insertRow().innerHTML = `<tr id="${ev.eventID}"><td><h4>${ev.title}</h4>${imageHTML}</td><td><p>Starts: ${ev.startDateTime.replace(/T/g, "<br>")}</p><p>Ends:${ev.endDateTime.replace(/T/g, "<br>")}</p></td><td><p>${ev.description}</p></td></tr>`;
    }
    // update row count
    document.getElementById("eventCount").innerHTML = `Filtered Events: ${eventsData.length}`; // -1 for header row
}

// EVENT LISTENERS 
//
//  RESET filters Button 
const resetFilters = document.getElementsByClassName("resetFilters");
resetFilters[0].addEventListener("click", (event) => fetchFilteredEvents(event));

// SELECTED filters 
// 
const select = document.getElementsByClassName("select");
for (let filter of select) {
    filter.addEventListener("change", (event) => fetchFilteredEvents(event));
}
