import '../style/selection.less'

let startingX: number
let startingY: number

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
    let elements = document.querySelectorAll(query)

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

export function clearSelection(parent : HTMLElement) {
    for (let index = 0; index < parent.children.length; index++) {
        parent.children.item(index).classList.remove('selected')
    }
}

export function initSelection(parent : HTMLElement) {
    let selection = document.createElement("selection-area")
    parent.append(selection)
    parent.onmousedown = (mouseDown) => {
        if (mouseDown.target != parent) {
            return
        }
        clearSelection(parent)
        startingX = mouseDown.clientX - parent.offsetLeft + window.pageXOffset
        startingY = mouseDown.clientY - parent.offsetTop + window.pageYOffset
        selection.style.display = 'block'
        selection.style.left = startingX + 'px'
        selection.style.top = startingY + 'px'
        selection.style.height = '0px'
        selection.style.width = '0px'

        function onMouseMove(mouseMove: MouseEvent) {
            let x = mouseMove.clientX - parent.offsetLeft + window.pageXOffset
            let y = mouseMove.clientY - parent.offsetTop + window.pageYOffset
            if (x < 0) {
                x = 0
            }
            if (y < 0) {
                y = 0
            }
            if (x > parent.offsetWidth) {
                x = parent.offsetWidth
            }
            if (y > parent.offsetHeight) {
                y = parent.offsetHeight
            }
            let width = Math.abs(startingX - x)
            let height = Math.abs(startingY - y)
            selection.style.left = Math.min(startingX, x) + 'px'
            selection.style.top = Math.min(startingY, y) + 'px'
            selection.style.height = height + 'px'
            selection.style.width = width + 'px'
            clearSelection(parent)
            querySelectorRect('.selectable', selection.getBoundingClientRect()).forEach(selectElement)
        }

        function onMouseUp(mouseUp: MouseEvent) {
            selection.style.display = 'none'
            document.removeEventListener('mouseup', onMouseUp)
            document.removeEventListener('mousemove', onMouseMove)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }
}
