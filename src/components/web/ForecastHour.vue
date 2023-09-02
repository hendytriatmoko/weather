<template lang="pug">
  div(style="width:1480px")
    div(class="mx-2 pl-1")
      LineChart(:chartData="chartData")
    div(class="flex justify-between")
      template(v-for="item in forecast.forecastday[0].hour" :key="item.time")
        div
          center
            div {{item.temp_c}}&degC
            img(:src="item.condition.icon", alt="alt")
            div {{ $moment(item.time).format('HH:mm') }}
</template>

<script>
export default {
  name: 'forecast-hour',
  props: ['chartData', 'forecast'],
  setup(props, context) {},
}
</script>

<style></style>
