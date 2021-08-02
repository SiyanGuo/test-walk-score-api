var caApiUrl = "https://statcan-all-indicators-statcan-apicast-production.api.canada.ca/v1/ind-all.json";
var caOptions = {
    headers: {
        "user-key": "a48dba9596f7af379ff5df3c26ecc425"
    }
}

var indicators;
var unemployment;
var immigrants;
var crime;
var geoCode;

//fetch API data - all indicators
var fetchApi = function () {
    console.log("calling from onload");
    fetch(caApiUrl, caOptions)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                alert("Error: No results are found")
            }
        })
        .then(function (data) {
            console.log("data", data);
            indicators = data.results.indicators;
            getIndicators(data.results.indicators)
        })
}

//get three main indicators
var getIndicators = function (promise) {
    indicators = promise;
    unemployment = _.filter(indicators, { 'registry_number': 3587, 'indicator_number': 2 })
    console.log("unemploy", unemployment);
    immigrants = _.filter(indicators, { 'registry_number': 14428, 'indicator_number': 1 })
    console.log("immigrants", immigrants);
    crime = _.filter(indicators, { 'registry_number': 4751, 'indicator_number': 1 })
    console.log("crime", crime);
};

//display three main indicators  
var showIndicators = function (geoCode) {
    //show unemployment rate
    var theUnemployment = _.filter(unemployment, ['geo_code', geoCode]);
    theUnemployment = theUnemployment[0].value.en;
    console.log("unemployment rate", theUnemployment);
    $("#unemployment").text(theUnemployment);

    //show immigrants rate
    var theImmigrants = _.filter(immigrants, ['geo_code', geoCode]);
    theImmigrants = theImmigrants[0].value.en;
    console.log("immigrants rate", theImmigrants);
    $("#immigrants").text(theImmigrants + "%");

    //show crime severity index 
    var theCrime = _.filter(crime, ['geo_code', geoCode]);
    theCrime = theCrime[0].value.en;
    console.log("crime severity index", theCrime);
    $("#crime").text(theCrime);
}

//turn province name to geocode
var getGeoCode = function (event) {
    event.preventDefault();
    var province = $(this).find("input").val();
    console.log("search", province);
    switch (province) {
        case "NL":
            geoCode = 1;
            showIndicators(geoCode);
            break;
        case "PE":
            geoCode = 2;
            showIndicators(geoCode);
            break;
        case "NS":
            geoCode = 3;
            showIndicators(geoCode);
            break;
        case "NB":
            geoCode = 4;
            showIndicators(geoCode);
            break;
        case "QC":
            geoCode = 5;
            showIndicators(geoCode);
            break;
        case "ON":
            geoCode = 6;
            showIndicators(geoCode);
            break;
        case "MB":
            geoCode = 7;
            showIndicators(geoCode);
            break;
        case "SK":
            geoCode = 8;
            showIndicators(geoCode);
            break;
        case "AB":
            geoCode = 9;
            showIndicators(geoCode);
            break;
        case "BC":
            geoCode = 10;
            showIndicators(geoCode);
            break;
        case "YT":
            geoCode = 11;
            showIndicators(geoCode);
            break;
        case "NT":
            geoCode = 12;
            showIndicators(geoCode);
            break;
        case "NU":
            geoCode = 13;
            showIndicators(geoCode);
            break;
        default:
            console.log("Not a Canadian Province");
            break;
    }
    $("form").trigger("reset");

}

//handle the form submit
$("#province-name").on("submit", getGeoCode);

//fetch data when loading the page
document.onload = fetchApi();


var walkScoreHeader = {
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
}

var fetchWalkScore = function () {
    var apiUrl = "https://api.walkscore.com/score?format=json&lat=47.6085&lon=-122.3295&transit=1&bike=1&wsapikey=ba22f3ccf1824ce39c01839a42864c76";
    fetch(apiUrl, walkScoreHeader)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("walkscore", data);
        })
}

fetchWalkScore();