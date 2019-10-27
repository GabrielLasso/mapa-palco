import { mapa, setMapa } from './global'
import { initSelection } from './selection'
import { makeDraggable } from './draggable'

enum Instrument {
    Okedo = 'okedo'
}

function createInstrument(instrument : Instrument, mapa : HTMLElement, x : number, y : number) {
    let newInstrument = document.createElement("div")
    newInstrument.classList.add(instrument.toString())
    newInstrument.classList.add('taiko')
    makeDraggable(newInstrument)
    mapa.append(newInstrument)
    newInstrument.style.left = mapa.offsetWidth / 2 - newInstrument.offsetWidth / 2 + x + 'px'
    newInstrument.style.top = mapa.offsetHeight / 2 - newInstrument.offsetHeight / 2 + y + 'px'
}

window.onload = () => {
    setMapa(document.getElementById("mapa"))
    initSelection()
}

document.getElementById('add').onclick = (event) => {
    createInstrument(Instrument.Okedo, mapa, 0, 0)
}
