const btnSearch =   document.getElementById('btnSearch');
const btnReset =    document.getElementById('btnReset');
const destinationInput = document.getElementById('destination');
const destinations = [];
const resultsDiv =  document.getElementById('results');

function searchDestination(){
    const destination = destinationInput.value;
    console.log("dest:", destination)
    if (destination.trim() === "") {return;}

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {    
        const regex = new RegExp(destination.toLowerCase(), "i"); // "i" = case insensitive
        
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                if (regex.test(city.description)) {
                    destinations.push({
                        image: city.imageUrl,
                        name: city.name,
                        description: city.description
                    });
                    console.log(city.name)
                }
            });
        });

        Object.entries(data).forEach(([key, items]) => {
            items.forEach(item => {
                //contries key value that have CITIES
                if (Array.isArray(item.cities)) {
                    item.cities.forEach(city => {
                        if( regex.test(city.description.toLowerCase()) ){
                            destinations.push({
                                image: city.imageUrl,
                                name: city.name,
                                description: city.description,
                            });
                            console.log(city.name)
                        }
                    });
                }else{
                    //Places key value that don't have CITIES
                    if( regex.test(item.description.toLowerCase()) ){
                        destinations.push({
                            image: item.imageUrl,
                            name: item.name,
                            description: item.description,
                        });
                        console.log(item.name)
                    }
                }
            })
        });

        resultsDiv.innerHTML = "";
        if (destinations.length === 0) {
            resultsDiv.innerHTML = "<p>No matches found.</p>";
        }else{
            console.log(destinations.length)
            destinations.forEach(item => {
                const p = document.createElement('p');
                p.innerHTML = 
                    `<img src="${item.image}" alt="${item.name}" /><br>
                    <strong>${item.name}</strong><br>
                    <small>${item.description}</small>
                    <button>Visit</button>`;
                resultsDiv.appendChild(p);
            })
            resultsDiv.style.display = "block";
        }
    })
    .catch(error => {
        console.log("Error:", error);
    })
}

function resetDestination(){
    destination.value = '';
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = "none"; // Lo oculta visualmente
    destinations = [];
}

btnSearch.addEventListener('click', searchDestination);
btnReset.addEventListener('click',resetDestination);