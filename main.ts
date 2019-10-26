import {mapa, setMapa} from './global.js'
import {selectElement, initSelection, clearSelection} from './selection.js'
import {makeDraggable} from './draggable.js'

window.onload = () => {
    (document.querySelectorAll(".draggable") as NodeListOf<HTMLElement>).forEach (makeDraggable)
    setMapa(document.getElementById("mapa"))
    initSelection()
}

