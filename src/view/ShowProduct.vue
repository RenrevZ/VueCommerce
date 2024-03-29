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
                
                <Thumbnail :changeHeaderPhoto="changeHeaderPhoto" 
                                    :images="product.images"
                                    :reference="image => Images.push(image)" />

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

            <Thumbnail :changeHeaderPhoto="changeHeaderPhotoMobile" 
                                :images="product.images" 
                                :reference="image => MobileImage.push(image)"/>
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
                <AlertMessage  :isTrue="isAdded" :isAlreadyAdded="isAlreadyAdded"/>
              <div class="cart-column">
                    <RangeBtn :itemValue="itemValue" 
                            @decrementValue="decrementValue" 
                            @incrementValue="incrementValue"/>

                    <div class="addToCart-btn">
                        <button class="btn-add-cart" @click="addToCart">
                            <img src="../assets/cart-white.svg" alt="" class="btn-icon">
                            Add to cart
                        </button>
                    </div>
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
                    <Thumbnail 
                              :changeHeaderPhoto="changeSlideShowHeaderPhoto" 
                              :images="product.images" 
                              :reference="image => SlideShowImages.push(image)"/>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { nextTick, onMounted, ref ,computed,watch } from 'vue'
    import { products } from '@/store/productsStore';
    import { useRoute } from 'vue-router';
    import Thumbnail from '@/components/Thumbnail.vue';
    import { carts } from '@/store/cartStore'
    import RangeBtn from '@/components/RangeBtn.vue';
    import AlertMessage from '@/components/AlertMessage';

    
    const router = useRoute()
    const useProduct = products()
    let itemValue = ref(1)
    const productSlideShowDiv  = ref(null)
    const product = ref('')
    const imageContainer = ref(null)
    const Images = ref([])
    const LastImageIndex = ref(0)
    const SlideShowImages = ref([])

    // RANGE BTN FUNCTION
    const incrementValue = () => {
        itemValue.value++
    }

    const decrementValue = () => {
        if(itemValue.value > 1){
            itemValue.value--
        }
    }

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

    const changeThumbnailPhoto = (container) => {
        container.value[LastImageIndex.value].classList.remove('current')
        container.value[currentImageIndex.value].classList.add('current')
    }

    const changeHeaderPhoto = async (index) => {
        currentImageIndex.value = index

        await nextTick()


        changeThumbnailPhoto(Images)
        changeThumbnailPhoto(SlideShowImages)
        changeContainerImage(imageContainer,product.value.images[index])
        changeContainerImage(slideShowImageHeader,product.value.images[index])

        LastImageIndex.value = index
    }

    // PRODUCT SLIDESHOW
    const slideShowImageHeader = ref(null)
    const currentImageIndex = ref(0)
    const imageLength = ref(0)
   

    const changeSlideShowHeaderPhoto = async (index) => {
        await nextTick()

        changeThumbnailPhoto(Images)
        changeThumbnailPhoto(SlideShowImages)
        changeContainerImage(slideShowImageHeader,product.value.images[index])
        changeContainerImage(imageContainer,product.value.images[index])

        LastImageIndex.value = index
    }

    const prevImage = () =>{
       if (currentImageIndex.value > 0) {
            currentImageIndex.value--;
        }

        changeThumbnailPhoto(Images)
        changeThumbnailPhoto(SlideShowImages)
        changeContainerImage(slideShowImageHeader,product.value.images[currentImageIndex.value])
        changeContainerImage(imageContainer,product.value.images[currentImageIndex.value])

        LastImageIndex.value = currentImageIndex.value
    }

    const nextImage = () =>{
        if(currentImageIndex.value < imageLength.value -1){
            currentImageIndex.value++
        }

        changeThumbnailPhoto(Images)
        changeThumbnailPhoto(SlideShowImages)
        changeContainerImage(slideShowImageHeader,product.value.images[currentImageIndex.value])
        changeContainerImage(imageContainer,product.value.images[currentImageIndex.value])

        LastImageIndex.value = currentImageIndex.value
    }

    // MOBILE VIEW
    const mobileImageContainer = ref('')
    const MobileImage = ref([])

    const mobilePrev = () => {
        if (currentImageIndex.value > 0) {
            currentImageIndex.value--;
        }

        MobileImage.value[LastImageIndex.value].classList.remove('current')
        MobileImage.value[currentImageIndex.value].classList.add('current')
        changeContainerImage(mobileImageContainer,product.value.images[currentImageIndex.value])
        LastImageIndex.value = currentImageIndex.value
    }

    const mobileNext = () => {
        if(currentImageIndex.value < imageLength.value -1){
            currentImageIndex.value++
        }

        MobileImage.value[LastImageIndex.value].classList.remove('current')
        MobileImage.value[currentImageIndex.value].classList.add('current')

        changeContainerImage(mobileImageContainer,product.value.images[currentImageIndex.value])

        LastImageIndex.value = currentImageIndex.value
    }

    const changeHeaderPhotoMobile = async (index) => {
        currentImageIndex.value = index
        await nextTick()

        MobileImage.value[LastImageIndex.value].classList.remove('current')
        MobileImage.value[index].classList.add('current')

        changeContainerImage(mobileImageContainer,product.value.images[index])

        LastImageIndex.value = currentImageIndex.value
    }

    // CART
    const useCart = carts()
    let isAdded = computed(() => useCart.cartadded)
    let isAlreadyAdded = computed(() => useCart.cartAlreadyAdded)
    
    const addToCart = async () => {
        const cartItemsIdArray = computed(() => useCart.cartItemsIdArray)
        const isAlreadyOnCart = cartItemsIdArray.value.some(item => item === router.params.id)

        const formData = ref({
            merge: true,
            userId:1,
            products: [
                {
                    id:router.params.id,
                    quantity: itemValue.value,
                }
            ]
        })

        if(!isAlreadyOnCart){
            await useCart.addToCart(formData.value)
            cartItemsIdArray.value.push(router.params.id)
        }else{
            useCart.cartAlreadyAdded = true
        }
    }

    watch(isAdded,() => setTimeout(() => {
        console.log('watched')
        useCart.cartadded = false
    },3000))

    watch(isAlreadyAdded,() => setTimeout(() => {
        console.log('watched')
        useCart.cartAlreadyAdded = false
    },3000))


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

        await nextTick()

        Images.value[0].classList.add('current')
        MobileImage.value[0].classList.add('current')

        SlideShowImages.value[0].classList.add('current')
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


    .btn-container .cart-column{
        width: 100%;
        height: 60px;
        display: grid;
        grid-template-columns: repeat(2,auto);
        column-gap: 20px;
    }

   

    /* ADD TO CART BTN */
    .btn-container .cart-column .addToCart-btn{
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .btn-container .cart-column .addToCart-btn .btn-icon{
       margin-right:10px ;
    }

    .btn-container .cart-column .addToCart-btn button.btn-add-cart{
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

    .btn-container .cart-column .addToCart-btn button.btn-add-cart:hover{
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

        .btn-container .cart-column{
            grid-template-columns: 100%;
            row-gap: 20px;
            height: 130px;
            margin-bottom: 50px;
        }
    }
</style>
  