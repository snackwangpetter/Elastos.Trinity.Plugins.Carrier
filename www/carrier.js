/*
    * Copyright (c) 2018 Elastos Foundation
    *
    * Permission is hereby granted, free of charge, to any person obtaining a copy
    * of this software and associated documentation files (the "Software"), to deal
    * in the Software without restriction, including without limitation the rights
    * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    * copies of the Software, and to permit persons to whom the Software is
    * furnished to do so, subject to the following conditions:
    *
    * The above copyright notice and this permission notice shall be included in all
    * copies or substantial portions of the Software.
    *
    * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    * SOFTWARE.
    */

   var exec = require('cordova/exec');

   const CARRIER_CB_NAMES = [
       "onConnection",
       "onReady",
       "onSelfInfoChanged",
       "onFriends",
       "onFriendConnection",
       "onFriendInfoChanged",
       "onFriendPresence",
       "onFriendRequest",
       "onFriendAdded",
       "onFriendRemoved",
       "onFriendMessage",
       "onFriendInviteRequest",
       "onSessionRequest",
       "onGroupInvite",
       "onConnectRequest",
   ];

   const GROUP_CB_NAMES = [
       "onGroupConnected",
       "onGroupMessage",
       "onGroupTitle",
       "onPeerName",
       "onPeerListChanged",
   ];

   const FILE_TRANSFER_CB_NAMES = [
       "onStateChanged",
       "onFileRequest",
       "onPullRequest",
       "onData",
       "onDataFinished",
       "onPending",
       "onResume",
       "onCancel",
   ];

   const STREAM_CB_NAMES = [
       "onStateChanged",
       "onStreamData",
       "onChannelOpen",
       "onChannelOpened",
       "onChannelClose",
       "onChannelData",
       "onChannelPending",
       "onChannelResume",
   ];

   /**
    * @module CarrierPlugin
    */

   /**
    * The Carrier user information.
    *
    * @typedef BootstrapNode
    * @type {Object}
    * @property {string} ipv4 The server ipv4.
    * @property {string} ipv6 The server ipv6.
    * @property {string} port The server port.
    * @property {string} publicKey The publicKey.
    */

   /**
    * Options defines several settings that control the way the Carrier node connects to the carrier network.
    * Default values are not defined for bootstraps options, so application should be set bootstrap nodes clearly.
    *
    * @typedef Options
    * @type {Object}
    * @property {Boolean} udpEnabled Set to use udp transport or not. Setting this value to false will force carrier node to TCP only,
    *                                which will potentially slow down the message to run through.
    * @property {string}  persistentLocation Set the persistent data location. The location must be set.
    * @property {Array}  bootstraps BootstrapNode Array.
    */

   /**
    * The Carrier user information.
    *
    * @typedef UserInfo
    * @type {Object}
    * @property {string} userId The user ID.
    * @property {string} name The nickname.
    * @property {string} description user's brief description.
    * @property {Boolean} hasAvatar Has avatar or not.
    * @property {string} gender The gender.
    * @property {string} phone The phone number.
    * @property {string} email The email address.
    * @property {string} region The region.
    */

    /**
    * The Carrier friend information.
    *
    * @typedef FriendInfo
    * @type {Object}
    * @property {UserInfo} userInfo The user info.
    * @property {PresenceStatus} presence The presence status.
    * @property {ConnectionStatus} connection The connection status.
    * @property {string} label The friend's label name.
    */

    /**
    * The netword address information.
    *
    * @typedef AddressInfo
    * @type {Object}
    * @property {CandidateType}    type             The address type.
    * @property {string}           address          The address.
    * @property {string}           port             The port.
    * @property {string}           [relatedAddress] The related address status.
    * @property {string}           [relatedPort]    The related port.
    */

    /**
    * The file transfer information.
    *
    * @typedef FileTransferInfo
    * @type {Object}
    * @property {string}  filename    The file name.
    * @property {string}  fileId      The file id.
    * @property {long}    size        The file size.
    */

    /**
    * The netword transport information.
    *
    * @typedef TransportInfo
    * @type {Object}
    * @property {NetworkTopology}  topology    The network topology.
    * @property {AddressInfo}      localAddr   The local address.
    * @property {AddressInfo}      remoteAddr  The remote address.
    */

   /**
    * The Carrier callbacks.
    *
    * @typedef CarrierCallbacks
    * @type {Object}
    * @property {onConnection}          onConnection           The callback function to process the self connection status.
    * @property {onReady}               onReady                The callback function to process the ready notification.
    * @property {onSelfInfoChanged}     onSelfInfoChanged      The callback function to process the self info changed event.
    * @property {onFriends}             onFriends              The callback function to iterate the each friend item in friend list.
    * @property {onFriendConnection}    onFriendConnection     The callback function to process the friend connections status changed event.
    * @property {onFriendInfoChanged}   onFriendInfoChanged    The callback function to process the friend information changed event.
    * @property {onFriendPresence}      onFriendPresence       The callback function to process the friend presence changed event.
    * @property {onFriendRequest}       onFriendRequest        The callback function to process the friend request.
    * @property {onFriendAdded}         onFriendAdded          The callback function to process the new friend added event.
    * @property {onFriendRemoved}       onFriendRemoved        The callback function to process the friend removed event.
    * @property {onFriendMessage}       onFriendMessage        The callback function to process the friend message.
    * @property {onFriendInviteRequest} onFriendInviteRequest  The callback function to process the friend invite request.
    * @property {onSessionRequest}      onSessionRequest       The callback function that handle session request.
    */

   /**
    * The Stream callbacks.
    *
    * @typedef StreamCallbacks
    * @type {Object}
    * @property {onStateChanged}   onStateChanged      The callback function to report state of stream when it's state changes.
    * @property {onStreamData}     onStreamData        The callback will be called when the stream receives incoming packet.
    * @property {onChannelOpen}    onChannelOpen       The callback function to be called when new multiplexing channel opened.
    * @property {onChannelOpened}  onChannelOpened     The callback function to be called when new multiplexing channel opened.
    * @property {onChannelClose}   onChannelClose      The callback function to be called when channel close.
    * @property {onChannelData}    onChannelData       The callback functiont to be called when channel received incoming data.
    * @property {onChannelPending} onChannelPending    The callback function to be called when remote peer ask to pend data sending.
    * @property {onChannelResume}  onChannelResume     The callback function to be called when remote peer ask to resume data sending.
    */

    /**
    * The callback function to process the friend invite response.
    *
    * @callback onFriendInviteResponse
    *
    * @param {string}  from   The target user id who send friend invite response
    * @param {number}  status   The status code of invite response. 0 is success, otherwise error
    * @param {string}  reason   The error message if status is error, otherwise null
    * @param {string}  data   The application defined data return by target user
    */

   /**
    * The callback function to receive session request complete event.
    *
    * @callback onSessionRequestComplete
    *
    * @param {Session} session     The carrier session instance.
    * @param {number}  status      The status code of the response. 0 is success, otherwise is error.
    * @param {string}  reason      The error message if status is error, or nil if session request error happened.
    * @param {string}  sdp         The remote users SDP. Reference: https://tools.ietf.org/html/rfc4566
    */

   /**
    * The class representing Carrier stream.
    * @class
    */
   function Stream() {
       this.objId = null;
       this.carrierPlugin = null;

       /** @property {number}  id Stream ID. **/
       this.id = null;
       /** @property {Carrier} carrier Parent carrier object. **/
       this.carrier = null;
       /** @property {Session} session Parent session object. **/
       this.session = null;

       this.callbacks = {
           /* Common callbacks */
           /**
            * The callback function to report state of stream when it's state changes.
            *
            * @callback onStateChanged
            *
            * @param {Stream}      stream      The carrier stream instance
            * @param {StreamState} state       Stream state defined in StreamState
            */
           onStateChanged: null,

           /* Stream layered data callbacks */
           /**
            * The callback will be called when the stream receives incoming packet.
            * If the stream enabled multiplexing mode, application will not
            * receive stream-layered data callback any more. All data will reported
            * as multiplexing channel data.
            *
            * @callback onStreamData
            *
            * @param {Stream} stream      The carrier stream instance
            * @param {base64} data        The received packet data.
            */
           onStreamData: null,

           /* Channel callbacks */
           /**
            * The callback function to be called when new multiplexing channel request to open.
            *
            * @callback onChannelOpen
            *
            * @param
            * @param {Stream} stream      The carrier stream instance
            * @param {number} channel     The current channel ID.
            * @param {string} cookie      Application defined string data send from remote peer.
            *
            */
           onChannelOpen: null,

           /**
            * The callback function to be called when new multiplexing channel opened.
            *
            * @callback onChannelOpened
            *
            * @param {Stream} stream      The carrier stream instance
            * @param {number} channel     The current channel ID.
            */
           onChannelOpened: null,

           /**
            * The callback function to be called when channel close.
            *
            * @callback onChannelClose
            *
            * @param {Stream} stream      The carrier stream instance
            * @param {number} channel     The current channel ID.
            * @param {string} reason      Channel close reason code, defined in CloseReason.
            */
           onChannelClose: null,

           /**
            * The callback functiont to be called when channel received incoming data.
            *
            * @callback onChannelData
            *
            * @param {Stream} stream      The carrier stream instance
            * @param {number} channel     The current channel ID.
            * @param {base64} data        The received packet data.
            */
           onChannelData: null,

           /**
            * The callback function to be called when remote peer ask to pend data sending.
            *
            * @callback onChannelPending
            *
            * @param {Stream} stream      The carrier stream instance
            * @param {number} channel     The current channel ID.
            */
           onChannelPending: null,

           /**
            * The callback function to be called when remote peer ask to resume data sending.
            *
            * @callback onChannelResume
            *
            * @param {Stream} stream      The carrier stream instance
            * @param {number} channel     The current channel ID.
            */
           onChannelResume: null,
       }

   }

   Stream.prototype = {
       constructor: Stream,

       /**
        * Add or remove Stream callback.
        *
        * @param {string}   name       The callback name.
        * @param {Function} callback   The function to add or change callback function. If set to null, will remove callback.
        */
       on: function (name, callback) {
           if (typeof callback != 'function') {
               return false;
           }
           for (var i = 0; i < STREAM_CB_NAMES.length; i++) {
               if (name == STREAM_CB_NAMES[i]) {
                   this.callbacks[name] = callback;
                   return true;
               }
           }
           return fasle;
       },

       process: function (onSuccess, onError, name, args) {
           var me = this;
           var _onSuccess = function (ret) {
               ret.stream = me;
               if (onSuccess) onSuccess(ret);
           };
           exec(_onSuccess, onError, 'CarrierPlugin', name, args);
       },

       /**
        * Get tranport info of carrier stream.
        * @param {Function} onSuccess  The function to call when success, the param is a TransportInfo object
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        */
       getTransportInfo: function (onSuccess, onError) {
           this.process(onSuccess, onError, "getTransportInfo", [this.objId]);
       },

       /**
        * Send outgoing data to remote peer.
        * If the stream is in multiplexing mode, application can not call this function.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a Number: Bytes of data sent.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {base64}   data      The send data.
        */
       write: function (onSuccess, onError, data) {
           this.process(onSuccess, onError, "streamWrite", [this.objId, data]);
       },

       /**
        * Open a new channel on multiplexing stream.
        * If the stream is in multiplexing mode, application can not call this function.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a Number: New channel ID.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   cookie    The application defined data passed to remote peer
        */
       openChannel: function (onSuccess, onError, cookie) {
           this.process(onSuccess, onError, "openChannel", [this.objId, cookie]);
       },

       /**
        * Close a new channel on multiplexing stream.
        * If the stream is in multiplexing mode, application can not call this function.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {number}   channel   The channel ID to close
        */
       closeChannel: function (onSuccess, onError, channel) {
           this.process(onSuccess, onError, "closeChannel", [this.objId, channel]);
       },

       /**
        * Send outgoing data to remote peer.
        * If the stream is in multiplexing mode, application can not call this function.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a Number: Bytes of data sent.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {number} channel     The current channel ID.
        * @param {base64} data        The send data.
        */
       writeChannel: function (onSuccess, onError, channel, data) {
           this.process(onSuccess, onError, "writeChannel", [this.objId, channel, data]);
       },

       /**
        * Request remote peer to pend channel data sending.
        * If the stream is in multiplexing mode, application can not call this function.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {number} channel     The current channel ID.
        */
       pendChannel: function (onSuccess, onError, channel) {
           this.process(onSuccess, onError, "pendChannel", [this.objId, channel]);
       },

       /**
        * Request remote peer to resume channel data sending.
        * If the stream is in multiplexing mode, application can not call this function.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {number} channel     The current channel ID.
        */
       resumeChannel: function (onSuccess, onError, channel) {
           this.process(onSuccess, onError, "resumeChannel", [this.objId, channel]);
       },

       /**
        * Open a port forwarding to remote service over multiplexing.
        * If the stream is in multiplexing mode, application can not call this function.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a Number: Port forwarding ID.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   service   The remote service name
        * @param {PortForwardingProtocol}  protocol    Port forwarding protocol
        * @param {string}   host      Local host or ip to binding. If host is null, port forwarding will bind to localhost
        * @param {number}   port      Local port to binding.
        */
       openPortForwarding: function (onSuccess, onError, service, protocol, host, port) {
           this.process(onSuccess, onError, "openPortForwarding", [this.objId, service, protocol, host, port]);
       },

       /**
        * Close a port forwarding.
        * If the stream is in multiplexing mode, application can not call this function.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {number}   portForwarding  The portforwarding ID.
        */
       closePortForwarding: function (onSuccess, onError, portForwarding) {
           this.process(onSuccess, onError, "closePortForwarding", [this.objId, portForwarding]);
       },
   }

   /**
    * The class representing Carrier Session.
    * @class
    */
   function Session() {
       this.objId = null;
       this.carrierPlugin = null;
       this.streams = [];

       /** @property {string} peer The remote peer userid. **/
       this.peer = null;
       /** @property {Carrier} carrier Parent carrier object. */
       this.carrier = null;
   }

   Session.prototype = {
       constructor: Session,

       process: function (onSuccess, onError, name, args) {
           var me = this;
           var _onSuccess = function (ret) {
               ret.session = me;
               if (onSuccess) onSuccess(ret);
           };
           exec(_onSuccess, onError, 'CarrierPlugin', name, args);
       },

       /**
        * Close a session to friend. All resources include streams, channels, portforwardings
        * associated with current session will be destroyed.
        */
       close: function (onSuccess, onError) {
           this.process(onSuccess, onError, "sessionClose", [this.objId]);
       },

       // /**
       //  * Get remote peer id.
       //  *
       //  * @param {Function} onSuccess  The function to call when success, the param is a string: The remote peer userid.
       //  * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
       //  */
       // getPeer: function (onSuccess, onError) {
       //     this.process(onSuccess, onError, "getPeer", [this.objId]);
       // },

       /**
        * Send session request to the friend.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {onSessionRequestComplete} handler A handler to the SessionRequestCompleteHandler to receive the session response
        */
       request: function (onSuccess, onError, handler) {
           var handlerId = 0;
           if (typeof handler == "function") {
               handlerId = this.carrierPlugin.addSessionRequestCompleteCB(handler, this);
           }
           this.process(onSuccess, onError, "sessionRequest", [this.objId, handlerId]);
       },

       /**
        * Reply the session request from friend.
        *
        * This function will send a session response to friend.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {number}   status     The status code of the response. 0 is success, otherwise is error
        * @param {string}   reason     The error message if status is error, or null if success
        */
       replyRequest: function (onSuccess, onError, status, reason) {
           this.process(onSuccess, onError, "sessionReplyRequest", [this.objId, status, reason]);
       },

       /**
        * Begin to start a session.
        *
        * All streams in current session will try to connect with remote friend,
        * The stream status will update to application by stream's StreamHandler.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   sdp        The remote user's SDP.  Reference: https://tools.ietf.org/html/rfc4566
        */
       start: function (onSuccess, onError, sdp) {
           this.process(onSuccess, onError, "sessionStart", [this.objId, sdp]);
       },

       /**
        * Add a new stream to session.
        *
        * Carrier stream supports several underlying transport mechanisms:
        *
        *   - Plain/encrypted UDP data gram protocol
        *   - Plain/encrypted TCP like reliable stream protocol
        *   - Multiplexing over UDP
        *   - Multiplexing over TCP like reliable protocol
        *
        *  Application can use options to specify the new stream mode.
        *  Multiplexing over UDP can not provide reliable transport.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a Stream object: The new added carrier stream.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {StreamType} type     The stream type defined in StreamType
        * @param {number}   options    The stream mode options. options are constructed by a bitwise-inclusive OR of flags
        * @param {StreamCallbacks} callbacks The stream callbacks.
        */
       addStream: function (onSuccess, onError, type, options, callbacks) {
           var stream = new Stream();
           var me = this;
           var _onSuccess = function (ret) {
               stream.type = type;
               stream.objId = ret.objId;
               stream.id = ret.id;
               stream.carrierPlugin = me.carrierPlugin;
               stream.carrier = me.carrier;
               stream.session = me.session;
               me.streams[stream.id] = stream;
               me.carrierPlugin.streams[stream.objId] = stream;
               if (onSuccess) onSuccess(stream);
           };

           if (callbacks) {
               for (var i = 0; i < STREAM_CB_NAMES.length; i++) {
                   var name = STREAM_CB_NAMES[i];
                   stream.callbacks[name] = callbacks[name];
               }
           }
           exec(_onSuccess, onError, 'CarrierPlugin', 'addStream', [this.objId, type, options]);
       },

       /**
        * Remove a stream from session.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {stream}   stream     The Stream to be removed
        */
       removeStream: function (onSuccess, onError, stream) {
           if (stream == this.streams[stream.id]) {
               var me = this;
               var _onSuccess = function (ret) {
                   ret.session = me;
                   me.streams[stream.id] = null;
                   me.carrierPlugin.streams[stream.objId] = null;
                   if (onSuccess) onSuccess(ret);
               };
               exec(_onSuccess, onError, 'CarrierPlugin', "removeStream", [this.objId, stream.objId]);
           }
           else {
               error("This steam isn't belong the session!");
           }
       },

       /**
        * Add a new portforwarding service to session.
        *
        * The registered services can be used by remote peer in portforwarding request.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   service   The new service name, should be unique in session scope.
        * @param {PortForwardingProtocol}  protocol    The protocol of the service.
        * @param {string}   host      The host name or ip of the service.
        * @param {number}   port      The port of the service.
        */
       addService: function (onSuccess, onError, service, protocol, host, port) {
           this.process(onSuccess, onError, "addService", [this.objId, service, protocol, host, port]);
       },

       /**
        * Remove a portforwarding server to session.
        *
        * This function has not effect on existing portforwarings.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   service    The service name.
        */
       removeService: function (onSuccess, onError, service) {
           this.process(onSuccess, onError, "removeService", [this.objId, service]);
       }
   }

   /**
    * The class representing Carrier.
    * @class
    */
   function Carrier() {
       this.objId = null;
       this.carrierPlugin = null;

       /** @property {string} nodeId Node id. **/
       this.nodeId = null;
       /** @property {string} userId User id. **/
       this.userId = null;
       /** @property {string} address Node address. **/
       this.address = null;

       this._nospam = null;
       this._presence = null;

       this.callbacks = {
           /**
            * The callback function to process the self connection status.
            *
            *@callback onConnection
            *
            * @param {Carrier}  carrier   Carrier node instance
            * @param {number}  status     Current connection status. @see ConnectionStatus
            */
           onConnection: null,

           /**
            * The callback function to process the ready notification.
            *
            * Application should wait this callback invoked before calling any
            * function to interact with friends.
            *
            * @callback onReady
            *
            * @param {Carrier}  carrier   Carrier node instance
            */
           onReady: null,

           /**
            * The callback function to process the self info changed event.
            *
            * @callback onSelfInfoChanged
            *
            * @param {Carrier}   carrier  Carrier node instance
            * @param {UserInfo} userInfo  The updated user information
            */
           onSelfInfoChanged: null,

           /**
            * The callback function to iterate the each friend item in friend list.
            *
            * @callback onFriends
            *
            * @param {Carrier}  carrier   Carrier node instance
            * @param {Array}   friends  The friends list.
            */
           onFriends: null,

           /**
            * The callback function to process the friend connections status changed event.
            *
            * @callback onFriendConnection
            *
            * @param {Carrier}  carrier   Carrier node instance
            * @param {string}  friendId   The friend's user id.
            * @param {number}  status     The connection status of friend. @see ConnectionStatus
            */
           onFriendConnection: null,

           /**
            * The callback function to process the friend information changed event.
            *
            * @callback onFriendInfoChanged
            *
            * @param {Carrier}  carrier   Carrier node instance
            * @param {string}  friendId     The friend's user id
            * @param {FriendInfo}  info The update friend information
            */
           onFriendInfoChanged: null,

           /**
            * The callback function to process the friend presence changed event.
            *
            * @callback onFriendPresence
            *
            * @param {Carrier}  carrier   Carrier node instance
            * @param {string}  friendId     The friend's user id
            * @param {number}  presence The presence status of the friend
            */
           onFriendPresence: null,

           /**
            * The callback function to process the friend request.
            *
            * @callback onFriendRequest
            *
            * @param {Carrier}   carrier  Carrier node instance
            * @param {string}   userId      The user id who want be friend with current user
            * @param {UserInfo} info    The user information to `userId`
            * @param {string}   hello      The PIN for target user, or any application defined content
            */
           onFriendRequest: null,

           /**
            * The callback function to process the new friend added event.
            *
            * @callback onFriendAdded
            *
            * @param {Carrier}      carrier   Carrier node instance
            * @param {FriendInfo}  friendInfo The added friend's information
            */
           onFriendAdded: null,

           /**
            * The callback function to process the friend removed event.
            *
            * @callback onFriendRemoved
            *
            * @param {Carrier}  carrier   Carrier node instance
            * @param {string}  friendId     The friend's user id
            */
           onFriendRemoved: null,

           /**
            * The callback function to process the friend message.
            *
            * @callback onFriendMessage
            *
            * @param {Carrier}  carrier   Carrier node instance
            * @param {string}  from       The id from who send the message
            * @param {string}  message    The message content
            * @param {Boolean} isOffline  Whether this message sent as online message or
            *   offline message. The value of true means the message was sent as
            *   online message, otherwise as offline message.
            */
           onFriendMessage: null,

           /**
            * The callback function to process the friend invite request.
            *
            * @callback onFriendInviteRequest
            *
            * @param {Carrier}  carrier   Carrier node instance
            * @param {string}  from         The user id from who send the invite request
            * @param {string}  data         The application defined data sent from friend
            */
           onFriendInviteRequest: null,

           /**
            * The callback function that handle session request.
            *
            * @callback onSessionRequest
            *
            * @param {Carrier}  carrier   Carrier node instance
            * @param {string}  from        The id who send the message
            * @param {string}  sdp         The remote users SDP. Reference: https://tools.ietf.org/html/rfc4566
            */
           onSessionRequest: null,

           /**
            * The callback function that handle group invite.
            *
            * @callback onGroupInvite
            *
            * @param {Carrier}  carrier    Carrier node instance
            * @param {string}  groupTitle  Current group title
            */
           onGroupInvite: null,

           /**
            * An callback function that handle file transfer connect request.
            *
            * @callback onConnectRequest
            *
            * @param {Carrier} carrier     Carrier node instance
            * @param {string}  from        The id who send the request
            * @param {FileTransferInfo} fileInfo    Information of the file which the requester wants to send
            */
           onConnectRequest: null,
       }
   }

   Carrier.prototype = {
       constructor: Carrier,

       /** @property {number} nospam The nospam for Carrier address is used to eliminate spam friend. **/
       set nospam(value) {
           var me = this;
           var success = function(ret) {
               me._nospam = value;
           };
           this.process(success, null, "setNospam", [this.objId, value]);
       },

       get nospam() {
           return this._nospam;
       },

       /** @property {number} presence Presence status. **/
       set presence(value) {
           var me = this;
           var success = function(ret) {
               me._presence = value;
           };
           this.process(success, null, "setPresence", [this.objId, value]);
       },

       get presence() {
           return this._presence;
       },

       /**
        * Add or remove Carrier callback.
        *
        * @param {string}   name       The callback name.
        * @param {Function} callback   The function to add or change callback function. If set to null, will remove callback.
        */
       on: function (name, callback) {
           if (typeof callback != 'function') {
               return false;
           }
           for (var i = 0; i < CARRIER_CB_NAMES.length; i++) {
               if (name == CARRIER_CB_NAMES[i]) {
                   this.callbacks[name] = callback;
                   return true;
               }
           }
           return fasle;
       },

       process: function (onSuccess, onError, name, args) {
           var me = this;
           var _onSuccess = function (ret) {
               ret.carrier = me;
               if (onSuccess) onSuccess(ret);
           };
           exec(_onSuccess, onError, 'CarrierPlugin', name, args);
       },

       /**
        * Start carrier node asynchronously to connect to carrier network. If the connection
        * to network is successful, carrier node starts working.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {number}   iterateInterval Internal loop interval, in milliseconds.
        */
       start: function (onSuccess, onError, iterateInterval) {
           this.process(onSuccess, onError, "carrierStart", [this.objId, iterateInterval]);
       },


       /**
        * Get self user information.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a UserInfo: the user information to the carrier node.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        */
       getSelfInfo: function (onSuccess, onError) {
           this.process(onSuccess, onError, "getSelfInfo", [this.objId]);
       },

       /**
        * Update self user information.
        * After self user information changed, carrier node will update this information
        * to carrier network, and thereupon network broadcasts the change to all friends.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {UserInfo} userinfo   The user information to update for this carrier node.
        */
       setSelfInfo: function (onSuccess, onError, name, value) {
           this.process(onSuccess, onError, "setSelfInfo", [this.objId, name, value]);
       },


       // /**
       //  * Get the nospam for Carrier address.
       //  *
       //  * Get the 4-byte nospam part of the Carrier address with host byte order
       //  * expected. Nospam for Carrier address is used to eliminate spam friend
       //  * request.
       //  *
       //  * @param {Function} onSuccess  The function to call when success, the param is a Number: nospam.
       //  * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
       //  */
       // getNospam: function (onSuccess, onError) {
       //     this.process(onSuccess, onError, "getNospam", [this.objId]);
       // },

       // /**
       //  * Update self nospam of address for this carrier node.
       //  *
       //  * Update the nospam of carrier node address with host byte order
       //  * expected. Nospam for Carrier address is used to eliminate spam friend
       //  * request.
       //  *
       //  * @param {Function} onSuccess  The function to call when success.
       //  * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
       //  * @param {number}   nospam   An integer value.
       //  */
       // setNospam: function (onSuccess, onError, nospam) {
       //     this.process(onSuccess, onError, "setNospam", [this.objId, nospam]);
       // },

       // /**
       //  * Get self presence status.
       //  *
       //  * @param {Function} onSuccess  The function to call when success, the param is a Number: presence status.
       //  * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
       //  */
       // getPresence: function (onSuccess, onError) {
       //     this.process(onSuccess, onError, "getPresence", [this.objId]);
       // },

       // /**
       //  * Update self presence status.
       //  *
       //  * @param {Function} onSuccess  The function to call when success.
       //  * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
       //  * @param {number}   presence   the new presence status.
       //  */
       // setPresence: function (onSuccess, onError, presence) {
       //     this.process(onSuccess, onError, "setPresence", [this.objId, presence]);
       // },

       /**
        * Check if carrier node instance is being ready.
        *
        * All carrier interactive APIs should be called only if carrier node instance
        * is being ready.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a Boolean: true if the carrier node instance is ready, or false if not.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        */
       isReady: function (onSuccess, onError) {
           this.process(onSuccess, onError, "isReady", [this.objId]);
       },

       /**
        * Get friends list.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a {friendId: info} Object: The list of friend information to current user.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        */
       getFriends: function (onSuccess, onError) {
           this.process(onSuccess, onError, "getFriends", [this.objId]);
       },

       /**
        * Get specified friend information.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a FriendInfo: The friend information.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   userId    The user identifier of friend
        */
       getFriend: function (onSuccess, onError, userId) {
           this.process(onSuccess, onError, "getFriend", [this.objId, userId]);
       },

       /**
        * Set the label of the specified friend.
        *
        * The label of a friend is a private alias name for current user. It can be
        * seen by current user only, and has no impact to the target friend itself.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   userId    The friend's user identifier
        * @param {string}   label   The new label of specified friend
        */
       labelFriend: function (onSuccess, onError, userId, label) {
           this.process(onSuccess, onError, "labelFriend", [this.objId, userId, label]);
       },

       /**
        * Check if the user ID is friend.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a Boolean: True if the user is a friend, or false if not.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   userId  The userId to check.
        */
       isFriend: function (onSuccess, onError, userId, label) {
           this.process(onSuccess, onError, "isFriend", [this.objId, userId]);
       },

       /**
        * Add friend by sending a new friend request.
        *
        * This function will add a new friend with specific address, and then
        * send a friend request to the target node.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   address   the target user address of remote carrier node.
        * @param {string}   hello     PIN for target user, or any application defined content.
        */
       addFriend: function (onSuccess, onError, address, hello) {
           this.process(onSuccess, onError, "addFriend", [this.objId, address, hello]);
       },

       /**
        * Accept the friend request.
        *
        * This function is used to add a friend in response to a friend request.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   userId  The user id who want be friend with us.
        */
       acceptFriend: function (onSuccess, onError, userId) {
           this.process(onSuccess, onError, "acceptFriend", [this.objId, userId]);
       },

       /**
        * Remove a friend.
        *
        * This function will remove a friend on this carrier node.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   userId      The target user id to remove friendship
        */
       removeFriend: function (onSuccess, onError, userId) {
           this.process(onSuccess, onError, "removeFriend", [this.objId, userId]);
       },

       /**
        * Send a message to a friend.
        *
        * The message length may not exceed MAX_APP_MESSAGE_LEN, and message itself
        * should be text-formatted. Larger messages must be split by application
        * and sent as separate messages. Other nodes can reassemble the fragments.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   to    The target id
        * @param {string}   message The message content defined by application
        */
       sendFriendMessage: function (onSuccess, onError, to, message) {
           this.process(onSuccess, onError, "sendFriendMessage", [this.objId, to, message]);
       },

       /**
        * Send invite request to a friend.
        *
        * Application can attach the application defined data with in the invite
        * request, and the data will send to target friend.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   to      The target id
        * @param {string}   data    The application defined data send to target user
        * @param {onFriendInviteResponse}   handler The handler to receive invite reponse
        */
       inviteFriend: function (onSuccess, onError, to, data, handler) {
           var handlerId = 0;
           if (typeof handler == "function") {
               handlerId = this.carrierPlugin.addFriendInviteResponseCB(handler, this);
           }
           this.process(onSuccess, onError, "inviteFriend", [this.objId, to, data, handlerId]);
       },

       /**
        * Reply the friend invite request.
        *
        * This function will send a invite response to friend.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   to      The id who send invite request
        * @param {number}   status    The status code of the response. 0 is success, otherwise is error
        * @param {string}   reason    The error message if status is error, or null if success
        * @param {string}   data    The application defined data send to target user. If the status is error, this will be ignored
        */
       replyFriendInvite: function (onSuccess, onError, to, status, reason, data) {
           this.process(onSuccess, onError, "replyFriendInvite", [this.objId, to, status, reason, data]);
       },

       /**
        * Create a new group request.
        *
        * This function will create a new group.
        *
        * @param {Function} onSuccess  The function to call when success, the param is Group object.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        */
       newGroup: function (onSuccess, onError, callbacks) {
           var _onSuccess = function(ret){
               var group = new Group();
               group.groupId = ret.groupId;
               carrierPlugin.groups[group.groupId] = group;

               if (typeof (callbacks) != "undefined" && callbacks != null) {
                   for (var i = 0; i < GROUP_CB_NAMES.length; i++) {
                       var name = GROUP_CB_NAMES[i];
                       carrierPlugin.groups[group.groupId].callbacks[name] = callbacks[name];
                   }
               }

               if (onSuccess) onSuccess(group);
            };
           this.process(_onSuccess, onError, "createGroup", [this.objId]);
       },

       /**
        * Join a group request.
        *
        * Join a group associating with cookie into which remote friend invites.
        *
        * @param {Function} onSuccess  The function to call when success, the param is Group object
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string} friendId     The friend who send a group invitation
        * @param {string} cookieCode    The cookieCode information to join group,from onGroupInvite.
        */
       groupJoin: function (onSuccess, onError, friendId, cookieCode, callbacks) {
            var _onSuccess = function(ret){
                var group = new Group();
                group.groupId = ret.groupId;
                carrierPlugin.groups[group.groupId] = group;

                if (typeof (callbacks) != "undefined" && callbacks != null) {
                    for (var i = 0; i < GROUP_CB_NAMES.length; i++) {
                        var name = GROUP_CB_NAMES[i];
                        carrierPlugin.groups[group.groupId].callbacks[name] = callbacks[name];
                    }
                }

                if (onSuccess) onSuccess(group);
            };
            this.process(_onSuccess, onError, "joinGroup", [this.objId,friendId,cookieCode]);
       },

       /**
        * Leave a group request.
        *
        * @param {Function} onSuccess  The function to call when success, The param is a string "Success!";
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {Object} group      Group object
        */
       groupLeave: function (onSuccess, onError, group) {
           var _onSuccess = function(ret){
               delete carrierPlugin.groups[group.groupId];
               if (onSuccess) onSuccess(group);
           };
           this.process(_onSuccess, onError, "leaveGroup", [this.objId,group.groupId]);
       },

      /**
       * Get all Groups request.
       *
       * @param {Function} onSuccess  The function to call when success.The param is a group array object ,
       * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
       */
       getGroups: function (onSuccess, onError) {
           var groups = [];
           var index = 0;
           for(var i in carrierPlugin.groups) {
               groups[index]=carrierPlugin.groups[i];
               index = index+1;
           }
           if (onSuccess) onSuccess(groups);
       },

       /**
        * Create a new file transfer to a friend.
        *
        * The file transfer object represent a conversation handle to a friend.
        *
        * @param {Function} onSuccess  The function to call when success.The param is fileTransfer instance,
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   to         The target id(userid or userid@nodeid).
        * @param {FileTransferInfo} fileTransferInfo    Information of the file to be transferred.
        */
        newFileTransfer: function (onSuccess, onError, to , fileTransferInfo , callbacks) {
            var _onSuccess = function(ret){
                var fileTransfer = new FileTransfer();
                fileTransfer.fileTransferId = ret.fileTransferId;
                carrierPlugin.fileTransfers[fileTransfer.fileTransferId] = fileTransfer;

                if (typeof (callbacks) != "undefined" && callbacks != null) {
                    for (var i = 0; i < FILE_TRANSFER_CB_NAMES.length; i++) {
                        var name = FILE_TRANSFER_CB_NAMES[i];
                        carrierPlugin.fileTransfers[fileTransfer.fileTransferId].callbacks[name] = callbacks[name];
                    }
                }
                if (onSuccess) onSuccess(fileTransfer);
            };
            this.process(_onSuccess, onError, "newFileTransfer", [this.objId,to,fileTransferInfo]);
        },

        /**
         * Generate unique file identifier with random algorithm.
         *
         * @param {Function} onSuccess  The function to call when success.The param is fileId,
         *
         */
        generateFileId: function (onSuccess) {
            var _onSuccess = function(ret){
                if (onSuccess) onSuccess(ret.fileId);
            };
            this.process(_onSuccess,null, "generateFileTransFileId", []);
        },

       /**
        * Create a new session to a friend.
        *
        * The session object represent a conversation handle to a friend.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a Session Object: The new Session object
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   to         The target id(userid or userid@nodeid).
        */
       newSession: function (onSuccess, onError, to) {
           var me = this;
           var _onSuccess = function (ret) {
               var session = new Session();
               session.objId = ret.id;
               session.peer = ret.peer;
               session.carrier = me;
               session.carrierPlugin = me.carrierPlugin;
               if (onSuccess) onSuccess(session);
           };
           exec(_onSuccess, onError, 'CarrierPlugin', 'newSession', [this.objId, to]);
       },

       /**
        * Disconnect carrier node from carrier network, and destroy all associated resources to carreier node instance.
        * After calling the method, the carrier node instance becomes invalid.
        *
        * @param {Function} onSuccess  The function to call when success.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        */
       destroy: function (onSuccess, onError) {
           exec(onSuccess, onError, 'CarrierPlugin', 'destroy', [this.objId]);
       }
   }

    /**
    * The class representing Group.
    * @class
    */
    function Group(){
        this.groupId = null;
        this.callbacks = {
           /**
            * The callback function that handle group connect status.
            *
            * @callback onGroupConnected
            *
            * @param {Group} group      The group instance .
            */
            onGroupConnected: null,

           /**
            * The callback function that handle group message.
            *
            * @callback onGroupMessage
            *
            * @param {Group} group      The group instance .
            * @param {string}  from        The friend's user id.
            * @param {string}  message     The message content
            */
            onGroupMessage: null,

           /**
            * The callback function that handle group title changed.
            *
            * @callback onGroupTitle
            *
            * @param {Group} group      The group instance .
            * @param {string}  from        The User id of the modifier
            * @param {string}  title       New group title
            */
            onGroupTitle: null,

           /**
            * The callback function that handle peer name changed.
            *
            * @callback onPeerName
            *
            * @param {Group} group      The group instance .
            * @param {string}  peerId      The peer's user id.
            * @param {string}  peerName    The peer's name.
            */
            onPeerName: null,

           /**
            * The callback function that handle peer list changed.
            *
            * @callback onPeerListChanged
            *
            * @param {Group} group      The group instance .
            */
            onPeerListChanged: null,
        }
    }

    Group.prototype = {
       constructor: Group,

        process: function (onSuccess, onError, name, args) {
            var me = this;
            var _onSuccess = function (ret) {
               ret.group = me;
               if (onSuccess) onSuccess(ret);
            };
            exec(_onSuccess, onError, 'CarrierPlugin', name, args);
        },

       /**
        * Invite a friend into group request.
        *
        * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string} friendId     The friend's id
        */
        invite: function (onSuccess, onError, friendId) {
            this.process(onSuccess, onError, "inviteGroup", [this.groupId,friendId]);
        },

       /**
        * Send a message to a group request.
        *
        * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string} message      The message content defined by application
        */
        sendMessage: function (onSuccess, onError, message) {
            this.process(onSuccess, onError, "sendGroupMessage", [this.groupId,message]);
        },

       /**
        * Get group title request.
        *
        * @param {Function} onSuccess  The function to call when success.The param is a string ,
        *                              group title information
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        */
        getTitle: function (onSuccess, onError) {
            var _onSuccess = function(ret){
                 var title = ret.groupTitle;
                 if (onSuccess) onSuccess(title);
            };
            this.process(_onSuccess, onError, "getGroupTitle", [this.groupId]);
        },

       /**
        * Modify group title request.
        *
        * @param {Function} onSuccess  The function to call when success.The param is a json string ,
        *                              group title information,
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}  groupTitle  New group's title
        */
        setTitle: function (onSuccess, onError, groupTitle) {
            var _onSuccess = function(ret){
                var title = ret.groupTitle;
                if (onSuccess) onSuccess(title);
            };
            this.process(_onSuccess, onError, "setGroupTitle", [this.groupId,groupTitle]);
        },

       /**
        * Get peers from Group request.
        *
        * @param {Function} onSuccess  The function to call when success.The param is a json string ,
        *                              group peers information ,
        *                              like this {"PEER_ID":{"peerName":"PEER_NAME","peerUserId":"PEER_ID"}}.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        */
        getPeers: function (onSuccess, onError) {
            var _onSuccess = function(ret){
                var peers = ret.peers;
                if (onSuccess) onSuccess(peers);
            };
            this.process(_onSuccess, onError, "getGroupPeers", [this.groupId]);
        },

       /**
        * Get a peer from Group request.
        *
        * @param {Function} onSuccess  The function to call when success.The param is a json string ,
        *                              a peer information ,
        *                              like this{"peerName":"PEER_NAME","peerUserId":"PEER_ID"}.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   peerId    The peer's id
        */
        getPeer: function (onSuccess, onError, peerId) {
            var _onSuccess = function(ret){
                var peer = ret.peer;
                if (onSuccess) onSuccess(peer);
            };
            this.process(_onSuccess, onError, "getGroupPeer", [this.groupId,peerId]);
        },
    }

    /**
     * The class representing FileTransfer.
     * @class
     */
    function FileTransfer(){
        this.fileTransferId = null;
        this.FileTransferState = {
          /** The file transfer connection is initialized. */
          Initialized: 1,

          /** The file transfer connection is connecting.*/
          Connecting: 2,

          /** The file transfer connection has been established. */
          Connected: 3,

          /** The file transfer connection is closed and disconnected. */
          Closed: 4,

          /** The file transfer connection failed with some reason. */
          Failed: 5
        }
        this.callbacks = {

            /**
             * The callback function that handle the state changed event.
             * An application-defined function that handle the state changed event.
             *
             * @callback onStateChanged
             * @param {FileTransfer} fileTransfer   The fileTransfer instance .
             * @param {FileTransferState} state     The file transfer connection state.
             */
            onStateChanged: null,

            /**
             * An application-defined function that handle transfer file request event.
             *
             * @callback onFileRequest
             *
             * @param {FileTransfer} fileTransfer   The fileTransfer instance .
             * @param {string} fileId    The file identifier.
             * @param {string} filename  The file name.
             * @param {Long}   size      The total file size.
             */
            onFileRequest: null,


            /**
             * An application-defined function that handle file transfer pull request
             * event.
             *
             * @callback onPullRequest
             *
             * @param {FileTransfer} fileTransfer   The fileTransfer instance .
             * @param {string} fileId  The unique identifier of transferring file.
             * @param {string} offset  The offset of file where transfer begins.
             */
            onPullRequest: null,

            /**
             * An application-defined function that perform receiving data.
             *
             * @callback onData
             *
             * @param {FileTransfer} fileTransfer   The fileTransfer instance .
             * @param {string} fileId  The unique identifier of transferring file.
             * @param {string} data    The received data.
             */
            onData: null,

            /**
             * An application-defined function that handles the event of end of receiving data.
             *
             * @callback onDataFinished
             *
             * @param {FileTransfer} fileTransfer   The fileTransfer instance .
             * @param {string} fileId  The unique identifier of transferring file.
             */
            onDataFinished: null,

            /**
             * An application-defined function that handles pause file transfer
             * notification from the peer.
             *
             * @callback onPending
             *
             * @param {FileTransfer} fileTransfer   The fileTransfer instance .
             * @param {string} fileId  The unique identifier of transferring file.
             */
            onPending: null,

            /**
             * An application-defined function that handles resume file transfer
             * notification from the peer.
             *
             * @callback onResume
             *
             * @param {FileTransfer} fileTransfer   The fileTransfer instance .
             * @param {string} fileId  The unique identifier of transferring file.
             */
            onResume: null,

            /**
             * An application-defined function that handles cancel file transfer
             * notification from the peer.
             *
             * @callback onCancel
             *
             * @param {FileTransfer} fileTransfer   The fileTransfer instance .
             * @param {string} fileId  The unique identifier of transferring file.
             * @param {int}    status  Cancel transfer status code.
             * @param {string} reason  Cancel transfer reason.
             */
            onCancel: null,
        }
    }

    FileTransfer.prototype = {
       constructor: FileTransfer,

        process: function (onSuccess, onError, name, args) {
            var me = this;
            var _onSuccess = function (ret) {
               ret.fileTransfer = me;
               if (onSuccess) onSuccess(ret);
            };
            exec(_onSuccess, onError, 'CarrierPlugin', name, args);
        },

        /**
         * Close file transfer instance.
         *
         * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         *
         */
        close: function (onSuccess, onError) {
            this.process(onSuccess, onError, "closeFileTrans", [this.fileTransferId]);
        },

        /**
         * Get an unique file identifier of specified file.
         * Each file has its unique file id used between two peers.
         *
         * @param {Function} onSuccess  The function to call when success.The param is fileId,
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         * @param {string}   filename   The target file name.
         *
         */
        getFileId: function (onSuccess, onError, filename) {
            var _onSuccess = function (ret) {
               var fileId = ret.fileId;
               if (onSuccess) onSuccess(fileId);
            };
            this.process(_onSuccess, onError, "getFileTransFileId", [this.fileTransferId,filename]);
        },

        /**
         * Get file name by file id.
         * Each file has its unique file id used between two peers.
         *
         * @param {Function} onSuccess  The function to call when success.The param is filename,
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         * @param {string}   fileId     The target file identifier.
         */
        getFileName: function (onSuccess, onError, fileId) {
            var _onSuccess = function (ret) {
               var filename = ret.filename;
               if (onSuccess) onSuccess(filename);
            };
            this.process(_onSuccess, onError, "getFileTransFileName", [this.fileTransferId,fileId]);
        },

        /**
         * Send a file transfer connect request to target peer.
         *
         * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         *
         */
        connect: function (onSuccess, onError) {
            this.process(onSuccess, onError, "fileTransConnect", [this.fileTransferId]);
        },

        /**
         * Accept file transfer connection request.
         *
         * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         *
         */
        acceptConnect: function (onSuccess, onError) {
            this.process(onSuccess, onError, "acceptFileTransConnect", [this.fileTransferId]);
        },

        /**
         * Add a file to queue of file transfer.
         *
         * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         * @param {Object} fileinfo  Information of the file to be added.
         */
        addFile: function (onSuccess, onError, fileInfo) {
            this.process(onSuccess, onError, "addFileTransFile", [this.fileTransferId,fileInfo]);
        },

        /**
         * To send pull request to transfer file with specified fileId.
         *
         * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         * @param {string}   fileId     The file identifier.
         * @param {Long}     offset     The offset of file where transfer begins.
         */
        pullData: function (onSuccess, onError,fileId,offset) {
            this.process(onSuccess, onError, "pullFileTransData", [this.fileTransferId,fileId,offset]);
        },

        /**
         * To transfer file data with specified fileId.
         *
         * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         * @param {string}   fileId     The file identifier.
         * @param {string}   data       The data to transfer for file.
         */
        writeData: function (onSuccess, onError,fileId,data) {
            this.process(onSuccess, onError, "writeFileTransData", [this.fileTransferId,fileId,data]);
        },

        /**
         * Finish transferring file with specified fileId(only available to sender).
         *
         * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         * @param {string}   fileId     The file identifier.
         */
        sendFinish: function (onSuccess, onError, fileId) {
            this.process(onSuccess, onError, "sendFileTransFinish", [this.fileTransferId,fileId]);
        },

        /**
         * Cancel transferring file with specified fileId(only available to receiver).
         *
         * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         * @param {string}   fileId     The file identifier.
         */
        cancelTransfer: function (onSuccess, onError, fileId , status , reason) {
            this.process(onSuccess, onError, "cancelFileTrans", [this.fileTransferId, fileId , status , reason]);
        },

        /**
         * Pend transferring file with specified fileId.
         *
         * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         * @param {string}   fileId     The file identifier.
         */
        pendTransfer: function (onSuccess, onError, fileId) {
            this.process(onSuccess, onError, "pendFileTrans", [this.fileTransferId , fileId]);
        },

        /**
         * Resume transferring file with specified fileId.
         *
         * @param {Function} onSuccess  The function to call when success.The param is a string "Success!",
         * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
         * @param {string}   fileId     The file identifier.
         */
        resumeTransfer: function (onSuccess, onError, fileId) {
            this.process(onSuccess, onError, "resumeFileTrans", [this.fileTransferId , fileId]);
        },
    }

   /**
   * @exports carrierPlugin
   */
   function CarrierPlugin() {
       this.carriers = [];
       this.streams = [];
       this.groups = {};
       this.fileTransfers = {};

       this.FriendInviteEvent = [];
       this.FriendInviteCount = 0;
       this.SRCEvent = [];
       this.SRCCount = 0;

       const CARRIER = 1;
       const SESSION = 2;
       const STREAM = 3;
       const FRIEND_INVITE = 4;
       const GROUP = 5 ;
       const FILE_TRANSFER = 6 ;

       /**
        * @description
        * Carrier node connection status to the carrier network.
        *
        * @enum {number}
        */
       this.ConnectionStatus = {
           /** Carrier node connected to the carrier network. */
           CONNECTED: 0,
           /** There is no connection to the carrier network. */
           DISCONNECTED: 1
       }

       /**
        * @description
        * Carrier node presence status.
        *
        * @enum {number}
        */
       this.PresenceStatus = {
           /** Carrier node is online and available. */
           NONE: 0,
           /** Carrier node is being away. */
           AWAY: 1,
           /** Carrier node is being busy. */
           BUSY: 2
       }

       /**
        * @description
        * Carrier stream type. Reference: https://tools.ietf.org/html/rfc4566#section-5.14 https://tools.ietf.org/html/rfc4566#section-8
        *
        * @enum {number}
        */
       this.StreamType = {
           /** Audio stream. */
           AUDIO: 0,
           /** Video stream. */
           VIDEO: 1,
           /** Text stream. */
           TEXT: 2,
           /** Application stream. */
           APPLICATION: 3,
           /** Message stream. */
           MESSAGE: 4,
       }

       /**
        * @description
        * Carrier stream state The stream state will be changed according to the phase of the stream.
        *
        * @enum {number}
        */
       this.StreamState = {
           /** Raw stream. */
           RAW: 0,
           /** Initialized stream. */
           INITIALIZED: 1,
           /** The underlying transport is ready for the stream to start. */
           TRANSPORT_READY: 2,
           /** The stream is trying to connect the remote. */
           CONNECTING: 3,
           /** The stream connected with remove peer. */
           CONNECTED: 4,
           /** The stream is deactived. */
           DEACTIVATED: 5,
           /** The stream closed gracefully. */
           CLOSED: 6,
           /** The stream is on error, cannot to continue. */
           ERROR: 7,
       }

       /**
        * @description
        * Carrier Stream's candidate type.
        *
        * @enum {number}
        */
       this.CandidateType = {
           /** Host candidate. */
           HOST: 0,
           /** Server reflexive, only valid to ICE transport. */
           SERVE_RREFLEXIVE: 1,
           /** Peer reflexive, only valid to ICE transport. */
           PEER_REFLEXIVE: 2,
           /** Relayed Candidate, only valid to ICE tranport. */
           RELAYED: 3,
       }

       /**
        * @description
        * Carrier network topology for session peers related to each other.
        *
        * @enum {number}
        */
       this.NetworkTopology = {
           /** LAN network topology. */
           LAN: 0,
           /** P2P network topology. */
           P2P: 1,
           /** Relayed netowrk topology. */
           RELAYED: 2,
       }

       /**
        * @description
        * Port forwarding supported protocols.
        *
        * @enum {number}
        */
       this.PortForwardingProtocol = {
           /** TCP protocol. */
           TCP: 1,
       }

       /**
        * @description
        * Multiplexing channel close reason mode.
        *
        * @enum {number}
        */
       this.CloseReason = {
           /** Channel closed normaly. */
           NORMAL: 0,
           /** Channel closed because of timeout. */
           TIMEOUT: 1,
           /** Channel closed because error occured. */
           ERROR: 2,
       }

       /**
        * @description
        * Carrier stream mode.
        *
        * @enum {number}
        */
       this.StreamMode = {
           /**
            * Compress option, indicates data would be compressed before transmission.
            * For now, just reserved this bit option for future implement.
            */
           COMPRESS: 1,
           /**
            * Encrypt option, indicates data would be transmitted with plain mode.
            * which means that transmitting data would be encrypted in default.
            */
           PLAIN: 2,
           /**
            * Relaible option, indicates data transmission would be reliable, and be
            * guranteed to received by remote peer, which acts as TCP transmission
            * protocol. Without this option bitwised, the transmission would be
            * unreliable as UDP transmission protocol.
            */
           RELIABLE: 4,
           /**
            * Multiplexing option, indicates multiplexing would be activated on
            * enstablished stream, and need to use multipexing APIs related with channel
            * instread of APIs related strema to send/receive data.
            */
           MULTIPLEXING: 8,
           /**
            * PortForwarding option, indicates port forwarding would be activated
            * on established stream. This options should bitwise with 'Multiplexing'
            * option.
            */
           PORT_FORWARDING: 16,
       }

       Object.freeze(CarrierPlugin.prototype);
       Object.freeze(Carrier.prototype);
       Object.freeze(Session.prototype);
       Object.freeze(Stream.prototype);
       Object.freeze(Group.prototype);
       Object.freeze(FileTransfer.prototype);

       Object.freeze(this.ConnectionStatus);
       Object.freeze(this.PresenceStatus);
       Object.freeze(this.StreamType);
       Object.freeze(this.StreamState);
       Object.freeze(this.CandidateType);
       Object.freeze(this.NetworkTopology);
       Object.freeze(this.PortForwardingProtocol);
       Object.freeze(this.CloseReason);
       Object.freeze(this.StreamMode);

       exec(function () { }, null, 'CarrierPlugin', 'initVal', []);

       var me = this;

       this.onCarrierEvent = function (event) {
           event.carrier = me.carriers[event.id];
           if (event.carrier) {
               //        event.id = null;
               if (event.carrier.callbacks[event.name]) {
                   event.carrier.callbacks[event.name](event);
               }
           }
           else {
               alert(event.name);
           }
       },

       this.onStreamEvent = function (event) {
           event.stream = me.streams[event.id];
           event.id = null;
           if (event.stream && event.stream.callbacks[event.name]) {
               event.stream.callbacks[event.name](event);
           }
       },

       //FriendInviteResponseHandler
       this.addFriendInviteResponseCB = function (callback, carrier) {
           me.FriendInviteCount++;
           me.FriendInviteEvent[me.FriendInviteCount] = new Object;
           me.FriendInviteEvent[me.FriendInviteCount].callback = callback;
           me.FriendInviteEvent[me.FriendInviteCount].carrier = carrier
           return me.FriendInviteCount;
       },

       this.onFriendInviteResponse = function (event) {
           var id = event.id;
           event.id = null;
           if (me.FriendInviteEvent[id].callback) {
               event.carrier = me.FriendInviteEvent[id].carrier;
               me.FriendInviteEvent[id].callback(event);
           }
       },

        //onGroupHandlerCallback
        this.onGroupEvent = function(event){
            var group = me.groups[event.groupId];
            if (group) {
                if (group.callbacks[event.name]) {
                    group.callbacks[event.name](event);
                }
            }else {
                alert(event.name);
            }
        },

        //onFileTransferHandlerCallback
        this.onFileTransferEvent = function(event){
            var fileTransfer = me.fileTransfers[event.fileTransferId];
            if (fileTransfer) {
                if (fileTransfer.callbacks[event.name]) {
                    fileTransfer.callbacks[event.name](event);
                }
            }else {
                alert(event.name);
            }
        }

       //SessionRequestCompleteHandler
       this.addSessionRequestCompleteCB = function (callback, session) {
           me.SRCCount++;
           me.SRCEvent[me.SRCCount] = new Object;
           me.SRCEvent[me.SRCCount].callback = callback;
           me.SRCEvent[me.SRCCount].session = session
           return me.SRCCount;
       };

       this.onSessionRequestComplete = function (event) {
           var id = event.id;
           event.id = null;
           if (me.SRCEvent[id].callback) {
               event.session = me.SRCEvent[id].session;
               me.SRCEvent[id].callback(event);
           }
       };

       this.setListener(CARRIER, this.onCarrierEvent);
       this.setListener(STREAM, this.onStreamEvent);
       this.setListener(FRIEND_INVITE, this.onFriendInviteResponse);
       this.setListener(SESSION, this.onSessionRequestComplete);
       this.setListener(GROUP, this.onGroupEvent);
       this.setListener(FILE_TRANSFER, this.onFileTransferEvent);
   }

   CarrierPlugin.prototype = {
       constructor: CarrierPlugin,

       options: {
           udpEnabled: true,
           persistentLocation: ".data"
       },

       setListener: function (type, eventCallback) {
           exec(eventCallback, null, 'CarrierPlugin', 'setListener', [type]);
       },

       /**
        * Get current version of Carrier node.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a string: The version of carrier node.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {callback} onSuccess  The version of carrier node
        */
       getVersion: function (onSuccess, onError) {
           exec(onSuccess, onError, 'CarrierPlugin', 'getVersion', []);
       },

       /**
        * Check if the ID is Carrier node id.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a Boolean: True if id is valid, otherwise false.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   id       The carrier node id to be check.
        */
       isValidId: function (onSuccess, onError, id) {
           var _onSuccess = function (ret) {
               if (onSuccess) onSuccess(ret == "true" ? true : false);
           };

           exec(_onSuccess, onError, 'CarrierPlugin', 'isValidAddress', [id]);
       },

       /**
        * Check if the carrier node address is valid.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a Boolean: True if key is valid, otherwise false.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   address    The carrier node address to be check.
        */
       isValidAddress: function (onSuccess, onError, address) {
           var _onSuccess = function (ret) {
               if (onSuccess) onSuccess(ret == "true" ? true : false);
           };

           exec(_onSuccess, onError, 'CarrierPlugin', 'isValidAddress', [address]);
       },

       /**
        * Get carrier ID from carrier node address.
        *
        * @param {Function} onSuccess  The function to call when success, the param is a string: User id if address is valid, otherwise null.
        * @param {Function} [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {string}   address    The carrier node address.
        */
       getIdFromAddress: function (onSuccess, onError, address) {
           exec(onSuccess, onError, 'CarrierPlugin', 'getIdFromAddress', [address]);
       },

       /**
        * Create a carrier object instance. After initializing the instance,
        * it's ready to start and therefore connect to carrier network.
        *
        * @param {Function}  onSuccess  The function to call when success.
        * @param {Function}  [onError]  The function to call when error, the param is a string. Or set to null.
        * @param {Options}   [options]   The options to set for creating carrier node. If set to null, will use default.
        * @param {CarrierCallbacks} callbacks The callbacks for carrier node.
        */
       createObject: function (onSuccess, onError, options, callbacks) {
           var carrier = new Carrier();
           var me = this;
           var _onSuccess = function (ret) {
               carrier.objId = ret.id;
               carrier.nodeId = ret.nodeId;
               carrier.userId = ret.userId;
               carrier.address = ret.address;
               carrier._nospam = ret.nospam;
               carrier._presence = ret.presence;
               carrier.carrierPlugin = me;
               me.carriers[carrier.objId] = carrier;

               if (onSuccess) onSuccess(carrier);
           };
           if (typeof (options) == "undefined" || options == null) {
               options = this.options;
           }

           if (typeof (callbacks) != "undefined" && callbacks != null) {
               for (var i = 0; i < CARRIER_CB_NAMES.length; i++) {
                   var name = CARRIER_CB_NAMES[i];
                   carrier.callbacks[name] = callbacks[name];
               }
           }

           var configstring = JSON.stringify(options);
           exec(_onSuccess, onError, 'CarrierPlugin', 'createObject', ["im", configstring]);
       },

   }

   CarrierPlugin.prototype.test = function (onSuccess, onError, buf) {
       //    var data = base64.fromArrayBuffer(buf);
       exec(onSuccess, onError, 'CarrierPlugin', 'test', [buf]);
   };

   module.exports = new CarrierPlugin();

