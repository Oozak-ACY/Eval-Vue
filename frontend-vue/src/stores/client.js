
import { defineStore } from 'pinia'
// on a installé la librairie uuid avec npm i uuid afin de pouvoir l'utiliser ici
export const useClientStore = defineStore('client', {
  state: () => ({
    clients: null,
    client: null
  }),
  getters: {},
  actions: {

    async getAllClients() {
      const response = await this.$http.get('/clients')
      this.clients = response.data
    },

    async setClient(id) {

      const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Ajout de 1 car les mois sont indexés à partir de 0
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
      };

      if (id == '-1') {
        this.client = {
          id: -1,
          lastName: '',
          firstName: '',
          addDate: getCurrentDate(),
          companyName: '',
          country: '',
          phoneNumber: '',
          position: '',
          email: '',
          address1: '',
          address2: '',
          zipCode: '',
          city: '',
        }
      } else {
        // si je modifie une client, je fais un appel à l"API pour récupérer les données :
        const response = await this.$http.get('/clients/' + id)
        this.client = response.data
      }
    },
    // recherche la facture correspondante dans le store, et enregistre les modifications
    async onUpdateClient(client) {
      const response = await this.$http.patch('/clients/' + client.id, client)
      console.log(response.data)
      // je vidange la donnée d'édition d'une client
      this.client = null
      await this.getAllClients()
    },

    // Créer une nouvelle facture
    async onCreateClient(client) {
      // j'ajoute une nouvelle facture dans le tableau des clients, en ajoutant au passage un id unique grâce à la méthode importée uuidv4() depuis le package uuid
      const response = await this.$http.post('/clients', client)
      console.log(response.data)
      this.client = null
      await this.getAllClients()
    },

    async onDeleteClient(client) {
      
      // on recherche l'index de la facture à supprimer, et on retourne un nouveau tableau de clients sans celle-ci
      const response = await this.$http.delete('/clients/' + client.id)
      console.log(response.data)
      // pour raffraichir la liste des factures, je relance la méthode getAllClients()
      await this.getAllClients()
    }
  }
})
