
// Fetch the summary of the article from our Express API
const fetchFilteredEvents = (event) => {
    const filter = event.target.textContent;
  

    fetch(`/user-api/filter/${filter}`)
      .then((res) => res.json())

      .then((data) => {
        
        // update elements

      })
      .catch((error) => console.log(error));
};


// TODO remove below later
function returnRowDummyList(){
    return ["147278572", "147782485", "147454127", "146421295", "145562147", "141019107"];
}


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


/*
// add event listener for each drop-down filter option 
const filterSelected = document.getElementsByClassName("selectShow");

for (let filter of filterSelected) {
    filter.addEventListener("click", removeRowsNotRequired(returnRowList()) );
}
*/





