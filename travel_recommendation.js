const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const destination = document.getElementById('destination');

function searchDestination(){
    const dest = destination.value;
    console.log("dest:", dest)
}

function resetDestination(){
    destination.value = '';
}

btnSearch.addEventListener('click', searchDestination);
btnReset.addEventListener('click',resetDestination);