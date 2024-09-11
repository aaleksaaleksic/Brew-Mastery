<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <button @click="continueAsGuest" class="btn btn-secondary">
        Continue as Guest
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPageView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const credentials = {
        username: this.username,
        password: this.password,
      };
      fetch("http://localhost:8001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            document.cookie = `token=${data.token}; path=/`;
            this.$router.push("/");
          } else {
            alert("Invalid credentials");
          }
        })
        .catch((error) => console.error("Error:", error));
    },
    continueAsGuest() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
