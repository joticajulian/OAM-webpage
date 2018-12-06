<template>
  <div>
    <HeaderEFTG ref="headerEFTG"></HeaderEFTG>
    <div id="bodyForm">
      <div><div class="form-label">*Indicates required field</div></div>
      <div class="form">
        <div class="block-input">
          <div class="form-label">*Company name</div>
          <input
            type="text"
            v-model="issuer_name"
            placeholder="e.g. Company ABC"
          />
        </div>
        <div class="block-input">
          <div class="form-label">*Company country</div>
          <select v-model="home_member_state">
            <option disabled value="">Please select one</option>
            <option
              v-for="option in optionsHomeMemberState"
              v-bind:key="option.id"
              v-bind:value="option.id"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="block-input">
          <div class="form-label">*Legal entity identifier</div>
          <div class="form-label">
            <div>
              <input type="radio" id="LEI" value="1" v-model="identifier_id" />
              <label for="LEI">Lei</label>
              <input type="radio" id="VAT" value="2" v-model="identifier_id" />
              <label for="VAT">Vat number</label>
              <input
                type="radio"
                id="Reg_Num"
                value="3"
                v-model="identifier_id"
              />
              <label for="Reg_Num">Reg number</label>
            </div>
            <div>
              <input type="text" v-model="identifier_value" placeholder="" />
            </div>
          </div>
        </div>
        <div class="block-input">
          <div class="form-label">*Document class and subclass</div>
          <select v-model="subclass">
            <option disabled value="">Please select one</option>
            <option disabled value="">{{ docClasses[0].name }}</option>
            <option
              v-for="option in docClasses[0].subclass"
              v-bind:key="option.id"
              v-bind:value="option.id"
            >
              {{ option.name }}
            </option>
            <option disabled value="">{{ docClasses[1].name }}</option>
            <option
              v-for="option in docClasses[1].subclass"
              v-bind:key="option.id"
              v-bind:value="option.id"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form">
        <div class="block-input">
          <div class="form-label">Document disclosure date</div>
          <div class="form-input-error">
            <input
              type="text"
              v-model="disclosure_date"
              placeholder="dd/mm/yyyy"
              :class="{ danger: error.disclosure_date }"
            />
            <div class="danger"></div>
          </div>
        </div>
        <div class="block-input">
          <div class="form-label">Document language</div>
          <select v-model="document_language">
            <option
              v-for="option in languages"
              v-bind:key="option.id"
              v-bind:value="option.id"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="block-input">
          <div class="form-label">Document title</div>
          <input
            type="text"
            v-model="comment"
            placeholder="e.g. Company ABC 2016 Annual Financial Report"
          />
        </div>
        <div class="block-input">
          <div class="form-label">*Document financial year</div>
          <input type="text" v-model="financial_year" />
        </div>
      </div>
      <div>
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
import Config from "@/config.js";
import Utils from "@/js/utils.js";
import debounce from "lodash.debounce";
import axios from "axios";
import Crypto from "crypto";

import HeaderEFTG from "@/components/HeaderEFTG";

