<template>
    <div class="main-products">
        <div class="product-container" v-for="product in productItem" :key="product">
            <router-link :to="{name:'ShowProduct',params: { id:product.id }}" class="product">
                <div class="lowest-guarantee" v-if="product.price <= 100">
                    <p>lowest price</p>
                </div>

                    <div class="image">
                        <img :src="product.thumbnail" alt="">
                    </div>

                    <div class="product-category">
                        {{ product.brand }}
                    </div>

                    <div class="ratings">
                        <span v-for="rate in Math.round(product.rating)" :key="rate" class="material-symbols-outlined star-symbol">
                            star
                        </span>
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
            </router-link>
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

    a { 
        text-decoration: none;
        color:var(--Dark-grayish-blue)
    }

    .main-products .product{
        border: 1px solid rgba(12,236,169,0.329);
        height: 100%;
        width: 200px;
        box-shadow: 10px 8px 1px rgba(12, 236, 169, 0.329);
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: var(--White);
        position:relative;
        transition: 0.3s;
    }

    .main-products .product:hover{
        /* scale: 1.1; */
        transition: all 0.3s;
        box-shadow: 20px 8px 1px rgba(12, 236, 169, 0.329);
        left: -10px;
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

    .star-symbol{
        color: rgb(218, 221, 12);
        font-size: 18px;
    }

    .product-container{
        position: relative;
    }

    .lowest-guarantee{
        position: absolute;
        top: 10px;
        right: 10px;
        width: 100px;
        background-color: rgba(245, 52, 52, 0.7);
        color: var(--White);
        font-weight: 700;
        font-size: 11px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        text-transform: uppercase;
    }

    @media(width <= 768px){
        .main-products{
            display: grid;
            grid-template-columns: repeat(3,35%);
            justify-content: center;
            align-items: center;
            margin:auto;
            width: 100%;
        }
    }

    @media(width <= 426px){
        .main-products{
            display: grid;
            grid-template-columns: repeat(2,50%);
            justify-content: center;
            align-items: center;
            margin:auto;
            width: 100%;
        }

        .main-products .product{
            border: 1px solid rgba(12,236,169,0.329);
            height: 100%;
            width: 150px;
            box-shadow: 10px 8px 1px rgba(12, 236, 169, 0.329);
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background-color: var(--White);
        }
    }

    @media(width <= 320px){
        .main-products{
           grid-template-columns: 100%;
        }

        .main-products .product{
            width: 250px;
        }
    }
</style>