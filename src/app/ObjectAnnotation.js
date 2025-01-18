function ObjectAnnotation({ detectedObject }) {

    const { label, score, box } = detectedObject;
    const { xmin, ymin, xmax, ymax } = box;
    const top = `${ymin * 100}%`;
    const left = `${xmin * 100}%`;
    const width = `${(xmax - xmin) * 100}%`
    const height = `${(ymax - ymin) * 100}%`

    const color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, 0);


    return <div className="absolute border-2" style={{
        top,
        left,
        width,
        height,
        borderColor: color
    }}>
        <span className="absolute bottom-0 left-0 text-xs text-white opacity-90 p-1"
            style={{
                backgroundColor: color
            }}>{`${label}: ${Math.floor(score * 100)}%`}</span>
    </div>
}

export default ObjectAnnotation;