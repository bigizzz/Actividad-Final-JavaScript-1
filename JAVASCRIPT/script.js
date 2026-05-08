 function saludar() {
            let tiempo = new Date();
            let hora = tiempo.getHours();
            let minutos = tiempo.getMinutes().toString().padStart(2, '0');
            let segundos = tiempo.getSeconds().toString().padStart(2, '0');
            let cad = "Son las " + hora + ":" + minutos + ":" + segundos + " — ";

            if (hora >= 6 && hora < 12) {
                cad = "¡Buenos días! " + cad;
            } else if (hora < 18) {
                cad = "¡Buenas tardes! " + cad;
            } else {
                cad = "¡Buenas noches! " + cad;
            }
            document.getElementById("saludo").textContent = cad;
        }
        saludar();
        setInterval(saludar, 1000); 

        
        let url = "https://api.open-meteo.com/v1/forecast?latitude=28.46&longitude=-16.25&current_weather=true";

        fetch(url)
            .then(function(respuesta) { return respuesta.json(); })
            .then(function(datos) {
                let codigo = datos.current_weather.weathercode;
                let temp = datos.current_weather.temperature;
                let emoji = "";
                let descripcion = "";

                if (codigo === 0)       { emoji = "☀️"; descripcion = "Cielo despejado"; }
                else if (codigo <= 2)   { emoji = "🌤️"; descripcion = "Parcialmente nublado"; }
                else if (codigo === 3)  { emoji = "☁️"; descripcion = "Nublado"; }
                else if (codigo <= 49)  { emoji = "🌫️"; descripcion = "Niebla"; }
                else if (codigo <= 67)  { emoji = "🌧️"; descripcion = "Lluvia"; }
                else if (codigo <= 77)  { emoji = "❄️"; descripcion = "Nieve"; }
                else if (codigo <= 82)  { emoji = "🌦️"; descripcion = "Chubascos"; }
                else                    { emoji = "⛈️"; descripcion = "Tormenta"; }

                document.getElementById("tiempo-widget").textContent =
                    emoji + " " + descripcion + " — " + temp + "°C en Tenerife";
            })
            .catch(function() {
                document.getElementById("tiempo-widget").textContent = "⚠️ No se pudo cargar el tiempo";
            });

            let elementos = document.querySelectorAll(".estrellas");
    let total = 0;
    let cantidad = elementos.length;

    elementos.forEach(function(elem) {
        let texto = elem.textContent;
        let llenas = 0;
        for (let i = 0; i < texto.length; i++) {
            if (texto[i] === "★") llenas++;
        }
        total += llenas;
    });

    let media = total / cantidad;
    if (cantidad > 0) {
    document.getElementById("media-puntuacion").textContent = 
        "⭐ Puntuación media de mis libros leídos: " + media.toFixed(1) + " / 5";
}

    function toggleSeccion(id) {
        let div = document.getElementById(id);
        if (div.style.display === "none") {
            div.style.display = ""; 
        } else {
            div.style.display = "none"; 
        }
    }
    let estrellas = document.querySelectorAll(".estrellas");

    estrellas.forEach(function(elem) {
        elem.addEventListener("mouseover", function() {
            elem.style.color = "blue";
            elem.style.fontSize = "1.3em";
        });
        elem.addEventListener("mouseout", function() {
            elem.style.color = ""; 
            elem.style.fontSize = "";
        });
    });

    function cambiarTema() {
    let body = document.body;
    let boton = document.getElementById("btn-tema");

    if (body.classList.contains("oscuro")) {
        body.classList.remove("oscuro");
        boton.textContent = "🌙 Modo oscuro";
    } else {
        body.classList.add("oscuro");
        boton.textContent = "☀️ Modo claro";
    }
    }

    function filtrar() {
        let texto = document.getElementById("buscador").value.toLowerCase();
        let libros = document.querySelectorAll(".grid-pendientes article");

        libros.forEach(function(libro) {
            let contenido = libro.textContent.toLowerCase();
            if (contenido.includes(texto)) {
                libro.style.display = ""; 
            } else {
                libro.style.display = "none"; 
            }
        });
    }