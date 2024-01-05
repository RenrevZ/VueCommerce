<template>
    <div class="container">
        <!-- DESKTOP -->
        <div class="image-container">
            <div class="wrapper">
                <div class="image-header" ref="imageContainer"
                     @click="OpenSlideShow">
                </div>
            </div>

            <div class="image-thumbnail">
                
                <ThumbnailComponent :changeHeaderPhoto="changeHeaderPhoto" 
                                    :images="product.images" />

            </div>
        </div>

        <!-- MOBILE -->
        <div class="image-container-mobile">
            <div class="wrapper">

                <div class="prev-icon" @click="mobilePrev">
                    <img src="../assets/icon-previous.svg" alt="">
                </div>

                <div class="image-header" ref="mobileImageContainer"></div>

                <div class="next-icon" @click="mobileNext">
                    <img src="../assets/icon-next.svg" alt="">
                </div>
                
            </div>

            <ThumbnailComponent :changeHeaderPhoto="changeHeaderPhotoMobile" :images="product.images" />
        </div>

        <div class="item-description-container">
            <div class="company">
                <h4 >{{ product.brand }}</h4>
            </div>

            <div class="item-title">
                <h1 >{{ product.title }}</h1>
            </div>
            
           <div class="item-description">
                <p>
                    {{ product.description }}
                </p>
           </div>

           <div class="pricing">
                <div class="price">
                    <h1>${{ product.price }}</h1>

                    <div class="discount">50%</div>
                </div>

                <div class="old-price">
                        <h5>$250.00</h5>
                </div>
           </div>   
           

           <div class="btn-container">
                <div class="range-btn">

                    <div class="minus-btn" @click="itemValue<=1 ? itemValue : itemValue--">
                        <img src="../assets/icon-minus.svg" 
                             alt="">
                    </div>

                    <div class="item-value">
                        {{ itemValue }}
                    </div>

                    <div class="plus-btn" 
                         @click="itemValue<=product.stock ? itemValue++ : product.stock">
                        <img src="../assets/icon-plus.svg" 
                             alt="">
                    </div>

                    
                </div>

                <div class="addToCart-btn">
                    <button class="btn-add-cart">
                        <img src="../assets/cart-white.svg" alt="" class="btn-icon">
                        Add to cart
                    </button>
                </div>
           </div>
           
        </div>
    </div>

    <!-- PRODUCT SLIDESHOW -->
    <div class="product-slideshow" ref="productSlideShowDiv">
        <div class="main-item">
            <div class="close-icon">
                <img src="../assets/icon-close.svg" 
                     alt=""
                     @click="closeSlideShow">
            </div>

            <div class="image-container">
                <div class="wrapper">

                    <div class="prev-icon" @click="prevImage">
                        <img src="../assets/icon-previous.svg" alt="">
                    </div>

                    <div class="image-header" ref="slideShowImageHeader"></div>

                    <div class="next-icon" @click="nextImage">
                        <img src="../assets/icon-next.svg" alt="">
                    </div>
                </div>

                <div class="image-thumbnail">
                    <ThumbnailComponent 
                              :changeHeaderPhoto="changeSlideShowHeaderPhoto" 
                              :images="product.images" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { onMounted, ref } from 'vue'
    import { products } from '@/store/productsStore';
    import { useRoute } from 'vue-router';
    import ThumbnailComponent from '@/components/ThumbnailComponent.vue';

    let itemValue = ref(1)
    const productSlideShowDiv  = ref(null)
    const router = useRoute()
    const useProduct = products()
    const product = ref('')
    const imageContainer = ref(null)


    const closeSlideShow = () => {
        productSlideShowDiv.value.classList.toggle('active')
    }

    const OpenSlideShow = () => {
        changeContainerImage(slideShowImageHeader,product.value.images[currentImageIndex.value])
        productSlideShowDiv.value.classList.toggle('active')
    }

    const changeContainerImage = (container,image) => {
        container.value.style.background = `url(${image}) no-repeat center`
        container.value.style.backgroundSize = 'cover'
    }

    const changeHeaderPhoto = (index) => {
        currentImageIndex.value = index
        console.log('current Image:',currentImageIndex.value)
       
        changeContainerImage(imageContainer,product.value.images[index])
    }

    // PRODUCT SLIDESHOW
    const slideShowImageHeader = ref(null)
    const currentImageIndex = ref(0)
    const imageLength = ref(0)

   

    const changeSlideShowHeaderPhoto = (index) => {
        changeContainerImage(slideShowImageHeader,product.value.images[index])
    }

    const prevImage = () =>{
       if (currentImageIndex.value > 0) {
            currentImageIndex.value--;
        }

        changeContainerImage(slideShowImageHeader,product.value.images[currentImageIndex.value])
    }

    const nextImage = () =>{
        if(currentImageIndex.value < imageLength.value -1){
            currentImageIndex.value++
        }

        changeContainerImage(slideShowImageHeader,product.value.images[currentImageIndex.value])
    }

    // MOBILE VIEW
    const mobileImageContainer = ref('')

    const mobilePrev = () => {
        if (currentImageIndex.value > 0) {
            currentImageIndex.value--;
        }

        changeContainerImage(mobileImageContainer,product.value.images[currentImageIndex.value])
    }

    const mobileNext = () => {
        if(currentImageIndex.value < imageLength.value -1){
            currentImageIndex.value++
        }

        changeContainerImage(mobileImageContainer,product.value.images[currentImageIndex.value])
    }

    const changeHeaderPhotoMobile = (index) => {
        changeContainerImage(mobileImageContainer,product.value.images[index])
    }

    onMounted(async () => {
        await useProduct.getSingleProduct(router.params.id)
        product.value = useProduct.product

        if(product.value){
              imageLength.value = product.value.images.length
        }
      
        // CHANGE HEADER IMAGE 
        // DESKTOP
        changeContainerImage(imageContainer,product.value.thumbnail)
        changeContainerImage(slideShowImageHeader,product.value.thumbnail)

        // MOBILE
        changeContainerImage(mobileImageContainer,product.value.thumbnail)
    })
