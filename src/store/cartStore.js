import axios from 'axios'
import { defineStore } from 'pinia'

export const carts = defineStore('carts',{
    state: () => ({
      cartItems:[],
      cartQuantity:0
    }),
    getters: {

    },
    actions: {
        async addToCart(formData){
               await axios
                     .post('https://dummyjson.com/carts/add',
                             formData,
                      {'Content-Type': 'application/json' })
                     .then(response => {
                        console.log(response.data)
                        this.cartItems.push(response.data)
                     })
                     .catch(error => console.error(error.message))
                     .finally(() => this.cartQuantity++)
        },
        RemoveCartItem(index){
            console.log('Removing item at index:', index);
            this.cartItems = this.cartItems.filter((_, i) => i !== index);
            console.log('Updated cartItems:', this.cartItems);
        }
    }
})