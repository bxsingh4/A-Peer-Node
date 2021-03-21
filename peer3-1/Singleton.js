let randomTimeStamp =  Math.floor(Math.random()*999) + 1; // generating a random number 
// Some code need to be added here, that are common for the module
let randomSequenceNumber= Math.floor(Math.random()*32768)+1;// 
module.exports = {
    init: function() {
       // init function needs to be implemented here //
    // initialization
   
    
    setInterval(()=>{
    randomTimeStamp+=1;
    if(randomTimeStamp >= 4294967296){ // 2^32= 
    randomTimeStamp =  Math.floor(Math.random()*32768)+1;
    }
    }, 10);
    },

    //--------------------------
    //getSequenceNumber: return the current sequence number + 1
    //--------------------------
    getSequenceNumber: function() {// every call of this function should increment the sequence number by 1 
    randomSequenceNumber += 1;
    return randomSequenceNumber;
    },

    //--------------------------
    //getTimestamp: return the current timer value
    //--------------------------
    getTimestamp: function() {
    return randomTimeStamp;
    }
};


