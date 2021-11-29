<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12" >
        <h2>Cadastro de Aluno</h2>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" >

        <form @submit.prevent="submit">

          <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              label="Nome"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              placeholder="Informe o nome completo"
          ></v-text-field>

          <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              placeholder="Informe apenas um e-mail"
          ></v-text-field>

          <v-text-field
              v-model="ra"
              label="RA"
              :disabled="true"
          ></v-text-field>

          <v-text-field
              v-model="cpf"
              label="CPF"
              :disabled="true"
          ></v-text-field>

          <v-btn @click="clear" class="mr-4">
            Cancelar
          </v-btn>

          <v-btn type="submit" :disabled="$v.$invalid">
            Salvar
          </v-btn>

        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
export default {

  validations: {
    name: { required, minLength: minLength(4) },
    email: { required, email },
  },

  data: () => ({
    id: '',
    name: '',
    ra: '',
    email: '',
    cpf: '',
  }),

  mounted() {
    this.loadData();
  },

  methods: {
    loadData(){
      this.$http.get('http://localhost:8081/api/v1/student/' + this.$route.params.id)
          .then(response => {
            let student = response.data;
            this.id = student.id;
            this.name = student.name;
            this.ra = student.ra;
            this.email = student.email;
            this.cpf = student.cpf;
          })
          .catch(function (error) {
            console.log(error);
          })
    },
    submit () {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        this.$http.put('http://localhost:8081/api/v1/student/' + this.id, {
          name: this.name,
          email: this.email
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    clear () {
      this.$v.$reset()
      this.id = ''
      this.name = ''
      this.ra = ''
      this.email = ''
      this.cpf = ''
      this.$router.push({ path: '/aluno'});
    },
  },

  computed: {
    nameErrors(){
      let errors = []
      if(!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('Informe o nome completo')
      !this.$v.name.minLength && errors.push('Precisa ter no mínimo 4 caracteres')
      return errors
    },
    emailErrors(){
      let errors = []
      if(!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('Informe o e-mail')
      !this.$v.email.email && errors.push('Precisa ser um e-mail válido')
      return errors
    },
  }
}
</script>