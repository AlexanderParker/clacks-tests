# Basic Tests

These tests exercise the basic core features of the clacks-p2p system, such as spooling up an instance, announcing to peers, discovering peers, reconnecting to lost peers, the ignore list, and a simple test that modifies a message.

*Step 1: Run test1.js*

This sets up 3 clacks "peers" on localhost port 8001, 8002, and 8003 respectively. Some of the other tests rely on keeping this one running.

* Only Peer 1 and 2 are explicitly aware of each other.
* Peer 1 enqueues a message into its message queue
* Peer 3 announces itself to Peer 1
* Peer 2 and Peer 3 should quickly learn of each others' existence through Peer 1's interactions with Peer 3

*Step 2: Run test2a.js*

This is the first part of a test that will determine if a peer is recognised when it announces itself to the network, and if other peers will end up discovering it eventually.

Note: keep test1.js running in another console while you run test2a.js.

* This sets up clacks peer #4 on port 8004
* Peer 4 announces itself to peer #1 (8001)
* As with the previous test, the remaining peers will eventually become aware of peer #4, and vice-versa
* Kill the test2.js process (make sure the 'Hello Discworld!' message is currently held by any of peers 1,2, or 3 before doing so)
* Observe that peers 1, 2 and 3 eventually announce that they have "lost" peer 4.

*Step 3: Run test2b.js*

This is the second part of test 2, which will determine if a lost node will be rediscovered if it comes back online. This assumes you killed test2a, and that the three instances set up in test1 are still passing the message around.

Note: keep test1.js running in another console while you run test2b.js.

* This sets up clacks peer #4 on port 8004
* Peer 4 **does not** announce itself. Instead, it will wait to see if peers 1-3 remember it.
* Eventually, one by one, peers 1-3 will reconnect with Peer 4

*Step 4: Run test3-ignore.js*

This tests whether the ignore list functionality works. The instance created in this test will ignore peer 2 (port 8002), so you should be able to observe that no messages from that peer are accepted into this instance.

Note: keep test1.js and test2b.js running in another console while you run test3-ignore.js.

* This sets up clacks peer #5 on port 8005
* Peer 5 announces itself to Peer 1
* Peer 5 ignores Peer 2
* You should not observe any incoming messages being accepted from Peer 2

*Step 5: Run test4-reverse.js*

The instance in this test will modify the message it recieves by reversing the string.

Note: keep at least test1.js running in another console while you run test4-reverse.js.

* This sets up clacks peer #6 on port 8006
* Peer 6 announces itself to Peer 1
* Any time peer 6 recieves a message, it reverses the message string.