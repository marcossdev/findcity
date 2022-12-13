const cepInput = document.getElementById("input-cep");
const requiredSpan = document.getElementById("required");
const form = document.getElementById("form-cep");

const stateSpan = document.getElementById("state");
const citySpan = document.getElementById("city");

//Verificação do input
function validationCep() {
    const regex = /\d{5}-\d{3}/g;
    if (regex.test(cepInput.value)) {
        cepInput.style.border = "";
        requiredSpan.style.display = "none";
        cepInput.style.animation = "none";
        fetchCEP(cepInput.value.replace("-", ""));
    } else {
        stateSpan.innerHTML = "?"
        citySpan.innerHTML = "?"
        cepInput.style.border = "2px solid #dd3b3b";
        requiredSpan.style.display = "block";
        setTimeout(() => (cepInput.style.animation = "tremer 0.1s"), 1);
        cepInput.style.animation = "none";
    }
}

//Fução de pesquisa
const fetchCEP = async (cep) => {
    const APIResp = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
    if (APIResp.status === 200) {
        const data = await APIResp.json();
        if (data) {
            stateSpan.innerHTML = data.state
            citySpan.innerHTML = data.city
        };
    }
};

//Submit event
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    validationCep();
});
