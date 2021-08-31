import messageDecoder from "../misc/messageDecoder";

export const decodeMessage = (chuck1, chuck2, chuck3) => {
    const msg = messageDecoder(chuck1, chuck2, chuck3);

    if (msg === null) {
        throw new Error("message can't be determined");
    }

    return msg;
};
