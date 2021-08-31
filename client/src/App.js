import React, { useState, useEffect } from "react";
import { getSatellites, submitTopSecrect } from "./services";
import Main from "./Main";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [satellites, setSatellites] = useState([]);
    const [tolerance, setTolerance] = useState(1);
    const [position, setPosition] = useState([NaN, NaN]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getSatellites()
            .then((data) => setSatellites(data))
            .finally(() => setIsLoading(false));
    }, []);

    const submit = async () => {
        setIsLoading(true);
        try {
            const data = await submitTopSecrect(satellites, tolerance);
            setPosition(data.position);
            setMessage(data.message);
        } catch(e) {
            global.alert(e.response?.data?.error || "error while trying to execute");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Main
            satellites={satellites}
            position={position}
            setSatellites={setSatellites}
            tolerance={tolerance}
            setTolerance={setTolerance}
            message={message}
            isLoading={isLoading}
            onSubmit={submit}
        />
    );
};
