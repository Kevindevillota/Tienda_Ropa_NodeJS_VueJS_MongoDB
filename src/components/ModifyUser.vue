<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Datos de Usuario

      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal1"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Usuario">
          <b-form-input id="username" :state="state" v-model.trim="user.username"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal2"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Password">
          <b-form-input id="pw" :state="state" v-model.trim="user.password"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal3"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="E-mail">
          <b-form-input id="email" :state="state" v-model.trim="user.email"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal3"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Edad">
          <b-form-input id="age" :state="state" v-model.trim="user.age"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal4"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Direccion">
          <b-form-input id="address" :state="state" v-model.trim="user.address"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal5"
                      horizontal
                      :label-cols="4"
                      breakpoint="md"
                      label="Balance">
          <b-form-input id="balance" :state="state" v-model.trim="user.balance"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Tendencia</b-button>
        <b-button type="button" variant="info" @click.stop="back()">Atras</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

  import axios from 'axios'

  export default {
    name: 'ModifyUser',
    data () {
      return {
        user: {}
      }
    },
    created () {
      axios.get(`http://localhost:3000/user/` + this.$route.params.id)
        .then(response => {
          this.user = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        axios.put(`http://localhost:3000/user/` + this.$route.params.id, this.user)
          .then(response => {
            this.$router.push({
              name: 'ModifyUser',
              params: { id: this.$route.params.id }
            })
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
      back(){
        this.$router.push({
          name: 'BookList'
        })
      }
    }
  }
</script>

<style scoped>

</style>
