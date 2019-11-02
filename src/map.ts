import { meter } from './constants'
import '../style/map.less'
import { clearInstruments } from './instruments'

export interface MapData {
    height : number,
    width : number
}

export function initMap(height : number, width : number, map : HTMLElement)  {
    clearInstruments(map)
    map.style.display = 'block'
    map.style.height = height * meter + 'px'
    map.style.width = width * meter + 'px'
    map.style.backgroundPositionX = Math.round(width * meter / 2) + 'px'
    map.style.backgroundPositionY = Math.round(height * meter / 2) + 'px'
    map.setAttribute('data-height', height.toString())
    map.setAttribute('data-width', width.toString())

    let corner = document.getElementById('corner')
    corner.style.top = height * meter - 1 + 'px'
    corner.style.left = width * meter - 1 + 'px'
}
