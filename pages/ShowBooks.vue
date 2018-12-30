<template>
<div>
  <v-data-table v-model="selected" :headers="headers" :items="codes"
    item-key="isbn" select-all class="elevation-1">
    <template slot="items" slot-scope="props">
      <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
      <td class="text-xs-center">{{props.item.title}}</td>
      <td class="text-xs-center">{{props.item.username}}</td>
      <td class="text-xs-center">{{props.item.code}}</td>
      <td class="text-xs-center">{{props.item.input}}</td>
      <td class="text-xs-center">{{props.item.updated_date}}</td>
    </template>
  </v-data-table>

   <v-form>
      <v-text-field
        v-model="title"
        label="title"
        required
      ></v-text-field>
      <v-flex xs6>
        <v-textarea
          solo
          v-model="code"
          name="input-7-4"
          label="code"
          required
        ></v-textarea>
      </v-flex>
      <v-text-field
        v-model="input"
        label="input"
        required
      ></v-text-field>
      <v-btn
        @click="submit"
      >
        추가
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {

    return {
      title: "", username: "", code: "", input: "", // 폼에 전송되는 데이터
      selected: [],
      headers: [
        { text: 'code', align: 'center',sortable: true, value: 'code' },
        { text: 'input', align: 'center',sortable: true, value: 'input' }
      ]
    }
  },
  async asyncData({ $axios }) {
    const codes = await $axios.$get('/api/code');
    return {
      codes
    }
  },

  methods: {
    async submit () {
      await this.$axios.post('/api/code', {
        title: this.title,
        username: this.$auth.$state.user.user.username, // 현재 로그인 세션의 유저 이름
        code: this.code,
        input: this.input,
      }).then(
      this.$axios.post('/api/compile',{
        title: this.title,
        code:this.code,
        input:this.input,
      }).then((response)=>{
        console.log(response.data.output); // compile 후 반환되는 result = response.data.output
      }))
    }
  }
 }
</script>
