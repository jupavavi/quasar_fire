import { getLocationAndMessage } from "../managers/satellites";

export const post = async (req, res) => {
    const { body } = req;
    const { satellites, tolerance = 1 } = body;

    try {
        res.json(await getLocationAndMessage(satellites, tolerance));
    } catch(e) {
        res.status(404).send({
            error: e.message,
        });
    }
};
