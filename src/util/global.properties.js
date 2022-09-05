import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import mitt from 'mitt'

export default function globalProperties(app) {
    dayjs.locale('zh-cn')
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$mitt = new mitt();
}
