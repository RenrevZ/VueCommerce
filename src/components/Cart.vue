<template>
     <div class="cart-container">
            <!-- cart header -->
            <div class="cart-header">
                <h4>Cart</h4>
            </div>

                <!-- cart items -->
            <div class="cart-items" v-if="cartItems.length > 0">
                <div class="item-container" v-for="(items,index) in cartItems" :key="items.id">
                        <div class="items" v-for="item in items.products" :key="item.id">
                            <div class="item-image">
                                <img :src="item.thumbnail" alt="">
                            </div>

                            <div class="item-description">
                                <p class="descriptiion">
                                    {{ item.title }}
                                </p>

                                <small class="price">
                                    ${{ Number(item.price).toLocaleString()  }} x {{ item.quantity }} <br>
                                    Total: <span class="price-total">${{ Number(item.total).toLocaleString() }}</span>
                                </small>
                            </div>

                            <div class="item-remove-btn" @click="deleteCartItem(index)">
                                <img src="../assets/icon-delete.svg" 
                                    alt="">
                            </div>
                        </div>
                </div>

                <div class="checkout-details">
                    <div class="overAllTotal">

                        <div class="left">
                            <h4>Order Total:</h4>
                        </div>

                        <div class="left">
                            <h4>${{ Number(orderTotal).toLocaleString() }}</h4>
                        </div>
                    </div>
                    <div class="cart-checkout-btn">
                        <button class="checkout-btn">Checkout</button>
                    </div>
                </div>
            </div>

            <div class="empty-cart" v-else>
                <h2>Your Cart is Empty</h2>
            </div>
        </div>
</template>

<script setup>
    import { computed, defineProps } from 'vue';
    import { carts } from '@/store/cartStore'

    const cart = carts()

    const deleteCartItem = (id) => {
        cart.RemoveCartItem(id)
    }
    
    const orderTotal = computed(() => cart.sumOrderTotal)
    
    defineProps({
        'cartItems' : Array
    })
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
        z-index: 100;
    }

    .cart-container.active{
        display: block;
    }

    .cart-container .cart-header{
        padding: 15px;
        color: var(--Black);
    }

    .cart-container .cart-items{
        width: 100%;
        max-height: 300px;
        overflow-y: scroll;
        overflow-x: hidden;
        scroll-behavior: smooth;
    }

    .cart-container .cart-items .item-container{
        border-top: 1px solid rgba(0,0,0,0.1);
        padding: 10px;
    }
    
    .cart-container .cart-items::-webkit-scrollbar-thumb{
       background-color: var(--Orange);
    }


    .cart-container .cart-items .items{
        display: grid;
        grid-template-columns: 30% 50% 20%;
        gap: 20px;
        justify-content: space-between;
        text-align: left;
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
        padding: 10px 0px;
        display: flex;
        justify-content: center;
        padding: 10px;
        cursor: pointer;
    }

    .checkout-details .overAllTotal{
        display: flex;
        justify-content: space-between;
        padding: 10px;
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
        cursor: pointer;
    }

    .item-remove-btn img{
        cursor: pointer;
    }

    .empty-cart{
        width: 100%;
        padding: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
    }
</style>