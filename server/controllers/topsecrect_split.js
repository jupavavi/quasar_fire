import { getLocationAndMessage, getByName } from "../managers/satellites";

export const get = async (req, res) => {
    const { session, query } = req;
    const { tolerance = 1 } = query;
    const { satellites } = session;

    const satellitesArray = Object.values(satellites).map($ => $);
    
    try {
        res.json(await getLocationAndMessage(satellitesArray, tolerance));
    } catch(e) {
        res.status(404).send({
            error: e.message,
        });
    }
};

export const post = async (req, res) => {
    const { params, body } = req;
    const { id } = params;
    const { distance, message } = body;

    try {
        const satellite = {
            ...getByName(id),
            distance,
            message,
        };
    
        req.session.satellites = req.session.satellites || {};
        req.session.satellites[id] = satellite;
        res.end();
    } catch(e) {
        res.status(404).send({
            error: e.message,
        });
    }
};
