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

export function createInstrument(instrument : InstrumentType, map : HTMLElement, x : number, y : number, diameter : number) {
    let newInstrument = <InstrumentData>{
        type : instrument,
        x : x,
        y : y,
        alpha : 0,
        diameter : diameter
    }
    let element = document.createElement("div")
    element.classList.add(instrument)
    element.classList.add('taiko')
    element.setAttribute('data-type', instrument)
    element.style.height = diameter * shaku + 'px'
    element.style.width = diameter * shaku + 'px'
    element.style.left = map.offsetWidth / 2 - diameter * shaku / 2 + x + 'px'
    element.style.top = map.offsetHeight / 2 - diameter * shaku / 2 + y + 'px'
    makeDraggable(element)
    map.append(element)
    
    instruments.push(newInstrument)
}

export function clearInstruments(map : HTMLElement) {
    instruments = []
    map.querySelectorAll('.taiko').forEach((element : HTMLElement) => {
        element.remove()
    })
}

var instruments = Array<InstrumentData>()
export function getInstruments() : Array<InstrumentData> {
    return instruments
}