import { makeDraggable } from './draggable'

export enum InstrumentType {
    Okedo = 'okedo'
}

export interface Instrument {
    type : InstrumentType,
    x : number,
    y : number
}

export function createInstrument(instrument : InstrumentType, mapa : HTMLElement, x : number, y : number) {
    let newInstrument = document.createElement("div")
    newInstrument.classList.add(instrument)
    newInstrument.classList.add('taiko')
    newInstrument.setAttribute('data-type', instrument)
    makeDraggable(newInstrument)
    mapa.append(newInstrument)
    newInstrument.style.left = mapa.offsetWidth / 2 - newInstrument.offsetWidth / 2 + x + 'px'
    newInstrument.style.top = mapa.offsetHeight / 2 - newInstrument.offsetHeight / 2 + y + 'px'
}
