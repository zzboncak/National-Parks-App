
function buildUrl(userParam, userLimit=10) {
    //this function is responsible for building the URL which will call NPS's API
    const key = "RVxoImFP1hRAOnjs3biEeIlGjSIk6cqDN9k5pDqH";
    const baseUrl = "https://developer.nps.gov/api/v1/parks";
    const params = {
        api_key: key,
        stateCode: userParam,
        limit: userLimit,
    }
    let queryString = $.param(params);
    let url = baseUrl + "?" + queryString;
    return url;
}

function watchForm() {
    //this function is responsible for watching when the user submits the form and inputs the data
    $('#js-form').submit(event => {
        event.preventDefault();
        let userParam = $('#park-name').val();
        let userLimit = $('#park-limit').val();
        let searchUrl;

        if(userParam == ""){
            alert(`Please input a state`);
        }else{
            if (userLimit !== "") {
                searchUrl = buildUrl(userParam, userLimit);
            }else {
                searchUrl= buildUrl(userParam);
            }
            
            fetch(searchUrl).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText)
            })
            .then(responseJson => displayResults(responseJson))
            .catch(error => console.log(`Something went wrong: ${error.message}`));
        }
    })
}

function displayResults(responseJson) {
    //this function is responsible for displaying the results to the screen
    $('.results').empty();
    let parks = responseJson.data;
    for (let i in parks) {
        let park = parks[i];
        let parkName = park.name;
        let parkDescription = park.description;
        let parkUrl = park.url;
        $('.results').append(`
        <div class="park">
                    <h3 class="park-title">${parkName}</h3>
                    <p class="park-description">${parkDescription}</p>
                    <a href="${parkUrl}" target="_blank">${parkUrl}</a>
                </div>`);
    }
    $('.results-container').removeClass("hidden");
}

$(watchForm);