import axios from 'axios'
import NProgress from 'nprogress'

const instance = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'key':'21c917bccea84394b7f160859232908'
  },
})

instance.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

instance.interceptors.response.use((response) => {
  NProgress.done()
  return response
})

export default {
  apiGetForecastWeather(param) {
    // console.log('parmnih', param)
    return instance.get('/forecast.json', param)
  },
}
