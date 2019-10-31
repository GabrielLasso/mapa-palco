import { clearSelection, selectElement } from './selection'
import { map } from './global'

export function makeDraggable(element: HTMLElement) {
    element.onmousedown = (event) => {
        event.preventDefault()

        let shiftX = event.clientX - element.offsetLeft
        let shiftY = event.clientY - element.offsetTop

        clearSelection()
        selectElement(element)

        function onMouseMove(event: MouseEvent) {
            let newLeft = event.clientX - shiftX
            let newTop = event.clientY - shiftY

            if (newLeft < 0) {
                newLeft = 0
            }
            if (newTop < 0) {
                newTop = 0
            }
            let rightEdge = map.clientWidth - element.clientWidth
            if (newLeft > rightEdge) {
                newLeft = rightEdge
            }
            let bottomEdge = map.clientHeight - element.clientHeight
            if (newTop > bottomEdge) {
                newTop = bottomEdge
            }

            element.style.left = newLeft + 'px'
            element.style.top = newTop + 'px'
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