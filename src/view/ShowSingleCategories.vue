<template>
    <div class="container">
        
        <!-- CATEGORIES -->
        <Categories :productCategory="productCategory"/>

        <div class="main-products-header">
                <span class="header-background"></span>
                <h4>All Products</h4>
        </div>

        <!-- MAIN PRODUCT -->
        <Product :productItem="productItem"/>
    </div>
</template>

<script setup>
    import { products } from '@/store/productsStore';
    import {ref,onMounted} from 'vue'
    import Product from '@/components/Product';
    import Categories from '@/components/Categories'

    const useProduct = products()
    const productItem = ref([])
    const productCategory = ref(null)

    onMounted( async () =>  { 
        await useProduct.getProducts()
        productItem.value = useProduct.productItems
        await useProduct.getCategories()
        productCategory.value = useProduct.productCategory
    })
</script>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: 100%;
        position: relative;
        justify-content: start;
        align-items: start;
        margin-top: 30px;
        column-gap: 50px;
        margin: 0px 30px;
    }

    .header-background{
        height: 10px;
        width: 30px;
        padding: 5px;
        rotate: -20deg;
        background-color: rgba(121, 235, 86, 0.6);
        position: absolute;
        top: 0;
        left: -10px;
        z-index: -1;
        animation: slide 0.5s ease;
    }

    .main-products-header{
        position: relative;
        margin-bottom: 30px;
    }

    @keyframes slide {
        from {
             width: 0;
             padding: 0;
        }
        to {
            
             width: 30px;
             padding: 5px;
        }
    }
</style>