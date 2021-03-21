let directory = require.main.filename.split('/');
let directoryLength = directory.length;
let folderName = directory[directoryLength - 2];
let peerName = folderName.split('-')[0];
let peerTableLength = folderName.split('-')[1];
let peerTable = [];
let peerTableCount;

let net = require('net'),
    singleton = require('./Singleton'),
    handler = require('./ClientsHandler');

let HOST = '127.0.0.1';
let hostInfo = process.argv[3];
let PORT = Math.floor(Math.random() * 45000) + 1;


if (hostInfo != undefined) {


    let portNumber = hostInfo.split(':')[1];

    let host = '127.0.0.1';

    let peerConnection = net.createConnection(portNumber, host, () => {

        peerConnection.on('data', data => {

            let response = data.toString();
            let v = response.slice(0, 3);
            let message = response.slice(3, 11);
            let messageDecimal = binToDec(message);
            //console.log(messageDecimal);
            let numbOfPeers = response.slice(11, 24);

            let senderIdLength = response.slice(24, 32);
            let senderID = response.slice(32, 32 + (38 * senderIdLength.toString(10))).match(/.{1,8}/g).join(' ');
            let peerinformation = response.match(/.{1,8}/g);
            //console.log(peerinformation[9]);
            let senderLength = binToDec(senderIdLength);
            let peerNumb = binToDec(numbOfPeers);
            ////console.log(peerNumb);
            let array = [];
            //console.log(peerinformation);
            /*
            for(i=0;i<(6*(peerNumb));i++){
            array.push((peerinformation[3+senderLength+1+i]));
            }*/
            //console.log(peerinformation);
            for (i = 0; i < (peerinformation.length); i++) {


                array.push((peerinformation[3 + senderLength + 1 + i]));


            }
            //console.log(array);


            // split the bytes and put them into array to convert each byte into text 
            let senderIDtext = senderID.split(' ').map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
            console.log(senderIDtext);

            // check if it is a welcome message
            if (messageDecimal == "1") {
                console.log("Connected to peer " + senderIDtext + ":" + portNumber + " at timestamp: " + singleton.getTimestamp());
                console.log('This peer address is 127.0.0.1:' + PORT + " located at " + peerName);
                console.log('Received ack from ' + senderIDtext + ":" + portNumber);
                //console.log(peerIP);
                let portsArray = [];
                for (i = 4; i < array.length; i = i + 6) {
                    //console.log(array[i]+array[i+1])
                    portsArray.push(binToDec(array[i] + array[i + 1]));
                }

                for (i = 1; i <= peerNumb; i++) {

                    console.log("   which is peered with [127.0.0.1:" + portsArray[i] + "]");

                }
                peerConnection.write('Connected from peer 127.0.0.1:' + PORT);

            } else {
                console.log('Received ack from ' + senderIDtext + ":" + portNumber);
                let portsArray = [];
                //console.log(array);
                for (i = 4; i < array.length; i = i + 6) {
                    //console.log(array[i]+array[i+1])
                    portsArray.push(binToDec(array[i] + array[i + 1]));
                }

                for (i = 1; i <= peerNumb; i++) {

                    console.log("   which is peered with [127.0.0.1:" + portsArray[i] + "]");

                }
                console.log('The join has been declined; the auto-join process is performing ...')
                let connection = net.createConnection(portsArray[1], HOST, () => {
                    connection.on('data', data2 => {
                        //console.log(data2.toString())

                        let result = data2.toString();
                        let v1 = result.slice(0, 3);
                        let message1 = result.slice(3, 11);
                        let messageDecimal1 = binToDec(message1);
                        //console.log(messageDecimal);
                        let numbOfPeers1 = result.slice(11, 24);

                        let senderIdLength1 = result.slice(24, 32);
                        let senderID1 = result.slice(32, 32 + (38 * senderIdLength1.toString(10))).match(/.{1,8}/g).join(' ');
                        let peerinformation1 = result.match(/.{1,8}/g);
                        //console.log(peerinformation[9]);
                        let senderLength1 = binToDec(senderIdLength1);
                        let peerNumb1 = binToDec(numbOfPeers1);

                      
                    
            
                        // split the bytes and put them into array to convert each byte into text 
                        let senderIDtext1 = senderID1.split(' ').map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
                        //console.log(senderIDtext1)

                        console.log("Connected to peer " + senderIDtext1 + ":" + portsArray[1] + " at timestamp: " + singleton.getTimestamp());
                        console.log('This peer address is 127.0.0.1:' + PORT + " located at " + peerName);
                        console.log('Received ack from ' + senderIDtext1 + ":" + portsArray[1]);
                        connection.write('Connected from peer 127.0.0.1:' + PORT);
                    })
                })
            }

        })

    })

} else {
    let Peer = net.createServer();
    Peer.listen(PORT, HOST);
    console.log('This peer address is :' + HOST + ':' + PORT + ' located at ' + peerName);
    Response.init(peerName, peerTable, peerTableLength);

    Peer.on('connection', function (sock) {

        handler.handleClientJoining(sock); //called for each client joining
        // console.log("hi"+ singleton.init());
        setTimeout(() => {
            port = singleton.getport();
            //console.log("port " + port);
            peerTable.push("127.0.0.1:" + port);
            if (peerTable.length >= peerTableLength) {
                console.log("Peer table full:" + peerTable[peerTableLength] + "redirected")
            }
        }, 200);


    });


}
function binToDec(num) {
    let dec = 0;
    for (let i = 0; i < num.length; i++) {
        if (num[num.length - (i + 1)] === '1') {
            dec += 2 ** i;
        }
    }
    return dec;
}
