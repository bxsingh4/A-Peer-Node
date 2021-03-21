
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

    // initalize the variables with the parameters
    init: function(peername, peertable, length) { // feel free to add function parameters as needed
        
        peerName = peername;
        peerTable = peertable;
        tableLength = length;
       //console.log(peerName);
    },
    
    

    //--------------------------
    //getpacket: returns the entire packet
    //--------------------------
    getPacket: function() {
        // convert the decimal or text values into binary values 
        senderIdLength = addBits(peerName.length.toString(2));
        peerID = textToBin(peerName);
        peerNumber = add13Bits(peerTable.length.toString(2));
        // check if the peer table is empty
        if(peerTable.length == '0'){
          
        packet = v + welcome+peerNumber+senderIdLength + peerID;// initalize the packet accordingly

        }else if(peerTable.length == tableLength){// check if the peer table is full
          console.log(peerTable);
       for(i=0; i<tableLength ;i++){// form the peers address part of the part
        
        // address = address + ipBinary+peerTable[i];
        portBin = peerTable[i].split(":")[1];
        console.log(portBin);
        address = address + ipBinary+ add16Bits(Number(portBin).toString(2));
       }
       // initalize the packet
       packet = v + redirect + peerNumber + senderIdLength + peerID + address ;

        } else{// if the table is neither empty nor full , create packet
        
        for(i=0; i<peerTable.length ;i++){// form the peers address part of the part
          //console.log(peerTable[0].split(":")[1]);
          portBin = peerTable[i].split(":")[1];
          address = address + ipBinary+ add16Bits(Number(portBin).toString(2));
        }
        // initialize the packet
          packet = v + welcome + peerNumber + senderIdLength + peerID + address;
        }
        // return the associated packet
        return packet;
    }
    
};

function addBits(senderID){ // create a 8 bit number 
  
    let x = 8 - senderID.length;
    for(let i =0; i<x; i++){
        senderID = "0" + senderID;// add 0's before name 
      }
    
    return senderID;
  }

  function add13Bits(peers){ // create a 13 bit number 
  
    let x = 13 - peers.length;
    for(let i =0; i<x; i++){
        peers = "0" + peers;// add 0's before number 
      }
    
    return peers;
  }

  function add16Bits(input){
    let x = 16 - input.length;
    for(let i =0; i<x; i++){
        input = "0" + input;// add 0's before number 
      }
    
    return input;
  }
  
  // converts the text string into its associated binary string
  function textToBin(text) {
    var length = text.length,
        output = [];
    for (var i = 0;i < length; i++) {
      var bin = text[i].charCodeAt().toString(2);
      output.push(Array(8-bin.length+1).join("0") + bin);
    } 
    return output.join("");
  }


  
     
  
  