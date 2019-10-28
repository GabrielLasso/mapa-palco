import { map } from './global'

let startingX: number
let startingY: number
let isSelecting: boolean = false

function interscts(r1: ClientRect, r2: ClientRect): boolean {
    if (r1.left + r1.width >= r2.left &&
        r1.left <= r2.left + r2.width &&
        r1.top + r1.height >= r2.top &&
        r1.top <= r2.top + r2.height) {
        return true;
    }
    return false;
}

function querySelectorRect(query: string, r: ClientRect): NodeListOf<HTMLElement> {
    let elements = map.querySelectorAll(query)

    let filteredList = []
    elements.forEach((element) => {
        if (interscts(element.getBoundingClientRect(), r)) {
            filteredList.push(element)
        }
    })

    return filteredList as unknown as NodeListOf<HTMLElement>
}

export function selectElement(element: HTMLElement) {
    element.classList.add('selected')
}

export function clearSelection() {
    for (let index = 0; index < map.children.length; index++) {
        map.children.item(index).classList.remove('selected')
    }
}

export function initSelection() {
    let selection = document.getElementById("selection")
    map.onmousedown = (mouseDown) => {
        if ((mouseDown.target as HTMLElement).id != 'map') {
            return
        }
        clearSelection()
        isSelecting = true
        startingX = mouseDown.clientX - map.offsetLeft
        startingY = mouseDown.clientY - map.offsetTop
        selection.style.display = 'block'
        selection.style.left = startingX + 'px'
        selection.style.top = startingY + 'px'
        selection.style.height = '0px'
        selection.style.width = '0px'

        function onMouseMove(mouseMove: MouseEvent) {
            let x = mouseMove.clientX - map.offsetLeft
            let y = mouseMove.clientY - map.offsetTop
            if (x < 0) {
                x = 0
            }
            if (y < 0) {
                y = 0
            }
            if (x > map.offsetWidth) {
                x = map.offsetWidth
            }
            if (y > map.offsetHeight) {
                y = map.offsetHeight
            }
            let width = Math.abs(startingX - x)
            let height = Math.abs(startingY - y)
            selection.style.left = Math.min(startingX, x) + 'px'
            selection.style.top = Math.min(startingY, y) + 'px'
            selection.style.height = height + 'px'
            selection.style.width = width + 'px'
            clearSelection()
            querySelectorRect('.taiko', selection.getBoundingClientRect()).forEach(selectElement)
        }

        function onMouseUp(mouseUp: MouseEvent) {
            isSelecting = false
            selection.style.display = 'none'
            document.removeEventListener('mouseup', onMouseUp)
            document.removeEventListener('mousemove', onMouseMove)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }
}
