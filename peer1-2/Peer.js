let directory = require.main.filename.split('/');
let directoryLength = directory.length;
let folderName = directory[directoryLength-2];
let peerName = folderName.split('-')[0];
let peerTableLength = folderName.split('-')[1];
let peerTable = [];
let peerTableCount;
let port;

let net = require('net'),
    singleton = require('./Singleton'),
    handler = require('./ClientsHandler'),
    Response = require('./Response');
const Singleton = require('./Singleton');

let HOST = '127.0.0.1';
let hostInfo = process.argv[3];
let PORT = Math.floor(Math.random()*45000)+1;


if(hostInfo != undefined){


let portNumber = hostInfo.split(':')[1];

let host = '127.0.0.1';

let peerConnection = net.createConnection(portNumber,host,()=>{

peerConnection.on('data', data =>{

let response = data.toString();
let v = response.slice(0,3);
let message = response.slice(3,11);
let messageDecimal = message.toString(10);
let numbOfPeers = response.slice(11,24);

let senderIdLength = response.slice(24,32);
let senderID = response.slice(32,32+(38*senderIdLength.toString(10))).match(/.{1,8}/g).join(' ');


// split the bytes and put them into array to convert each byte into text 
let senderIDtext = senderID.split(' ').map(byte => String.fromCharCode(parseInt(byte, 2))).join(''); 

// check if it is a welcome message
if(messageDecimal == '1'){
console.log("Connected to peer " +senderIDtext +":"+portNumber+" at timestamp: " + singleton.getTimestamp());
console.log('This peer address is 127.0.0.1:' + PORT + " located at " + peerName);
console.log('Received ack from ' +  senderIDtext + ":"+ portNumber);
peerConnection.write('Connected from peer 127.0.0.1:'+PORT);
}else{
    
}

})

})

} else {
    let Peer = net.createServer();
    Peer.listen(PORT, HOST);
    console.log('This peer address is :' + HOST + ':' + PORT + ' located at ' + peerName);
    Response.init(peerName,peerTable,peerTableLength);

    Peer.on('connection', function(sock) {
    
    handler.handleClientJoining(sock); //called for each client joining
       // console.log("hi"+ singleton.init());
    setTimeout(()=>{
    port=singleton.getport();
    //console.log("port " + port);
    peerTable.push("127.0.0.1:"+port);
    if(peerTable.length > peerTableLength){
        console.log("Peer table full: " + peerTable[peerTableLength] + " redirected")
    }
    
    },200);
    
       
    });
    
   
}



