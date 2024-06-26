<template>
  <main>
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 class="h1"><i class="fa-solid fa-angle-down me-2" />Dashbord</h1>
      </div>
      <div class="col d-flex flex-column justify-content-end text-end">
        <div class="mt-auto">
          <router-link to="/edit-bill/-1" class="btn btn-outline-primary btn-sm mx-2">
            <i class="fa-solid fa-plus-circle me-2"></i>
            Ajouter une facture
          </router-link>
          <router-link to="/edit-client/-1" class="btn btn-outline-primary btn-sm">
            <i class="fa-solid fa-plus-circle me-2"></i>
            Ajouter un client
          </router-link>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 ">
        <div class="shadow-sm border p-2" id="graphique">
            <h2 class="mx-4">{{ billsCount }} FACTURES</h2>
            <DonutChart v-if="billsTotalTTC" :totalTTC="billsTotalTTC" :totalPaid="billsTotalPaid" />
        </div>
      </div>
      <div class="col-md-2"></div>
      <div class="col-md-6">
        <div class="shadow-sm border mb-5 p-2">
          <h4>Factures en cours</h4>
          <TableList class="table-responsive">
            <BillTableRow
              v-for="bill in bills"
              :key="bill.id"
              :bill="bill"
              @edit="onEditBill($event)"
              @delete="onDeleteBill($event)"
            />
          </TableList>
        </div>
        <div class="shadow-sm border p-2">
          <h4>Clients</h4>
          <TableList class="table-responsive">
            <template #thead>
              <th>Nom</th>
              <th>Entreprise</th>
              <th>Date d'ajout</th>
              <th class="text-end">Actions</th>
            </template>
            <ClientTableRow
              v-for="client in clients"
              :key="client.id"
              :client="client"
              @edit="onEditClient($event)"
              @delete="onDeleteClient($event)"
            />
          </TableList>
        </div>
      </div>
    </div>
  </main>

</template>

<script>
import BillTableRow from '@/components/TableList/BillTableRow.vue'
import ClientTableRow from '@/components/TableList/ClientTableRow.vue'
import TableList from '@/components/TableList/TableList.vue'
import DonutChart from '@/components/DonutChart.vue';
import { useBillStore } from '@/stores/bill.js'
import { useClientStore } from '@/stores/client.js'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TableList,
    BillTableRow,
    ClientTableRow,
    DonutChart
  },
  computed: {
    ...mapState(useBillStore, ['bills','billsCount','billsTotalPaid', 'billsTotalTTC']),
    ...mapState(useClientStore, ['clients']),
  },

  async mounted() {
    await this.getAllBills(),
    await this.getAllClients(),
    await this.getBillsCount(),
    await this.getTotalPaid(),
    await this.getTotalTTC()
  },

  methods: {
    ...mapActions(useBillStore, ['onDeleteBill', 'getAllBills', 'getBillsCount', 'getTotalPaid', 'getTotalTTC']),
    ...mapActions(useClientStore, ['onDeleteClient', 'getAllClients']),
    onEditBill(bill) {
      this.$router.push({
        name: 'edit-bill',
        params: {
          id: bill.id
        }
      })
      
    },
    
    onEditClient(client) {
      console.log('edit client with id: ', client.id)

      this.$router.push({
        name: 'edit-client',
        params: {
          id: client.id
        }
      })

    }
  }
}
</script>
