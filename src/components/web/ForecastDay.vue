<template lang="pug">
  div(v-if="location" class="text-2xl font-bold")
    center Weather Forecast in {{location.name}}
  div(class="grid grid-cols-2 gap-2")
    div(v-if="forecast && tempForecastDay" class="text-lg")
      template(v-for="(item,index) in forecast.forecastday")
        div(@click="tempForecastDay = item" v-if="index > 0" :class="item.date == tempForecastDay.date ? 'cursor-pointer mt-1 border-2 rounded-lg p-1 flex justify-between border-blue-700 dark:border-red-700' : 'cursor-pointer mt-1 border rounded-lg p-1 flex justify-between'")
          div(class="font-bold") {{ $moment(item.date).format('dddd') }}
          div(class="flex items-center")
            div(class="mx-2 flex items-center") 
              IconMdiWaterPercent( width="25px" height="25px" color="#42a8d4") 
              div 6%
            div(class="mx-2")
              img(:src="item.day.condition.icon" style="width:25px;height:25px" alt="alt")
            div(class="mx-2") {{Math.round(item.day.maxtemp_c)}}&degC / {{Math.round(item.day.mintemp_c)}}&degC
    div(v-if="tempForecastDay" class="border rounded-lg p-2 border-blue-700")
      div(class="text-lg font-bold py-3 pl-2") {{ $moment(tempForecastDay.date).format('dddd, D MMMM YYYY') }}
      div(class="flex items-center justify-between mx-2")
        div(class="flex items-center")
          div(class="mr-2 text-lg") {{tempForecastDay.day.avgtemp_c}}&degC
          img(:src="tempForecastDay.day.condition.icon" style="width:60px;height:60px" alt="alt")
        div
          div(class="flex items-center")
            IconMdiSunWireless(class="mr-3" width="2em" height="2em" color="#dbbf32")
            div(class="mr-2") Index UV
            span(:style="tempForecastDay.day.uv < 3 ? 'color:green' : tempForecastDay.day.uv < 6 ? 'color:yellow' : tempForecastDay.day.uv < 8 ? 'color:orange' : tempForecastDay.day.uv < 11 ? 'color:red' : 'color:purple'") {{ tempForecastDay.day.uv < 3 ? 'Rendah' : tempForecastDay.day.uv < 6 ? 'Moderate' : tempForecastDay.day.uv < 8 ? 'High' : tempForecastDay.day.uv < 11 ? 'Very High' : 'Extreme'}}
          div(class="flex items-center mt-1")
            IconMdiWeatherWindy(class="mr-3" width="2em" height="2em" color="#71828a")
            div(class="mr-2") {{ tempForecastDay.day.maxwind_kph }} kph
      div(class="border rounded-lg p-2 mt-2")
        div(class="grid grid-cols-1 divide-y")
          div(class="grid grid-cols-2 gap-4 py-1 pl-3")
            div(class="flex items-center")
              IconMdiWeatherSunsetUp(class="mr-3" width="2em" height="2em" color="#dbbf32")
              div(class="mr-2")
                div Sunrise
                div {{ tempForecastDay.astro.sunrise }}
            div(class="flex items-center")
              IconMdiWeatherSunsetDown(class="mr-3" width="2em" height="2em" color="#dbbf32")
              div(class="mr-2")
                div Sunset
                div {{ tempForecastDay.astro.sunset }}
          div(class="grid grid-cols-2 gap-4 py-2 pl-3")
            div(class="flex items-center")
              IconMdiMoonWaningCrescent(class="mr-3" width="2em" height="2em" color="#71828a")
              div(class="mr-2")
                div Moonrise
                div {{ tempForecastDay.astro.sunset }}
            div(class="flex items-center")
              IconMdiWeatherNight(class="mr-3" width="2em" height="2em" color="#71828a")
              div(class="mr-2")
                div Moonset
                div {{ tempForecastDay.astro.sunset }}
</template>

<script>
export default {
  name: 'forecast-day',
  props: ['tempForecastDay', 'forecast', 'location'],
  setup(props, context) {},
}
</script>

<style></style>
