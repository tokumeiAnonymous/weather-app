/* eslint-disable max-len */
async function getData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2711b629755ddf6cc9ab2dabe29b9eb3`, { mode: 'cors' });
        const responseData = await response.json();
        // console.log(responseData);
        const { main } = responseData;
        const weather = responseData.weather[0];
        const place = `${responseData.name}, ${responseData.sys.country}`;

        return { main, weather, place };
    } catch (error) {
        return error;
    }
}

function displayData(main, weather, place) {
    // undefined is falsy
    if (!main) {
        const placeNode = document.querySelector('.place');
        placeNode.setCustomValidity('Place not found! Please enter another place.');
        placeNode.reportValidity();
    }

    const title = document.querySelector('.title');
    const icon = document.querySelector('.icon');
    icon.alt = weather.description;
    icon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    title.appendChild(icon);

    const dataHolder = document.querySelector('.data-holder');
    dataHolder.innerHTML = '';

    const datas = document.createElement('ul');
    dataHolder.appendChild(datas);

    const data1 = document.createElement('li');
    datas.appendChild(data1);

    const locationLabel = document.createElement('label');
    locationLabel.textContent = 'Location: ';
    locationLabel.setAttribute('for', 'location');
    data1.appendChild(locationLabel);

    const location = document.createElement('div');
    location.textContent = place;
    location.id = 'location';
    location.classList.add('data');
    data1.appendChild(location);

    const data2 = document.createElement('li');
    datas.appendChild(data2);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Weather Description: ';
    descriptionLabel.setAttribute('for', 'description');
    data2.appendChild(descriptionLabel);

    const description = document.createElement('div');
    description.textContent = capitalize(weather.description);
    description.id = 'description';
    description.classList.add('data');
    data2.appendChild(description);

    const data3 = document.createElement('li');
    datas.appendChild(data3);

    const tempLabel = document.createElement('label');
    tempLabel.textContent = 'Temperature: ';
    tempLabel.setAttribute('for', 'temp');
    data3.appendChild(tempLabel);

    const temp = document.createElement('li');
    temp.textContent = `${main.temp}°C`;
    temp.id = 'temp';
    temp.classList.add('data');
    data3.appendChild(temp);

    const data4 = document.createElement('li');
    datas.appendChild(data4);

    const feelsLikeLabel = document.createElement('label');
    feelsLikeLabel.textContent = 'Feels Like: ';
    feelsLikeLabel.setAttribute('for', 'feels-like');
    data4.appendChild(feelsLikeLabel);

    const feelsLike = document.createElement('div');
    feelsLike.textContent = `${main.feels_like}°C`;
    feelsLike.id = 'feels-like';
    feelsLike.classList.add('data');
    data4.appendChild(feelsLike);

    const data5 = document.createElement('li');
    datas.appendChild(data5);

    const humidityLabel = document.createElement('label');
    humidityLabel.textContent = 'Humidity: ';
    humidityLabel.setAttribute('for', 'humidity');
    data5.appendChild(humidityLabel);

    const humidity = document.createElement('li');
    humidity.textContent = `${main.humidity}%`;
    humidity.id = 'humidity';
    humidity.classList.add('data');
    data5.appendChild(humidity);

    changePointedWeather(weather.description);
}

function changePointedWeather(weatherDescription) {
    const signify = document.querySelector('.weather-signify');
    console.log(signify);
    if (weatherDescription.includes('clear')) signify.setAttribute('transform', 'translate(-373.09252, -240.5)');
    else if (weatherDescription.includes('few')) signify.setAttribute('transform', 'translate(-148.09252, -240.5)');
    else if (weatherDescription.includes('clouds')) signify.setAttribute('transform', 'translate(-260.59252, -240.5)');
    else if (weatherDescription.includes('rain')) signify.setAttribute('transform', 'translate(-35.59252, -240.5)');
    else if (weatherDescription.includes('snow')) signify.setAttribute('transform', 'translate(76.90748, -240.5)');
}

function capitalize(word) {
    const firstLetter = word.charAt(0).toUpperCase();
    return firstLetter + word.substring(1);
}

function handleError(error) {
    console.log(error);
}

getData('kyiv').then((data) => displayData(data.main, data.weather, data.place)).catch(handleError);

const place = document.querySelector('.place');
const search = document.querySelector('.search');
const searchHolder = document.querySelector('.search-holder');

search.addEventListener('click', () => {
    getData(place.value).then((data) => displayData(data.main, data.weather, data.place)).catch(handleError);
});
searchHolder.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        getData(place.value).then((data) => displayData(data.main, data.weather, data.place)).catch(handleError);
    }
});
