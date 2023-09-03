<template lang="pug">
  div
    Header(@getPencarian="getWeather" :isSmallerThanSm="isSmallerThanSm")
    div(v-if="isSmallerThanSm")
      div(v-if="loadApi")
        div(class="animate-pulse space-x-2 mx-2")
          div(class="bg-slate-200 h-20 w-full rounded")
          div(class="flex-1 mt-2 space-y-6 py-1")
            div(class="h-4 bg-slate-200 rounded w-full")
            div(class="space-y-3")
              div(class="grid grid-cols-3 gap-4")
                div(class="h-4 bg-slate-200 rounded col-span-2")
                div(class="h-4 bg-slate-200 rounded col-span-1")
      div(v-else)
        div(v-if="current && location" class="p-6 mt-3 text-sm dark:bg-gray-900 mx-2")
          div(class="flex justify-between")
            div
              div(class="text-5xl") {{ current.temp_c }}&deg C
              div(class="mt-2 text-2xl") {{location.name}} 
            div
              img(:src="current.condition.icon", style="width:65px;height:65px" alt="alt")
              div(class="text-md") {{ current.condition.text }}
          div
            div(class="mt-6") Feels like {{ current.feelslike_c }}&deg C
            div {{ $moment(location.localtime).format('LLLL') }}
      div(class="card p-6 mt-1 text-sm dark:bg-gray-900 border mx-2")
        div(v-if="loadApi")
          Skeleton
          Skeleton
        div(v-else)
          div(v-if="tempForecastDay" class="grid grid-cols-1 divide-y")
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
          div(class="mt-2")
            center
              div(v-if="current" class="grid grid-cols-3 divide-x-4")
                div(class="text-center")
                  center
                    IconMdiSunWireless(width="3em" height="3em" color="#dbbf32")
                  div(class="font-bold") Index UV
                  div(:style="current.uv < 3 ? 'color:green' : current.uv < 6 ? 'color:yellow' : current.uv < 8 ? 'color:orange' : current.uv < 11 ? 'color:red' : 'color:purple'") {{ current.uv < 3 ? 'Rendah' : current.uv < 6 ? 'Moderate' : current.uv < 8 ? 'High' : current.uv < 11 ? 'Very High' : 'Extreme'}}
                div(class="text-center")
                  center
                    IconMdiWaterPercent( width="3em" height="3em" color="#42a8d4")
                  div(class="font-bold") Humidity
                  div {{current.humidity}}%
                div(class="text-center")
                  center
                    IconMdiWeatherWindy(width="3em" height="3em" color="#71828a")
                  div(class="font-bold") Wind
                  div {{ current.wind_kph }} kph
      div(v-if="forecast" class="card p-2 mt-2 mx-2 dark:bg-gray-900 border")
        template(v-for="(item,index) in forecast.forecastday")
          div(v-if="index > 0" class="mt-1 border rounded-lg p-1 flex justify-between")
            div(class="font-bold") {{ $moment(item.date).format('dddd') }}
            div(class="flex items-center")
              div(class="mx-2 flex items-center") 
                IconMdiWaterPercent( width="25px" height="25px" color="#42a8d4") 
                div {{item.day.avghumidity}}%
              div(class="mx-2")
                img(:src="item.day.condition.icon" style="width:25px;height:25px" alt="alt")
              div(class="mx-2") {{Math.round(item.day.maxtemp_c)}}&degC / {{Math.round(item.day.mintemp_c)}}&degC
      div(class="card p-2 mt-2 mx-2 dark:bg-gray-900 border overflow-x-auto")
        div(v-if="loadApi")
          Skeleton
        div(v-else)
          WebForecastHour(:chartData="chartData" :forecast="forecast")
    div(v-else)
      div(class="grid grid-cols-3 gap-2 m-2")
        div(class="card p-6 text-sm dark:bg-gray-900 border")  
          div(v-if="loadApi")     
            div(class="animate-pulse space-x-2")
              div(class="bg-slate-200 h-20 w-full rounded")
              div(class="flex-1 mt-2 space-y-6 py-1")
                div(class="h-4 bg-slate-200 rounded w-full")
                div(class="space-y-3")
                  div(class="grid grid-cols-3 gap-4")
                    div(class="h-4 bg-slate-200 rounded col-span-2")
                    div(class="h-4 bg-slate-200 rounded col-span-1")
            Skeleton
          div(v-else)
            WebCurrent(:current="current" :location="location" :tempForecastDay="tempForecastDay")        
        div(class="card col-span-2 dark:bg-gray-900 border")
          div(v-if="loadApi")
            Skeleton
            Skeleton
          div(v-else)
            WebForecastDay(:tempForecastDay="tempForecastDay" :location="location" :forecast="forecast")
      div(class="card p-2 mt-2 mx-2 dark:bg-gray-900 border overflow-x-auto")
        div(v-if="loadApi")
          Skeleton
        div(v-else)
          WebForecastHour(:chartData="chartData" :forecast="forecast")
    Footer

