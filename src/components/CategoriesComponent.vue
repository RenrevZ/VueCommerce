<template>
    <div class="main-navigation-item">
            <div class="categories-header">

                <!-- HEADER NAME -->
                <div class="left">
                    <span class="header-background"></span>
                    <h4>Categories</h4>
                </div>
                
                <!-- SLIDE ARROW -->
                <div class="right">
                    <div class="arrow" @click="scrollLeft">
                        <img src="../assets/left-icon.svg" 
                             alt="">
                    </div>

                    <div class="arrow" @click="scrollRight">
                        <img src="../assets/rigth-icon.svg" 
                             alt="">
                    </div>
                </div>
            </div>
            
            <!-- CATEGORY LIST -->
            <ul  ref="categoriesContainer">
                <li v-for="category in productCategory" :key="category">
                    {{  category }}
                </li>
            </ul>
        </div>
</template>

<script setup>
    import { defineProps,ref } from 'vue';

    defineProps(['productCategory'])

    const categoriesContainer = ref(null)

    const scrollLeft = () => {
        categoriesContainer.value.scrollLeft+=(-1000)
    }

    const scrollRight = () => {
        categoriesContainer.value.scrollLeft+=1000
    }
</script>

<style scoped>
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

     .main-navigation-item{
        margin: 30px 0px;
        width: 100%;
    }

     .main-navigation-item .categories-header{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

     .main-navigation-item .categories-header .right{
        display: flex;
        gap: 20px;
    }

     .main-navigation-item .categories-header .right .arrow{
        height: 25px;
        width: 25px;
        border: 1px solid rgba(0,0,0,0.2);
        border-radius: 50%;
    }

     .main-navigation-item .categories-header .right .arrow:active{
         scale: 0.9;
    }

     .main-navigation-item .categories-header .right .arrow img{
        height: inherit;
        width: inherit;
        object-fit: fill;
        padding: 5px;
    }

     .main-navigation-item ul{
        display: flex;
        gap: 15px;
        padding: 10px;
        list-style: none;
        overflow: scroll;
        text-wrap: nowrap;
        scroll-behavior: smooth;
        width: 100%;
    }
    
     .main-navigation-item ul::-webkit-scrollbar {
        width: 12px;
    }

     .main-navigation-item ul li{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        /* border-radius: 10px; */
        box-shadow: 8px 5px 1px rgba(12,236,169,0.329);
        height: 100px;
        min-width: 200px;
        border: 1px solid rgba(12,236,169,0.329);
        background-color: var(--White);
    }

    .main-navigation-item ul li:hover{
        scale: 1.2;
        z-index: 2;
        transition: 0.3s;
        box-shadow: 4px 4px 10px var(--Pale-orange);
        cursor: pointer;
        margin: 0px 15px;
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