<template>
     <div class="cart-container" ref="cartContainer">
            <!-- cart header -->
            <div class="cart-header">
                <h4>Cart</h4>
            </div>

                <!-- cart items -->
            <div class="cart-items">

                <div class="items">
                    <div class="item-image">
                        <img src="../assets/image-product-1.jpg" alt="">
                    </div>

                    <div class="item-description">
                        <p class="descriptiion">
                            Fall Limited Edition Sneakers
                        </p>

                        <small class="price">1124.00 x 3 <span class="price-total">$1375.00</span></small>
                    </div>

                        <div class="item-remove-btn">
                        <img src="../assets/icon-delete.svg" 
                             alt="">
                    </div>

                    </div>

            </div>

            <div class="cart-checkout-btn">
                <button class="checkout-btn">Checkout</button>
            </div>
        </div>
</template>

<script setup>

</script>

<style scoped>
    .cart-container{
        position: absolute;
        top: 35px;
        border-radius: 10px;
        box-shadow: 0px 15px 20px rgba(0,0,0,0.2);
        background-color: var(--White);
        width: 350px;
        color: var(--Dark-grayish-blue);
        display: none;
    }

    .cart-container.active{
        display: block;
    }

    .cart-container .cart-header{
        padding: 15px;
        color: var(--Black);
    }

    .cart-container .cart-items{
        border-top: 1px solid rgba(0,0,0,0.1);
        padding: 10px;
    }


    .cart-container .cart-items .items{
        display: grid;
        grid-template-columns: repeat(3,auto);
        gap: 20px;
        justify-content: center;
        align-items: center;
    }

    .cart-container .cart-items .items{
        width: 100%;
    }

    .cart-container .cart-items .items .item-image{
        height: 40px;
        width: 40px;
    }

    .cart-container .cart-items .items .item-image img{
        height: inherit;
        width: inherit;
        object-fit: cover;
        border-radius: 5px;
    }

    .cart-container .cart-items .items .item-description .price-total{
        font-weight: bold;
        color: var(--Black);
    }

    .cart-container .cart-checkout-btn {
        width: 100%;
        height: 100%;
        padding: 20px;
        display: flex;
        justify-content: center;
    }

    .cart-container .cart-checkout-btn button.checkout-btn{
        all: unset;
        width: inherit;
        padding: 15px 10px;
        text-align: center;
        border-radius: 10px;
        background-color: var(--Orange);
        color:var(--White);
        font-weight: bold;
    }
</style>