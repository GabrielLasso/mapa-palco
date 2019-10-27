import { mapa } from './global'

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
    let elements = mapa.querySelectorAll(query)

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
    for (let index = 0; index < mapa.children.length; index++) {
        mapa.children.item(index).classList.remove('selected')
    }
}

export function initSelection() {
    let selection = document.getElementById("selection")
    mapa.onmousedown = (mouseDown) => {
        if ((mouseDown.target as HTMLElement).id != 'mapa') {
            return
        }
        clearSelection()
        isSelecting = true
        startingX = mouseDown.clientX
        startingY = mouseDown.clientY
        selection.style.display = 'block'
        selection.style.left = startingX + 'px'
        selection.style.top = startingY + 'px'
        selection.style.height = '0px'
        selection.style.width = '0px'

        function onMouseMove(mouseMove: MouseEvent) {
            let width = Math.abs(startingX - mouseMove.clientX)
            let height = Math.abs(startingY - mouseMove.clientY)
            selection.style.left = Math.min(startingX, mouseMove.clientX) + 'px'
            selection.style.top = Math.min(startingY, mouseMove.clientY) + 'px'
            selection.style.height = height + 'px'
            selection.style.width = width + 'px'
            clearSelection()
            querySelectorRect('.draggable', selection.getBoundingClientRect()).forEach(selectElement)
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
