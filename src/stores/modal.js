import {defineStore} from 'pinia'
export default defineStore('modal',{
  state: () => ({isOpen:false, state: 'none'}),
  actions:{
    startEditing(){
      this.isOpen = true;
      this.state = 'editingCabin'
    },
    startAddCabin(){
      this.isOpen = true;
      this.state = 'newCabin'
    },
  }
})