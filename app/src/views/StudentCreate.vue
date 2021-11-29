<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12" >
        <h2>Cadastro de Aluno</h2>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12">

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
              :error-messages="raErrors"
              label="RA"
              @input="$v.ra.$touch()"
              @blur="$v.ra.$touch()"
              placeholder="Informe o registro acadêmico"
          ></v-text-field>

          <v-text-field
              v-model="cpf"
              :counter="11"
              :error-messages="cpfErrors"
              label="CPF"
              @input="$v.cpf.$touch()"
              @blur="$v.cpf.$touch()"
              maxlength="11"
              placeholder="Informe o número do documento"
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
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';
export default {

  validations: {
    name: { required, minLength: minLength(4) },
    ra: { required },
    email: { required, email },
    cpf: { required, minLength: minLength(11), maxLength: maxLength(11) },
  },

  data: () => ({
    name: '',
    ra: '',
    email: '',
    cpf: '',
  }),

  methods: {
    submit () {
      this.$v.$touch();
      if(!this.$v.$invalid){
        this.$http.post('http://localhost:8081/api/v1/student', {
          name: this.name,
          email: this.email,
          ra: this.ra,
          cpf: this.cpf
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
    raErrors(){
      let errors = []
      if(!this.$v.ra.$dirty) return errors;
      !this.$v.ra.required && errors.push('Informe o registro acadêmico')
      return errors
    },
    cpfErrors(){
      let errors = []
      if(!this.$v.cpf.$dirty) return errors;
      !this.$v.cpf.required && errors.push('Informe o número do CPF')
      !this.$v.cpf.minLength && errors.push('Precisa ter 11 caracteres')
      !this.$v.cpf.maxLength && errors.push('Precisa ter 11 caracteres')
      return errors
    },
  }
}
</script>