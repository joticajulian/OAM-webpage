<template
  ><div>
    <div id="header">
      <div id="brand">
        <div id="logo"><img src="../assets/logo-eftg.png" /></div>
        <div class="powered">
          <div>OAM Portal</div>
          <div class="secondary-text">Powered by Blockchain</div>
        </div>
      </div>
      <div id="auth"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderEFTG",
  data() {
    return {
      msg: "OAMEntryPage"
    };
  }
};
</script>

<style scoped>
#header {
  padding: 10px;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}

#logo {
  display: inline-block;
}

.powered {
  display: inline-block;
}
</style>
