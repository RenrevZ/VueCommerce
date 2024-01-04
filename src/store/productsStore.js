import axios from 'axios'
import { defineStore } from 'pinia'

export const products = defineStore('products',{
    state: () => ({
        productItems : null,
        productCategory: null
    }),
    getters: {

    },
    actions: {
        async getProducts(){
               await axios
                     .get('https://dummyjson.com/products')
                     .then(response => this.productItems = response.data.products)
                     .catch(error => console.error(error))
                     .finally(() => console.log(this.productItems))
        },
        async getCategories(){
               await axios
                    .get('https://dummyjson.com/products/categories')
                    .then(response => this.productCategory = response.data)
                    .catch(error => console.error(error))
                    .finally(() => console.log(this.productCategory))
        }
    }
})