</script>
  

<style scoped>
     .container{
        height: 700px;
        display: grid;
        grid-template-columns: repeat(2,50%);
        align-items: center;
        justify-content: space-between;
    }
    
    .container .image-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        /* background-color: blueviol et; */
    }

    .container .image-container-mobile{
        display: none;
    }

    .container .image-container .wrapper{
        height: 450px;
        width: 450px;
    }

    .container .image-container .image-header,
    .container .image-container-mobile .wrapper .image-header{
        height: inherit;
        width: inherit;
        background: url('../assets/image-product-1.jpg') no-repeat center;
        background-size: cover;
        border-radius: 10px;
        cursor: pointer;
    }

    .container .image-container .image-thumbnail{
        width: 450px;
        display: grid;
        grid-template-columns: repeat(4,auto);
        padding: 10px 0px;
        justify-content: space-between;
    }

    .image-container .image-thumbnail .thumbnail{
        height: 85px;
        width:85px;
        border: 1px solid transparent;
    }

    .image-container .image-thumbnail .thumbnail img{
       height: inherit;
       width: inherit;
       object-fit: cover;
       border-radius: 10px;
    }

    .image-container .image-thumbnail .thumbnail.current{
        border-color:var(--Orange);
        border-radius: 10px;
    }

    .image-container .image-thumbnail .thumbnail.current img{
        opacity: 0.5;
    }

    /* ITEM DESCRIPTION CONTAINER STYLES */
    .container .item-description-container{
        width: 100%;
        display: grid;
        grid-template-columns:auto;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .container .item-description-container .company{
        color: var(--Orange);
        text-transform: uppercase;
        font-size: 13px;
        letter-spacing: 2px;
    }

    .container .item-description-container .item-title{
        font-size: 25px;
    }
    
    .container .item-description-container .item-description{
        color: var(--Dark-grayish-blue);
        text-wrap:balance;
        font-size: 17px;
    }

    .container .item-description-container .discount{
        display: flex;
        gap: 30px;
    }

    .container .item-description-container .price{
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .container .item-description-container .price .discount{
        background-color: var(--Pale-orange);
        padding: 3px 10px;
        display: block;
        /* height: 100%; */
        color: var(--Orange);
        font-weight: 700;
        border-radius: 5px;
    }

    .container .item-description-container .old-price{
        color: var(--Grayish-blue);
        font-size: 25px;
        text-decoration: line-through;
    }

    .btn-container{
        width: 100%;
        height: 60px;
        display: grid;
        grid-template-columns: repeat(2,auto);
        column-gap: 20px;
    }

    .btn-container .range-btn{
        width: 100%;
        height: 100%;
        background-color: var(--Light-grayish-blue);
        display: grid;
        grid-template-columns: 5px 15px 5px;
        gap:10px;
        align-items: center;
        justify-content: space-around;
        user-select: none;
        border-radius: 10px;
    }

    .btn-container .range-btn .minus-btn{
        cursor: pointer;
        position: relative;
        top: -3px;
    }

    .btn-container .range-btn .minus-btn:active,
    .btn-container .range-btn .plus-btn:active{
       scale: 0.8;
    }
 
   
    .btn-container .range-btn .item-value{
        padding: 0px 10px;
    }

    .btn-container .range-btn .plus-btn{
        cursor: pointer;
    }

    /* ADD TO CART BTN */
    .btn-container .addToCart-btn{
        width: 100%;
        height: 100%;
    }

    .btn-container .addToCart-btn .btn-icon{
       margin-right:10px ;
    }

    .btn-container .addToCart-btn button.btn-add-cart{
        all: unset;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-weight: bold;
        color: var(--White);
        border-radius: 10px;
        background-color: var(--Orange);
        transition: 0.3s;
    }

    .btn-container .addToCart-btn button.btn-add-cart:hover{
        box-shadow: 0px 10px 20px rgba(228, 116, 12, 0.3);
    }

    /* PRODUCT SLIDESHOW */
    .product-slideshow{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        gap: 30px;
        display: none;
        user-select: none;
        transition: all 0.5s ease-in;
        z-index: 2;
    }

    .product-slideshow.active{
        display: flex;
    }

    .product-slideshow > .main-item {
        display: grid;
        grid-template-columns: auto;
        gap: 30px;
    }

    .product-slideshow > .main-item > .close-icon{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
    }

    .product-slideshow > .main-item > .close-icon > img{
        align-self: flex-end;
    }

      
    .container .image-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        /* background-color: blueviolet; */
    }

    .product-slideshow > .main-item > .image-container > .wrapper{
        height: 450px;
        width: 450px;
        position: relative;
    }

    .prev-icon{
       position: absolute;
       top: 50%;
       left: -25px;
       width: 50px;
       height: 50px;
       background-color: var(--White);
       display: flex;
       justify-content: center;
       align-items: center;
       border-radius: 50%;
       border: 1px solid rgba(0, 0, 0, 0.2);
       cursor: pointer;
    }

    .next-icon{
        position: absolute;
       top: 50%;
       right: -25px;
       width: 50px;
       height: 50px;
       background-color: var(--White);
       display: flex;
       justify-content: center;
       align-items: center;
       border-radius: 50%;
       border: 1px solid rgba(0, 0, 0, 0.2);
       cursor: pointer;
    }

    /* .product-slideshow > .main-item > .image-container > .wrapper > .prev-icon > img{
       height: 20px;
       width: 20px;
    } */

    .product-slideshow > .main-item > .image-container > .image-header{
        height: inherit;
        width: inherit;
       background: url('../assets/image-product-1.jpg') no-repeat center;
       background-size: cover;
       border-radius: 10px;
    }

    .product-slideshow > .main-item > .image-container > .image-thumbnail{
        width: 450px;
        display: grid;
        grid-template-columns: repeat(4,auto);
        padding: 10px 0px;
        justify-content: space-between;
        
    }

    .product-slideshow > .main-item > .image-container > .image-thumbnail > .thumbnail{
        height: 85px;
        width:85px;
        border: 1px solid transparent;
        cursor: pointer;
    }

    .product-slideshow > .main-item > .image-container > .image-thumbnail .thumbnail img{
       height: inherit;
       width: inherit;
       object-fit: cover;
       border-radius: 10px;
       cursor: pointer;
    }

    .product-slideshow > .main-item > .image-container > .image-thumbnail .thumbnail.current{
        border-color:var(--Orange);
        border-radius: 10px;
    }

    .product-slideshow > .main-item > .image-container > .image-thumbnail .thumbnail.current img{
       opacity: 1;
    }

    @media(width <= 768px){
        .container{
            grid-template-columns: 100%;
        }

        .container > .image-container{
            display: none;
        }

        .container .image-container-mobile{
            display: block;
        }

        .container .image-container-mobile .wrapper{
            width: 100%;
            height: 300px;
            position: relative;
        }

        .container .image-container-mobile .wrapper .image-header{
            border-radius: 0px;
        }
        
        .container .image-container-mobile .wrapper .prev-icon,
        .container .image-container-mobile .wrapper .next-icon{
            position: absolute;
            top: 50%;
            width: 50px;
            height: 50px;
            background-color: var(--White);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
        }

        .container .image-container-mobile .wrapper .prev-icon{
            left: 0px;
        }

        .container .image-container-mobile .wrapper .next-icon{
            right: 0px;
        }

        .container .item-description-container{
            padding: 20px 20px;
        }

        .container .item-description-container .item-title{
            font-size: 15px;
        }

        .container .item-description-container .pricing{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .container .item-description-container .item-description{
            font-size: 13px;
        }

        .btn-container{
            grid-template-columns: 100%;
            row-gap: 20px;
            height: 130px;
            margin-bottom: 50px;
        }
    }
</style>
  