</template>
<script lang="ts">
import { ref, onMounted, computed } from 'vue'
import NProgress from 'nprogress'
import ApiService from '@/services/ApiWeather'
import { toggleDark } from '@/composables'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default {
  setup() {
    const current = ref(null)
    const location = ref(null)
    const forecast = ref(null)
    const tempForecastDay = ref(null)
    const screenWidth = ref(window.innerWidth)
    const locationUser = ref(null)
    const error = ref(null)
    const loadApi = ref(true)

    const chartData = ref({
      labels: [''],
      data: [10],
    })

    // live breakpoint
    const breakpoints = useBreakpoints({
      mobile: 540,
    })
    const isSmallerThanSm = ref(false)
    const updateBreakpoint = () => {
      isSmallerThanSm.value = breakpoints.isSmaller('mobile')
    }
    window.addEventListener('resize', () => {
      screenWidth.value = window.innerWidth
      updateBreakpoint()
      console.log('isSmallerThanSm', isSmallerThanSm.value)
    })
    updateBreakpoint()

    // make a chart
    async function chartForecastTimeToday(dataForecast) {
      console.log('test jalan')
      const labels = []
      const data = []
      for (let i = 0; i < dataForecast.forecastday[0].hour.length; i++) {
        labels.push(dataForecast.forecastday[0].hour[i].temp_c)
        data.push(dataForecast.forecastday[0].hour[i].temp_c)
      }
      chartData.value = {
        labels: labels,
        data: data,
      }
    }

    // get API Weather
    async function getWeather(paramSearch) {
      loadApi.value = true
      // console.log('latlong', latlong)
      // console.log('paramSearch', paramSearch)
      NProgress.start()
      try {
        var params = new URLSearchParams()
        if (paramSearch) {
          params.append('q', paramSearch)
        } else {
          if (locationUser.value == null) {
            params.append('q', 'jakarta')
          } else {
            params.append('q', locationUser.value.latitude + ',' + locationUser.value.longitude)
          }
        }
        params.append('days', 8)
        var request = {
          params: params,
        }
        const response = await ApiService.apiGetForecastWeather(request)
        // then
        let { data } = response
        current.value = data.current
        location.value = data.location
        forecast.value = data.forecast
        if (forecast.value) {
          tempForecastDay.value = forecast.value.forecastday[1]
          chartForecastTimeToday(forecast.value)
          console.log('tempForecastDay', tempForecastDay.value)
        }
        loadApi.value = false
        console.log('current', current.value)
        console.log('location', location.value)
        console.log('forecast', forecast.value)
      } catch (err) {
        NProgress.done()
        console.log('err', err)
      }
    }

    // get location
    function getLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            locationUser.value = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
            this.getWeather()
            error.value = null
          },
          (errors) => {
            locationUser.value = null
            error.value = `Error getting location: ${errors.message}`
            this.getWeather()
          }
        )
      } else {
        error.value = 'Geolocation is not supported by your browser.'
        this.getWeather()
      }
    }

    return {
      loadApi,
      screenWidth,
      isSmallerThanSm,
      locationUser,
      current,
      location,
      forecast,
      chartData,
      tempForecastDay,
      getWeather,
      toggleDark,
      getLocation,
    }
  },

  async created() {
    await this.getWeather()
    await this.getLocation()
    // await this.getWeather()
    // console.log(this.weather) // 0
  },
}
</script>
<style></style>
