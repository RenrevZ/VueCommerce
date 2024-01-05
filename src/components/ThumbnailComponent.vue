<template>
    <div class="image-thumbnail">

        <div class="thumbnail" v-for="(image,index) in images" :key="image">
            <img :src="image" 
                alt=""
                id="thumbnail-image"
                ref="`image${index + 1}`"
                @click="changeHeaderPhoto(index)"
                draggable="false">
        </div>

    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

  
    defineProps(['changeHeaderPhoto','images'])
</script>

<style scoped>
    .image-thumbnail{
        width: 450px;
        display: flex;
        padding: 10px 0px;
        justify-content: space-evenly;
    }

    .thumbnail{
        height: 85px;
        width:85px;
        border: 1px solid transparent;
    }

    .image-thumbnail .thumbnail img{
       height: inherit;
       width: inherit;
       object-fit: cover;
       border-radius: 10px;
    }

     .image-thumbnail .thumbnail.current{
        border-color:var(--Orange);
        border-radius: 10px;
    }

    .image-thumbnail .thumbnail.current img{
        opacity: 0.5;
    }

    .image-thumbnail{
        width: 450px;
        display: grid;
        grid-template-columns: repeat(4,auto);
        padding: 10px 0px;
        justify-content: space-between;
        
    }

    .image-thumbnail > .thumbnail{
        height: 85px;
        width:85px;
        border: 1px solid transparent;
        cursor: pointer;
    }

    .image-thumbnail .thumbnail img{
       height: inherit;
       width: inherit;
       object-fit: cover;
       border-radius: 10px;
       cursor: pointer;
    }

    .image-thumbnail .thumbnail.current{
        border-color:var(--Orange);
        border-radius: 10px;
    }

    .image-thumbnail .thumbnail.current img{
       opacity: 1;
    }

    @media (width <= 768px){
        .image-thumbnail{
            width: 100%;
            justify-content: space-around;
        }
    }

    @media (width <= 320px){
        .thumbnail{
            height: 70px;
            width:70px;
            border: 1px solid transparent;
        }

        .image-thumbnail .thumbnail img{
            height:70px;
            width: 70px;
            object-fit: cover;
            border-radius: 10px;
        }
    }


</style>