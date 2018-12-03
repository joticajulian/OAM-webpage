<template>
  <div>
    <HeaderEFTG></HeaderEFTG>
    <div id="bodyForm">
      <div><div class="form-label">*Indicates required field</div></div>
      <div class="form">
        <div class="block-input">
          <div class="form-label">*Company name</div>
          <input
            type="text"
            v-model="Issuer_Name"
            placeholder="e.g. Company ABC"
          />
        </div>
        <div class="block-input">
          <div class="form-label">*Company country</div>
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
        <div class="block-input">
          <div class="form-label">*Legal entity identifier</div>
          <div class="form-label">
            <div>
              <input type="radio" id="LEI" value="LEI" v-model="selLEI" />
              <label for="LEI">Lei</label>
              <input type="radio" id="VAT" value="VAT" v-model="selLEI" />
              <label for="VAT">Vat number</label>
              <input
                type="radio"
                id="Reg_Num"
                value="Reg_Num"
                v-model="selLEI"
              />
              <label for="Reg_Num">Reg number</label>
            </div>
            <div>
              <input
                type="text"
                v-model="Legal_Entity_Identifier"
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div class="block-input">
          <div class="form-label">*Document class and subclass</div>
          <select v-model="SubClass">
            <option disabled value="">Please select one</option>
            <option disabled value="">{{ optionsDocClass[0].text }}</option>
            <option
              v-for="option in optionsDocClass[0].optionsSubClass"
              v-bind:key="option.value"
              v-bind:value="option.value"
            >
              {{ option.text }}
            </option>
            <option disabled value="">{{ optionsDocClass[1].text }}</option>
            <option
              v-for="option in optionsDocClass[1].optionsSubClass"
              v-bind:key="option.value"
              v-bind:value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="form">
        <div class="block-input">
          <div class="form-label">Document disclosure date</div>
          <input
            type="text"
            v-model="Doc_Discl_Date"
            placeholder="dd/mm/yyyy"
          />
        </div>
        <div class="block-input">
          <div class="form-label">Document language</div>
          <select v-model="Doc_Language_PDF">
            <option
              v-for="option in optionsDocLanguagePDF"
              v-bind:key="option.value"
              v-bind:value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="block-input">
          <div class="form-label">Document title</div>
          <input
            type="text"
            v-model="Doc_Title"
            placeholder="e.g. Company ABC 2016 Annual Financial Report"
          />
        </div>
        <div class="block-input">
          <div class="form-label">*Document financial year</div>
          <input type="text" v-model="Doc_Financial_Year" />
        </div>
      </div>
      <div>
        <button v-on:click="uploadFile">up</button>
        <input type="file" name="file" id="file" class="inputfile" />
        <label for="file">Upload file</label>
      </div>
      <div class="right">
        <button v-on:click="submit">Submit</button>
        <button v-on:click="clear">Clear</button>
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
      selLEI: "",
      Legal_Entity_Identifier: "",
      SubClass: "",
      Doc_Discl_Date: "",
      Doc_Language_PDF: "",
      Doc_Title: "",
      Doc_Financial_Year: "",
      optionsHMR: [
        { text: "Italy", value: "IT" },
        { text: "Spain", value: "SP" },
        { text: "Luxembourg", value: "LU" }
      ],
      optionsDocClass: [
        {
          text: "1. Periodic Regulated Information",
          value: "Periodic Regulated Information",
          optionsSubClass: [
            {
              text: "1.1. Annual Financial Report",
              value: "Annual Financial Report"
            },
            {
              text: "1.2. Half-Year Financial Report",
              value: "Half-Year Financial Report"
            },
            {
              text: "1.3. Interim Management Statement",
              value: "Interim Management Statement"
            }
          ]
        },
        {
          text: "2. Ongoing Regulated Information",
          value: "Ongoing Regulated Information",
          optionsSubClass: [
            {
              text: "2.1. Home Member States",
              value: "Home Member States"
            },
            {
              text: "2.2. Audit Reports",
              value: "Audit Reports"
            }
          ]
        }
      ],
      optionsDocLanguagePDF: [
        { text: "English", value: "English" },
        { text: "French", value: "French" },
        { text: "German", value: "German" },
        { text: "Spanish", value: "Spanish" }
      ]
    };
  },
  components: {
    HeaderEFTG
  },
  mounted() {
    this.startEventListenerFile();
  },
  methods: {
    submit() {},
    clear() {
      this.Issuer_Name = "";
      this.HMS = "";
      this.selLEI = "";
      this.Legal_Entity_Identifier = "";
      this.SubClass = "";
      this.Doc_Discl_Date = "";
      this.Doc_Language_PDF = "";
      this.Doc_Title = "";
      this.Doc_Financial_Year = "";
    },
    uploadFile() {
      console.log(document.getElementById("file").files[0].name);
    },
    startEventListenerFile() {
      var input = document.getElementById("file");
      var label = input.nextElementSibling,
        labelVal = label.innerHTML;

      input.addEventListener("change", function(e) {
        var fileName = e.target.value.split("\\").pop();
        if (fileName) label.innerHTML = fileName;
        else label.innerHTML = labelVal;
      });
    }
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

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile + label {
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
  cursor: pointer;
}

.inputfile:focus + label,
.inputfile + label:hover {
  background-color: red;
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}
</style>
