import {mapa, setMapa} from './global'
import {selectElement, initSelection, clearSelection} from './selection'
import {makeDraggable} from './draggable'

window.onload = () => {
    (document.querySelectorAll(".draggable") as NodeListOf<HTMLElement>).forEach (makeDraggable)
    setMapa(document.getElementById("mapa"))
    initSelection()
}

