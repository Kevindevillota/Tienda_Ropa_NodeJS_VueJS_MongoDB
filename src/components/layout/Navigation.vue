<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="#">Menu</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button type="button" class="mr-sm-2" variant="outline-warning" @click.stop="createBook()">Agregar Prenda</b-button>
        <b-button type="button" class="mr-sm-2" variant="outline-warning" @click.stop="modifyUser()">Modificar Usuario</b-button>
      <b-button type="button" class="my-2 my-sm-0" variant="outline-danger" @click.stop="logout()">Logout</b-button>
      </b-navbar-nav>
    </b-navbar>
    <br>
  </div>
</template>

<script>

    import axios from 'axios';

    export default {
        name: "Navigation",
      data() {
        return {
          users: []
        }
      },
      methods: {
        createBook () {
          axios.put('http://localhost:3000/book')
            .catch(e =>{
              this.errors.push(e);
            })
          this.$router.push({
            name: 'CreateBook'
          })
        },
        logout () {
          axios.put('http://localhost:3000/user')
            .catch(e =>{
              this.errors.push(e);
            })
          this.$router.push({
            name: 'Login'
          })
        },
        modifyUser(){
          axios.get(`http://localhost:3000/user`)
            .then(response => {
              this.users = response.data;
            })
            .catch(e => {
              this.errors.push(e)
            })

          var i=0;
          while (this.users[i].isLoggedIn ===false) {
            i++;
          }

          this.$router.push({
            name: 'ModifyUser',
            params: { id: this.users[i]._id }
          })
        }
      }
    }
</script>

<style scoped>

</style>
