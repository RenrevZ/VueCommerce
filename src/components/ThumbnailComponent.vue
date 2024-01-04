<template>
    <div class="image-thumbnail">

        <div class="thumbnail" v-for="(image,index) in product.images" :key="image">
            <img :src="image" 
                alt=""
                id="thumbnail-image"
                @click="changeHeaderPhoto(index)">
        </div>

    </div>
</template>

<script>

</script>