<template lang="pug">
  div(v-if="isSmallerThanSm" class="sticky top-0 bg-[#fff] dark:bg-gray-900 border p-1")
    div(class="flex justify-between")
      div(class="flex items-center")
        img(src="/img/cuaca_logo.png", alt="alt" style="width:70px")
        h2(class="ml-3 text-xl") Weather Info
      div(class="flex items-center")
        div(class="toggle mr-3")
          label(class="switch")
            input(@change="toggleDark()" v-model="toggle" type="checkbox")
            span(class="slider round")
        IconMdiWeatherNight(v-if="toggle" class="mr-3" width="2.5em" height="2.5em" color="#71828a")
        IconMdiWeatherSunny(v-else class="mr-3" width="2.5em" height="2.5em" color="#dbbf32")
    div(class="flex items-center mx-2")
      input(v-model="pencarian" @keyup.enter="getPencarian()" style="height:40px;width:400px" placeholder="Province / City" class="mr-2 dark:bg-gray-900 border p-2 border-2 border-grey-900 rounded-md")
      button(@click="getPencarian()" class="border rounded-lg dark:bg-gray-900 p-2 bg-[#1da1f2] text-white") Search
  div(v-else)
    div(class="grid grid-cols-2 gap-2 card dark:bg-gray-900 border p-1")
      div(class="flex items-center")
          img(src="/img/cuaca_logo.png", alt="alt" style="width:70px")
          h2(class="ml-3 text-xl") Info Cuaca
      div(class="flex items-center justify-between")
        div(class="flex items-center")
          input(v-model="pencarian" @keyup.enter="getPencarian()" style="height:40px;width:400px" placeholder="Province / City" class="mr-2 dark:bg-gray-900 border p-2 border-2 border-grey-900 rounded-md")
          button(@click="getPencarian()" class="border rounded-lg dark:bg-gray-900 p-2 bg-[#1da1f2] text-white") Search
        div(class="flex items-center")
          div(class="toggle mr-3")
            label(class="switch")
              input(@change="toggleDark()" v-model="toggle" type="checkbox")
              span(class="slider round")
          IconMdiWeatherNight(v-if="toggle" class="mr-3" width="2.5em" height="2.5em" color="#71828a")
          IconMdiWeatherSunny(v-else class="mr-3" width="2.5em" height="2.5em" color="#dbbf32")
  
</template>

<script>
import { ref, defineProps, defineEmits } from 'vue'
import { toggleDark } from '@/composables'
export default {
  props: ['isSmallerThanSm'],
  setup(props, context) {
    const toggle = ref(useDark().value)
    const emits = defineEmits(['getPencarian'])
    const pencarian = ref('')

    function getPencarian() {
      context.emit('getPencarian', pencarian.value)
      // this.$emit('getPencarian', pencarian.value)
      // emits('getPencarian', pencarian.value)
    }

    // console.log('emit', context.emit)

    return {
      toggle,
      pencarian,
      toggleDark,
      getPencarian,
    }
  },
}
</script>

<style></style>
