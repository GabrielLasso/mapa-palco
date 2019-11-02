import '../style/ui-components.less'

import { initSelection, selectElement } from './selection'
import { deleteSelectedInstruments } from './instruments'
import { initSideMenuListeners } from './sidemenu'

let map = document.getElementById('map')

window.onload = () => {
    initSideMenuListeners(map)
    initSelection(map)
}

document.onkeydown = (event : KeyboardEvent) => {
    if (event.key == "Delete") {
        deleteSelectedInstruments(map)
    }
}
