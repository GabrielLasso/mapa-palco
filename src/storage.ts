import { map } from './global'
import { MapData, initMap } from './map'
import { InstrumentData, InstrumentType, createInstrument, getInstruments } from './instruments'
import { encode, decode } from 'json-lzw'

interface SaveData {
    map : MapData,
    instruments : Array<InstrumentData>
}

export function save() {
    let height = parseInt(map.getAttribute('data-height'));
    let width = parseInt(map.getAttribute('data-width'));
    let data : SaveData = {
        map : {
            height : height,
            width : width
        },
        instruments : getInstruments()
    };
    console.log(getInstruments());
    (document.getElementById('json') as HTMLTextAreaElement).value = JSON.stringify(data);
    (document.getElementById('min-json') as HTMLTextAreaElement).value = encode(JSON.stringify(data));
}

export function load() {
    let json = (document.getElementById('json') as HTMLTextAreaElement).value
    let data : SaveData = JSON.parse(json)
    initMap(data.map.height, data.map.width)
    data.instruments.forEach((instrument) => {
        createInstrument(instrument.type, map, instrument.x, instrument.y)
    })
}