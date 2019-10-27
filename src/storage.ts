import { map } from './global'
import { MapData, initMap } from './map'
import { InstrumentData, InstrumentType, createInstrument } from './instruments'

interface SaveData {
    map : MapData,
    instruments : Array<InstrumentData>
}

export function save() {
    let data : SaveData = {
        map : {
            height : 8.0,
            width : 12.0
        },
        instruments : Array<InstrumentData>()
    }
    map.querySelectorAll('.taiko').forEach((element : HTMLElement) => {
        data.instruments.push({
            type : element.getAttribute('data-type') as InstrumentType,
            x : element.offsetLeft + element.offsetWidth / 2 - map.offsetWidth / 2,
            y : element.offsetTop + element.offsetHeight / 2 - map.offsetHeight / 2
        })
    });
    (document.getElementById('json') as HTMLTextAreaElement).value = JSON.stringify(data)
}

export function load() {
    let json = (document.getElementById('json') as HTMLTextAreaElement).value
    console.log(json)
    let data : SaveData = JSON.parse(json)
    initMap(data.map.height, data.map.width)
    data.instruments.forEach((instrument) => {
        createInstrument(instrument.type, map, instrument.x, instrument.y)
    })
}