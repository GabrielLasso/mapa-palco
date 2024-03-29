import '../style/sidemenu.less'

import { createInstrument, InstrumentData, InstrumentType, deleteSelectedInstruments } from './instruments'
import { initMap } from './map'
import { mapToJson, load, SaveData } from './storage'

export function initSideMenuListeners(map : HTMLElement) {
    let selectedInstrument : InstrumentData

    document.getElementById('add').onclick = (event) => {
        if (selectedInstrument != null) {
            createInstrument(selectedInstrument, map)
        }
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

    document.querySelectorAll('list-item').forEach((item : HTMLElement) => {
        item.onclick = (event) => {
            document.querySelectorAll('list-item').forEach((item : HTMLElement) => {
                item.classList.remove('selected-item')
            })
            item.classList.add('selected-item')

            selectedInstrument = {
                type : item.getAttribute('data-type') as InstrumentType,
                x : 0,
                y : 0,
                alpha : 0,
                diameter : parseFloat(item.getAttribute('data-diameter'))
            }
        }
    })
}