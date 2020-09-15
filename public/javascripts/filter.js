// Fetch the summary of the article from our Express API
const fetchFilteredEvents = (event) => {
    const filters = event.target.value;

    if ( filters == "RESET" ) {
        // Refresh table with all updated events 
        window.location.reload()
        // TODO - refine to only reload table 
        // tableElements = document.getElementById("tableOfEvents");
        // tableElements.location.reload(true);
    }
    else {
        fetch(`/userApi/filter/${filters}`)
        .then(res => res.json())
        .then((data) => {
            const eventsFilteredArr = data.events;
            // update elements as required 
            removeRowsNotRequired(eventsFilteredArr)
            // update count 
            updateCount();
        })
        .catch((error) => console.log(error));
    }
};


// takes array of id strings that should be displayed
// deletes all current elements from DOM not in given array 
function removeRowsNotRequired(idListOfRows){
    // Current DOM elements
    const tableOfEvents = document.getElementById("tableOfEvents"); 
    let tableRows = tableOfEvents.rows; 
    // Save row ID's to delete
    let rowsToDeleteByID = []
    for ( let row of tableRows){
        let currentRowID = row.id; 
        if ( currentRowID != "tableHeaderRow" ) {
            let currentRowIDInt = parseInt(currentRowID, 10); // radix = 10 for base 10 numeral system 
            if ( !( idListOfRows.includes(currentRowIDInt)) ){
                // This row need to be deleted, add to list 
                rowsToDeleteByID.push(currentRowID);
            }
        }
    }
    // remove rows on hit list from DOM 
    for (let rowID of rowsToDeleteByID){
        let row = document.getElementById( rowID );
        row.parentNode.removeChild(row);
    }
};

// Update count
function updateCount(){
    const tableOfEvents = document.getElementById("tableOfEvents"); 
    const rowCount = tableOfEvents.rows.length;
    document.getElementById("eventCount").innerHTML = `Filtered Events: ${rowCount}`;
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





