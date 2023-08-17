const localConnection =
    new RTCPeerConnection({
        iceServers: [
            { urls: "stun:stun.relay.metered.ca:80", },
            { urls: "turn:a.relay.metered.ca:80", username: "835c5389b98d89346569c234", credential: "TFEyZVKp00MJOBNJ", },
            { urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "835c5389b98d89346569c234", credential: "TFEyZVKp00MJOBNJ", },
            { urls: "turn:a.relay.metered.ca:443", username: "835c5389b98d89346569c234", credential: "TFEyZVKp00MJOBNJ", },
            { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "835c5389b98d89346569c234", credential: "TFEyZVKp00MJOBNJ", },
        ],
    });
localConnection.onicecandidate = e => {
    console.log(" NEW ice candidate!! on localconnection reprinting SDP ")
    console.log(JSON.stringify(localConnection.localDescription))
}
const sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onmessage = e => console.log("messsage received!!!" + e.data)
sendChannel.onopen = e => console.log("open!!!!");
sendChannel.onclose = e => console.log("closed!!!!!!");
localConnection.createOffer().then(o => localConnection.setLocalDescription(o))


PEERRB

const offer = { "type": "offer", "sdp": "v=0\r\no=- 9045899051013045461 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 48871 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 216.39.253.22\r\na=candidate:2060081746 1 udp 2113937151 d133ac63-9040-4a87-ac4e-2b9b034e9483.local 52813 typ host generation 0 network-cost 999\r\na=candidate:4253206621 1 udp 1677729535 122.172.87.123 11975 typ srflx raddr 0.0.0.0 rport 0 generation 0 network-cost 999\r\na=candidate:1086898818 1 udp 33562879 216.39.253.22 48871 typ relay raddr 122.172.87.123 rport 27327 generation 0 network-cost 999\r\na=candidate:1086898818 1 udp 33563391 216.39.253.22 36397 typ relay raddr 122.172.87.123 rport 32040 generation 0 network-cost 999\r\na=candidate:1040654362 1 udp 16785919 216.39.253.22 43343 typ relay raddr 122.172.87.123 rport 29949 generation 0 network-cost 999\r\na=candidate:1040654362 1 udp 16785407 216.39.253.22 60654 typ relay raddr 122.172.87.123 rport 9015 generation 0 network-cost 999\r\na=candidate:1040654362 1 udp 16785919 216.39.253.22 30701 typ relay raddr 122.172.87.123 rport 30936 generation 0 network-cost 999\r\na=candidate:1040654362 1 udp 16785407 216.39.253.22 35446 typ relay raddr 122.172.87.123 rport 13489 generation 0 network-cost 999\r\na=ice-ufrag:Mh1y\r\na=ice-pwd:Yx66/zh3cTWsRkdRZS5d63bD\r\na=ice-options:trickle\r\na=fingerprint:sha-256 2F:33:EC:60:0B:2A:62:4B:27:B2:03:F9:FC:32:D4:F9:2A:35:59:AD:E9:D1:64:17:FA:AB:F5:95:1E:EC:B0:A1\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n" }

const remoteConnection = new RTCPeerConnection({
    iceServers: [{
            urls: "stun:stun.relay.metered.ca:80",
        },
        {
            urls: "turn:a.relay.metered.ca:80",
            username: "835c5389b98d89346569c234",
            credential: "TFEyZVKp00MJOBNJ",
        },
        {
            urls: "turn:a.relay.metered.ca:80?transport=tcp",
            username: "835c5389b98d89346569c234",
            credential: "TFEyZVKp00MJOBNJ",
        },
        {
            urls: "turn:a.relay.metered.ca:443",
            username: "835c5389b98d89346569c234",
            credential: "TFEyZVKp00MJOBNJ",
        },
        {
            urls: "turn:a.relay.metered.ca:443?transport=tcp",
            username: "835c5389b98d89346569c234",
            credential: "TFEyZVKp00MJOBNJ",
        },
    ],
});


remoteConnection.onicecandidate = e => {
    console.log(" NEW ice candidnat!! on localconnection reprinting SDP ")
    console.log(JSON.stringify(remoteConnection.localDescription))
}


remoteConnection.ondatachannel = e => {

    const receiveChannel = e.channel;
    receiveChannel.onmessage = e => console.log("messsage received!!!" + e.data)
    receiveChannel.onopen = e => console.log("open!!!!");
    receiveChannel.onclose = e => console.log("closed!!!!!!");
    remoteConnection.channel = receiveChannel;

}


remoteConnection.setRemoteDescription(offer).then(a => console.log("done"))

//create answer
await remoteConnection.createAnswer().then(a => remoteConnection.setLocalDescription(a)).then(a =>
        console.log(JSON.stringify(remoteConnection.localDescription)))
    //send the anser to the client