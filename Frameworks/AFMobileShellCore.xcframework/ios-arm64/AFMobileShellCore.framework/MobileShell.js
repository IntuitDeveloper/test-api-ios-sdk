var MobileShell = {
    version: "0.0.1",
    messageCount: 0,
    promiseCallbacks: [],
    constants: {
        KEYWORD_CALLBACKID: "callbackID",
        KEYWORD_COMMAND: "command",
        KEYWORD_CATEGORY: "category",
        KEYWORD_PAYLOAD: "payload",
        KEYWORD_CONTEXT: "context"
    }
};

MobileShell.messageNative = function(msg) {
    var callbackID = "cb" + MobileShell.messageCount;
    MobileShell.messageCount++;
    
    msg.callbackID = callbackID;
    
    var promise = new Promise(function(resolve, reject) {
        var callback = {
            callbackID: callbackID,
            resolve: function(result) {
                delete MobileShell.promiseCallbacks[callbackID];
                resolve(result);
            },
            reject: function(result) {
                delete MobileShell.promiseCallbacks[callbackID];
                reject(result);
            }
        };
                              
        MobileShell.promiseCallbacks[callbackID] = callback;
        
        // all messages will be stringified and reparsed since postMessage calls with some object cause crashes within WebKit. 
        window.webkit.messageHandlers.MobileShell.postMessage(JSON.parse(JSON.stringify(msg)));

    });
    
    return promise;
}

MobileShell.completePromise = function(data) {
    var callbackID = data.callbackID;
    var payload = data.payload;
    var verb = data.verb;
    
    var cb = MobileShell.promiseCallback(callbackID);
    
    if (typeof cb != 'undefined') {
        if (verb == 'resolve') {
            cb.resolve(payload);
        } else {
            cb.reject(payload);
        }
    }
};

MobileShell.promiseCallback = function(callbackID) {
    return MobileShell.promiseCallbacks[callbackID];
};

// Function to invoke a Promise based JS function, given the invocation info.
// promiseInvocation is an object with two properties: functionCallStr and promiseCallbackID.
// This function initiates the Promise based call.  Subsequent to that, based on
// whether the result of the Promise is conveyed back to the native side over
// the bridge.  The promiseCallbackID is the unique identifier on the native side to
// correlate a Promise callback coming from the JS side.
MobileShell.callPromiseFunction = function(promiseInvocation) {
    var functionCallStr = promiseInvocation.functionCallStr;
    var promiseCallbackID = promiseInvocation.promiseCallbackID;
    var invalidFunctionCallError = {
        category: "promise",
        command: "reject",
        payload: {
            promiseCallbackID: promiseCallbackID,
            reason: "Invalid function call"
        }
    };
    
    if (typeof functionCallStr !== "string") {
        MobileShell.messageNative(invalidFunctionCallError);
        
        return;
    }
    
    var promise = null;
    
    // Protect against any exception that would get thrown as part of evaluating
    // the JS snippet.
    try {
        // The result is expected to be a Promise.
        promise = eval(functionCallStr);
    } catch (e) {
        invalidFunctionCallError.payload.reason = e.message;
        MobileShell.messageNative(invalidFunctionCallError);
        console.log("[MobileShell.callPromiseFunction] error message "+ e.message);
        return;
    }
    
    // Make sure the evaluation returned a Promise.
    if (!(typeof promise === "object" || typeof promise === "function") || !('then' in promise) || typeof(promise.then) !== "function") {
        MobileShell.messageNative(invalidFunctionCallError);
        
        return;
    }
    
    var message = {
        category: "promise",
        payload: {
            promiseCallbackID: promiseCallbackID
        }
    };
    
    // Resolve handler for the Promise.  Conveys the resolution to native side over the bridge.
    var onResolve = function (result) {
        message.command = "resolve";
        message.payload.result = result;
        
        MobileShell.messageNative(message);
    };
    
    // Reject handler for the Promise.  Conveys the rejection to native side over the bridge.
    var onReject = function (reason) {
        message.command = "reject";
        
        // Serialize the reason so that it can be sent across the native-JS bridge (otherwise, if this is an Error object, WebKit marshalling would fail)
        if(reason instanceof Error) {
            // For Error object, stringify() gives the error location; toString() gives the error message. Extract both and set it as the reason on the payload
            message.payload.reason = reason.toString() + ". Location: " + JSON.stringify(reason);
        } else {
            // For non-error inputs, stringify() gives the full details.
            message.payload.reason = JSON.stringify(reason);
        }
                
        MobileShell.messageNative(message);
    }
    
    // Then method invocation for the Promise to execute next steps.  Mainly to message native side.
    promise.then(onResolve, onReject);
};

MobileShell.setEmbeddedAppInfo = function(embeddedAppInfo) {
    MobileShell.embeddedAppInfo = embeddedAppInfo
    console.log("MobileShell.setEmbeddedAppInfo " + embeddedAppInfo);
};
