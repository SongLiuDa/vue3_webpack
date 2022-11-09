import { createApp } from 'vue'

import svgIcon from '@/components/svgIcon'
const app = createApp({}) // svg component

// register globally
app.component('SvgIcon', svgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
