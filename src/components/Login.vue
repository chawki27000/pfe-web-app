<template>
<div class="login">
  <nav class="navbar navbar-inverse">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Alpha Project</a>
    </div>

    <ul class="nav navbar-nav">
      <li class="active"> <a href="#">Accueil</a> </li>
    </ul>

  </nav>

  <div class="row">
    <h1 class="h1s">Alpha Project</h1>
  </div>


  <div class="row rowcls">
    <div class="col-md-6 col-md-offset-3">
      <div class="panel panel-default">
        <div class="panel-heading">Login</div>
        <div class="panel-body">
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" id="username" placeholder="Email" v-model="username">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
            </div>

            <div class="row">
              <div class="col-md-6 col-md-offset-4">
                <button type="button" class="btn btn-default btnsub" @click="submit">Login</button>
              </div>
            </div>

          </form>
          {{logout}}
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <div class="alert alert-danger" role="alert" v-show="alert">Authentication failed. Username ou password are incorrect </div>
    </div>

  </div>
</div>
</template>

<script>
import router from '../router/index'

export default {
  data() {
    return {
      username: '',
      password: '',
      alert: false,
    }
  },
  methods: {
    submit: function() {
      console.log("username: " + this.username + " | password: " + this.password);
      this.$http.options.emulateJSON = true;

      var obj = {
        username: this.username,
        password: this.password
      }

      this.$http.post("http://localhost:3000/auth/login/", obj, {
        emulateJSON: true,
      }).then(function(response) {
        if (!response.data.success) {
          this.alert = true
        } else {
          this.alert = false
          console.log(response.data);
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', this.username)
          this.$router.push('/home')
        }
      }, function(response) {
        console.log("error : " + JSON.stringify(response));
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  background-color: #80cbc4 !important;
}

.btnsub {
  width: inherit;
}

.h1s {
  margin-top: 5%;
  text-align: center;
}

.rowcls {
  margin-top: 5%;
}
</style>
