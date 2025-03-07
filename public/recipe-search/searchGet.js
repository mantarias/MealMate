let itemsSaved = [];

const form = document.querySelector("#searchForm");
document.addEventListener("DOMContentLoaded", (e) => {
    fetchNew();
})
form.addEventListener("submit", (e) => {
    createButton();
    e.preventDefault();
    fetchNew();
})

function fetchNew() {
    let data = {
        "itemsSaved": itemsSaved,
    };
    data.itemsSaved = [...new Set(data.itemsSaved)];
    fetch("/API/search", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(result => result.json())
        .then(jsonData => listCreation(jsonData))
        .catch(error => console.log(error))
}

function listCreation(recipies) {
    form.reset();
    const allList = document.getElementById('resultList');
    allList.textContent = '';
    recipies.forEach(ULelement => {
        recipieListOrder = document.createElement('ul');
        recipieListOrder.textContent = `${ULelement.nameOfRecipe} ${ULelement.score} / ${ULelement.ingredients.length}`;
        ULelement.ingredients.forEach(LIelement => {
            listIngredients = document.createElement('li');
            listIngredients.textContent = `${LIelement.ingredient} amount: ${LIelement.amount}`
            recipieListOrder.appendChild(listIngredients);
        });
        ULelement.instructions.forEach(instelement => {
            listInstructions = document.createElement('li');
            listInstructions.textContent = instelement.inst;
            recipieListOrder.appendChild(listInstructions)
        });
        allList.appendChild(recipieListOrder);
    });
}

function createButton() {
    const itemName = document.createElement('span');
    let searchMethod = document.querySelector('#search').value;
    console.log(searchMethod);
    if (!itemsSaved.includes(searchMethod)) {
        itemName.textContent = `[${searchMethod}]`;
        itemName.className = 'item-name';
        itemsSaved.push(document.querySelector('#search').value);
        form.appendChild(itemName);
    }
    const resetFilter = document.querySelector('#resetFilter');
    resetFilter.addEventListener('click', function () {
        while (itemsSaved.length > 0) {
            itemsSaved.pop();
            form.lastChild.remove();
        }
        location.reload();
    })
}

const listItems = document.querySelector('.list');

let ShowRecipies = true;
listItems.addEventListener('click', (e) => {
    if (ShowRecipies) {
        ShowRecipies = false;
        // Convert it to array form
        const childList = Array.from(e.target.querySelectorAll('li'));
        // Loops through all the list items and shows them
        for (const lists of childList) {
            lists.style.display = 'block';
        }
    } else {
        ShowRecipies = true;
        const childList = Array.from(e.target.querySelectorAll('li'));
        // Loops through all the list items and shows them
        for (const lists of childList) {
            lists.style.display = 'none';
        }
    }
})