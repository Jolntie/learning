<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstname: {
        val: '',
        invalidMessage: null
      },
      lastname: {
        val: '',
        invalidMessage: null
      },
      note: {
        val: '',
        invalidMessage: null
      },
      description: {
        val: '',
        invalidMessage: null
      },
      rate: {
        val: null,
        invalidMessage: null
      },
      areas: {
        val: [],
        otherVal: '',
        isOtherChecked: false,
        invalidMessage: null
      },
      formIsValid: true
    };
  },
  methods: {
    checkFormValidity(wich) {
      const specialCharactersRegex = /[^a-zA-Z0-9 ]/;
      const validateFirstname = () => {
        if (this.firstname.val === '') { this.firstname.invalidMessage = 'Firstname must not be empty.' }
        else if (this.firstname.val.length > 20) { this.firstname.invalidMessage = 'Firstname must not be longer then 20 characters long.' }
        else if (specialCharactersRegex.test(this.firstname.val)) { this.firstname.invalidMessage = 'Firstname must not have special characters.' }
        else { this.firstname.invalidMessage = null }
      };
      const validateLastname = () => {
        if (this.lastname.val === '') { this.lastname.invalidMessage = 'Lastname must not be empty.' }
        else if (this.lastname.val.length > 20) { this.lastname.invalidMessage = 'Lastname must not be longer then 20 characters long.' }
        else if (specialCharactersRegex.test(this.lastname.val)) { this.lastname.invalidMessage = 'Lastname must not have special characters.' }
        else { this.lastname.invalidMessage = null }
      };
      const validateNote = () => {
        if (this.note.val.length > 20) { this.note.invalidMessage = 'Note may not be longer then 20 characters long.' }
        else if (specialCharactersRegex.test(this.note.val)) { this.note.invalidMessage = 'Note must not have special characters.' }
        else { this.note.invalidMessage = null }
      };
      const validateDescription = () => {
        if (this.description.val === '') { this.description.invalidMessage = 'Description may not be empty.' }
        else { this.description.invalidMessage = null }
      };
      const validateRate = () => {
        if (this.rate.val <= 0) { this.rate.invalidMessage = 'Rate must be greater than 0.' }
        else if (this.rate.val > 1000) { this.rate.invalidMessage = 'You may not exceed €1000/hour.' }
        else { this.rate.invalidMessage = null }
      };
      const validateAreas = () => {
        if (this.areas.val.length === 0 && !this.areas.isOtherChecked) { this.areas.invalidMessage = 'At least one expertise must be selected.' }
        else if (this.areas.otherVal === '' && this.areas.isOtherChecked) { this.areas.invalidMessage = 'Other field may not be empty.' }
        else { this.areas.invalidMessage = null }
      };

      if (wich === undefined) {
        validateFirstname();
        validateLastname();
        validateNote();
        validateDescription();
        validateRate();
        validateAreas();
      } else if (wich === 'firstname') {
        validateFirstname();
      } else if (wich === 'lastname') {
        validateLastname();
      } else if (wich === 'note') {
        validateNote();
      } else if (wich === 'description') {
        validateDescription();
      } else if (wich === 'rate') {
        validateRate();
      } else if (wich === 'areas') {
        validateAreas();
      }
    },
    validateForm() {
      this.checkFormValidity()

      this.formIsValid = !this.firstname.invalidMessage
        && !this.lastname.invalidMessage
        && !this.note.invalidMessage
        && !this.description.invalidMessage
        && !this.rate.invalidMessage
        && !this.areas.invalidMessage;
    },
    submitForm() {
      this.validateForm()

      if (!this.formIsValid)
        return

      if (this.note !== '') {
        this.note = `(${this.note})`
      }

      if (this.areas.isOtherChecked && this.areas.otherVal !== '')
        this.areas.val.push(this.areas.otherVal);

      const formData = {
        first: this.firstname.val,
        last: this.lastname.val,
        note: this.note.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      }

      this.$emit('save-data', formData);
    }
  }
};
</script>
<template>
  <form @submit.prevent="submitForm">

    <div class="form-control" :class="{ invalid: firstname.invalidMessage }">
      <div class="label-container">
        <label for="firstname">*Firstname:</label>
        <p v-if="firstname.invalidMessage">{{ firstname.invalidMessage }}</p>
      </div>
      <input type="text" id="firstname" v-model.trim="firstname.val" @blur="checkFormValidity('firstname')" placeholder="John" />
    </div>

    <div class="form-control" :class="{ invalid: lastname.invalidMessage }">
      <div class="label-container">
        <label for="lastname">*LastName:</label>
        <p v-if="lastname.invalidMessage">{{ lastname.invalidMessage }}</p>
      </div>
      <input type="text" id="lastname" v-model.trim="lastname.val" @blur="checkFormValidity('lastname')" placeholder="Doe" />
    </div>

    <div class="form-control" :class="{ invalid: note.invalidMessage }">
      <div class="label-container">
        <label for="note">Note:</label>
        <p v-if="note.invalidMessage">{{ note.invalidMessage }}</p>
      </div>
      <input type="text" id="note" v-model="note.val" @blur="checkFormValidity('note')" placeholder="Stagair" />
    </div>

    <div class="form-control" :class="{ invalid: description.invalidMessage }">
      <div class="label-container">
        <label for="description">*Description:</label>
        <p v-if="description.invalidMessage">{{ description.invalidMessage }}</p>
      </div>
      <textarea id="description" rows="5" v-model.trim="description.val"
        @blur="checkFormValidity('description')" placeholder="Ik ben John Doe en doe al 23 jaar aan software development." />
    </div>

    <div class="form-control" :class="{ invalid: rate.invalidMessage }">
      <div class="label-container">
        <label for="rate">*Hourly Rate:</label>
        <p v-if="rate.invalidMessage">{{ rate.invalidMessage }}</p>
      </div>
      <input type="number" id="rate" v-model.number="rate.val" @blur="checkFormValidity('rate')" placeholder="20" />
    </div>
    <div class="form-control" :class="{ invalid: areas.invalidMessage }">
      <div class="label-container">
        <h3>*Areas of Expertise:</h3>
        <p v-if="areas.invalidMessage">{{ areas.invalidMessage }}</p>
      </div>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="checkFormValidity('areas')">
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="checkFormValidity('areas')">
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas.val" @blur="checkFormValidity('areas')">
        <label for="career">Career Advisory</label>
      </div>
      <div id="app">
        <input type="checkbox" id="other" v-model="areas.isOtherChecked">
        <label for="other">Other:</label>
        <input type="text" id="other-text" v-model.trim="areas.otherVal" v-if="areas.isOtherChecked"
          @blur="checkFormValidity('areas')">
      </div>
    </div>

    <base-button>Register</base-button>

  </form>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  display: block;
}

.label-container {
  display: flex;
  justify-content: left;
  align-items: center;
}

.label-container h3,
.label-container label {
  margin-right: 0.3rem;
}

input[type='checkbox']+label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.invalid input,
.invalid p {
  margin: 0;
  color: red;
}
</style>
