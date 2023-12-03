
//validaciones de los input
var nombre = false;


$('#nom').keyup(function() {
    cantidad = $('#nom').val().length;
    
    if(cantidad < 3 ||cantidad > 30) {
        nombre = false;
        $('.avisoNom').css({
            "color":"red"
        });
        $('.avisoNom').html('No debe tener menos de 3 caracteres');
        $('#nom').addClass('is-invalid');

        if(cantidad > 30) {
            nombre = false;
            $('.avisoNom').css({
                "color":"red"
            });
            $('.avisoNom').html('No debe tener mas de 30 caracteres');
            $('#nom').addClass('is-invalid');
        }
    } else {
        nombre = true;
        $('.avisoNom').css({
            "color":"green"
        });
        $('.avisoNom').html('Correcto');
        $('#nom').removeClass('is-invalid');
        $('#nom').addClass('is-valid');
    }

    if(nombre) {
        $('#boton').attr('disabled', false)
    } else {
        $('#boton').attr('disabled', true)
    }

});



var telefono = false;
$('#tel').keyup(function() {
    cantidad = $('#tel').val().length;
    
    if(cantidad < 9 ||cantidad > 9) {
        telefono = false;
        $('.avisotel').css({
            "color":"red"
        });
        $('.avisotel').html('No debe tener menos de 9 numeros');
        $('#tel').addClass('is-invalid');

        if(cantidad > 9) {
            telefono = false;
            $('.avisotel').css({
                "color":"red"
            });
            $('.avisotel').html('No debe tener mas de 9 caracteres');
            $('#tel').addClass('is-invalid');
        }
    } else {
        telefono = true;
        $('.avisotel').css({
            "color":"green"
        });
        $('.avisotel').html('Correcto');
        $('#tel').removeClass('is-invalid');
        $('#tel').addClass('is-valid');
    }

    if(telefono) {
        $('#boton').attr('disabled', false)
    } else {
        $('#boton').attr('disabled', true)
    }

});
var direccion = false;

$('#dire').keyup(function() {
    cantidad = $('#dire').val().length;
    
    if(cantidad < 10 ||cantidad > 40) {
        direccion = false;
        $('.avisodire').css({
            "color":"red"
        });
        $('.avisodire').html('No debe tener menos de 10 caracteres');
        $('#dire').addClass('is-invalid');

        if(cantidad > 40) {
            direccion = false;
            $('.avisodire').css({
                "color":"red"
            });
            $('.avisodire').html('No debe tener mas de 40 caracteres');
            $('#dire').addClass('is-invalid');
        }
    } else {
        direccion = true;
        $('.avisodire').css({
            "color":"green"
        });
        $('.avisodire').html('Correcto');
        $('#dire').removeClass('is-invalid');
        $('#dire').addClass('is-valid');
    }

    if(direccion) {
        $('#boton').attr('disabled', false)
    } else {
        $('#boton').attr('disabled', true)
    }

});



$(document).ready(function () {
    //  verifica la información almacenada y muestra los resultados
    var formDataStored = localStorage.getItem('formData');
    if (formDataStored) {
        var formData = JSON.parse(formDataStored);
        mostrarResultados(formData);
    }

    $('#formulario').submit(function (event) {
        event.preventDefault();

        var formData = {
            nombre: $('#nom').val(),
            telefono: $('#tel').val(),
            direccion: $('#dire').val(),
            comuna: $('select').val(),
            pizzaSeleccionada: $('#listaPizzas').val(),  
        };

        // Convierte el objeto a JSON y almacénalo en localStorage
        localStorage.setItem('formData', JSON.stringify(formData));

        mostrarResultados(formData);
            $('#window-notice').show();
        });

        $('#close-button').click(function () {
            $('#window-notice').hide();
        });


    // Función para mostrar los resultados en el DOM y en el modal
    function mostrarResultados(formData) {
        $('#resultados').html(`
            <p>Nombre: ${formData.nombre}</p>
            <p>Teléfono: ${formData.telefono}</p>
            <p>Dirección: ${formData.direccion}</p>
            <p>Comuna: ${formData.comuna}</p>
            <p>Pizza seleccionada: ${formData.pizzaSeleccionada}</p>

        `);
    }
});



//  función para obtener datos de la API de pizzas
function obtenerDatosPizzas() {
    const request = new XMLHttpRequest();

    // URL de la API
    const apiUrl = 'https://apimocha.com/pizzases/Menu';

    request.open('GET', apiUrl, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            console.log('Status:', request.status);
            console.log('Headers:', request.getAllResponseHeaders());
            console.log('Body:', request.responseText);

           
            mostrarDatosEnPagina(JSON.parse(request.responseText));
            const data = JSON.parse(this.response);
        }
    };

    request.send();
}

// Función para mostrar datos en la página
function mostrarDatosEnPagina(data) {
    var listaPizzas = document.getElementById('listaPizzas');
    listaPizzas.innerHTML = '';
    data.forEach(function (pizza) {
        // Crea un nuevo elemento de opción para cada pizza
        var opcionPizza = document.createElement('option');
        opcionPizza.value = pizza.id;
        opcionPizza.textContent = pizza.name;
        listaPizzas.appendChild(opcionPizza);
    });
    listaPizzas.classList.add('form-select');
}

document.addEventListener('DOMContentLoaded', function () {
    obtenerDatosPizzas();
});
