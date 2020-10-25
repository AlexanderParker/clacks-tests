#Profiling

The scripts in these subfolders profile various dynamic features of the network. Based on analysis of the profiling results, adjustments can be made to improve message flow, peer discovery, and overall network resilliance.

#Propagation Dynamics

##Overview

The propagation dynamics scripts set up a 20x20 grid of nodes, each initially connected to their direct and diagonal neighbours. A single message is introduced in the top-left node, and the message flow and peer discovery is recorded and visualised.

The scripts generate an animated GIF - these have been converted to MP4 using ffmpeg to reduce filesize of the repository.

##Scripts

* **test-message-flow.js** - The number of times the message visits each peer is recorded and visualised.
* **test-peer-discovery.js** - The number of peers visible to each peer is recorded and visualised.
* **test-peer-distance.js** - The maximum "distance" between peers is recorded and visualised.

##Results

**Message Flow**

**Peer Discovery**

**Peer Distance**