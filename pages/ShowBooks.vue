<template>
<div>
  <v-tabs
    v-model="active"
    color="cyan"
    dark
    slider-color="yellow"
  >
    <v-tab
      v-for="n in tabnum-1"
      :key="n"
      ripple
    >
      Code {{ n }}

    </v-tab>
    <v-tab
      v-on:click="tabnum += 1"
      :key="tabnum"
      ripple
    >
      newCode
    </v-tab>
    <v-tab-item
      v-for="n in tabnum"
      :key="n"
    >
      <v-text-field v-model="title" rows=1 label="Source File Name" placeholder="파일 이름을 입력하세요" :rules="[rules.required]"></v-text-field>
      <v-card flat>
        <v-textarea v-model="code" rows=12 label="Your Codes" placeholder="코드를 입력하세요" :rules="[rules.required]"></v-textarea>
      </v-card>
    </v-tab-item>
  </v-tabs>
  <v-textarea v-model="input" rows=3 label="Program Input" placeholder="Input 값을 입력하세요"></v-textarea>
  <div class="text-xs-center mt-3">
    <v-btn @click="run">Run code</v-btn>
  </div>
  <v-card height="200">
      <v-card-text>
          {{ result }}
      </v-card-text>
  </v-card>
<!--
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
    -->
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      active: null,
      text: null,
      tabnum: 1,
      title: "", username: "", code: "", input: "", // 폼에 전송되는 데이터
      selected: [],
      rules: {
        required: value => !!value || '비워둘 수 없습니다.',
      },
      headers: [
        { text: 'code', align: 'center',sortable: true, value: 'code' },
        { text: 'input', align: 'center',sortable: true, value: 'input' }
      ],
      submit: true,
      result: '결과 나와랏'
    }
  },
  watch: {
    submit: function (newSubmit) {
      this.result = '입력을 기다리는 중...'
      this.getResult()
    }
  },
  async asyncData({ $axios }) {
    const codes = await $axios.$get('/api/code');
    return {
      codes
    }
  },

  methods: {
    async run() {
      await this.$axios.post('/api/code', {
        title: this.title,
        username: this.$auth.$state.user.user.username, // 현재 로그인 세션의 유저 이름
        code: this.code,
        input: this.input,
      });
      this.submit = await false;
    },
    async getResult() {
      let response = await this.$axios.post('/api/compile',{
        title: this.title,
        code:this.code,
        input:this.input,
      });
      this.result = await response.data.output;
    }
  }
 }
</script>
