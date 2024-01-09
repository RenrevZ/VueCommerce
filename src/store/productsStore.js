import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const products = defineStore('products',{
    state: () => ({
        productItems : null,
        productCategory: null,
        product:[],
        productSingleCategory:ref([])
    }),
    getters: {

    },
    actions: {
        async getProducts(){
               await axios
                     .get('https://dummyjson.com/products?limit=100')
                     .then(response => this.productItems = response.data.products)
                     .catch(error => console.error(error))
        },
        async getSingleProduct(id){
               await axios
                     .get(`https://dummyjson.com/products/${id}`)
                     .then(response => this.product = response.data)
                     .catch(error => console.error(error))
                     .finally(() => console.log('product:',this.product))
        },
        async getCategories(){
               await axios
                    .get('https://dummyjson.com/products/categories')
                    .then(response => this.productCategory = response.data)
                    .catch(error => console.error(error))
        },
        async getSingleCategories(category){
            await axios
                .get(`https://dummyjson.com/products/category/${category}`)
                .then(response => this.productSingleCategory = response.data.products)
                .catch(error => console.error(error))
        }
    }
})