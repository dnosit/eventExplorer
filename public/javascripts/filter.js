// Fetch the summary of the article from our Express API
const fetchFilteredEvents = (event) => {
    const filters = event.target.textContent;

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
            const eventsFiltered = data.events;

        // update elements as required 
        removeRowsNotRequired(eventsFiltered)

        })
        .catch((error) => console.log(error));
    }
};



// takes array of id strings that should be displayed
// deletes all current elements from DOM not in given array 
function removeRowsNotRequired(idListOfRows){
    // Current DOM elements
    let tableOfEvents = document.getElementById("tableOfEvents"); 
    let tableRows = tableOfEvents.rows; 
    // Save row ID's to delete
    let rowsToDeleteByID = []
    for ( let row of tableRows){
        let currentRowID = row.id;
        if ( currentRowID != "tableHeaderRow" ) {
            if ( !(idListOfRows.includes(currentRowID)) ){
                // This row need to be deleted, add to list 
                rowsToDeleteByID.push(currentRowID);
            }
        }
    }
    // remove rows on hit list from DOM 
    for (let rowID of rowsToDeleteByID){
        let row = document.getElementById(rowID);
        row.parentNode.removeChild(row);
    }
};





// EVENT LISTENERS 
//
//  RESET filters Button 
const resetFilters = document.getElementsByClassName("resetFilters");
resetFilters[0].addEventListener("click", (event) => fetchFilteredEvents(event));


// SELECTED filters 
// 
//  - Type 
const selectType = document.getElementsByClassName("selectType");
for (let filter of selectType) {
    filter.addEventListener("click", (event) => fetchFilteredEvents(event));
}


function sendUpdatedFiltersSelected(){
    const filtersSelected = {};
    filtersSelected[0] = selectType.value;


    fetchFilteredEvents(filtersSelected);
}




