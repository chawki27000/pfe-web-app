<template>
<div>
  <div class="row btns">
    <a @click="exam">Exam <i class="ion-android-refresh"></i></a>
    <a @click="stable">Stable <i class="ion-android-happy"></i></a>
  </div>
  <div class="row">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Etat</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="res in result" :key="res._id">
          <td>{{res.createdAt}}</td>
          <td>
              <span class="fail" v-if="res.feedback == 'fail'">fail</span>
              <span class="improve" v-if="res.feedback == 'improve'">improve</span>
              <span class="complication" v-if="res.feedback == 'complication'">complication</span>
          </td>
          <td><a @click="detail(res._id)"><i class="ion-ios-pulse-strong"></i></a></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      detail_id: '',
      result: [],
    }
  },
  created() {
    this.detail_id = localStorage.getItem('detail_id')
    this.getRes(this.detail_id)
  },
  mounted() {

  },
  methods: {
    getRes(id) {
      var resource = this.$resource('result/query{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.result = response.body.data

      })
    },
    detail(id) {
      // Save child_id in localStorage
      localStorage.setItem('detail_id', id)
      // Redirect
      this.$router.push('/child')
    },
    exam() {
      // Save data in localStorage
      localStorage.setItem('child_id', this.result[0].child)
      localStorage.setItem('exam', 1)
      // Redirect
      this.$router.push({
        name: 'Clinical'
      })
    },
    stable() {
      // Redirect
      this.$router.push({
        name: 'Stable'
      })
    },
  }
}
</script>

<style lang="css">
.btns {
    margin: 20px 0;
    text-align: center;
    font-size: 130%;
}

.btns a {
    background-color: #e67e22 !important;
    text-decoration: none !important;
    border-radius: 3px;
    border: 1px solid #e67e22;
    padding: 10px 30px;
    font-size: 120%;
    border: none;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
    color: white !important;
    font-weight: 400;
    align-self: center;
    transition: background-color 0.2s;
    width: 50%;
    margin: 35px 20px 15px 20px;
    text-align: center;
}

.btns a:hover,
.btns a:active {
    text-decoration: none;
    background-color: #bf6516 !important;
}

.btns a:nth-child(2) {
    background-color: #27ae60 !important;
}

.btns a:nth-child(2):hover,
.btns a:nth-child(2):active {
    background-color: #219251 !important;
}

i {
    margin-left: 5px;
}

span.fail {
    display: inline-block;
    background-color: #e74c3c;
    color: white;
    padding: 2px;
    width: 50%;
    text-align: center;
}
span.complication {
    display: inline-block;
    background-color: #e67e22;
    color: white;
    padding: 2px;
    width: 50%;
    text-align: center;
}
span.improve {
    display: inline-block;
    background-color: #2ecc71;
    color: white;
    padding: 2px;
    width: 50%;
    text-align: center;
}
</style>
