document.addEventListener("DOMContentLoaded", () => {
    const result = document.querySelector(".result");
    const form = document.querySelector(".get-clima");
    const nameCity = document.querySelector("#city");
    const nameCountry = document.querySelector("#country");

    if (form && nameCity && nameCountry) {

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (nameCity.value === "" && nameCountry.value === "") {
                showError("Ambos campos son obligatorios", form);
                return;
            }
            callApi(nameCity.value, nameCountry.value)
        });

    } else {
        console.log("No se pudieron encontrar uno o más elementos del formulario.");
    }

    function callApi(nameCity, nameCountry) {
        const apiId = "7f5e59861b7240380fa508bbd396cf57";
        const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity},${nameCountry}&appid=${apiId}`;
    
        fetch(urlApi)
            .then(data => {
                return data.json();
            })
            .then(dataJson => {

                if(dataJson.cod === "404"){
                    showError("Ciudad no encontrada")

                } else{
                    clearHtml();
                    showClima(dataJson);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    function showClima(data){
        const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
    
        const content = document.createElement("div");
    
        const tempC = DeKelvinACelcius(temp);
        const tempMaxC = DeKelvinACelcius(temp_max);
        const tempMinC = DeKelvinACelcius(temp_min);
    
        content.innerHTML = `
            <h4>Clima en ${name}</h4>
            <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
            <h2>${tempC}ºC</h2>
            <p>Max. ${tempMaxC}ºC</p>
            <p>Min. ${tempMinC}ºC</p>
        `;
    
        result.appendChild(content);
    }
    
    function showError(message, form) {
        const alert = document.createElement("p");
        alert.classList.add("alert-error");
        alert.innerHTML = message;
        form.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 1000);
    }
    
    function DeKelvinACelcius(tempKelvin) {
        const tempCelcius = parseInt(tempKelvin - 273.15);
        return tempCelcius;
    }

    function clearHtml() {
        result.innerHTML = "";
    }
});

