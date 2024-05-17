<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstname: {
        val: '',
        isValid: true
      },
      lastname: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    checkFormValidity(wich) {
      if (wich === undefined) {
        this.firstname.isValid = this.firstname.val !== '';
        this.lastname.isValid = this.lastname.val !== '';
        this.description.isValid = this.description.val !== '';
        this.rate.isValid = this.rate.val && this.rate.val > 0;
        this.areas.isValid = this.areas.val.length !== 0;
      } else if (wich === 'firstname') {
        this.firstname.isValid = this.firstname.val !== '';
      } else if (wich === 'lastname') {
        this.lastname.isValid = this.lastname.val !== '';
      } else if (wich === 'description') {
        this.description.isValid = this.description.val !== '';
      } else if (wich === 'rate') {
        this.rate.isValid = this.rate.val && this.rate.val > 0;
      } else if (wich === 'areas') {
        this.areas.isValid = this.areas.val.length !== 0;
      }
    },
    validateForm() {
      this.checkFormValidity()

      this.formIsValid = this.firstname.isValid &&
        this.lastname.isValid &&
        this.description.isValid &&
        this.rate.isValid &&
        this.areas.isValid;
    },
    submitForm() {
      this.validateForm()

      if (!this.formIsValid)
        return

      const formData = {
        first: this.firstname.val,
        last: this.lastname.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      }

      this.$emit('save-data', formData)
    }
  }
};
</script>
<template>
  <form @submit.prevent="submitForm">

    <div class="form-control" :class="{ invalid: !firstname.isValid }">
      <div class="label-container">
        <label for="firstname">Firstname:</label>
        <p v-if="!firstname.isValid">Firstname must not be empty.</p>
      </div>
      <input type="text" id="firstname" v-model.trim="firstname.val" @blur="checkFormValidity('firstname')" />
    </div>

    <div class="form-control" :class="{ invalid: !lastname.isValid }">
      <div class="label-container">
        <label for="lastname">LastName:</label>
        <p v-if="!lastname.isValid">Lastname must not be empty.</p>
      </div>
      <input type="text" id="lastname" v-model.trim="lastname.val" @blur="checkFormValidity('lastname')" />
    </div>

    <div class="form-control" :class="{ invalid: !description.isValid }">
      <div class="label-container">
        <label for="description">Description:</label>
        <p v-if="!description.isValid">Description must not be empty.</p>
      </div>
      <textarea id="description" rows="5" v-model.trim="description.val" @blur="checkFormValidity('description')"></textarea>
    </div>

    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <div class="label-container">
        <label for="rate">Hourly Rate:</label>
        <p v-if="!rate.isValid">Rate must be greater than 0.</p>
      </div>
      <input type="number" id="rate" v-model.number="rate.val" @blur="checkFormValidity('rate')" />
    </div>

    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <div class="label-container">
        <h3>Areas of Expertise:</h3>
        <p v-if="!areas.isValid">At least one expertise must be selected.</p>
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
