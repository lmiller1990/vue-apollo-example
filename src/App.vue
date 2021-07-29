<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Query />
  <Mutation />
</template>

<script lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import Query from './Query.vue'
import Mutation from './Mutation.vue'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

export default {
  components: { Query, Mutation },
  setup() {
    provide(DefaultApolloClient, apolloClient)
  }
}
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
