
// Fetch the summary of the article from our Express API
const fetchFilteredEvents = (event) => {
    const filter = event.target.textContent;
  
    // removeExistingElements();

    fetch(`/user-api/filter/${filter}`)
      .then((res) => res.json())

      .then((data) => {
        


        // update elements

        

      })
      .catch((error) => console.log(error));
};



function returnRowList(){
    return ["147278572", "147782485", "147454127"];
}





// checks and removes elements not longer required on page
function removeRowsNotRequired(idListOfRows){

    // existing table including header row
    let tableOfEvents =document.getElementById("tableOfEvents"); 
    let tableRows = tableOfEvents.rows; 
    let tableRowCount = tableRows.length;

    // 
    console.log(tableRowCount);
    console.log(idListOfRows);

    // elements of the DOM
    for ( let row of tableRows){

        //console.log(currentID); 
        if ( row.id != "tableHeaderRow"  ) {
            console.log(currentID);
            // remove from DOM table
            tableOfEvents.deleteRow(row.rowIndex);
            // removeRowById(currentID);
        }
        else {
            // remove from DOM
            //removeRowById(currentID);
        }


    }
    


};





// add event listener for each drop-down filter option 
const filterSelected = document.getElementsByClassName("selectShow");

for (let filter of filterSelected) {
    filter.addEventListener("click", removeRowsNotRequired(returnRowList()) );
}






