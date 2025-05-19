import elEn from 'element-plus/es/locale/lang/en'
import elZhCn from 'element-plus/es/locale/lang/zh-cn'
import { merge } from 'es-toolkit'
import en from './en'
import zhCn from './zh-cn'

export default {
  en: {
    description: 'English (US)',
    translation: merge(elEn, en)
  },
  zhCn: {
    description: '简体中文',
    translation: merge(elZhCn, zhCn)
  },
}
