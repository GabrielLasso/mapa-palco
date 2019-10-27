import { makeDraggable } from './draggable'

export enum InstrumentType {
    Okedo = 'okedo'
}

export interface InstrumentData {
    type : InstrumentType,
    x : number,
    y : number
}

export function createInstrument(instrument : InstrumentType, map : HTMLElement, x : number, y : number) {
    let newInstrument = document.createElement("div")
    newInstrument.classList.add(instrument)
    newInstrument.classList.add('taiko')
    newInstrument.setAttribute('data-type', instrument)
    makeDraggable(newInstrument)
    map.append(newInstrument)
    newInstrument.style.left = map.offsetWidth / 2 - newInstrument.offsetWidth / 2 + x + 'px'
    newInstrument.style.top = map.offsetHeight / 2 - newInstrument.offsetHeight / 2 + y + 'px'
}
