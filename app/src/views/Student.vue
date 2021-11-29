<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12" >
        <h2>Consulta de Alunos</h2>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Digite sua busca"
            single-line
            hide-details
        ></v-text-field>
      </v-col>
      <v-col align="right">
        <v-btn
            color="primary"
            to="/aluno/criar"
        >
          Cadastrar Aluno
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
            :headers="headers"
            :items="students"
            :search="search"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <p class="mt-4">Nenhum aluno cadastrado</p>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card>
        <v-card-title class="text-h6">
          Confirma a exclusão deste aluno?
        </v-card-title>
        <v-card-text align="center">
          <h5 v-text="editedName"></h5>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-2" text @click="closeDelete">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
        v-model="snack"
        :timeout="3000"
        :color="snackColor"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
            v-bind="attrs"
            text
            @click="snack = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script>
export default {
  mounted() {
    this.loadData();
  },

  data () {
    return {
      search: '',
      editedIndex: -1,
      editedId: -1,
      editedName: '',
      dialogDelete: false,
      headers: [
        {
          text: 'Registro Acadêmico',
          value: 'ra'
        },
        {
          text: 'Nome',
          align: 'start',
          value: 'name',
        },

        {
          text: 'CPF',
          value: 'cpf'
        },
        {
          text: 'Ações',
          value: 'actions',
          sortable: false,
          align: 'end'
        },
      ],
      students: [],
      snack: false,
      snackColor: '',
      snackText: '',
    }
  },

  methods: {
    loadData(){
      this.$http.get('http://localhost:8081/api/v1/student')
          .then(response => {
            this.students = response.data;
          })
          .catch(function (error) {
            console.log(error);
          })
    },
    editItem(item){
      this.$router.push({path: '/aluno/editar/' + item.id})
    },
    deleteItem(item){
      this.editedName = item.name
      this.editedId = item.id
      this.editedIndex = this.students.indexOf(item)
      this.dialogDelete = true
    },
    deleteItemConfirm(){
      this.$http.delete('http://localhost:8081/api/v1/student/' + this.editedId)
          .then(() => {
            this.students = [];
            this.loadData();
            this.snackSuccess();
          })
          .catch(function (error) {
            this.snackError();
            console.log(error);
          })
          .then(() => {
            this.closeDelete();
          });
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
        this.editedId = -1
        this.editedName = ''
      })
    },
    snackSuccess() {
      this.snack = true;
      this.snackColor = 'success';
      this.snackText = 'Excluído com sucesso!';
    },
    snackError() {
      this.snack = true;
      this.snackColor = 'error';
      this.snackText = 'Não foi possível realizar a exclusão.';
    },
  },
}
</script>