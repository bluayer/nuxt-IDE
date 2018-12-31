<template>
  <div>
    <v-btn @click="addNewCode">add New code</v-btn>
    <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    >
      <v-tab
        v-for="n in localCodes"
        :key="n.index"
        ripple
      >
        {{ n.title }}
      </v-tab>
      <v-tab-item
        v-for="n in localCodes"
        :key="n.index"
      >
        <v-text-field v-model="n.title" rows=1 label="Source File Name" placeholder="파일 이름을 입력하세요" :rules="[rules.required]"></v-text-field>
        <v-card flat>
          <v-textarea v-model="n.code" rows=15 label="Your Codes" placeholder="코드를 입력하세요" :rules="[rules.required]"></v-textarea>
        </v-card>
        <v-textarea v-model="n.input" rows=3 label="Program Input" placeholder="Input 값을 입력하세요"></v-textarea>
        <div class="text-xs-center mt-3">
          <v-btn @click="run(n.title,n.input,n.code)">Run code</v-btn>
        </div>
        <v-card height="200">
            <v-card-text>
                {{ result }}
            </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>
    <v-btn @click="debug">Debug btn</v-btn>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      active: null,
      text: null,
      newCnt: 0,
      title: "", username: "", code: "", input: "", // 폼에 전송되는 데이터
      selected: [],
      rules: {
          required: value => !!value || '비워둘 수 없습니다.',
      },
      headers: [
        { text: 'code', align: 'center',sortable: true, value: 'code' },
        { text: 'input', align: 'center',sortable: true, value: 'input' }
      ],
      result:'결과 나와랏'
    }
  },
  async asyncData({ $axios }) {
    const codes = await $axios.$get('/api/code');
    let localCodes = codes;
    return {
      codes,
      localCodes
    }
  },

  methods: {
    async run (title, input, code) {
      await this.$axios.post('/api/code', {
        title: title,
        username: this.$auth.$state.user.user.username, // 현재 로그인 세션의 유저 이름
        code: code,
        input: input,
      })
    },
    addNewCode () {

      this.localCodes.push( { title: "new Code "+this.newCnt, username: this.$auth.$state.user.user.username, code:"", input:""} );
      this.newCnt++;
    },
    debug () {
      console.log(this.localCodes);
    }
  }
 }
</script>
