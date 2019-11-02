import { initSelection } from './selection'
import { createInstrument, InstrumentType } from './instruments'
import { initMap } from './map'
import { save, load } from './storage'

let map = document.getElementById('map')

window.onload = () => {
    initSelection(map)
}

document.getElementById('add').onclick = (event) => {
    createInstrument(InstrumentType.Okedo, map, 0, 0, 0, 1.5)
}

document.getElementById('export').onclick = (event) => {
    save(map)
}

document.getElementById('import').onclick = (event) => {
    load(map)
}

document.getElementById('new').onclick = (event) => {
    let height = parseInt((document.getElementById('height') as HTMLInputElement).value)
    let width = parseInt((document.getElementById('width') as HTMLInputElement).value)
    initMap(height, width, map)
}