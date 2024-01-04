<template>
    <div class="main-products">

        <div class="product" v-for="product in productItem" :key="product.id">
            <div class="image">
                <img :src="product.thumbnail" alt="">
            </div>

            <div class="product-category">
                {{ product.brand }}
            </div>

            <div class="product-title">
                {{  product.title }}
            </div>

            <div class="price-container">
                <div class="price">
                    ${{  product.price }}
                </div>

                <div class="discount-price">
                    ${{  product.discountPercentage }}
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    defineProps({
        productItem: {
            type:Array
        }
    })
</script>
<style scoped>
/* MAIN PRODUCT */
    .main-products{
        display: grid;
        grid-template-columns: repeat(4,auto);
        gap: 10px;
        width: 100%;
    }

    .main-products .product{
        border-radius: 5px;
        border: 1px solid rgba(0,0,0,0.2);
        height: 100%;
        width: 200px;
        box-shadow: 2px 2px 3px rgba(255, 145, 0, 0.3);
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: var(--White);
    }

    .container .product:hover{
        scale: 1.1;
        transition: 0.3s;
        box-shadow: 3px 3px 10px rgba(0,0,0,0.2);
    }

    .main-products .product .image{
       height: 200px;
       width: 100%;
    }

    .main-products .product .image img{
       height: inherit;
       width: inherit;
       object-fit: fill;
    }

    .main-products .product .product-category{
       font-weight: 700;
       color: var(--Dark-grayish-blue);
       border-top: 1px solid rgba(0,0,0,0.2);
    }

    .main-products .product .product-title{
       font-weight: 700;
    }
    
    .main-products .product .price-container{
       display: flex;
       gap: 5px;
       color: var(--Orange)
    }


    .main-products .product .price-container .discount-price{
        color: rgb(230, 59, 59);
        text-decoration: line-through;
        font-size: 13px;
    }

    .main-products .product .details-btn{
        all: unset;
        padding: 5px;
        text-align: center;
        width: 100px;
        background-color: var(--Orange);
        color: var(--White);
        font-weight: 700;
        border-radius: 20px;
        align-self: end;
    }

    @media(width <= 768px){
        .main-products{
            display: grid;
            grid-template-columns: 100%;
            justify-content: center;
            align-items: center;
            margin:auto;
            width: 100%;
        }
    }
</style>