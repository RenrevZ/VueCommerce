<template>
    <div class="container" v-if="isTrue || isAlreadyAdded">
        <div class="alert">
            <div class="left" v-if="isAlreadyAdded">
                item is already on your cart
            </div>

            <div class="left" v-else>
                added to your cart  successfully
            </div>
        </div>
    </div>
    <div class="container">
        
    </div>
</template>
<script setup>
    import { defineProps} from 'vue';
    
    defineProps({
        message:String,
        isTrue:Boolean,
        isAlreadyAdded:Boolean
    })
</script>
<style scoped>
    .container{
        width:300px;
        /* position: absolute;
        right: 30px;
        top: 100px; */
        animation: slide 0.3s ease;
        z-index: 10000;
        margin-bottom: 10px;
    }

    .alert{
        width: 100%;
        background-color: #fdf2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        color:var(--Orange);
        border-radius: 10px;
        font-weight: 500;
    }

    @keyframes slide {
        from{
            right: 0;
        }to{
            right: 30px;
        }
    }
</style>