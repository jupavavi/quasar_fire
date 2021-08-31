import { getAll } from "../managers/satellites";

export const get = async (req, res) => {
    res.json(await getAll());
};
