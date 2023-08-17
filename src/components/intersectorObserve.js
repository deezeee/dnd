export function intersectorObserve({
    src,
    target,
    callback = () => undefined,
}) {
    const observer = new IntersectionObserver(callback, {
        root: src,
        threshold: 0.2,
    });

    observer.observe(target);
}
