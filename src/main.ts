import { mapa, setMapa } from './global'
import { initSelection } from './selection'
import { makeDraggable } from './draggable'

window.onload = () => {
    (document.querySelectorAll(".draggable") as NodeListOf<HTMLElement>).forEach (makeDraggable)
    setMapa(document.getElementById("mapa"))
    initSelection()
}

