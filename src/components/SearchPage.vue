<template>
  <div>
    <HeaderEFTG ref="headerEFTG"></HeaderEFTG>
    <form>
    <div class="container p-5">
      <div class="form-row">
        <fieldset class="form-group col-md-6">
          <label>ISSUER NAME</label>
          <multiselect v-model="issuerName" tag-placeholder="Select ISSUER NAME" placeholder="Select Issuer Name" label="name" track-by="id" :options="optionsIssuerName" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
        </fieldset>
        <fieldset class="form-group col-md-6">
          <label>HOME MEMBER STATE</label>
          <multiselect v-model="homeMemberState" tag-placeholder="Select  Home Member State" placeholder="Select Home Member State" label="name" track-by="id" :options="optionsHomeMemberState" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
        </fieldset>
      </div>
      <div class="form-row">
        <fieldset class="form-group col-md-9">
          <label>DOCUMENT CLASS AND SUBCLASS</label>
          <multiselect v-model="docClass" tag-placeholder="Select document class and subclass" placeholder="Search or choose" label="name" track-by="id" :options="optionsDocClass" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
        </fieldset>
        <fieldset class="form-group col-md-3">
          <label>FINANCIAL YEAR</label>
          <multiselect v-model="financialYear" tag-placeholder="Select financial year" placeholder="Select financial year" label="id" track-by="id" :options="optionsFinancialYear" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
        </fieldset>
      </div>
      <div class="form-row">
        <fieldset class="form-group col-md-9">
          <label class="control-label">SEARCH TITLE BY KEYWORD</label>
          <div class="input-group">
              <input type="text" class="form-control" aria-label="Input keywords">
              <div class="input-group-append">
                <i class="fa fa-user-circle-o"></i>
              </div>
          </div>
        </fieldset>
        <fieldset class="form-group col-md-3 align-bottom" style="padding-top: 8px;">
          <br/>
          <button type="submit" class="btn btn-primary" v-on:click="submit">Submit</button>
          <button type="button" class="btn btn-secondary" v-on:click="clear">Clear</button>
        </fieldset>
      </div>
    </div>
    </form>
    <div>
        <pre class="language-json">Issuer Name<code>{{ issuerName  }}</code></pre>
        <pre class="language-json">Home Member State<code>{{ homeMemberState  }}</code></pre>
        <pre class="language-json">Class<code>{{ docClass  }}</code></pre>
        <pre class="language-json">Financial year<code>{{ financialYear  }}</code></pre>
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
      issuerName: [{ id: "1", name: "Google S.A." }],
      optionsIssuerName: [{
          id: "1",
          name: "Google S.A."
        }, {
          id: "2",
          name: "Facebook S.A."
        }
      ],
      homeMemberState: [{id: "RO", name: "Romania"}],
      optionsHomeMemberState: [{
          id: "RO",
          name: "Romania"
        }, {
          id: "SP",
          name: "Spain"
        }
      ],
      financialYear : [{id: "2018"}],
      optionsFinancialYear: [{
          id: "2018"
        }, {
          id: "2017"
        }, {
          id: "2016"
        }, {
          id: "2015"
        }
      ],
      docClass: [{id: "1", name: "Periodic Regulated Information"}],
      optionsDocClass: [
        {
          id: "1",
          name: "Periodic Regulated Information",
          subclass: [
            {
              id: 3,
              name: "Annual Financial Report"
            },
            {
              id: 4,
              name: "Half-Year Financial Report"
            },
            {
              id: 5,
              name: "Interim Management Statement"
            }
          ]
        },
        {
          id: 2,
          name: "Ongoing Regulated Information",
          subclass: [
            {
              id: 6,
              name: "Home Member State"
            },
            {
              id: 7,
              name: "Inside Information"
            }
          ]
        }
      ],
    };
  },
  components: {
    HeaderEFTG, Multiselect
  },
  mounted() {
    
  },
  methods: {
    addTag (newTag) {
      console.log(newTag);
      const tag = {
        name: newTag,
        id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
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

#bodyForm .multiselect__tag {
  background-color: blue !important;
}

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

