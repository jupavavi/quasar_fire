const ELLIPSON = 1e-4;

/**
 * Given three sets of points and 3 distances, returns the point that matches
 * the distances from the given 3 points. If the calculation is not possible, the returned array will contain NaN.
 * 
 * @param {Object} pointDist1 - first set of point and distance
 * @param {Array<number>} pointDist1.position
 * @param {number} pointDist1.distance
 * @param {Object} pointDist2 - second set of position and distance
 * @param {Array<number>} pointDist2.position
 * @param {number} pointDist2.distance
 * @param {Object} pointDist3 - third set of position and distance
 * @param {Array<number>} pointDist3.position
 * @param {number} pointDist3.distance
 * @param {number} tolerance - floating position tolerance
 * 
 * @return {Array<number>} the position that matches the distances from the given 3 points. It could containt NaN.
 */
export default (
    { position: [x1, y1], distance: r1 },
    { position: [x2, y2], distance: r2 },
    { position: [x3, y3], distance: r3 },
    tolerance = ELLIPSON,
) => {
    // Using center-radius form of the circle equation
    // for each of the 3 points, a triangularization
    // can be build to calculate desired coordinates
    //
    // note: Some math is skipped for simplicity
    //
    // Given:
    // r1^2 = (x - x1)^2 + (y - y1)^2
    // r2^2 = (x - x2)^2 + (y - y2)^2
    // r3^2 = (x - x3)^2 + (y - y3)^2
    //
    // calculate x and y
    //
    // Calculate (r1^2 - r2^2) and (r1^2 - r3^2) and expand
    // gives the following equations
    //
    // equation 1a: 2*x * (x2 - x1) + 2*y * (y2 - y1) + (x1^2 - x2^2) + (y1^2 - y2^2) - (r1^2 - r2^2) = 0
    // equation 2a: 2*x * (x3 - x1) + 2*y * (y3 - y1) + (x1^2 - x3^2) + (y1^2 - y3^2) - (r1^2 - r3^2) = 0
    //
    // as x1, x2, x3, r1, r2 and r3 are known values, the following constants can be defined
    const x1p2 = x1 * x1; // x1^2
    const x2p2 = x2 * x2; // x2^2
    const x3p2 = x3 * x3; // x3^2
    const y1p2 = y1 * y1; // y1^2
    const y2p2 = y2 * y2; // y2^2
    const y3p2 = y3 * y3; // y3^2
    const r1p2 = r1 * r1; // r1^2
    const r2p2 = r2 * r2; // r2^2
    const r3p2 = r3 * r3; // r3^2

    const a = x2 - x1;
    const b = y2 - y1;
    const c = (x1p2 - x2p2) + (y1p2 - y2p2) - (r1p2 - r2p2);
    const d = x3 - x1;
    const e = y3 - y1;
    const f = (x1p2 - x3p2) + (y1p2 - y3p2) - (r1p2 - r3p2);

    // then
    // equation 1b: 2*x*a + 2*y*b + c = 0
    // equation 2b: 2*x*d + 2*y*e + f = 0
    //
    // solving x per each equation
    // equation 1c: x = -(2*y*b + c) / 2*a
    // equation 2c: x = -(2*y*e + f) / 2*d
    //
    // then

    const g = a / d;
    const y = (g * f - c) / (2 * (b - g * e));
    const x = -(2 * y * b + c) / (2 * a);

    // unfortunately, if the provided distances and points didn't represent 3 intersecting circles
    // the values of x and y won't be valid as they will lie
    // if distances between calculated point and the other points are greater than the distances
    // the point is not valid
    return (
        Math.abs(Math.hypot(x - x1, y - y1) - r1) < tolerance &&
        Math.abs(Math.hypot(x - x2, y - y2) - r2) < tolerance &&
        Math.abs(Math.hypot(x - x3, y - y3) - r3) < tolerance
    ) ? [x, y] : [NaN, NaN];
};
