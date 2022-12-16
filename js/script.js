const cepInput = document.getElementById("input-cep");
const requiredSpan = document.getElementById("required");
const form = document.getElementById("form-cep");
const stateSpan = document.getElementById("state");
const citySpan = document.getElementById("city");
const dataSpan = document.getElementById("data");

function spanDefault() {
	return (stateSpan.innerHTML = "?"), (citySpan.innerHTML = "?");
}

function validationCep() {
	const regexCEP = /\d{5}-?\d{3}/g;
	if (regexCEP.test(cepInput.value)) {
		cepInput.style.border = "";
		requiredSpan.style.display = "none";
		cepInput.style.animation = "none";
		dataSpan.innerHTML = "Carregando...";
		spanDefault();
		return true;
	} else {
		spanDefault();
		cepInput.style.border = "2px solid #dd3b3b";
		requiredSpan.style.display = "block";
		setTimeout(() => (cepInput.style.animation = "tremer 0.1s"), 1);
		cepInput.style.animation = "none";
		return false;
	}
}

const fetchCEP = async (cep) => {
	const APIResp = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
	const data = await APIResp.json();
	if (APIResp.status === 200) {
		return data;
	}
};

const showData = async (cep) => {
	const data = await fetchCEP(cep);
	if (data) {
		stateSpan.innerHTML = data.state;
		citySpan.innerHTML = data.city;
		dataSpan.innerHTML = "Dados encontrados!";
	} else {
		spanDefault();
		dataSpan.innerHTML = "O CEP não foi encontrado!";
		setTimeout(() => (dataSpan.style.animation = "tremer 0.1s"), 1);
		dataSpan.style.animation = "none";
	}
};

form.addEventListener("submit", (evt) => {
	evt.preventDefault();
	if (validationCep() === true) {
		showData(cepInput.value.replace("-", ""));
	}
});
