(function () {

    //check if geolocation is available
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            getWeather(latitude, longitude);
        })

    //bringing data from the api with our location
        function getWeather(latitude, longitude) {
            let apikey = 'b57d87d1653ec55aba73f64493b3658e';
            let lang = 'es';

            let excude = 'minutely,hourly,alerts';
            let units = 'metric';
            let url = 'https://api.openweathermap.org/';
            url += 'data/2.5/onecall?lat=' + latitude + '&lon=' + longitude +
                '&exclude=' + excude + '&units=' + units + '&appid=' + apikey;
            url += '&lang=' + lang;
           setData(url)
        }
    }

    function setData(url){
         //request to the api
         fetch(url)
         .then(response => response.json())
         .then(data => getData(data))
         .catch(error => console.log(error))
    }

    //get the values of the day
    function getData(data) {
        let today = getFullDay();
        let icon = data.current.weather[0].icon;
        let temp = Math.round(parseFloat(data.current.temp));
        let weather = data.current.weather[0].description;
        let ubication = data.current.name;
        let windStatus = Math.round((parseFloat(data.current.wind_speed) * 60 * 60) / 1000);
        let humidity = data.current.humidity;
        let cloudiness = data.current.clouds;
        let visibility = parseFloat(data.current.visibility) / 1000;

        showData(data, icon, temp, weather, today, ubication, windStatus, humidity, cloudiness, visibility);
    }

    //getting the full date of the day
    function getFullDay() {
        var months = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        var days = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        var day = new Date();
        today = days[day.getDay()] + ", " + day.getDate() + " de " + months[day.getMonth()] + " del " + day.getFullYear();
        return today;
    }
    //we get the following days
    function getOneDay(i){
        let timeElapsed = Date.now();
        let today = new Date(timeElapsed);
        let day = i + 1;
        let anothertimeElapsed = timeElapsed + (day * 1000 * 60 * 60 * 24);
        let date = new Date(anothertimeElapsed);
        var weekday = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        let anotherDay = weekday[date.getDay()];
        return anotherDay;
    }

    //painting the values in the DOM
    function showData(data, icon, temp, weather, today, ubication, windStatus,
        humidity, cloudiness, visibility) {
        const PRINCIPALWEATHER = document.querySelector('.principal-weather-icon');
        const P_ICON = PRINCIPALWEATHER.querySelector('.icon-weater img');
        P_ICON.src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

        const P_NUMBER = PRINCIPALWEATHER.querySelector('.number');
        const P_WEATHER = PRINCIPALWEATHER.querySelector('.weather');
        const P_DATE = PRINCIPALWEATHER.querySelector('.date');
        const P_UBICATION = PRINCIPALWEATHER.querySelector('.ubication');

        const CONTAINERSTATUS = document.querySelector('.container-status');
        const P_STATUS = CONTAINERSTATUS.querySelector('.w_status');
        const P_HUMIDLY = CONTAINERSTATUS.querySelector('.humidly');
        const P_VISIBILITY = CONTAINERSTATUS.querySelector('.visibility');
        const P_CLOUDINESS = CONTAINERSTATUS.querySelector('.cloudiness');
        P_NUMBER.innerHTML = temp;
        P_WEATHER.innerHTML = weather;
        P_DATE.innerHTML = today;
        P_UBICATION.innerHTML = ubication;
        P_STATUS.innerHTML = windStatus;
        P_HUMIDLY.innerHTML = humidity;
        P_VISIBILITY.innerHTML = visibility;
        P_CLOUDINESS.innerHTML = cloudiness;

        //divs to paint the weather for the next 5 days
        for (i = 0; i <= 4; i++) {
            let div = document.createElement('div');
            //get the values of the days
            let cardIcon = data.daily[i].weather[0].icon;
            let cardMaxTemp = Math.round(parseFloat(data.daily[i].temp.max));
            let cardMinTemp = Math.round(parseFloat(data.daily[i].temp.min));
            let cardDay = getOneDay(i);
            let divContent = `
                <div>
                    ${cardDay}
                </div>
                <div>
                    <img src="http://openweathermap.org/img/wn/${cardIcon}@2x.png" alt="icon">
                </div>
                <div>
                    <div class="row align-items-center">
                        <div class="col-md-6 fw-normal color-white">
                        ${cardMaxTemp} °C
                        </div>
                        <div class="col-md-6 fw-light color-white-light">
                            ${cardMinTemp} °C
                        </div>
                    </div>
                </div>
            `;
            div.className = 'col-md-2 bg-secondary-color pt-3 pb-3 text-center target';
            div.innerHTML = divContent;
            document.querySelector('.content-divs').appendChild(div);
        }
    }

    
})();