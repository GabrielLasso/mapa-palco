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

document.getElementById('export').onclick = (event) => {
    let json = {
        map : {
            height : 10.0,
            width : 10.0
        },
        instruments : []
    }
    mapa.querySelectorAll('.taiko').forEach((element : HTMLElement) => {
        let rect = element.getBoundingClientRect()
        json.instruments.push({
            type : element.getAttribute('data-type'),
            x : element.offsetLeft + element.offsetWidth / 2 - mapa.offsetWidth / 2,
            y : element.offsetTop + element.offsetHeight / 2 - mapa.offsetWidth / 2
        })
    })
    document.getElementById('json').textContent = JSON.stringify(json)
}