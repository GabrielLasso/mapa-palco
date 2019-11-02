import { initSelection } from './selection'
import { createInstrument, InstrumentType } from './instruments'
import { initMap } from './map'
import { mapToJson, load, SaveData } from './storage'

let map = document.getElementById('map')

window.onload = () => {
    initSelection(map)
}

document.getElementById('add').onclick = (event) => {
    createInstrument(InstrumentType.Okedo, map, 0, 0, 0, 1.5)
}

document.getElementById('save').onclick = (event) => {
    let anchor = document.getElementById("download") as HTMLAnchorElement
    anchor.download = "mapa.taiko"
    anchor.href = "data:text/json;charset=utf-8," + encodeURIComponent(mapToJson(map))
    anchor.click()
}

document.getElementById('load').onchange = (event : InputEvent) => {
    let file = (event.target as HTMLInputElement).files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (loadEvent) => {
        let data = JSON.parse(loadEvent.target.result.toString()) as SaveData
        load(map, data)
    }
}

document.getElementById('new').onclick = (event) => {
    let height = parseInt((document.getElementById('height') as HTMLInputElement).value)
    let width = parseInt((document.getElementById('width') as HTMLInputElement).value)
    initMap(height, width, map)
}