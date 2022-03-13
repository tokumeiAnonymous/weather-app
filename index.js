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
    // add validity here
    if (!main) return;

    const title = document.querySelector('.title');
    const icon = document.querySelector('.icon');
    icon.alt = weather.description;
    icon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    title.appendChild(icon);

    const dataHolder = document.querySelector('.data-holder');
    dataHolder.innerHTML = '';

    const datas = document.createElement('ul');
    dataHolder.appendChild(datas);

    const locationLabel = document.createElement('label');
    locationLabel.textContent = 'Location';
    locationLabel.setAttribute('for', 'location');
    datas.appendChild(locationLabel);

    const location = document.createElement('li');
    location.textContent = place;
    location.id = 'location';
    datas.appendChild(location);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Weather Description';
    descriptionLabel.setAttribute('for', 'description');
    datas.appendChild(descriptionLabel);

    const description = document.createElement('li');
    description.textContent = weather.description;
    description.id = 'description';
    datas.appendChild(description);

    const tempLabel = document.createElement('label');
    tempLabel.textContent = 'Temperature';
    tempLabel.setAttribute('for', 'temp');
    datas.appendChild(tempLabel);

    const temp = document.createElement('li');
    temp.textContent = `${main.temp}°C`;
    temp.id = 'temp';
    datas.appendChild(temp);

    const feelsLikeLabel = document.createElement('label');
    feelsLikeLabel.textContent = 'Feels Like';
    feelsLikeLabel.setAttribute('for', 'feels-like');
    datas.appendChild(feelsLikeLabel);

    const feelsLike = document.createElement('li');
    feelsLike.textContent = `${main.feels_like}°C`;
    feelsLike.id = 'feels-like';
    datas.appendChild(feelsLike);

    const humidityLabel = document.createElement('label');
    humidityLabel.textContent = 'Humidity';
    humidityLabel.setAttribute('for', 'humidity');
    datas.appendChild(humidityLabel);

    const humidity = document.createElement('li');
    humidity.textContent = `${main.humidity}%`;
    humidity.id = 'humidity';
    datas.appendChild(humidity);
}

function handleError(error) {
    console.log(error);
}

getData('kyiv').then((data) => displayData(data.main, data.weather, data.place)).catch(handleError);

const place = document.querySelector('.place');
const search = document.querySelector('.search');
search.addEventListener('click', () => {
    getData(place.value).then((data) => displayData(data.main, data.weather, data.place)).catch(handleError);
});
