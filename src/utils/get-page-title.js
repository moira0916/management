import defaultSettings from '@/settings'


const title = defaultSettings.title || 'Junxi HR Management Platform'

export default function getPageTitle(pageTitle) {
  // if (pageTitle) {
  //   return `${pageTitle} - ${title}`
  // }
  return `${title}`
}
