// Fetch the summary of the article from our Express API
const fetchFilteredEvents = (event) => {
    const filter = event.target.textContent;
  
    fetch(`/user-api/filter/${filter}`)
      .then((res) => res.json())
      .then((data) => {
        const parent = event.target.parentElement;
        const p = document.createElement("p");
        p.textContent = data.filter;
        parent.append(p);
      })
      .catch((error) => console.log(error));
  };
  
  
  // add event listener for each drop-down option 
  const filtersSelected = document.getElementsByClassName("selectShow");
  
  for (let filter of filtersSelected) {
    filter.addEventListener("click", (event) => fetchFilteredEvents(event));
  }
  