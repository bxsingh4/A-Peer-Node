let ITPpacket = require('./Response');
let singleton = require('./Singleton');


// You may need to add some delectation here

let peerInfo;
module.exports = {
    handleClientJoining: function (sock) {

        sock.on('data', data =>{

            console.log(data.toString());
            peerInfo = data.toString();
            singleton.init(peerInfo);
        })
            sock.write(ITPpacket.getPacket()); 
    }
};







