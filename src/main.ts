import { map } from './global'
import { initSelection } from './selection'
import { createInstrument, InstrumentType } from './instruments'
import { initMap } from './map'
import { save, load } from './storage'

window.onload = () => {
    initMap(8, 12)
    initSelection()
}

document.getElementById('add').onclick = (event) => {
    createInstrument(InstrumentType.Okedo, map, 0, 0)
}

document.getElementById('export').onclick = (event) => {
    save()
}

document.getElementById('import').onclick = (event) => {
    load()
}