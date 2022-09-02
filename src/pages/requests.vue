<template>
  <h1>Предложить уровень</h1>
  <h5>На этой странице можно предложить свой уровень Geometry Dash стримеру Pull Push Play</h5>
  
    <b-form class="mt-4 mb-4 col-lg-2 container-fluid text-center" >
        <label>ID уровня</label>
        <b-form-input class="mb-1 text-center" v-model="levelid" type="number" min="100" max="100000000" name="levelid" placeholder="12345678" id="levelid" required @input="formValueChanged" />
        <b-button :variant="isValidating ? 'outline-disabled' : formValid ? 'success' : 'outline-danger'" id="submit" squared="false" @click="requestButtonClick">Предложить</b-button>
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
        isValidating: false,
        levelid: '',
      }
    },
    methods: {
      async formValueChanged()
      {
        this.isValidating = true
        this.$nextTick(async() => {
          if(+this.levelid < 100 || +this.levelid > 100000000)
          {
            this.formValid = false
            this.isValidating = false
            return;
          }
          let response = await fetch("/api/gdserver.CheckLevel?levelId=" + this.levelid, {
            method: 'GET'
          })
          if(response.ok)
          {
            if(await response.json())
            {
              this.formValid = true
              this.isValidating = false
            }
            else
            {
              this.formValid = false
              this.isValidating = false
            }
          }
        });
      },
      requestButtonClick()
      {
          
      }
    }
  }

</script>
<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button{
  appearance: textfield !important; 
  -webkit-appearance: none !important; 
}
input[type=number]{
  -moz-appearance: textfield !important;
}
</style>