import { makeDraggable } from './draggable'
import { shaku } from './constants'
import { clearSelection, selectElement, selectedElements } from './selection'
import '../style/instruments.less'

export enum InstrumentType {
    Okedo = 'okedo',
    Shime = 'shime',
    Nagado = 'nagado',
    Oodaiko = 'oodaiko'
}

export interface InstrumentData {
    type : InstrumentType,
    x : number,
    y : number,
    alpha : number,
    diameter : number
}

export function createInstrument(instrument : InstrumentType, map : HTMLElement, x : number, y : number, alpha : number, diameter : number) {
    let newInstrument = document.createElement("e-taiko")
    newInstrument.classList.add(instrument)
    newInstrument.classList.add('selectable')
    newInstrument.setAttribute('data-type', instrument)
    newInstrument.style.height = diameter * shaku + 'px'
    newInstrument.style.width = diameter * shaku + 'px'
    newInstrument.style.left = map.clientWidth / 2 - diameter * shaku / 2 + x + 'px'
    newInstrument.style.top = map.clientHeight / 2 - diameter * shaku / 2 + y + 'px'
    newInstrument.onclick = (event) => {
        clearSelection(map)
        selectElement(newInstrument)
    }
    makeDraggable(newInstrument, map)
    map.append(newInstrument)
}

export function clearInstruments(map : HTMLElement) {
    map.querySelectorAll('e-taiko').forEach((element : HTMLElement) => {
        element.remove()
    })
}

export function deleteSelectedInstruments(map : HTMLElement) {
    selectedElements(map).forEach((element : HTMLElement) => {
        element.remove()
    })
}