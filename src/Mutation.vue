<template>
  <button @click="mutate()">add book</button>
</template>

<script lang="ts">
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { watch } from 'vue'
import gql from 'graphql-tag'


export default {
  setup() {
    const { mutate, onDone } = useMutation(gql`
      mutation AddBook($title: String!) {
        addBook(title: $title) {
          title
          author
        }
      }
    `, {
      variables: {
        title: "New one"
      }
    })

    onDone(res => console.log(res))

    return {
      mutate
    }
  }
}
</script>

