<template>
  <div class="container">
    <AlertMessage  :isTrue="isAdded" :isAlreadyAdded="isAlreadyAdded"/>
    <NavBar />
    
    <router-view></router-view>
  </div>
</template>

<script setup>
  import NavBar from './components/NavBar';
  import AlertMessage from './components/AlertMessage';
  import { carts } from './store/cartStore';
  import { computed, watch } from 'vue';

  const useCart = carts()
  let isAdded = computed(() => useCart.cartadded)
  let isAlreadyAdded = computed(() => useCart.cartAlreadyAdded)

  watch(isAdded,() => setTimeout(() => {
      console.log('watched')
      useCart.cartadded = false
  },3000))

  watch(isAlreadyAdded,() => setTimeout(() => {
      console.log('watched')
      useCart.cartAlreadyAdded = false
  },3000))
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap');
  :root{
    --Orange: hsl(26, 100%, 55%);
    --Pale-orange: hsl(25, 100%, 94%);
    --Very-dark-blue: hsl(220, 13%, 13%);
    --Dark-grayish-blue: hsl(219, 9%, 45%);
    --Grayish-blue: hsl(220, 14%, 75%);
    --Light-grayish-blue: hsl(223, 64%, 98%);
    --White: hsl(0, 0%, 100%);
    --Black: hsl(0, 0%, 0%);
  }

 *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
 }

 body{
    font-family: 'Kumbh Sans', sans-serif;
    position: relative;
 }

 .container{
    max-width: 1100px;
    margin: auto;
    position: relative;
 }
</style>
