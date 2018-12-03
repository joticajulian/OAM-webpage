<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header"><slot name="header">Login</slot></header>
      <section class="modal-body">
        <div>
          <div class="prefix">@</div>
          <input
            type="text"
            v-model="username"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password or WIF"
          />
        </div>
        <div>
          <input type="checkbox" id="save-password" v-model="savePassword" />
          <label for="save-password">Keep me logged in</label>
        </div>
        <div>
          <button @click="login">Login</button>
          <button @click="close">Cancel</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",

  data() {
    return {
      username: "",
      password: "",
      savePassword: false
    };
  },

  methods: {
    login() {},
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 15px;
  display: flex;
}

.modal-header {
  color: #4aae9b;
  justify-content: space-between;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.prefix {
  display: inline-block;
}
</style>
