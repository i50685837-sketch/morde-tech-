module.exports = (sock) => {
    sock.ev.on("groups.update", (data) => {
        console.log("Group Updated:", data);
    });

    sock.ev.on("group-participants.update", (data) => {
        console.log("Participant Update:", data);
    });
};
