import { makeDraggable } from './draggable'
import '../style/instruments.less'
import { shaku } from './global'

export enum InstrumentType {
    Okedo = 'okedo'
}

export interface InstrumentData {
    type : InstrumentType,
    x : number,
    y : number,
    alpha : number,
    diameter : number
}

export function createInstrument(instrument : InstrumentType, map : HTMLElement, x : number, y : number, alpha : number, diameter : number) {
    let newInstrument = document.createElement("div")
    newInstrument.classList.add(instrument)
    newInstrument.classList.add('taiko')
    newInstrument.setAttribute('data-type', instrument)
    newInstrument.style.height = diameter * shaku + 'px'
    newInstrument.style.width = diameter * shaku + 'px'
    newInstrument.style.left = map.clientWidth / 2 - diameter * shaku / 2 + x + 'px'
    newInstrument.style.top = map.clientHeight / 2 - diameter * shaku / 2 + y + 'px'
    makeDraggable(newInstrument)
    map.append(newInstrument)
}

export function clearInstruments(map : HTMLElement) {
    map.querySelectorAll('.taiko').forEach((element : HTMLElement) => {
        element.remove()
    })
}
