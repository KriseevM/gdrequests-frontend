<template>
  <h1>Предложить уровень</h1>
  <h5>На этой странице можно предложить свой уровень Geometry Dash стримеру Pull Push Play</h5>
    <b-form class="mt-4 mb-1 col-lg-2 container-fluid text-center" >
        <label>ID уровня</label>
        <b-form-input class="mb-1 text-center" v-model="levelid" type="number" min="100" max="100000000" name="levelid" placeholder="12345678" id="levelid" required @input="formValueChanged" />
        <b-button :variant="isValidating ? 'outline-disabled' : formValid ? 'success' : 'outline-danger'" id="submit" squared="false" @click="requestButtonClick">Предложить</b-button>
    </b-form>
    <status-label :success="requestSuccess" :class="statusVisible ? 'shown' : 'hidden'">{{ requestResult }}</status-label>

</template>
<script>
  import statusLabel from './../components/StatusLabel.vue'
  export default {
  components: { statusLabel },
    name: "requestPage",
    data(){
      return {
        displayName: "Предложить уровень",
        index: 0,
        formValid: false,
        isValidating: false,
        levelid: '',
        requestResult: '',
        requestSuccess: false,
        statusVisible: false,
        lastDisplayingId: -1
      }
    },
    methods: {
      async formValueChanged()
      {
        this.isValidating = true
        this.$nextTick(async() => {
          if(this.levelid === '')
          {
            this.formValid = false
            this.isValidating = false
            this.hideStatusMessage()
            return
          }
          if(+this.levelid < 100 || +this.levelid > 100000000)
          {
            this.formValid = false
            this.isValidating = false
            this.displayStatusMessage(() =>{}, 'ID уровня должен быть между 100 и 100000000')
            return
          }
          let response = await fetch("/api/gdserver.CheckLevel?levelId=" + this.levelid)
          if(response.ok)
          {
            if(await response.json())
            {
              this.formValid = true
              this.isValidating = false
              this.hideStatusMessage()
            }
            else
            {
              this.formValid = false
              this.isValidating = false
              this.displayStatusMessage(() =>{}, 'Уровня нет на серверах Geometry Dash')
            }
          }
        });
      },
      async requestButtonClick()
      {
        if(this.isValidating) return
        if(!this.formValid) return
        this.isValidating = true
        let response = await fetch("/api/requests.add", {
          method: 'POST',
          body: +this.levelid,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let requestResult;
        if(response.ok)
        {
          if(await response.text() === "ok")
          {
            this.requestSuccess = true
            requestResult = 'Уровень добавлен в базу данных'
            this.levelid = ''
            this.formValid = false
          }
        }
        else {
          this.requestSuccess = false
          switch(response.status)
          {
            case 409:
              requestResult = 'Уровень уже есть в базе данных'
              this.formValid = false
              break;
            case 410:
              requestResult = 'Уровня нет на серверах Geometry Dash'
              break;
            default:
              requestResult = 'Неизвестная ошибка'
              break;
          }
        }
        this.displayStatusMessage(() => { this.isValidating = false }, requestResult);
      },
      displayStatusMessage(callback, message) {
        if(this.statusVisible) {
          this.statusVisible = false
        }
        clearTimeout(this.lastDisplayingId) // Cancel previous animation
        this.lastDisplayingId = setTimeout(() => {
          if(typeof message === "string")
            this.requestResult = message
          this.statusVisible = true
          this.lastDisplayingId = setTimeout(() => {
            this.statusVisible = false
            callback()
          }, 2000)
        }, 300)
      },
      hideStatusMessage() {
        if(!this.statusVisible) {
          return
        }
        clearTimeout(this.lastDisplayingId) // Cancel previous animation
        this.statusVisible = false
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
.shown {
  opacity: 1;
  transition: all 0.25s ease-in;
}
.hidden {
  opacity: 0;
  transition: all 0.25s ease-out;
}
</style>