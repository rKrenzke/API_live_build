const baseURL = 'https://api.openbrewerydb.org/breweries';
const byDistance = "?by_dist=";
const byCity = "?by_city=";
const byState = "?by_state=";

const resultsBody = document.querySelector('.resultTable');
const results = document.querySelector('.results');


//Search by distance function
function searchByDistance(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(queryPosition)
    } else{
        alert('Geolocation is not supported by your browser')
    }
}

function queryPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let query = `${byDistance}${lat},${lon}`
    getBreweries(query);
}

//Search by city function
function searchByCity(){
    let cityName = document.getElementById('byCity').value;
    let query = byCity + cityName;
    getBreweries(query);
}

//Search by state function
function searchByState(){
    let stateName = document.getElementById('byState').value;
    let query = byState + stateName;
    getBreweries(query);
}

//Fectch to API
const getBreweries = async (query) => {
    let response = await fetch(`https://api.openbrewerydb.org/breweries${query}`); //`${baseUrl}${query}'
    let data = await response.json();
    displayResults(data);
}

//Display results from API call
function displayResults(data){
    //While loop that checks for previous results displayed on page. If they exist, remove them to make room for new results.
    while (resultsBody.firstChild){
        resultsBody.removeChild(resultsBody.firstChild);
    }

    //Map through the array of breweries returned from the API call
    data.map(brewery => {
        //1. Declare variables for API values (ex. brewery name, address, website, save)
        let name = brewery.name;
        let street = brewery.street;
        let city = brewery.city;
        let state = brewery.state;
        let website = brewery.website_url;
        
        //2. Create HTML elements and give them values
        let tableRow = document.createElement('tr');

        let placeTitle = document.createElement('td');
        placeTitle.innerText = name;

        let address = document.createElement('td');
        address.innerText = `${street} - ${city}, ${state}`;

        let visit = document.createElement('td');
        let linkButton = document.createElement('button');
        linkButton.setAttribute('class', 'btn btn-dark');
        linkButton.innerHTML = `<a href=${website} target="_blank">Visit</a>`; //using innerHTML to create an <a> tag inside of the new button and linking the url to the brewery's website
        visit.appendChild(linkButton);

        let save = document.createElement('td');
        let saveButton = document.createElement('button');
        saveButton.setAttribute('class', 'btn btn-danger');
        saveButton.innerHTML = "&#127866"; //HTML entity code for beer mug icon
        save.appendChild(saveButton);

        //3. Append those new HTML elements to the DOM
        tableRow.appendChild(placeTitle);
        tableRow.appendChild(address);
        tableRow.appendChild(visit);
        tableRow.appendChild(save);

        resultsBody.appendChild(tableRow);
        results.style.display = 'block';
    })
}

