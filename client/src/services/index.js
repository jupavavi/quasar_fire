import axios from "axios";

export const getSatellites = async () => {
    const { data } = await axios.get("/satellites");
    return data;
};

export const submitTopSecrect = async (satellites, tolerance) => {
    const { data } = await axios.post("/topsecret", {
        satellites,
        tolerance,
    });
    return data;
};
