<template>
    <div class="container" v-if="isTrue || isAlreadyAdded">
        <div class="alert">
            <div class="left" v-if="isAlreadyAdded">
                item already on cart
            </div>

            <div class="left" v-else>
                added to your cart  successfully
            </div>
            
            <div class="right">
                <img src="../assets/icon-close.svg" alt="">
            </div>
        </div>
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
        width: 350px;
        position: absolute;
        right: 30px;
        top: 100px;
        animation: slide 0.3s ease;
        z-index: 10000;
    }

    .alert{
        width: 100%;
        background-color: #2eb886;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        color:var(--White);
        font-weight: 700;
    }

    .alert .right{
        align-self: center;
        height: 14px;
    }

    @keyframes slide {
        from{
            right: 0;
        }to{
            right: 30px;
        }
    }
</style>