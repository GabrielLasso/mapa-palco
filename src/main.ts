import { mapa, setMapa } from './global'
import { initSelection } from './selection'
import { createInstrument, Instrument } from './instruments'

window.onload = () => {
    setMapa(document.getElementById("mapa"))
    initSelection()
}

document.getElementById('add').onclick = (event) => {
    createInstrument(Instrument.Okedo, mapa, 0, 0)
}
