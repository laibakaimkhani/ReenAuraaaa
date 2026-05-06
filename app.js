document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    lucide.createIcons();

    // DOM Elements
    const productGrid = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileLinks = document.getElementById('mobile-links');
    const collectionCards = document.querySelectorAll('.collection-card');
    
    // Product Modal Elements
    const productModal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModals = document.querySelectorAll('.close-modal');

    // Initial Render
    renderProducts(products);

    // --- Navigation & Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    mobileMenuBtn.addEventListener('click', () => {
        mobileLinks.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileLinks.classList.remove('active');
        });
    });

    // --- Filtering ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');
            filterProducts(filterValue, sortSelect.value);
        });
    });

    // --- Collection Clicks ---
    collectionCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Scroll to shop
            document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
            
            // Update filter buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            document.querySelector(`.filter-btn[data-filter="${category}"]`).classList.add('active');
            
            filterProducts(category, sortSelect.value);
        });
    });

    // --- Sorting ---
    sortSelect.addEventListener('change', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        filterProducts(activeFilter, e.target.value);
    });

    // --- Render Functions ---
    function filterProducts(category, sortType) {
        let filtered = category === 'all' 
            ? [...products] 
            : products.filter(p => p.category === category);

        if (sortType === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortType === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        }

        renderProducts(filtered);
    }

    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p>No products found.</p>';
            return;
        }

        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image" onclick="openProductModal(${product.id})">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-details">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="btn add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    // --- Modal Logic ---
    window.openProductModal = function(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

        modalBody.innerHTML = `
            <div class="modal-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-info">
                <h2>${product.name}</h2>
                <div class="modal-price">$${product.price.toFixed(2)}</div>
                <p class="modal-desc">${product.description}</p>
                <div class="quantity-control">
                    <button class="qty-btn" onclick="updateModalQty(-1)">-</button>
                    <input type="number" id="modal-qty" class="qty-input" value="1" min="1" readonly>
                    <button class="qty-btn" onclick="updateModalQty(1)">+</button>
                </div>
                <button class="btn btn-primary btn-block" onclick="addToCartFromModal(${product.id})">Add to Cart</button>
            </div>
        `;
        
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-overlay').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    window.updateModalQty = function(change) {
        const input = document.getElementById('modal-qty');
        let val = parseInt(input.value) + change;
        if (val < 1) val = 1;
        input.value = val;
    };

    window.addToCartFromModal = function(id) {
        const qty = parseInt(document.getElementById('modal-qty').value);
        addToCart(id, qty);
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Newsletter prevent default
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thanks for subscribing!');
            newsletterForm.reset();
        });
    }
});
