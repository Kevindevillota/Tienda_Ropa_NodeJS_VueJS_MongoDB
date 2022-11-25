<template>
<div>
  <Navigation/>
    <div>
      <b-card-group deck>
        <b-card
          border-variant="success"
          header="Sikeres vasarlas"
          header-bg-variant="success"
          header-text-variant="white"
          align="center"
        >
          <b-card-text>
            Tipo de Prenda: {{book_title }} <br/>
            Costo: {{book_price}} <br/>
            Usuario: {{user_name}} <br/>
            Saldo: {{user_balance}} <br/>
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
</div>
</template>

<script>
  import axios from 'axios'
  import Navigation from "./layout/Navigation";

    export default {
        name: "BuyBook",
      data () {
        return {
          book_id: this.$route.params.id,
          book_title: this.$route.params.title,
          book_price: this.$route.params.price,
          user_name: this.$route.params.user_name,
          user_balance: this.$route.params.user_balance
        }
      },
      components: {Navigation}
    }

</script>

<style scoped>

</style>
