export default (chuck1, chuck2, chuck3) => {
    const minLen = Math.min(
        chuck1.length,
        chuck2.length,
        chuck3.length,
    );

    const msn1 = chuck1.slice(-minLen);
    const msn2 = chuck2.slice(-minLen);
    const msn3 = chuck3.slice(-minLen);
    const msg = Array(minLen);

    for(let i = minLen - 1; i >= 0; i -= 1) {
        msg[i] = msn1[i] || msn2[i] || msn3[i];
        if (!msg[i]) return null;
    }
    return msg.join(" ");
};
