import { ref } from "vue";
import {cabinsCollection} from '@/firebase/config'
export default function useCabins(){
  const cabins = ref([]);
  async function getCabins(){
    try {
      cabins.value = []
      const snapshots = await cabinsCollection.orderBy('name').get();
      snapshots.forEach(snapshot => {
        cabins.value.push({...snapshot.data(), id:snapshot.id})
      })
    } catch (err) {
      console.log(err.message)
    }
  } 
  return {cabins,getCabins}
}