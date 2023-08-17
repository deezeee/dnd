import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import cx from 'clsx';

const Draggable = forwardRef(({
    children,
    containerPosition,
    index,
    onMoving,
    onMovingOver,
    onMovingEnd,
}, ref) => {
    const elRef = useRef(null);

    const [isMoving, setIsMoving] = useState(false);

    const [distance, setDistance] = useState({x: 0, y: 0});

    const [isMovedOver, setIsMovedOver] = useState(false);

    const changeStyle = (postion, top, left) => {
        if (elRef === null) {
            return;
        }

        elRef.current.style.position = postion;
        elRef.current.style.top = top;
        elRef.current.style.left = left;
    };

    const handleMouseMove = useCallback((ev) => {
        changeStyle(
            'absolute',
            ev.pageY - distance.y - containerPosition.top + "px",
            ev.pageX - distance.x - containerPosition.left + "px",
        );
    }, [containerPosition.top, containerPosition.left, distance.x, distance.y]);

    const handleMouseUp = useCallback(() => {
        setIsMoving(false);
        setDistance({
            x: 0,
            y: 0,
        });
        changeStyle(
            'relative',
            null,
            null,
        );
    }, []);

    useEffect(() => {
        if (isMoving) {
            window.addEventListener('mousemove', handleMouseMove);
            onMoving(index);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            onMovingEnd();
            onMoving(null);
        }

        return  () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isMoving, handleMouseMove, index, onMoving]);

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);

        return () => window.removeEventListener('mouseup', handleMouseUp)
    }, [containerPosition.x, containerPosition.y, handleMouseUp]);

    return (
        <div 
            className={cx(['draggable'])}
            ref={ref}
        >
            <div
                ref={elRef}
                onMouseDown={(ev) => {
                    setIsMoving(true);
                    const rect = elRef.current.getBoundingClientRect();
                    setDistance({
                        x: ev.pageX - rect.x,
                        y: ev.pageY - rect.y,
                    });
                }}
                onMouseEnter={() => {
                    setIsMovedOver(true);
                    onMovingOver(index);
                }}
                onMouseLeave={() => {
                    setIsMovedOver(false);
                }}
                style={{
                    cursor: isMoving ? 'move' : 'pointer',
                    zIndex: isMoving ? 99999 : 1,
                    userSelect: isMoving ? 'none' : null,
                    pointerEvents: isMoving ? 'none' : 'auto',
                    opacity: isMovedOver ? '0.6' : '1',
                }}
            >
                {children}
            </div>
        </div>
    );
});

export default Draggable;
