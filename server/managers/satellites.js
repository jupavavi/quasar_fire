import { satellites } from "../config";
import { decodeMessage } from "./message";
import triangularize from "../misc/triangularize";

export const getAll = () => (
    // shallow clone of each sat
    satellites.map(sat => ({ ...sat }))
);

export const getByName = (name) => {
    const data = satellites.find((sat) => (
        sat.name.toLowerCase().trim() === name?.toLowerCase?.().trim() || ""
    ));

    if (!data) {
        throw new Error(`Satellite data for ${name} not found`);
    }

    return { ...data };
};

export const getLocation = async (satellites, tolerance = 1) => {
    const positionsAndDistances = await Promise.all(
        satellites
            .slice(0, 3)
            .map(async ({ name, distance }) => {
                const satelliteData = await getByName(name);
                return {
                    position: satelliteData.position,
                    distance: distance,
                };
            })
    );

    const position = triangularize(...positionsAndDistances, tolerance);

    if (Number.isNaN(position[0]) || Number.isNaN(position[1])) {
        throw new Error("position can't be determined");
    }
    return position;
};

export const getLocationAndMessage = async (satellites, tolerance) => {
    const position = await getLocation(satellites, tolerance);
    const message = await decodeMessage(
        ...satellites.map((sat) => sat.message)
    );
    return {
        position,
        message,
    };
};
