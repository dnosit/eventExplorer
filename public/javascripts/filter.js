
// Fetch the summary of the article from our Express API
const fetchFilteredEvents = (event) => {
    const filter = event.target.textContent;
  
    removeExistingElements();

    fetch(`/user-api/filter/${filter}`)
      .then((res) => res.json())

      .then((data) => {
        


        // update elements

        

      })
      .catch((error) => console.log(error));
};

// add event listener for each drop-down filter option 
const filterSelected = document.getElementsByClassName("selectShow");

for (let filter of filterSelected) {
    filter.addEventListener("click", removeExistingElements() );
}


function removeRowById(Id){
    let row = document.getElementById(Id);
    row.parentNode.removeChild(row);
};