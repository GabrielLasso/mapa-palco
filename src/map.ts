import { setMap, map, meter } from './global'

export interface MapData {
    height : number,
    width : number
}

export function initMap(height : number, width : number) {
    setMap(document.getElementById("map"))
    map.querySelectorAll('.taiko').forEach((element : HTMLElement) => {
        element.remove()
    })
    map.style.height = height * meter + 'px'
    map.style.width = width * meter + 'px'
}
