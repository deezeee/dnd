import React, { useEffect, useRef, useState } from 'react';
import Draggable from './Draggable';
import { intersectorObserve } from './intersectorObserve';

export default function Dropable({
    children,
}) {
    const [items, setItems] = useState(children);

    const ref = useRef(null);

    const [movingIndex, setMovingIndex] = useState(null);

    const [overIndex, setOverIndex] = useState(null);

    const [position, setPosition] = useState({ left: 0, top: 0 });

    useEffect(() => {
        if (ref.current === null) {
            return;
        }
        const rect = ref.current.getBoundingClientRect();
        setPosition({ left: rect.x, top: rect.y });
    }, []);

    const changeOrder = () => {
        if (movingIndex === null || overIndex === null) {
            return;
        }

        setItems(current => {
            const shadow = [...current];
            const movingItem = shadow[movingIndex];
            shadow.splice(movingIndex, 1);
            shadow.splice(overIndex , 0, movingItem);
            return shadow;
        });
    };

    return (
        <div
            className="dropable"
            style={{
                position: 'relative',
            }}
            ref={ref}
        >
            {items.map((item, index) => (
                <Draggable
                    key={`${item}--${index}`}
                    containerPosition={position}
                    index={index}
                    onMoving={setMovingIndex}
                    onMovingOver={movingIndex !== null ? setOverIndex : () => undefined}
                    onMovingEnd={changeOrder}
                >
                    {item}
                </Draggable>
            ))}
        </div>
    );
}
