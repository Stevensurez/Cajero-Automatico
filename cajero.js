var cuentas = [
  { nombre: "mali", saldo: 200, password: "1234" },
  { nombre: "gera", saldo: 290, password: "12345" },
  { nombre: "maui", saldo: 67, password: "123456" }
];

var cuentaSeleccionada = -1;

function iniciarSesion() {
  var nombreUsuario = document.getElementById("nombre-usuario").value.toLowerCase();
  var password = document.getElementById("password").value;

  var cuentaEncontrada = false;

  for (var i = 0; i < cuentas.length; i++) {
    if (cuentas[i].nombre === nombreUsuario && cuentas[i].password === password) {
      cuentaSeleccionada = i;
      cuentaEncontrada = true;
      break;
    }
  }

  if (!cuentaEncontrada) {
    alert("Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.");
    return;
  }

  var cuenta = cuentas[cuentaSeleccionada];

  document.getElementById("nombre-cuenta").textContent = "Cuenta: " + cuenta.nombre;
  document.getElementById("saldo-actual").textContent = "Saldo actual: $" + cuenta.saldo;

  document.getElementById("seleccion-cuenta").classList.add("hidden");
  document.getElementById("panel-operaciones").classList.remove("hidden");
}

function consultarSaldo() {
  var cuenta = cuentas[cuentaSeleccionada];
  alert("Saldo actual: $" + cuenta.saldo);
}

function ingresarMonto() {
  var monto = parseFloat(document.getElementById("monto-ingreso").value);
  let total = cuentas[cuentaSeleccionada].saldo + monto;
  if (isNaN(monto) || monto <= 0) {
      alert("Por favor, ingresa un monto válido.");
      return;
  }
  if (isNaN(monto) || total > 990) {
    alert ("Monto Supero total 990 ingrese monto menor"); 
    return;
  }

  var cuenta = cuentas[cuentaSeleccionada];
  cuenta.saldo += monto;

  alert("Monto ingresado: $" + monto + "\nNuevo saldo: $" + cuenta.saldo);

  document.getElementById("saldo-actual").textContent = "Saldo actual: $" + cuenta.saldo;
  
}

function retirarMonto() {
  var monto = parseFloat(document.getElementById("monto-retiro").value);
  if (isNaN(monto) || monto <= 0) {
    alert("Por favor, ingresa un monto válido.");
    return;
  }

  var cuenta = cuentas[cuentaSeleccionada];
  if (cuenta.saldo < monto) {
    alert("Saldo insuficiente. No puedes retirar más de lo que tienes.");
    return;
  }
  let control = cuenta.saldo - monto;
  if (control < 10){
    alert("Saldo no puede estar por debajo de 10 Debe retirar un monoto menor.");
    return;
  }

  cuenta.saldo -= monto;

  alert("Monto retirado: $" + monto + "\nNuevo saldo: $" + cuenta.saldo);

  document.getElementById("saldo-actual").textContent = "Saldo actual: $" + cuenta.saldo;
}

function cerrarSesion() {
  cuentaSeleccionada = -1;

  document.getElementById("seleccion-cuenta").classList.remove("hidden");
  document.getElementById("panel-operaciones").classList.add("hidden");

  document.getElementById("nombre-usuario").value = "";
  document.getElementById("password").value = "";
  document.getElementById("monto-ingreso").value = "";
  document.getElementById("monto-retiro").value = "";
}
