function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) //Função anônima que está retornando um valor
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }

        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" // limpando o contéudo
    citySelect.disabled = true // bloqueando o contéudo depois de limpar 

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //adicionando novo
            }
            citySelect.disabled = false
        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

/* funções para itens de coleta, pegar todos os li */
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelecteadItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelecteadItem(event) {
    const itemLi = event.target


    //adicionar ou remover um a classe  com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    console.log('ITEM ID: ', itemId)

    // verificar se existem itens selecionados, se sim 
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId; //Isso será true ou false
        return itemFound;
    });

    // se ja estiver selecionado, 
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId; // False
            return itemIsDifferent;
        });

        selectedItems = filteredItems;
    } else {
        // se não estiver selecionado, adicionar seleção
        selectedItems.push(itemId)
    }

   // console.log('selectedItems: ', selectedItems)


    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;
}
