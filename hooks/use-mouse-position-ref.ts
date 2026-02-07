import { RefObject, useEffect, useRef } from "react"

export const useMousePositionRef = (
    containerRef?: RefObject<HTMLElement | SVGElement | null>
) => {
    const positionRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const updatePosition = (x: number, y: number) => {
            if (containerRef && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()

                // Calculate position relative to container center
                // This is usually preferred for parallax/floating effects 
                // to ensure zero displacement at the center.
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2

                positionRef.current = {
                    x: x - centerX,
                    y: y - centerY
                }
            } else {
                // Fallback to absolute screen position if no container
                positionRef.current = { x, y }
            }
        }

        const handleMouseMove = (ev: MouseEvent) => {
            updatePosition(ev.clientX, ev.clientY)
        }

        const handleTouchMove = (ev: TouchEvent) => {
            const touch = ev.touches[0]
            updatePosition(touch.clientX, touch.clientY)
        }

        // Listen for both mouse and touch events
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("touchmove", handleTouchMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("touchmove", handleTouchMove)
        }
    }, [containerRef])

    return positionRef
}
