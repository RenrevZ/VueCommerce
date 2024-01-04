<template>
    <div class="container">
        <div class="navigation">

            <div class="mobile-menu">
                <img src="../assets/icon-menu.svg" 
                     alt=""
                     @click="OpenSideMenu">
            </div>

            <div class="icon">
                <img src="../assets/vue-logo.jpg" 
                     alt="">
            </div>
        </div>

        <div class="profile">
            <div class="cart" @click="toggleCart">
                <!-- cart length -->
                <span class="cart-items-length">3</span>

                <!-- cart icon -->
                <img src="../assets/icon-cart.svg" 
                     alt=""
                     >
            </div>

            <div class="profile-img">
                <img src="../assets/image-avatar.png" 
                     alt="">
            </div>

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
        </div>


        <!-- SIDEMENU -->
        <div class="side-menu" ref="sideMenuContainer">
            <div class="main-menu">

                <div class="close-icon" >
                    <img src="../assets/close-icon-black.svg" 
                         alt=""
                         @click="CloseSideMenu">
                </div>

                <div class="link-items">
                    <ul>
                        <li v-for="category in productCategory" :key="category">
                            {{  category }}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { ref,onMounted } from 'vue';
    import { products } from '@/store/productsStore';

    const useProduct = products()
    const cartContainer = ref(null)
    const sideMenuContainer = ref(null)
    const productCategory = ref(null)
    
    const classToggler = (container,classList) => {
        container.value.classList.toggle(classList)
    }

    const toggleCart = () => {
        classToggler(cartContainer,'active')
    }

    const CloseSideMenu = () => {
        classToggler(sideMenuContainer,'active')
    }

    const OpenSideMenu = () => {
        classToggler(sideMenuContainer,'active')
    }

    onMounted(async () => {
        await useProduct.getCategories()
        productCategory.value = useProduct.productCategory
    })
</script>
  

<style scoped>
    .container{
        height: 70px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        display: grid;
        grid-template-columns: repeat(2,50%);
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px;
        position: sticky;
        top: 0;
        background-color: var(--White);
        z-index: 30000;
    }

    .container .navigation{
        display: flex;
        align-items: center;
        height: 100%;
    }

    .container .navigation .mobile-menu{
        display: none;
    }

    .main-navigation-item{
        height: 100px;
        display: flex;
        justify-content: center;
        align-items:center;
        overflow: scroll;
    }

    .main-navigation-item ul{
        list-style: none;
        height: 100%;
        display: flex;
    }

    .main-navigation-item ul li{
        margin-right: 20px;
        height: 100%;
        width: 100%;
        color: var(--Dark-grayish-blue);
        display: flex;
        justify-content: center;
        border-bottom: 3px inset transparent;
        align-items: center;
        transition: border-color 0.2s ease;
        cursor: pointer;
    }


    .main-navigation-item ul li:hover{
        border-color: var(--Orange);
    }

    .navigation .icon img{
        height: inherit;
        width: inherit;
        object-fit: cover;
    }

    .navigation .icon{
        height: 50px;
        width: 200px;
        object-fit: cover;
        display: flex;
        align-items: center;
        font-size: 25px;
    }
    
    .navigation .icon .subheader{
       position: relative;
       top:1px;
       font-weight: 700;
    }

    .profile{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
    }

    .profile .profile-img{
        height: 30px;
        border-radius: 50%;
        margin: 0px 30px;
    }

    .profile .profile-img img{
        object-fit: cover;
        height: inherit;
        width:inherit;
    }

    /* CART */
    .profile .cart{
        cursor: pointer;
        position: relative;
    }
  
    .profile .cart .cart-items-length{
        position: absolute;
        right: -3px;
        top: -4px;
        padding: 0px 5px;
        border-radius: 10px;
        background-color: var(--Orange);
        color: var(--White);
        font-weight: bold;
        text-align: center;
        font-size: 8px;
        /* height: 10px;
        width: 15px; */
    }
    
    
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

    .side-menu{
        display: none;
    }

    @media(width <= 768px){

        .container .navigation{
            display: flex;
            justify-content: flex-start;
            gap: 10px;
        }

        .container .navigation .main-navigation-item{
            display: none;
        }

        .container .navigation .mobile-menu{
            display: block;
        }

        .side-menu{
            position: fixed;
            width: 100vw;
            /* height: 100vh; */
            top: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0,0,0,0.3);
            z-index: 10;
            transition: width 0.5s ease;
            overflow: auto;
        }

        .side-menu.active{
            display: block;
        }

        .side-menu .main-menu{
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: 70px;
            padding: 0px 10px;
            gap: 10px;
            width: 50%;
            background-color: var(--White);
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1000;
            animation: slide 0.5s ease;
            overflow: auto;
        }

        .side-menu .main-menu .close-icon{
            position: sticky;
            top: 0;
            display: flex;
            align-items: center;
            height: 100%;
            width: 100%;
            padding: 0px 10px;
            background-color: var(--White);
        }

        .side-menu .main-menu ul{
            padding: 0px 10px;
            line-height: 3;
            list-style: none;
        }

        .side-menu .main-menu ul{
          font-weight: 700;
        }
    }

    @keyframes slide {
        from{
            width: 0%;
        }to{
            width: 50%;
        }
    }

    @keyframes slideOut {
        from{
            width: 50%;
        }to{
            width: 0%;
        }
    }
</style>
  