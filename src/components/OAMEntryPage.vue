<template>
  <div>
    <HeaderEFTG></HeaderEFTG>
    <div id="body">
      <div class="form-label">*Indicates required field</div>
      <div class="form">
        <div class="block-input">
          <div class="form-label">*Company Name</div>
          <input
            type="text"
            v-model="Issuer_Name"
            placeholder="e.g. Company ABC"
          />
        </div>
        <div class="block-input">
          <div class="form-label">*Company Country</div>
          <select v-model="HMS">
            <option disabled value="">Please select one</option>
            <option
              v-for="option in optionsHMR"
              v-bind:key="option.value"
              v-bind:value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderEFTG from "@/components/HeaderEFTG";

export default {
  name: "OAMEntryPage",
  data() {
    return {
      Issuer_Name: "",
      HMS: "",
      msg: "OAMEntryPage",
      optionsHMR: [
        { text: "Italy", value: "IT" },
        { text: "Spain", value: "SP" },
        { text: "Luxembourg", value: "LU" }
      ]
    };
  },
  components: {
    HeaderEFTG
  }
};
</script>

<style scoped>
#body {
}

.form-label {
  display: inline-block;
}
</style>
