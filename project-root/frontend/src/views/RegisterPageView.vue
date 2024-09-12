<template>
  <div class="register-container">
    <h1 class="mb-4 text-center">Registracija</h1>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="username" class="form-label">Korisničko ime</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Lozinka</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100 mb-3">
        Registruj se
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterPageView",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      const userData = {
        username: this.username,
        password: this.password,
        email: this.email,
      };

      // Slanje POST zahteva sa ispravno formatiranim podacima
      fetch("http://localhost:8001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Greška pri registraciji");
          }
          return response.json();
        })
        .then((data) => {
          if (data.message === "User registered successfully") {
            alert("Uspešno ste se registrovali!");
            this.$router.push("/login");
          } else {
            alert("Greška prilikom registracije: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Greška:", error);
          alert("Došlo je do greške pri registraciji.");
        });
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f6f2;
}

h1 {
  color: #3e2723;
}

.form-label {
  color: #5d4037;
}

.btn-primary {
  background-color: #6d4c41;
  border-color: #5d4037;
}
</style>
