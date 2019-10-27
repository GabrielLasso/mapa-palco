import { clearSelection, selectElement } from './selection'
import { map } from './global'

export function makeDraggable(element: HTMLElement) {
    element.onmousedown = (event) => {
        event.preventDefault()

        let shiftX = event.clientX - element.getBoundingClientRect().left
        let shiftY = event.clientY - element.getBoundingClientRect().top

        clearSelection()
        selectElement(element)

        function onMouseMove(event: MouseEvent) {
            let newLeft = event.clientX - shiftX
            let newTop = event.clientY - shiftY

            if (newLeft < map.getBoundingClientRect().left) {
                newLeft = map.getBoundingClientRect().left
            }
            if (newTop < map.getBoundingClientRect().top) {
                newTop = map.getBoundingClientRect().top
            }
            let rightEdge = map.getBoundingClientRect().left + map.offsetWidth - element.offsetWidth
            if (newLeft > rightEdge) {
                newLeft = rightEdge
            }
            let bottomEdge = map.getBoundingClientRect().top + map.offsetHeight - element.offsetHeight
            if (newTop > bottomEdge) {
                newTop = bottomEdge
            }

            element.style.left = newLeft + window.pageXOffset + 'px'
            element.style.top = newTop + window.pageYOffset + 'px'
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp)
            document.removeEventListener('mousemove', onMouseMove)
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    }

    element.ondragstart = () => false
}