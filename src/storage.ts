import { shaku } from './constants'
import { MapData, initMap } from './map'
import { InstrumentData, InstrumentType, createInstrument } from './instruments'

interface SaveData {
    map : MapData,
    instruments : Array<InstrumentData>
}

export function save(map : HTMLElement) {
    let height = parseInt(map.getAttribute('data-height'));
    let width = parseInt(map.getAttribute('data-width'));
    let data : SaveData = {
        map : {
            height : height,
            width : width
        },
        instruments : Array<InstrumentData>()
    };
    document.querySelectorAll('e-taiko').forEach((element : HTMLElement) => {
        data.instruments.push({
            type : element.getAttribute('data-type') as InstrumentType,
            x : element.offsetLeft + element.clientWidth / 2 - map.clientWidth / 2,
            y : element.offsetTop + element.clientHeight / 2 - map.clientHeight / 2,
            alpha : 0,
            diameter : element.clientWidth / shaku
        })
    });
    (document.getElementById('json') as HTMLTextAreaElement).value = JSON.stringify(data);
}

export function load(map : HTMLElement) {
    let json = (document.getElementById('json') as HTMLTextAreaElement).value
    let data : SaveData = JSON.parse(json)
    initMap(data.map.height, data.map.width, map)
    data.instruments.forEach((instrument) => {
        createInstrument(instrument.type, map, instrument.x, instrument.y, instrument.alpha, instrument.diameter)
    })
}