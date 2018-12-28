<template>
  <v-layout>
    <v-flex text-xs-center>
      {{$auth.$state.user.user.username}}
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: ['auth'],
}
</script>
