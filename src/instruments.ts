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

export function createInstrument(instrument : InstrumentData, map : HTMLElement) {
    let newInstrument = document.createElement("e-taiko")
    newInstrument.classList.add(instrument.type)
    newInstrument.classList.add('selectable')
    newInstrument.setAttribute('data-type', instrument.type)
    newInstrument.style.height = instrument.diameter * shaku + 'px'
    newInstrument.style.width = instrument.diameter * shaku + 'px'
    newInstrument.style.left = map.clientWidth / 2 - instrument.diameter * shaku / 2 + instrument.x + 'px'
    newInstrument.style.top = map.clientHeight / 2 - instrument.diameter * shaku / 2 + instrument.y + 'px'
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