import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/modules/i18n'
import VueDateFormat from '@voidsolutions/vue-dateformat'
import moment from 'moment';

import App from './App.vue'
import router from './router'

// css
import './assets/sass/app.scss'
import './assets/css/vendor.css'

const app = createApp(App)
app.use(i18n)
app.use(createPinia())
// app.use(VueDateFormat)
app.config.globalProperties.$moment = moment;
app.use(router)

app.mount('#app')
