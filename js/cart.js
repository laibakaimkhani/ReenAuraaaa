document.addEventListener('DOMContentLoaded', () => {
    // Cart State
    let cart = JSON.parse(localStorage.getItem('reenaura_cart')) || [];

    // DOM Elements
    const cartToggle = document.getElementById('cart-toggle');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Checkout Elements
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');
    const successModal = document.getElementById('success-modal');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('card-details');

    // Initial Render
    updateCartUI();

    // --- Cart Sidebar Toggle ---
    function openCart() {
        cartOverlay.classList.add('active');
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartOverlay.classList.remove('active');
        cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
    }

    cartToggle.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // --- Cart Functions ---
    window.addToCart = function(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity
            });
        }

        saveCart();
        updateCartUI();
        openCart(); // Show cart when item added
    };

    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    };

    function saveCart() {
        localStorage.setItem('reenaura_cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        // Update Count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Render Items
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.cursor = 'not-allowed';
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.cursor = 'pointer';

            cart.forEach(item => {
                total += item.price * item.quantity;
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        // Update Total
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
        
        // Re-init lucide icons if any new ones were added
        if(window.lucide) lucide.createIcons();
    }

    // --- Checkout Flow ---
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        closeCart();
        renderCheckoutSummary();
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function renderCheckoutSummary() {
        checkoutItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.justifyContent = 'space-between';
            row.style.marginBottom = '10px';
            row.style.fontSize = '0.9rem';
            row.innerHTML = `
                <span>${item.quantity}x ${item.name}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            checkoutItemsContainer.appendChild(row);
        });

        checkoutTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    // Toggle Card Details
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardDetails.classList.remove('hidden');
                // Add required attributes
                cardDetails.querySelectorAll('input').forEach(input => input.required = true);
            } else {
                cardDetails.classList.add('hidden');
                // Remove required attributes
                cardDetails.querySelectorAll('input').forEach(input => input.required = false);
            }
        });
    });

    // Handle form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate processing
        const btn = checkoutForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        btn.disabled = true;

        setTimeout(() => {
            // Clear cart
            cart = [];
            saveCart();
            updateCartUI();
            
            // Close checkout, open success
            checkoutModal.classList.remove('active');
            successModal.classList.add('active');
            
            // Reset form
            checkoutForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
            cardDetails.classList.add('hidden');
            
        }, 1500);
    });

    // Close success modal
    document.querySelector('.close-success').addEventListener('click', () => {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    });
});
