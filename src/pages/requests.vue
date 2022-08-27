<template>
  <h1>Предложить уровень</h1>
  <h5>На этой странице можно предложить свой уровень Geometry Dash стримеру Pull Push Play</h5>
  
    <b-form class="mt-4 mb-4 col-lg-2 container-fluid text-center" >
        <label>ID уровня</label>
        <b-form-input class="mb-1 text-center" v-model="levelid" type="number" name="levelid" max="99999999" min="1" placeholder="12345678" id="levelid" required @input="formValueChanged" />
        <b-button :variant="formValid ? 'success' : 'outline-danger'" id="submit" squared="false">Предложить</b-button>
    </b-form>
  
</template>
<script>
  export default {
    name: "requestPage",
    data(){
      return {
        displayName: "Предложить уровень",
        index: 0,
        formValid: false,
        levelid: ''
      }
    },
    methods: {
      formValueChanged()
      {
        this.$nextTick(async() => {
          this.formValid = +this.levelid > 100 && +this.levelid < 100000000
        });

      }
    }
  }
</script>
<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button{
  appearance: textfield !important; 
  -webkit-appearance: none !important; 
  -moz-appearance: textfield !important;
}
</style>