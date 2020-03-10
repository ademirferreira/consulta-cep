const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");

VMasker(cep).maskPattern("99999-999");

function showError() {
  const formControl = document.querySelector('div.form-control')
  formControl.className = "form-control error"
  const small = formControl.querySelector('small');
  small.innerHTML = "Cep inválido";
}

function showSuccess() {
  const formControl = document.querySelector('div.form-control');
  formControl.className = 'form-control success';
}

function clearFields() {
  rua.value = "";
  bairro.value = "";
  cidade.value = "";
  estado.value = "";
}

function getCep() {
  fetch(`https://viacep.com.br/ws/${cep.value}/json`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        showError();
        clearFields();
      } else {
        showSuccess();
        rua.value = data.logradouro;
        bairro.value = data.bairro;
        cidade.value = data.localidade;
        estado.value = data.uf;
      }
    });
}
cep.addEventListener('blur', getCep);
