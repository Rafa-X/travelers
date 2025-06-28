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
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.description.toLowerCase().includes( destination.toLowerCase() )){
                    destinations.push({ 
                        image: city.imageUrl,
                        name: city.name, 
                        description: city.description
                    })
                    console.log(city.name)
                }
            })
        })

        resultsDiv.innerHTML = "";
        if (destinations.length === 0) {
            resultsDiv.innerHTML = "<p>No matches found.</p>";
        }else{
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