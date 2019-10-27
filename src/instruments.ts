import { makeDraggable } from './draggable'

export enum Instrument {
    Okedo = 'okedo'
}

export function createInstrument(instrument : Instrument, mapa : HTMLElement, x : number, y : number) {
    let newInstrument = document.createElement("div")
    newInstrument.classList.add(instrument)
    newInstrument.classList.add('taiko')
    newInstrument.setAttribute('data-type', instrument)
    makeDraggable(newInstrument)
    mapa.append(newInstrument)
    newInstrument.style.left = mapa.offsetWidth / 2 - newInstrument.offsetWidth / 2 + x + 'px'
    newInstrument.style.top = mapa.offsetHeight / 2 - newInstrument.offsetHeight / 2 + y + 'px'
}
