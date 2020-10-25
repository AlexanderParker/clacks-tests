/*
	This profiler creates a 20x20 grid of peers. Peers are initially connected to their adjacent and diagonal cells.

	A single message is spawned from the upper left corner of the grid.

	The simulation runs for a set number of frames, which are rendered to a gif.

	This test visualises the flow of a message through the network. Brighter cells have recieved more messages.
 */

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const Clacks = require('clacks-p2p'),
	  GIFEncoder = require('gifencoder'),
      { createCanvas } = require('canvas'),     
	  fs = require('fs'),
	  key = fs.readFileSync('../../ssl/key.pem'),
	  cert = fs.readFileSync('../../ssl/cert.pem'),
	  gridWidth = 20,
	  gridHeight = 20,
	  pixelScale = 10,
	  encoder = new GIFEncoder(gridWidth * pixelScale, gridHeight * pixelScale),
	  canvas = createCanvas(gridWidth * pixelScale, gridHeight * pixelScale),
	  ctx = canvas.getContext('2d'),
	  totalPeers = gridWidth * gridHeight,	  
	  basePort = 8000, 
	  maxFrames = 3000

// Set up encoder to output animated gif
encoder.createReadStream().pipe(fs.createWriteStream('propagation-time-topnew.gif'));
encoder.start();
encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
encoder.setDelay(40);  // frame delay in ms
encoder.setQuality(10); // image quality. 10 is default.



// Runs a test cycle, returns running time
function runTest() {
	var port = basePort,
		grid = [],
		results = [],
		startTime = Date.now(),
		frameCount = 0

	console.log('Initialising ' + gridWidth + ' by ' + gridHeight + ' (' + totalPeers + ') peers.')
	for (var x = 0; x < gridWidth; x++) {	
		for (var y = 0; y < gridHeight; y++) {
			var clacksInstance = new Clacks(key, cert, {port: port, sendrate: 500})

			// Generate results output, quit when maxframes is reached
			clacksInstance.onMessageQueued(function(peer,payload) {
				results[this.getOptions().port - basePort] ++
				// Prepare gif frame
				ctx.fillStyle = '#000000'
				ctx.fillRect(0, 0, gridWidth * pixelScale, gridHeight * pixelScale)
				var pixelX = 0,
					pixelY = 0

				// Clamp pixel values
				var factor = 255 / Math.max.apply(Math, results)

				for (var i = 0; i < gridHeight * gridWidth; i++) {					
					
					if (results[i] > 0) {
						var pixelValue = Math.floor(results[i] * factor)
						ctx.fillStyle = 'rgb(' + pixelValue + ',' + pixelValue + ',' + pixelValue + ')'
						ctx.fillRect(pixelX * pixelScale, pixelY * pixelScale, pixelScale, pixelScale)
					}
					pixelX++
					if (pixelX == gridWidth) {
						pixelY = pixelY + 1
						pixelX = 0
					}
				}				
				console.log("Processed frame " + frameCount)
				frameCount ++

				// Add frame to gif
				encoder.addFrame(ctx);
				if (frameCount >= maxFrames) {
					encoder.finish();
					process.exit(0)
				}
			}.bind(clacksInstance))

			grid.push(clacksInstance)
			results.push(0)
			port ++			
		}
	}

	console.log('Linking peers to neighbours')
	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {
			/*
				Calculate grid array index for each neighbour:

				---------------
				| TL | T | TR |
				---------------
				| L  | C | R  |
				---------------
				| BL | B | BR |
				---------------

				Defined below clockwise, starting from Top Left (TL)
			*/			
			var current = x * gridHeight + y,
				neighbours = [
					current - gridWidth - 1, 	// TL
					current - gridWidth,		// T
					current - gridWidth + 1,	// TR
					current + 1,				// R
					current + gridWidth + 1,	// BR
					current + gridWidth,		// B
					current + gridWidth - 1, 	// BL
					current - 1, 				// L
				]

			for (var index in neighbours) {
				// Only add peers that are in valid range
				if (basePort + neighbours[index] > basePort && basePort + neighbours[index] < basePort + totalPeers) grid[current].addPeer('localhost', basePort + neighbours[index])
			}
		}
	}	

	console.log('Waiting for bottom-right node to recieve message')	

	console.log('Spawning message from top-left node')
	grid[0].enqueue("Ping!")

	return Date.now() - startTime
}


runTest()

