// Retrieve necessary elements from the DOM
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItem');
const markPurchasedBtn = document.getElementById('markPurchased');
const clearListBtn = document.getElementById('clearList');
const itemList = document.getElementById('itemList');
const errorMessage = document.getElementById('errorMessage');

// Array to store shopping list items
let shoppingList = [];

// Function to render the shopping list
function renderList() {
    itemList.innerHTML = ''; // Clear existing list

    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item.name;
        span.classList.add('item-name');

        if (item.purchased) {
            span.classList.add('purchased');
        }

        // Allow editing item name when double-clicked
        span.addEventListener('dblclick', () => {
            const newitemName = prompt('Edit item:', item.name);
            if (newitemName !== null) {
                const trimmedName = newitemName.trim();
                if (trimmedName !== '') {
                    item.name = trimmedName;
                    renderList(); // Update the list view
                    saveToLocalStorage(); // Save to local storage after editing
                } else {
                    showError('Item name cannot be empty.');
                }
            }
        });

        // Event listener to mark item as purchased when clicked
        span.addEventListener('click', () => {
            item.purchased = !item.purchased;
            renderList(); // Update the list view
            saveToLocalStorage(); // Save to local storage after marking purchased
        });

        li.appendChild(span);
        itemList.appendChild(li);
    });
}

// Event listener for Add button
addItemBtn.addEventListener('click', () => {
    const itemName = itemInput.value.trim();

    if (itemName !== '') {
        shoppingList.push({ name: itemName, purchased: false });
        renderList(); // Update the list view
        saveToLocalStorage(); // Save to local storage after adding item
        itemInput.value = ''; // Clear input field
        clearError();
    } else {
        showError('Please enter an item.');
    }
});

// Event listener for Mark Purchased button
markPurchasedBtn.addEventListener('click', () => {
    shoppingList.forEach(item => {
        item.purchased = true;
    });
    renderList(); // Update the list view
    saveToLocalStorage(); // Save to local storage after marking all as purchased
});

// Event listener for Clear List button
clearListBtn.addEventListener('click', () => {
    shoppingList = [];
    renderList(); // Update the list view
    saveToLocalStorage(); // Save to local storage after clearing the list
});

// Function to save shopping list to local storage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Function to load shopping list from local storage
function loadFromLocalStorage() {
    const storedList = JSON.parse(localStorage.getItem('shoppingList'));
    if (storedList) {
        shoppingList = storedList;
        renderList(); // Initial render from local storage
    }
}

// Function to show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Function to clear error message
function clearError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

// Load shopping list from local storage on initial page load
loadFromLocalStorage();
