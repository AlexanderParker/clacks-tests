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

##Analysis & Results

When new peers are added to a node's peer list, the initial code which selects the next peer to message chose the peer from the top of the new peers list. After visualising the dynamics of message propagation and peer discovery, the decision was made to select the next peer randomly from the new list, which significantly improved peer discovery dynamics.

##Visualisation

The following MP4-format files visualise two minutes of propagation through the 20x20 grid is rendered at 25 frames per second (total 3000 frames). 

**Message Flow**

* [Message Flow - Top New Peer](https://github.com/AlexanderParker/clacks-tests/blob/main/profiling/propagation-dynamics/propagation-time-topnew.mp4?raw=true)
* [Message Flow - Random New Peer](https://github.com/AlexanderParker/clacks-tests/blob/main/profiling/propagation-dynamics/propagation-time-randomnew.mp4?raw=true)

**Peer Discovery**

* [Peer Discovery - Top New Peer](https://github.com/AlexanderParker/clacks-tests/blob/main/profiling/propagation-dynamics/peer-discovery-topnew.mp4?raw=true)
* [Peer Discovery - Random New Peer](https://github.com/AlexanderParker/clacks-tests/blob/main/profiling/propagation-dynamics/peer-discovery-randomnew.mp4?raw=true)

**Peer Distance**

* [Peer Distance - Top New Peer](https://github.com/AlexanderParker/clacks-tests/blob/main/profiling/propagation-dynamics/peer-distance-topnew.mp4?raw=true)
* [Peer Distance - Random New Peer](https://github.com/AlexanderParker/clacks-tests/blob/main/profiling/propagation-dynamics/peer-distance-randomnew.mp4?raw=true)
