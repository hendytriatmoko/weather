<template lang="pug">
  div(v-if="current" class="flex justify-between")
    div
      div(class="text-5xl") {{ current.temp_c }}&deg C
      div(class="mt-2 text-2xl") {{location.name}} 
    div(class="grid grid-cols-2 gap-4 py-1 pl-3")
      div(class="flex items-center")
        IconMdiWeatherSunsetUp(class="mr-3" width="3em" height="3em" color="#dbbf32")
        div(class="mr-2")
          div(class="font-bold") Sunrise
          div {{ tempForecastDay.astro.sunrise }}
      div(class="flex items-center")
        IconMdiWeatherSunsetDown(class="mr-3" width="3em" height="3em" color="#dbbf32")
        div(class="mr-2")
          div(class="font-bold") Sunset
          div {{ tempForecastDay.astro.sunset }}
  div(v-if="current" class="flex items-center justify-between")
    div
      div(class="mt-6") Feels like {{ current.feelslike_c }}&deg C
      div {{ $moment(location.localtime).format('LLLL') }}
    div(class="flex items-center")
      img(:src="current.condition.icon", style="width:45px;height:45px" alt="alt")
      div(class="text-md") {{ current.condition.text }}
  div( v-if="current" class="mt-5")
    center
      div(class="grid grid-cols-3 divide-x-4")
        div(class="text-center")
          center
            IconMdiSunWireless(width="4em" height="4em" color="#dbbf32")
          div(class="font-bold") Index UV
          div(:style="current.uv < 3 ? 'color:green' : current.uv < 6 ? 'color:yellow' : current.uv < 8 ? 'color:orange' : current.uv < 11 ? 'color:red' : 'color:purple'") {{ current.uv < 3 ? 'Rendah' : current.uv < 6 ? 'Moderate' : current.uv < 8 ? 'High' : current.uv < 11 ? 'Very High' : 'Extreme'}}
        div(class="text-center")
          center
            IconMdiWaterPercent( width="4em" height="4em" color="#42a8d4")
          div(class="font-bold") Humidity
          div {{current.humidity}}%
        div(class="text-center")
          center
            IconMdiWeatherWindy(width="4em" height="4em" color="#71828a")
          div(class="font-bold") Wind
          div {{ current.wind_kph }} kph
</template>

<script>
export default {
  name: 'current',
  props: ['current', 'location', 'tempForecastDay'],
  setup(props, context) {
    console.log('ini current props', props.current)
    console.log('ini location props', props.location)
  },
}
</script>

<style></style>
