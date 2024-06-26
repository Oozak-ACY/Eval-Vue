<template>
  <div v-if="client">
    <!-- titre et bouton ajouter -->
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 v-if="isNewClient" class="h3">
          <i class="fa-solid fa-angle-down me-2" />Créer un client
        </h1>
        <h1 v-else class="h3"><i class="fa-solid fa-angle-down me-2" />Editer un client</h1>
      </div>
      <div v-if="!isNewClient" class="col text-end">
        <button @click="deleteClient(client)" class="btn btn-outline-danger">
          <i class="fa-solid fa-trash me-2" />
          Supprimer le client
        </button>
      </div>
    </div>

    <h4 class="h4 my-3 text-secondary">Contact :</h4>
    <div class="row">
      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="clientlastname"
            id="clientlastname"
            v-model="client.lastName"
            class="form-control"
            placeholder="Nom de famille"
            :class="{ 'is-invalid': !client.lastName}"
          />
          <label for="clientlastname" class="form-label">Nom</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="clientPosition"
            id="clientPosition"
            class="form-control"
            placeholder="Fonction"
            v-model="client.position"
            :class="{ 'is-invalid': !client.position }"
          />
          <label for="clientPosition" class="form-label">Fonction</label>
        </div>
        
      </div>
      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="clientfirstname"
            id="clientfirstname"
            v-model="client.firstName"
            class="form-control"
            placeholder="Prénom"
            :class="{ 'is-invalid': !client.firstName}"
          />
          <label for="clientfirstname" class="form-label">Prénom</label>
        </div>
        
        <div class="form-floating mb-3">
          <input
            type="text"
            name="clientphonenumber"
            id="clientphonenumber"
            v-model="client.phoneNumber"
            class="form-control"
            placeholder="Numéro de téléphone"
            :class="{ 'is-invalid': !client.phoneNumber}"
          />
          <label for="clientphonenumber" class="form-label">Téléphone</label>
        </div>
        
      </div>
      <div class="col-md-4">
        <div class="form-floating mb-3" v-if="!isNewClient">
          <input
            disabled
            type="date"
            name="date"
            id="date"
            class="form-control"
            placeholder="Date d'ajout"
            format="yyyy-MM-dd"
            v-model="client.addDate"
            :class="{ 'is-invalid': !client.addDate }"
          />
          <label for="date" class="form-label">Date d'ajout</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="clientemail"
            id="clientemail"
            v-model="client.email"
            class="form-control"
            placeholder="Email"
            :class="{ 'is-invalid': !client.email}"
          />
          <label for="clientemail" class="form-label">Email</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="clientcompany"
            id="clientcompany"
            v-model="client.companyName"
            class="form-control"
            placeholder="Entreprise"
            :class="{ 'is-invalid': !client.companyName}"
          />
          <label for="clientcompany" class="form-label">Entreprise</label>
        </div>
      </div>
      
    </div>

    <h4 class="h4 my-3 text-secondary">Coordonnées :</h4>
    <div class="row">
      <div class="col-md-8">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="clientaddress1"
            id="clientaddress1"
            v-model="client.address1"
            class="form-control"
            placeholder="adresse n°1"
            :class="{ 'is-invalid': !client.address1}"
          />
          <label for="clientaddress1" class="form-label">Adresse 1</label>
        </div>
      </div>
      <div class="col-md-8">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="clientaddress2"
            id="clientaddress2"
            v-model="client.address2"
            class="form-control"
            placeholder="adresse n°2"
          />
          <label for="clientaddress2" class="form-label">Adresse 2</label>
        </div>
      </div>
      
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="clientzipcode"
            id="clientzipcode"
            v-model="client.zipCode"
            class="form-control"
            placeholder="Code postal"
            :class="{ 'is-invalid': !client.zipCode}"
          />
          <label for="clientzipcode" class="form-label">Code Postal</label>
        </div>
        <div class="form-floating mb-3">
          <select
            type="text"
            name="country"
            id="country"
            class="form-control"
            placeholder="Pays"
            v-model="client.country"
            :class="{ 'is-invalid': !client.country }"
          >
            <option value="">Veuillez choisir un pays</option>
            <option v-for="(country,index) in countries" :value="country" :key="index + country">
              {{ country }}
            </option>
          </select>
          <label for="country" class="form-label">Pays</label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="clientcity"
            id="clientcity"
            v-model="client.city"
            class="form-control"
            placeholder="Ville"
            :class="{ 'is-invalid': !client.city}"
          />
          <label for="clientcity" class="form-label">Ville</label>
        </div>
      </div>
    </div>

    <p class="text-end">
      <button
        @click="submitForm()"
        :disabled="formInvalid"
        class="btn btn-outline-primary btn-lg px-5"
      >
        <i class="fa-solid fa-save me-2" />Enregistrer
      </button>
    </p>
    <!-- 1ère manière de récupérer des paramètres de la route : -->
    <pre>{{ client }}</pre>
  </div>
</template>

<script>
import { countries } from '@/seeds/countries';
// on importe le store
import { useClientStore } from '@/stores/client.js'
// on importe les actions de pinia
import { mapActions, mapWritableState } from 'pinia'



export default {
  components: {

  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      countries
    }
  },
  computed: {
    ...mapWritableState(useClientStore, ['client']),

    // test si c'est une nouvelle facture ou si on édite une facture existante
    isNewClient() {
      return this.id == '-1'
    },

    formInvalid() {
      return (
        !this.client ||
        !this.client.firstName ||
        !this.client.lastName ||
        !this.client.addDate ||
        !this.client.country ||
        !this.client.city ||
        !this.client.zipCode ||
        !this.client.phoneNumber ||
        !this.client.email ||
        !this.client.address1 ||
        !this.client.position ||
        !this.client.companyName
      )
    },
  },
  mounted() {
    // charge les données de la facture à éditer
    this.setClient(this.id)
  },
  methods: {
    // on déclare l'action ou les actions du store que l'on souhaite utiliser
    ...mapActions(useClientStore, ['onDeleteClient', 'onUpdateClient', 'onCreateClient', 'setClient']),


    // soumission du formulaire d'édition
    submitForm() {
      if (this.isNewClient) {
        this.onCreateClient(this.client)
      } else {
        // j'appelle la fonction pour mettre à jour une facture depuis le store
        this.onUpdateClient(this.client)
      }

      // puis je redirige l'utilisateur vers la page de liste
      this.$router.push({ path: '/clients' })
    },

    // suppression de la client
    deleteClient(client) {
      // j'appelle la fonction qui vient du store stores/clients.js onDeleteClient() déclarée dans les actions du store
      this.onDeleteClient(client)
      // puis je redirige l'utilisateur vers la page de liste
      this.$router.push({ path: '/clients' })
    }
  },
  watch: {
    
  }
}
</script>

<style scoped>
.table .th-actions {
  width: 10%;
}
.table .th-prestation {
  width: 44%;
}
.table .th-quantite {
  width: 10%;
}
.table .th-montant-ht,
.table .th-montant-total {
  width: 18%;
}
</style>
