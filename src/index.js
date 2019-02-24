import './js/common'

import './scss/style.scss'

//svg

function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context('./assets/svg/', true, /\.svg$/));