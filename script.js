document.addEventListener("DOMContentLoaded", () => {
  const check = document.querySelector(".check");
  const boton = document.querySelector('input[type="submit"]');

  // Bloquea el botón de registro al inicio
  boton.disabled = true;
  boton.style.opacity = "0.6";
  boton.style.cursor = "not-allowed";

  // Escucha cambios en el checkbox para activar/desactivar el botón
  check.addEventListener("change", () => {
    if (check.checked) {
      // Si el checkbox está marcado, activa el botón
      boton.disabled = false;
      boton.style.opacity = "1";
      boton.style.cursor = "pointer";
    } else {
      // Si no está marcado, desactiva el botón
      boton.disabled = true;
      boton.style.opacity = "0.6";
      boton.style.cursor = "not-allowed";
    }
  });

  // Función para limpiar todos los campos del formulario
  function limpiarFormulario() {
    document.querySelector(".nombre").value = "";
    document.querySelector(".lastname").value = "";
    document.querySelector(".ci").value = "";
    document.querySelector("#Sexo").value = "Masculino"; // Valor por defecto
    document.querySelector(".email").value = "";
    document.querySelector(".address").value = "";
    document.querySelector(".num").value = "";
    document.querySelector(".check").checked = false;
    
    // Desactiva el botón nuevamente después de limpiar
    boton.disabled = true;
    boton.style.opacity = "0.6";
    boton.style.cursor = "not-allowed";
  }

  // Evento al hacer clic en el botón de registro
  boton.addEventListener("click", (e) => {
    e.preventDefault(); // Evita el envío del formulario

    // Recoge los datos ingresados en el formulario
    const data = {
      nombre: document.querySelector(".nombre").value,
      apellido: document.querySelector(".lastname").value,
      cedula: document.querySelector(".ci").value,
      sexo: document.querySelector("#Sexo").value,
      email: document.querySelector(".email").value,
      direccion: document.querySelector(".address").value,
      telefono: document.querySelector(".num").value,
    };

    // Convierte los datos a formato JSON
    const jsonData = JSON.stringify(data, null, 2);

    // Crea un archivo descargable con los datos en JSON
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Crea un enlace temporal para descargar el archivo
    const a = document.createElement("a");
    a.href = url;
    a.download = "registro.json"; // Nombre del archivo descargado
    a.click();
    URL.revokeObjectURL(url); // Libera el objeto URL

    // Muestra un popup de confirmación de registro
    const popup = document.createElement("div");
    popup.innerText = "Usted se ha registrado correctamente.";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "#ffffffff";
    popup.style.color = "black";
    popup.style.padding = "20px 40px";
    popup.style.borderRadius = "10px";
    popup.style.fontSize = "20px";
    popup.style.textAlign = "center";
    popup.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3)";
    popup.style.zIndex = "1000";

    document.body.appendChild(popup);

    // Limpia el formulario y elimina el popup después de 1 segundos
    setTimeout(() => {
      popup.remove();
      limpiarFormulario(); // Llama a la función para limpiar el formulario
    }, 1000); //Tiempo para limpiar el formulario
  });
});