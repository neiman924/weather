// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}

//1-  http://api.openweathermap.org/geo/1.0/direct?q=seattle&appid=022143c121bb477d4aec6b482ca51234
//2-  https://api.openweathermap.org/data/2.5/weather?lat=47.6038321&lon=-122.3300624&appid=022143c121bb477d4aec6b482ca51234

//-----------------------------------logic---------------------------------------------
// appid = 022143c121bb477d4aec6b482ca51234
// link 1 => lat & lon
// lat & lon => link 2 => weather 
// search lat and lot function
// search weather function 

//-----------------------------------------------------------------------------------------
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');
//------------------var to hold geoLocation------------------------------------------------
var lat,lon;
//-----------------------------default location---------------------------------------------
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setDefaultPosition, showError);
  } else { 
   lat = '47.6038321';
   lon = '-122.3300624';
   searchWeather(lat,lon);
  }
}
//------------------------set the current city location and call search weather fun--------
function setDefaultPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  searchWeather(lat,lon)
}
//-----------------------------------------------------------------------------------------
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      lat = '47.6038321';
      lon = '-122.3300624';
      searchWeather(lat,lon);
      break;
    case error.POSITION_UNAVAILABLE:
      lat = '47.6038321';
      lon = '-122.3300624';
      searchWeather(lat,lon);
      break;
    case error.TIMEOUT:
      lat = '47.6038321';
      lon = '-122.3300624';
      searchWeather(lat,lon);
      break;
    case error.UNKNOWN_ERROR:
      lat = '47.6038321';
      lon = '-122.3300624';
      searchWeather(lat,lon);
      break;
  }
}
//---------------------appid for openweather ----------------------------------------------
var appid = '&appid=022143c121bb477d4aec6b482ca51234';
//-----------------------------------------------------------------------------------------
function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.date + '<br/>';

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong> ' + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}
//-----------------------------------------------------------------------------------------
//1-  http://api.openweathermap.org/geo/1.0/direct?q=seattle&appid=022143c121bb477d4aec6b482ca51234
//---------------------------searchLatLon--------------------------------------------
function searchLatLon(cityName) {
  var QueryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=';
  QueryUrl = QueryUrl + cityName + appid;
  console.log(QueryUrl)
  fetch(QueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      // resultTextEl.textContent = locRes.search.query;
      console.log(locRes);
      console.log(locRes.length);
      if (!locRes.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.length; i++) {
          
          lat = locRes[i].lat;
          lon = locRes[i].lon;
          console.log('Lat = ',lat,'lon = ' , lon);

          searchWeather(lat,lon);
          //printResults(locRes[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
//--------------------------------------------------------------------------------------
//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=
//            api.openweathermap.org/data/2.5/forecast/daily?
//2-  https://api.openweathermap.org/data/2.5/weather?lat=48.054272&lon=-122.1394432&dt=1652244930&units=imperial&appid=022143c121bb477d4aec6b482ca51234
//---------------------------Search Weather --------------------------------------------
function searchWeather(lat,lon) {
  var cnt = '&cnt=1';
  var exDaily = '&exclude=daily';
  var uNit = '&units=imperial';
  var dtValue = '&dt=';
  var aDay = 86400;
  var unixTime = moment().unix();
  // for (var i = 1; i<=5;i++){
      var QueryUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
      var latQ = 'lat=' + lat;
      var lonQ = 'lon=' + lon;
      QueryUrl = QueryUrl + latQ + '&' + lonQ + dtValue + unixTime + cnt + exDaily +uNit + appid;
      console.log(QueryUrl);
      fetch(QueryUrl)
        .then(function (response) {
          if (!response.ok) {
            throw response.json();
          }
          return response.json();
        })
        .then(function (locRes) {
          //for (var i = 1; i<=5;i++){
          // write query to page so user knows what they are viewing
          // resultTextEl.textContent = locRes.search.query;
          console.log(locRes);
          if (!locRes) {
            console.log('No results found!');
            alert('No results found!');
            resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
          } else {
            resultContentEl.textContent = '';
            for (var i = 0; i < locRes.length; i++) {
              
              lat = locRes[i].lat;
              lon = locRes[i].lon;
              console.log('Lat = ',lat,'lon = ' , lon);

              printResults(locRes[i]);
            }
          }
        })
        .catch(function (error) {
          console.error(error);
        });
        // unixTime += aDay;
        // console.log(unixTime);
  //}//for loop
}
//-----------------------------------------------------------------------------------------
function handleFormSubmit(event) {
  event.preventDefault();
  var cityName = document.querySelector('#search-input').value;
  if (!cityName) {
    alert('You need a search input value!');
    return;
  }
  searchLatLon(cityName);
}
//-----------------------------------------------------------------------------------------
searchFormEl.addEventListener('submit', handleFormSubmit);
//------------------------------auto complate generate city--------------------------------
$( function() {
  var availableTags = [
    "Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", 
    "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", 
    "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", 
    "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", 
    "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", 
    "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", 
    "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", 
    "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", 
    "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", 
    "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", 
    "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", 
    "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", 
    "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", 
    "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", 
    "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", 
    "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", 
    "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", 
    "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", 
    "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", 
    "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", 
    "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", 
    "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", 
    "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", 
    "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", 
    "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", 
    "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", 
    "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", 
    "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford",
    "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio",
    "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", 
    "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", 
    "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", 
    "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka",
    "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", 
    "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", 
    "Worcester", "Yakima", "Yonkers", "York", "Youngstown"
  ];
  $("#search-input").autocomplete({
    source: availableTags
  });
} );
//
//-----------------------------------------------------------------------------------------
