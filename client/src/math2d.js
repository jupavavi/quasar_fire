export const ELLIPSON = 1e-4;

export const getPixelCoordsTransform = (viewport, pixelRect) => {
    const { x: vx, y: vy, width: vw, height: vh } = viewport;
    const { x: px, y: py, width: pw, height: ph } = pixelRect;
    const hpw = pw * 0.5;
    const hph = ph * 0.5;
    return [
        hpw * (1 - vx) / vw, 0, // col0 (x-axis)
        0, hph * (1 - vy) / vh, // col1 (y-axis)
        hpw + px, hph + py, // col2 (translation)
    ];
};

export const getInvPixelCoordsTransform = (viewport, pixelRect) => {
    const { x: vx, y: vy, width: vw, height: vh } = viewport;
    const { x: px, y: py, width: pw, height: ph } = pixelRect;
    const wp = 2 * vw / pw;
    const hp = 2 * vh / ph;
    return [
        wp, 0, // col0 (x-axis)
        0, hp, // col1 (y-axis)
        vx - vw - wp * px, vy - vh - hp * py, // col2 (translation)
    ];
};

export const transformPoint = (p, mat2) => [
    mat2[0] * p[0] + mat2[2] * p[1] + mat2[4],
    mat2[1] * p[0] + mat2[3] * p[1] + mat2[5],
];

/**
 * Calculate the distance between two points
 * 
 * @param {Array<number>} p1 first point
 * @param {Array<number>} p2 second point
 * @return {number} the distance between two 2d points
 */
export const distance = (p1, p2) => Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);

export const getBounds = (...points) => {
    const xValues = points.reduce((p) => p[0]);
    const yValues = points.reduce((p) => p[1]);
    return {
        min: [
            Math.min(...xValues),
            Math.min(...yValues),
        ],
        max: [
            Math.max(...xValues),
            Math.max(...yValues),
        ],
    };
};