export default {
  name: "OAMEntryPage",
  data() {
    return {
      issuer_name: "",
      home_member_state: "",
      identifier_id: "",
      identifier_value: "",
      subclass: "",
      disclosure_date: "",
      document_language: "",
      comment: "",
      financial_year: "",
      optionsHomeMemberState: [
        {
          id: "RO",
          name: "Romania"
        },
        {
          id: "SP",
          name: "Spain"
        }
      ],
      docClasses: [
        {
          id: 1,
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
      languages: [
        { id: "en-uk", name: "English" },
        { id: "sp", name: "Spanish" }
      ],
      identifiers: {
        "1": "LEI",
        "2": "VAT",
        "3": "RegistrationNumber"
      },
      error: {
        issuer_name: false,
        home_member_state: false,
        identifier_id: false,
        identifier_value: false,
        subclass: false,
        disclosure_date: false,
        document_language: false,
        comment: false,
        financial_year: false
      },
      errorText: {
        issuer_name: "No error",
        home_member_state: "No error",
        identifier_id: "No error",
        identifier_value: "No error",
        subclass: "No error",
        disclosure_date: "No error",
        document_language: "No error",
        comment: "No error",
        financial_year: "No error"
      }
    };
  },
  components: {
    HeaderEFTG
  },
  created() {
    this.debouncedValidateDate = debounce(this.validateDate, 300);

    /*const key = dsteem.PrivateKey.fromString(
      "5KC1Ab4UxGE4GyXFcx4xwExDCJf8Jq3LujjcBsmFMYp5Cx4VfwK"
    );
    const imageHash = Crypto.createHash("sha256")
      .update("ImageSigningChallenge")
      .digest();
    console.log(key.sign(imageHash).toString());*/
  },
  mounted() {
    this.startEventListenerFile();
  },
  watch: {
    disclosure_date: function(strDate, oldDate) {
      this.debouncedValidateDate();
    }
  },
  methods: {
    submit() {
      let self = this;

      //Principal function to submit the file and data
      async function submit_async() {
        //Validation of data
        if (!self.validateDate()) {
          //todo: all validations
          console.log("Error validating fields!");
          return false;
        }

        //User credentials
        //todo: validation login!!!!!
        var username = self.$refs.headerEFTG.auth.user;
        var privKey = self.$refs.headerEFTG.auth.keys.posting;

        //read file, calculation of the hash, and signature with privkey
        //(format used in ImageHoster for uploading)
        var localFile = document.getElementById("file").files[0];
        var fileData = await self.readFileAsBuffer(localFile);
        const imageHash = Crypto.createHash("sha256")
          .update("ImageSigningChallenge")
          .update(fileData)
          .digest();
        const signature = privKey.sign(imageHash).toString();
        console.log("signature:" + signature);

        //Uploading the file

        var formFile = new FormData();
        formFile.append("pdf", localFile);
        var urlWithSignature =
          Config.IMAGE_HOSTER.url + "/" + username + "/" + signature;

        var response = await axios.post(urlWithSignature, formFile);
        //TODO: try - catch to check if the file is too long and there is an error
        console.log("response from image hoster");
        console.log(response);

        //Creation of the new post in the blockchain

        var json_metadata = {
          issuer_name: self.issuer_name,
          home_member_state: self.home_member_state,
          identifier_id: self.identifier_id,
          identifier_value: self.identifier_value,
          subclass: self.subclass,
          disclosure_date: Utils.dateToString(
            self.ddmmyyyytoDate(self.disclosure_date)
          ),
          document_language: self.document_language,
          comment: self.comment,
          financial_year: self.financial_year,
          tags: [
            self.subclass,
            self.issuer_name,
            self.home_member_state,
            self.identifier_value
          ],
          submission_date: Utils.dateToString(new Date())
        };

        var post = {
          author: self.$refs.headerEFTG.auth.user,
          body: "",
          json_metadata: json_metadata,
          parent_author: "",
          parent_permlink: "oam",
          perm_link: "test-post",
          title: "test data entry"
        };

        console.log("post");
        console.log(post);
      }
      submit_async().catch(console.error);
    },

    clear() {
      this.issuer_name = "";
      this.home_member_state = "";
      this.identifier_id = "";
      this.identifier_value = "";
      this.subclass = "";
      this.disclosure_date = "";
      this.document_language = "";
      this.comment = "";
      this.financial_year = "";
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
    },

    ddmmyyyytoDate(str) {
      var array = str.split("/");
      if (array.length !== 3) throw new Error("Invalid date format");
      var date = new Date(array[2] + "/" + array[1] + "/" + array[0]);
      if (
        date.getDate() + "" !== array[0] ||
        date.getMonth() + 1 + "" !== array[1] ||
        date.getFullYear() + "" !== array[2]
      ) {
        throw new Error("Invalid date format");
      }
      return date;
    },

    //Definition of the function to read a file using Promises (better for using await)
    //More info: https://blog.shovonhasan.com/using-promises-with-filereader/
    async readFileAsBuffer(inputFile) {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject(new DOMException("Problem parsing file to upload"));
        };

        reader.onload = () => {
          //the result is an ArrayBuffer, we change it to Buffer.
          //this is important because the hash using 'crypto' is different in the 2 cases

          //TODO: [es-lint] says that Buffer is not defined, however it works
          var dataArrayBuffer = reader.result;
          var dataBuffer = new Buffer(dataArrayBuffer);
          resolve(dataBuffer);
        };
        reader.readAsArrayBuffer(inputFile);
      });
    },

    //validation
    validateDate() {
      try {
        this.ddmmyyyytoDate(this.disclosure_date);
      } catch (e) {
        this.error.disclosure_date = true;
        this.errorText.disclosure_date = "Invalid date format, use dd/mm/yyyy";
        return false;
      }
      this.error.disclosure_date = false;
      this.errorText.disclosure_date = "No error";
      return true;
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

.danger {
  color: red;
}
</style>
