const api = {
    url: "https://api.openweathermap.org/data/2.5/weather?units=metric&q=",
    key: "9fd3e42f107014b62cb7b2bbfcbea1bd" // Your API key
};

// Select elements from the DOM
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherContainer = document.querySelector(".weather");
const detailsContainer = document.querySelector(".details");
const errorContainer = document.querySelector(".error");

// Function to fetch and display weather data
async function checkWeather(city) {
    const response = await fetch(api.url + city + `&appid=${api.key}`);

    // Check if the city was not found (API returns 404 status)
    if (response.status == 404) {
        // Show the error message and hide weather details
        errorContainer.style.display = "block";
        weatherContainer.style.display = "none";
        detailsContainer.style.display = "none";
    } else {
        // If city is found, parse the data
        const data = await response.json();

        // --- BACKGROUND IMAGE LOGIC ---
        const weatherCondition = data.weather[0].main;
        updateBackground(weatherCondition);

        // Update the DOM with the new weather data
        document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".tempMaxMin").innerHTML = "H:" + Math.round(data.main.temp_max) + "°c / L:" + Math.round(data.main.temp_min) + "°c";
        document.querySelector(".description").innerHTML = data.weather[0].main;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        // Update the weather icon
        const icon = data.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".weatherIcon").src = imageURL;

        // Hide the error message and show the weather details
        errorContainer.style.display = "none";
        weatherContainer.style.display = "block";
        detailsContainer.style.display = "flex"; // Use flex to correctly align items
    }
}

// --- UPDATED FUNCTION TO CHANGE BACKGROUND ---
function updateBackground(condition) {
    let backgroundUrl = '';
    switch (condition) {
        case 'Clear':
            backgroundUrl = "url('img/download.jpeg')";
            break;
        case 'Clouds':
            backgroundUrl = "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1951&auto=format&fit=crop')";
            break;
        case 'Rain':
        case 'Drizzle':
            backgroundUrl = "url('img/images.jpeg')";
            break;
        case 'Thunderstorm':
            backgroundUrl = "url('https://images.unsplash.com/photo-1605727226425-e2f2e81bbd25?q=80&w=1887&auto=format&fit=crop')";
            break;
        case 'Snow':
            backgroundUrl = "url('https://images.unsplash.com/photo-1547754980-3df97fed72a8?q=80&w=1887&auto=format&fit=crop')";
            break;
        // Atmosphere Category
        case 'Mist':
        case 'Fog':
            backgroundUrl = "url('https://images.unsplash.com/photo-1482841629134-9451158a1f28?q=80&w=1887&auto=format&fit=crop')";
            break;
        case 'Haze':
        case 'Smoke':
             backgroundUrl = "url('https://images.unsplash.com/photo-1522244451342-a52b842615c1?q=80&w=1887&auto=format&fit=crop')";
             break;
        case 'Dust':
        case 'Sand':
        case 'Ash':
            backgroundUrl = "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1748&auto=format&fit=crop')";
            break;
        case 'Squall':
        case 'Tornado':
            backgroundUrl = "url('https://images.unsplash.com/photo-1594480621484-97850451a318?q=80&w=1934&auto=format&fit=crop')";
            break;
        default:
            backgroundUrl = "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1951&auto=format&fit=crop')";
            break;
    }
    document.body.style.backgroundImage = backgroundUrl;
}


// Event listener for the search button click
searchBtn.addEventListener("click", () => {
    if (searchBox.value) {
        checkWeather(searchBox.value);
    }
});

// Event listener for pressing "Enter" in the search box
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (searchBox.value) {
            checkWeather(searchBox.value);
        }
    }
});
