<template>
  <header class="shadow">
    <nav class="navbar navbar-expand-lg bg-white">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" activeClass="" exactActiveClass="" to="/"
          ><strong>APPLICATION DE FACTURES</strong></RouterLink
        >

        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/">Accueil</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/bills">Factures</RouterLink>
          </li>
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/clients">Clients</RouterLink>
          </li> -->
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/clients">Clients</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
// imort du composant de lien depuis vue-router
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>

<style scoped></style>
