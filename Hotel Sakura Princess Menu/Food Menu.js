/* ==========================================
   1. NAVIGATION & MOBILE MENU
========================================== */

const mobileMenu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');
const body = document.querySelector('body');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navActions.classList.toggle('active'); // show search in mobile
        mobileMenu.classList.toggle('is-active');
        body.classList.toggle('no-scroll');
    });
}

/* Close mobile menu when link clicked */

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navActions.classList.remove('active');
        mobileMenu.classList.remove('is-active');
        body.classList.remove('no-scroll');
    });
});


/* ==========================================
   2. MOBILE SEARCH TOGGLE
========================================== */

const searchContainer = document.querySelector('.search-container');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.getElementById('search-input');

if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {

        if (window.innerWidth <= 768) {
            e.preventDefault();

            searchContainer.classList.toggle('active');

            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        }

    });
}


/* ==========================================
   3. SEARCH FILTER FUNCTION
========================================== */

const menuItems = document.querySelectorAll('.menu-item');

if (searchInput) {

    searchInput.addEventListener('input', () => {

        const searchText = searchInput.value.toLowerCase().trim();

        menuItems.forEach(item => {

            const engName = item.querySelector('.eng-name')?.textContent.toLowerCase() || '';
            const mmName = item.querySelector('.mm-name')?.textContent.toLowerCase() || '';
            const price = item.querySelector('.price')?.textContent.toLowerCase() || '';

            const isMatch =
                engName.includes(searchText) ||
                mmName.includes(searchText) ||
                price.includes(searchText);

            item.style.display = isMatch ? 'block' : 'none';

        });


        /* Hide empty categories */

        document.querySelectorAll('.category-section').forEach(category => {

            const visibleItems =
                category.querySelectorAll('.menu-item:not([style*="display: none"])');

            category.style.display =
                visibleItems.length > 0 ? 'block' : 'none';

        });


        /* Hide menu headers */

        ['.foodmenu', '.beveragemenu'].forEach(menuClass => {

            const menu = document.querySelector(menuClass);

            if (menu && menu.querySelector('header')) {

                const hasVisible =
                    menu.querySelectorAll('.menu-item:not([style*="display: none"])').length > 0;

                menu.querySelector('header').style.display =
                    hasVisible ? 'block' : 'none';

            }

        });


        /* Hide About section while searching */

        const aboutSection = document.getElementById('about');

        if (aboutSection) {
            aboutSection.style.display = searchText ? 'none' : 'block';
        }

    });

}


/* ==========================================
   4. MENU ITEM OPTIONS (Accordion)
========================================== */

function toggleOptions(header) {

    const menuItem = header.closest('.menu-item');
    const optionsList = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');

    const isOpen = optionsList.classList.contains('show');

    /* Close other items */

    document.querySelectorAll('.options').forEach(opt => opt.classList.remove('show'));
    document.querySelectorAll('.arrow').forEach(ar => ar.classList.remove('rotate'));
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('open'));

    if (!isOpen) {

        optionsList.classList.add('show');
        arrow.classList.add('rotate');
        menuItem.classList.add('open');

        /* Smooth scroll */

        const navbarHeight =
            document.querySelector('.navbar')?.offsetHeight || 0;

        const itemTop =
            menuItem.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
            top: itemTop - navbarHeight - 10,
            behavior: 'smooth'
        });

    }

}


/* ==========================================
   5. SHOPPING CART SYSTEM
========================================== */

let cart = [];

function toggleCart() {

    document.getElementById("cart-sidebar").classList.toggle("active");

    const overlay = document.getElementById("cart-overlay");

    if (overlay) overlay.classList.toggle("active");

    body.classList.toggle('no-scroll');

}


/* Add item to cart */

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

}


/* Remove item */

function removeFromCart(itemName) {

    cart = cart.filter(item => item.name !== itemName);

    updateCart();

}


/* Update cart UI */

function updateCart() {

    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            `<p class="empty-msg">Your cart is empty.</p>`;

        cartTotal.innerText = 0;
        cartCount.innerText = 0;

        return;
    }

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        const itemDiv = document.createElement('div');

        itemDiv.className = 'cart-item';

        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong><br>
                <small>${item.quantity} x ${item.price} MMK</small>
            </div>

            <div class="cart-item-actions">
                <span class="item-subtotal">
                    ${(item.price * item.quantity).toLocaleString()} MMK
                </span>

                <button class="remove-item"
                onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);

    });

    cartTotal.innerText = total.toLocaleString();

    cartCount.innerText =
        cart.reduce((sum, item) => sum + item.quantity, 0);

        function makeCall() {
  // confirm box (optional)
  if (confirm("444 ကိုဖုန်းခေါ်မလား?")) {
    window.location.href = "tel:444";
  }
}

}