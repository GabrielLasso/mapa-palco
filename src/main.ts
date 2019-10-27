import { mapa, setMapa } from './global'
import { initSelection } from './selection'
import { createInstrument, InstrumentType, Instrument } from './instruments'

window.onload = () => {
    setMapa(document.getElementById("mapa"))
    initSelection()
}

document.getElementById('add').onclick = (event) => {
    createInstrument(InstrumentType.Okedo, mapa, 0, 0)
}

document.getElementById('export').onclick = (event) => {
    let data : saveData = {
        map : {
            height : 10.0,
            width : 10.0
        },
        instruments : Array<Instrument>()
    }
    mapa.querySelectorAll('.taiko').forEach((element : HTMLElement) => {
        data.instruments.push({
            type : element.getAttribute('data-type') as InstrumentType,
            x : element.offsetLeft + element.offsetWidth / 2 - mapa.offsetWidth / 2,
            y : element.offsetTop + element.offsetHeight / 2 - mapa.offsetWidth / 2
        })
    })
    document.getElementById('json').textContent = JSON.stringify(data)
}

interface mapData {
    height : number,
    width : number
}

interface saveData {
    map : mapData,
    instruments : Array<Instrument>
}

function resetMap() {
    mapa.querySelectorAll('.taiko').forEach((element : HTMLElement) => {
        element.remove()
    })
}

document.getElementById('import').onclick = (event) => {
    resetMap()
    let json = document.getElementById('json').textContent
    let data : saveData = JSON.parse(json)
    data.instruments.forEach((instrument) => {
        createInstrument(instrument.type, mapa, instrument.x, instrument.y)
    })
}