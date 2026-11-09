
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");
const fecha = document.getElementById("fecha");
const documento = document.getElementById("documento");

// Evitar que se seleccionen fechas futuras
fecha.max = new Date().toLocaleDateString("en-CA");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    mensaje.textContent = "";
    mensaje.className = "";

    // Comprobar la edad
    const edad = Number(document.getElementById("edad").value);

    if (edad < 10 || edad > 100) {
        mostrarMensaje("La edad debe estar entre 10 y 100 años.", "error");
        return;
    }

    // Comprobar que se haya elegido un área de interés
    const intereses = document.querySelectorAll(
        'input[name="intereses"]:checked'
    );

    if (intereses.length === 0) {
        mostrarMensaje("Selecciona al menos un área de interés.", "error");
        return;
    }

    // Validar el documento si se seleccionó uno
    if (documento.files.length > 0) {
        const archivo = documento.files[0];
        const formatos = ["application/pdf", "image/jpeg", "image/png"];
        const maximo = 5 * 1024 * 1024; // 5 MB

        if (!formatos.includes(archivo.type)) {
            mostrarMensaje("El archivo debe ser PDF, JPG o PNG.", "error");
            return;
        }

        if (archivo.size > maximo) {
            mostrarMensaje("El archivo no puede superar los 5 MB.", "error");
            return;
        }
    }

    // Mostrar un resumen de los datos
    const nombre = document.getElementById("nombre").value.trim();
    const curso = document.getElementById("curso").value;

    mostrarMensaje(
        `¡Formulario validado! ${nombre}, tus datos están listos. Curso: ${curso}.`,
        "exito"
    );
});

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
}

formulario.addEventListener("reset", function() {
    mensaje.textContent = "";
    mensaje.className = "";
});
