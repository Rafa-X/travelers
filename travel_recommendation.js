const btnSearch =   document.getElementById('btnSearch');
const btnReset =    document.getElementById('btnReset');
const btnSubmit =   document.getElementById('button-form');
const destinationInput = document.getElementById('destination');
const destinations = [];
const resultsDiv =  document.getElementById('results');
const formF1 = document.getElementById('form_name');
const formF2 = document.getElementById('form_mail');
const formF3 = document.getElementById('form_msg');

function searchDestination(){
    destinations.length = 0;  //restart destinations array
    const destination = destinationInput.value;
    console.log("dest:", destination)
    if (destination.trim() === "") {return;}

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {    
        const regex = new RegExp(destination.toLowerCase(), "i"); // "i" = case insensitive

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
                const itemDiv = document.createElement("div");
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <p>Nombre del destino: <strong>${item.name}</strong></p>
                    <p>${item.description}</p>
                    <button>Ver más</button>
                    `;
                resultsDiv.appendChild(itemDiv);
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
    destinations.length = 0;
}

function submitForm(){
    alert('Form Submitted!');
    formF1.value = '';
    formF2.value = '';
    formF3.value = '';
}

btnSearch.addEventListener('click', searchDestination);
btnSearch.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        searchDestination();
    }
})
btnReset.addEventListener('click',resetDestination);
btnSubmit.addEventListener('click', submitForm);