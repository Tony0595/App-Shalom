document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-reserva");
    const listaTurnos = document.getElementById("lista-turnos");
    const horaSelect = document.getElementById("hora");

    const horariosDisponibles = [
        "09:00", "09:30", "10:00", "10:30", "11:00",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
        "17:00", "17:30", "18:00", "18:30"
    ];

    horariosDisponibles.forEach(hora => {
        let option = document.createElement("option");
        option.value = hora;
        option.textContent = hora;
        horaSelect.appendChild(option);
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const servicio = document.getElementById("servicio").value;
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;

        if (!nombre || !telefono || !fecha || !hora) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const turno = { nombre, telefono, servicio, fecha, hora };
        guardarTurno(turno);
        mostrarTurnos();
        form.reset();
    });

    function guardarTurno(turno) {
        let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
        turnos.push(turno);
        localStorage.setItem("turnos", JSON.stringify(turnos));
    }

    function mostrarTurnos() {
        listaTurnos.innerHTML = "";
        let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
        turnos.forEach(turno => {
            let li = document.createElement("li");
            li.textContent = `${turno.fecha} - ${turno.hora} | ${turno.servicio} - ${turno.nombre} (${turno.telefono})`;
            listaTurnos.appendChild(li);
        });
    }

    mostrarTurnos();
});
