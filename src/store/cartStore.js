import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const carts = defineStore('carts',{
    state: () => ({
      cartItems:ref([]),
      cartQuantity:ref(0),
      cartadded:ref(false),
      cartAlreadyAdded:ref(false),
      OrderTotal:ref(0),
      cartItemsIdArray:ref([])
    }), 
    getters: {
        sumOrderTotal(state){
            const orderTotalArray = state.cartItems.flatMap(item =>
                item.products.map(price => price.total)
              );
          
              // Sum the order total array
              const sumTotal = orderTotalArray.reduce((sum, total) => sum + total, 0);
          
              return sumTotal;
        }
    },
    actions: {
        async addToCart(formData){
               await axios
                     .post('https://dummyjson.com/carts/add',
                             formData,
                      {'Content-Type': 'application/json' })
                     .then(response => {
                        this.cartItems.push(response.data)
                        this.cartadded = true
                     })
                     .catch(error => console.error(error.message))
                     .finally(() => this.cartQuantity++)
        },
        async RemoveCartItem(index){
            this.cartItems = this.cartItems.filter((_, i) => i !== index);
            this.cartItemsIdArray = this.cartItems.filter((_, i) => i !== index);
            this.cartQuantity--
        }
    }
})