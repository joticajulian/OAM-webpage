<template>
  <div>
    <HeaderEFTG ref="headerEFTG"></HeaderEFTG>
    <div id="bodyForm">
      <div><div class="form-label">*Indicates required field</div></div>
      <div class="form">
        <div class="block-input">
          <div>
            <label class="typo__label">*Home member state</label>
            <multiselect v-model="homeMemberState" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="id" :options="optionsHomeMemberState" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
            <pre class="language-json"><code>{{ homeMemberState  }}</code></pre>
          </div>
        </div>
      </div>
      <div class="right">
        <button v-on:click="submit">Submit</button>
        <button v-on:click="clear">Clear</button>
      </div>
    </div>
  </div>
</template>

<script>
import Config from "@/config.js";
import Utils from "@/js/utils.js";
import HeaderEFTG from "@/components/HeaderEFTG";
import Multiselect from 'vue-multiselect';


export default {
  name: "SearchPage",
  data() {
    return {
      homeMemberState: [{id: "RO", name: "Romania"}],
      optionsHomeMemberState: [{
          id: "RO",
          name: "Romania"
        }, {
          id: "SP",
          name: "Spain"
        }
      ],
    };
  },
  components: {
    HeaderEFTG, Multiselect
  },
  mounted() {
    this.startEventListenerFile();
  },
  methods: {
    addTag (newTag) {
      console.log(newTag);
      const tag = {
        name: newTag,
        id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.optionsHomeMemberState.push(tag)
      this.optionsHomeMemberState.push(tag)
    },
    submit() {
        console.log("json_metadata");
        console.log(json_metadata);
    },
    clear() {
      this.homeMemberState = [];
    },
  }
};
</script>
<style scoped>
#bodyForm {

}

.form {
  display: inline-block;
}

.form-label {
  display: inline-block;
}

#bodyForm .multiselect__tag {
  background-color: blue !important;
}

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

