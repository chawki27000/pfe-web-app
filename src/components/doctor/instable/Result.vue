<template>
<div class="row">
  <section class="hemo">
    <h2>Resultat Hedomynamique</h2>
    <div class="info">
      <h3>FC : </h3>
      <p>{{hemo.fc}}</p>
    </div>
    <div class="info">
      <h3>TA : </h3>
      <p>{{hemo.ta}}</p>
    </div>
    <div class="info">
      <h3>Temperature : </h3>
      <p>{{hemo.temp}}</p>
    </div>
  </section>

  <section class="pleuro">
    <h2>Resultat Pleuro-pulmonaire</h2>
    <div class="info">
      <h3>FC : </h3>
      <p>{{pleuro.fr}}</p>
    </div>
    <div class="info">
      <h3>Amplitude : </h3>
      <p>{{pleuro.ampl}}</p>
    </div>
    <div class="info">
      <h3>Resp : </h3>
      <p>{{pleuro.resp}}</p>
    </div>
  </section>

  <section class="neuro">
    <h2>Resultat neurologique</h2>
    <div class="info">
      <h3>Score : </h3>
      <p>{{neuro.res}}</p>
    </div>
  </section>

  <div class="row stable" v-if="!hemo && !pleuro" @click="stable">
    <i class="ion-android-happy"></i>
    <p>Stable</p>
  </div>

  <div class="row instable" v-if="hemo || pleuro" @click="instable">
    <i class="ion-android-sad"></i>
    <p>Instable</p>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      hemo: {
        fc: '',
        ta: '',
        temp: '',
      },
      pleuro: {
        fr: '',
        resp: '',
        ampl: ''
      },
      neuro: {
        res: localStorage.getItem('neuro'),
      },
    }
  },
  mounted() {
    // Hemodynamic expert
    var resource = this.$resource('expert/on/1')
    resource.save({
      child_id: localStorage.getItem('child_id'),
      hemo_id: localStorage.getItem('hemo_id'),
    }).then(response => {
      console.log(response.body);
      this.hemo.fc = response.body.fc;
      this.hemo.ta = response.body.ta;
      this.hemo.temp = response.body.temp;
    }, response => {
      console.error(response)
    })

    // Pleuro-pulmonaire expert
    var resource2 = this.$resource('expert/on/2')
    resource2.save({
      child_id: localStorage.getItem('child_id'),
      pleuro_id: localStorage.getItem('pleuro_id'),
    }).then(response => {
      console.log(response)
      var object = JSON.parse(response.body.body)
      this.pleuro.fr = object.fr
      this.pleuro.resp = object.resp
      this.pleuro.ampl = response.body.ampl
    }, response => {
      console.error(response)
    })
  },
  computed: {
    hemo() {
      if (this.hemo.fc !== "Normal" || this.hemo.temp !== "Normal") {
        return true
      } else {
        return false
      }
    },
    pleuro() {
      if (this.pleuro.fr !== "Normal") {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
      send() {
          var resource = this.$resource('result/insert');
          resource.save({
              doctor: localStorage.getItem('user_id'),
              child: localStorage.getItem('child_id'),
              hemo_id: localStorage.getItem('hemo_id'),
              pleuro_id: localStorage.getItem('pleuro_id'),
              neuro_id: localStorage.getItem('neuro_id'),
              fc: this.hemo.fc,
              ta: this.hemo.ta,
              temp: this.hemo.temp,
              fr: this.pleuro.fr,
              resp: this.pleuro.resp,
              ampl: this.pleuro.ampl,
          }).then(response => {
              localStorage.setItem('result_id', response.body.id)
          }, response => {
              console.error(response)
          })
      },
      stable() {
          this.send()
          // Next
          this.$router.push({name: 'Stable'})
      },
      instable() {
          this.send()
          // Next
          this.$router.push({name: 'Instable'})
      }
  }

}
</script>

<style scoped>
section {
  margin: 15px;
  margin-bottom: 30px;
  height: 50vh;
  border: 2px solid grey;
  padding-top: 20px;
  border-radius: 4px;
  box-shadow: 4px 4px 4px grey;
}

.hemo {}

.pleuro {}

.neuro {}

h2 {
  margin: 0 auto;
  width: 40%;
  font-size: 200%;
  font-weight: 300;
  text-align: center;
  color: black;
  border-radius: 6px;
}

.hemo h2 {
  color: #c0392b;
  border: 2px solid #c0392b;
}

.pleuro h2 {
  color: #f39c12;
  border: 2px solid #f39c12;
}

.neuro h2 {
  color: #2980b9;
  border: 2px solid #2980b9;
}

.info {
  text-align: center;
}

.info h3,
.info p {
  display: inline-block;
}

.info h3 {
  font-weight: 300;
}

.info p {
  font-size: 140%;
}

.stable,
.instable {
  display: block;
  width: 30%;
  margin: 15px auto;
  font-size: 400%;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.2s;
}

.stable {
  border: 5px solid #27ae60;
  color: #27ae60;
}

.stable:hover,
.stable:active {
  background-color: #27ae60;
  color: #fff;
}

.instable {
  border: 5px solid #c0392b;
  color: #c0392b;
}

.instable:hover,
.instable:active {
  color: #fff;
  background-color: #c0392b;
}

.stable i,
.instable i {
  font-size: 200%;
}

.stable p,
.instable p {
  font-weight: 300;
  font-size: 80%;
}
</style>
