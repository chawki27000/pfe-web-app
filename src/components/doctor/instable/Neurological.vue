<template>
<div class="row row1">
  <h3>Examen Neurologique</h3>
  <div class="col-md-6 col-md-offset-3" v-show="result">
    <form class="form-horizontal">

      <img src="../../../../static/img/instable/neuro-1.png">
      <div class="form-group">
        <label class="col-md-3 control-label">Ouverture des yeux</label>
        <div class="col-md-6">
          <input type="number" min="1" max="4" class="form-control input-md" required="true">
        </div>
      </div>

      <img src="../../../../static/img/instable/neuro-2.png">
      <div class="form-group">
        <label class="col-md-3 control-label">Meilleure réaction verbale</label>
        <div class="col-md-6">
          <input type="number" min="1" max="5" class="form-control input-md" required="true">
        </div>
      </div>

      <img src="../../../../static/img/instable/neuro-3.png">
      <div class="form-group">
        <label class="col-md-3 control-label">Meilleure réaction motrice</label>
        <div class="col-md-6">
          <input type="number" min="1" max="6" class="form-control input-md" required="true">
        </div>
      </div>

    </form>
  </div>

  <div class="row" v-show="result">
    <div class="col-md-12">
      <a class="btn-next" @click="submit">Resultat<i class="ion-ios-pulse-strong"></i></a>
    </div>
  </div>

</div>
</template>

<script>
export default {
    data () {
        return {
            result: true,
        }
    },
    methods: {
        submit () {
            // Increment
            // TODO : storage Neuro_id
            this.$parent.$data.next++
        }
    }
}
</script>

<style lang="css">

form img {
    width: 100%;
}
</style>
