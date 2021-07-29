<template>
  <div v-if="books">
    <div v-for="book of books">{{ book.title }}</div>
  </div>
</template>

<script lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable'
import { watch, computed } from 'vue'
import gql from 'graphql-tag'


export default {
  setup() {
    const { result: booksResult, onResult } = useQuery(gql`
      query getUsers {
        books {
          title
          author
        }
      }
    `, null, {
      fetchPolicy: 'no-cache',
      // Why do I need this?
      // Without it, the query won't re-run. I guess that make sense -
      // how is it supposed to know??
      // pollInterval: 100
    })
    
    // I also tried updating the cache, but no luck. It won't reactively update! WTF!!
    /*
    update: (cache, { data: { addBook } }) => {
        const { books } = cache.readQuery({ query: bookQuery }) as any
        const newData =  [...books, addBook]
        console.log({ newData })
        cache.writeQuery({ query: bookQuery, data: newData });
    }
    */

    const books = useResult(booksResult, data => data.books)

    return {
      books
    }
  }
}
</script>
