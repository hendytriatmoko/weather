<template lang="pug">
  div(:style="dataSnackbar.value ? 'width:300px;opacity:1;scale:1' : 'width:300px;opacity:0;scale:0'" class="fixed left-1/2 transform -translate-x-1/2 transform transition-all duration-300 ease-in-out")
    div(:class="dataSnackbar.color == 'success' ? 'flex justify-between items-center bg-[#209d78] text-white rounded shadow-lg p-4' : 'flex justify-between items-center bg-[#cc3939] text-white rounded shadow-lg p-4'")
      div {{dataSnackbar.text}}
      IconMdiCloseCircleOutline(width="2em" height="2em" color="white")
</template>

<script>
export default {
  name: 'snackbar',
  props: ['dataSnackbar'],
}
</script>

<style></style>
