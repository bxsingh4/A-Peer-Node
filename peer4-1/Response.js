
// You may need to add some delectation here
let v = "111";
let welcome = "00000001";
let redirect = "00000010";
let senderIdLength;
let peerID;
let peerTable =[];
let peerName;
let packet;
let peerNumber;
let tableLength;
let ipBinary = "01111111000000000000000000000001"
let portBin;
let portInBinary;
let address="";

module.exports = {

    

    init: function(peername, peertable, length) { // feel free to add function parameters as needed
        //
        // enter your code here
        //
        peerName = peername;
        peerTable = peertable;
        tableLength = length;
       
    },
    sendPeer : function (){
    populateTable();
    },
    

    //--------------------------
    //getpacket: returns the entire packet
    //--------------------------
    getPacket: function() {
        //console.log(peerName);
        senderIdLength = addBits(peerName.length.toString(2));
        peerID = textToBin(peerName);
        peerNumber = add13Bits(peerTable.length.toString(2));
        if(peerTable.length == '0'){
        packet = v + welcome+peerNumber+senderIdLength + peerID;
        }else if(peerTable.length >= tableLength){
       
       for(i=0; i<tableLength ;i++){
         address = address + ipBinary+peerTable[i];
       }
       packet = v + redirect + peerNumber + senderIdLength + peerID + address ;

        } else{
        for(i=0; i<peerTable.length ;i++){
          //console.log(peerTable[0].split(":")[1]);
          portBin = peerTable[i].split(":")[1];
          address = address + ipBinary+ add16Bits(Number(portBin).toString(2));
        }
      
          packet = v + welcome + peerNumber + senderIdLength + peerID + address;
        }
        return packet;
    }
    
};

function addBits(senderID){ // create a 8 bit number if send id length is less than 8 bits 
  
    let x = 8 - senderID.length;
    for(let i =0; i<x; i++){
        senderID = "0" + senderID;// add 0's before name 
      }
    
    return senderID;
  }

  function add13Bits(peers){ // create a 13 bit number if send id length is less than 8 bits 
  
    let x = 13 - peers.length;
    for(let i =0; i<x; i++){
        peers = "0" + peers;// add 0's before name 
      }
    
    return peers;
  }

  function add16Bits(input){
    let x = 16 - input.length;
    for(let i =0; i<x; i++){
        input = "0" + input;// add 0's before name 
      }
    
    return input;
  }
  

  function textToBin(text) {
    var length = text.length,
        output = [];
    for (var i = 0;i < length; i++) {
      var bin = text[i].charCodeAt().toString(2);
      output.push(Array(8-bin.length+1).join("0") + bin);
    } 
    return output.join("");
  }


  
     
  
  