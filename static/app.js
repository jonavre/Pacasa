let saldoDisponible = Number(localStorage.getItem("saldoDisponible")) || 0;

let ingresosTotales = Number(localStorage.getItem("ingresosTotales")) || 0;

const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

let mesActual = new Date().getMonth();

let pagos = JSON.parse(localStorage.getItem("pagos")) || [

    {
        nombre: "💳 Gabriela BAC",
        monto: 330000,
        vence: 10,
        pagado: false
    },

    {
        nombre: "💳 Jonaikel BAC",
        monto: 95000,
        vence: 4,
        pagado: false
    },

    {
        nombre: "💳 Personal Coocique",
        monto: 150000,
        vence: 18,
        pagado: false
    },

    {
        nombre: "💳 Hipotecario Coocique",
        monto: 115000,
        vence: 18,
        pagado: false
    },

    {
        nombre: "🚗 Carro",
        monto: 100000,
        vence: 5,
        pagado: false
    },

    {
        nombre: "💡 Luz",
        monto: 35000,
        vence: 28,
        pagado: false
    },

    {
        nombre: "🌐 Internet",
        monto: 50000,
        vence: 18,
        pagado: false
    },

    {
        nombre: "📦 Agua",
        monto: 12000,
        vence: 28,
        pagado: false
    }

];

let cancelados = JSON.parse(localStorage.getItem("cancelados")) || [];

function guardarDatos(){

    localStorage.setItem(
        "saldoDisponible",
        saldoDisponible
    );

    localStorage.setItem(
        "ingresosTotales",
        ingresosTotales
    );

    localStorage.setItem(
        "pagos",
        JSON.stringify(pagos)
    );

    localStorage.setItem(
        "cancelados",
        JSON.stringify(cancelados)
    );
}

function calcularTotal(){

    const j1 = Number(document.getElementById("jonaikel1").value) || 0;

    const j2 = Number(document.getElementById("jonaikel2").value) || 0;

    const f1 = Number(document.getElementById("fernanda1").value) || 0;

    const f2 = Number(document.getElementById("fernanda2").value) || 0;

    const diana = Number(document.getElementById("diana").value) || 0;

    const nuevoTotal = j1 + j2 + f1 + f2 + diana;

    const diferencia = nuevoTotal - ingresosTotales;

    ingresosTotales = nuevoTotal;

    saldoDisponible += diferencia;

    actualizarSaldo();

    guardarDatos();
}

function actualizarSaldo(){

    document.getElementById("saldo").innerText =
        "₡" + saldoDisponible.toLocaleString();
}

function cargarPagos(){

    const lista = document.getElementById("lista-pagos");

    lista.innerHTML = "";

    pagos.forEach((pago, index) => {

        if(!pago.pagado){

            lista.innerHTML += `

            <div class="tarjeta">

                <h3>${pago.nombre}</h3>

                <p>
                    <strong>Monto:</strong>
                    ₡${pago.monto.toLocaleString()}
                </p>

                <p class="fecha">
                    Vence: ${pago.vence} ${meses[mesActual]}
                </p>

                <p class="estado">
                    🔴 Pendiente
                </p>

                <button onclick="pagar(${index})">
                    💸 Pagar
                </button>

            </div>

            `;
        }

    });

}

function cargarCancelados(){

    const lista = document.getElementById("lista-cancelados");

    lista.innerHTML = "";

    cancelados.forEach((pago) => {

        lista.innerHTML += `

        <div class="tarjeta pagado">

            <h3>${pago.nombre}</h3>

            <p>
                <strong>Monto:</strong>
                ₡${pago.monto.toLocaleString()}
            </p>

            <p class="fecha">
                Pagado en ${meses[mesActual]}
            </p>

            <p class="estado">
                🟢 Cancelado
            </p>

        </div>

        `;

    });

}

function pagar(index){

    const pago = pagos[index];

    if(saldoDisponible < pago.monto){

        alert("❌ No hay suficiente dinero");

        return;
    }

    saldoDisponible -= pago.monto;

    pago.pagado = true;

    cancelados.push({
        nombre: pago.nombre,
        monto: pago.monto
    });

    actualizarSaldo();

    guardarDatos();

    cargarPagos();

    cargarCancelados();

    alert("✅ Pago realizado");
}

function mostrarHome(){

    document.getElementById("home").style.display = "block";

    document.getElementById("cancelados").style.display = "none";
}

function mostrarCancelados(){

    document.getElementById("home").style.display = "none";

    document.getElementById("cancelados").style.display = "block";
}

actualizarSaldo();

cargarPagos();

cargarCancelados();