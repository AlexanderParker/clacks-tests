// Allow self-signed certificate in development - don't do this on production.
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// Implements a basic message logger, useful for profiling and debugging
const fs = require('fs'),
	  MessageFormatter = require('clacks-message-formatter'),
	  clacks = require ('clacks-p2p'),
	  key = fs.readFileSync('../ssl/key.pem'),
	  cert = fs.readFileSync('../ssl/cert.pem')

// Allocate 3 peers for testing
console.log('\nInitialising 3 local clacks peers, each with send rate of 0.5 messages per second')
var clacks1 = new clacks(key, cert, {port: 8001, sendrate: 0.5, log: ['critical', 'network']}),
    clacks2 = new clacks(key, cert, {port: 8002, sendrate: 0.5, log: ['critical', 'network']}),
    clacks3 = new clacks(key, cert, {port: 8003, sendrate: 0.5, log: ['critical', 'network']})

// Extend each clacks instance with the logger plugin
console.log('\nExtending each clacks instance with MessageFormat plugin')
format = {
	required: ['foo'],
	optional: ['bar']
}
clacks1.extend(new MessageFormatter(format))
clacks2.extend(new MessageFormatter(format))
clacks3.extend(new MessageFormatter(format))

clacks1.onMessageRecieved((msg) => console.log(msg))
clacks2.onMessageRecieved((msg) => console.log(msg))
clacks3.onMessageRecieved((msg) => console.log(msg))

console.log('\nLet peers 1 & 2 to see one another')
clacks1.addPeer('localhost','8002')
clacks2.addPeer('localhost','8001')

clacks1.enqueue({
	class: 'hello',
	foo: 'foo',
	bar: 'bar'
})

clacks2.enqueue({
	class: 'hello',
	foo: 'foo'	
})

clacks3.enqueue({
	class: 'hello',
	bar: 'fail because foo does not exist'
})

// Now add a third peer
console.log("\nAnnounce Peer 3's presence to Peer 1")
clacks3.announce('localhost', 8001)

