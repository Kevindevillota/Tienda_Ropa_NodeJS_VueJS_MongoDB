<template>
  <div>
  <Navigation/>
  <b-row>
    <b-col cols="12">
      <h2>
        Lista de Prendas
      </h2>
      <b-table striped hover :items="books" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" variant="outline-primary" @click.stop="buyBook(row.item)">Comprar</b-btn>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
  </div>
</template>

<script>
  import Navigation from './layout/Navigation'
  import axios from 'axios'

  export default {
    name: 'BookList',
    components: { Navigation },
    data () {
      return {
        fields: {
          isbn: { label: 'ID', sortable: true, 'class': 'text-center' },
          title: { label: 'ACCESORIO', sortable: true },
          author: { label: 'MARCA', sortable: true },
          published_year: { label: 'AÑO COLECCION', sortable: true },
          piece: { label: '# INVENTARIO'},
          price: {label: 'PRECIOS'},
          actions: { label: 'COMPRAR', 'class': 'text-center' }
        },
        books: [],
        users: [],
        errors: []
      }
    },
    created () {
      axios.get(`http://localhost:3000/book`)
        .then(response => {
          this.books = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods: {
      buyBook (book) {
        axios.get('http://localhost:3000/user')
          .then(response =>{
            this.users = response.data
          })
          .catch(e=>{
            this.errors.push(e)
          })

        var i=0;
        while (this.users[i].isLoggedIn ===false) {
          i++;
        }


        if(this.users[i].balance > book.price && book.piece > 0)
        {

          this.users[i].balance = this.users[i].balance - book.price;

          axios.post(`http://localhost:3000/book`, book)
            .then(response => {
            })
            .catch(e => {
              console.log(e)
              this.errors.push(e)
            })


          axios.put(`http://localhost:3000/user/` + this.users[i]._id, this.users[i])
            .then(response => {
            })
            .catch(e => {
              this.errors.push(e)
            })

        this.$router.push({
          name: 'BuyBook',
          params: { id: book._id, title: book.title, price: book.price,
            user_name: this.users[i].username, user_balance: this.users[i].balance
          }
        })
        }
      }
    }
  }
</script>
