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
  </section>

  <section class="neuro">
    <h2>Resultat neurologique</h2>
  </section>
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
            }
        }
    },

    mounted () {
        var resource = this.$resource('expert/on');
        resource.save({
            child_id: localStorage.getItem('child_id'),
            hemo_id: localStorage.getItem('hemo_id'),
            pleuro_id: localStorage.getItem('pleuro_id')
        }).then(response => {
            console.log(response.body);
            this.hemo.fc = response.body.fc;
            this.hemo.ta = response.body.ta;
            this.hemo.temp = response.body.temp;
        }, response => {
            console.error(response.body);
        })
    }
}
</script>

<style scoped>
section {
  margin: 15px;
  height: 40vh;
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

.info h3,  .info p {
    display: inline-block;
}

.info h3 {
    font-weight: 300;
}

.info p  {
    font-size: 140%;
}

</style>
