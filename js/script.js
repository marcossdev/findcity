const cepInput = document.getElementById("input-cep");
const requiredSpan = document.getElementById("required");
const form = document.getElementById("form-cep");
const stateSpan = document.getElementById("state");
const citySpan = document.getElementById("city");
const errP = document.getElementById("err");

//Spam defalt :)
function spanDefault() {
    return (stateSpan.innerHTML = "?"), (citySpan.innerHTML = "?");
}

//Verificação do input
function validationCep() {
    const regex = /\d{5}-\d{3}/g;
    if (regex.test(cepInput.value)) {
        cepInput.style.border = "";
        requiredSpan.style.display = "none";
        cepInput.style.animation = "none";
        return true;
    } else {
        spanDefault()
        cepInput.style.border = "2px solid #dd3b3b";
        requiredSpan.style.display = "block";
        setTimeout(() => (cepInput.style.animation = "tremer 0.1s"), 1);
        cepInput.style.animation = "none";
        return false;
    }
}

//CEP Mask
cepInput.addEventListener("keypress", () => {
    const ipt = cepInput.value;
    if (ipt.length === 5) {
        cepInput.value += "-";
    }
});

//Fução de pesquisa
const fetchCEP = async (cep) => {
    const APIResp = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
    const data = await APIResp.json();
    if (APIResp.status === 200) {
        stateSpan.innerHTML = data.state;
        citySpan.innerHTML = data.city;
        errP.style.display = "none";
    } else {
        spanDefault()
        errP.style.display = "block";
        setTimeout(() => (errP.style.animation = "tremer 0.1s"), 1);
        errP.style.animation = "none";
    }
};

//Submit event
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (validationCep() === true) {
        fetchCEP(cepInput.value.replace("-", ""));
    }
});
