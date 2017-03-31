exports.handler = (event, context) => {
  try {
  if(event.session.new) {
    //New Session
    console.log("NEW SESSION");
  }

  switch(event.request.type) {
    // Launch Request
    case "LaunchRequest":
      console.log("LAUNCH REQUEST")
      context.succeed(
        generateReponse(
          buildSpeechletResponse("Hello Nirbay! I hope you are doing well. Would you like to find out what you should be doing?", true),
          {}
        )
      )
      break;
    case "IntentRequest":
      console.log('INTENT REQUEST : ' + event.request.intent.name)
      switch(event.request.intent.name) {
        case 'GetNextActivity':
            if(event.session.new) {
              console.log('CALL to GetNextActivity made on the lambda function in a new session')
              context.succeed(
                generateReponse(
                  buildSpeechletResponse("Say what now?", false),
                  { }
                )
              )
            } else {
              console.log('CALL to GetNextActivity made on the lambda function')
              context.succeed(
                generateReponse(
                  buildSpeechletResponse("Yay ... code the rest of the logic now!", true), { }
                )
              )
            }
          break;
        default:
          console.log('DID NOT MATCH ANY INTENT')
          context.succeed(
            generateReponse(
              buildSpeechletResponse("No idea what you said!", true),
              { }
            )
          )
      }
      break;
    case "SessionEndedRequest":
      console.log("SESSION ENDED REQUEST")
      break;
    default:
      console.log('INVALID REQUEST TYPE: ${event.request.type}')
  }
  } catch (e) {
    context.fail('Exception: ${e}')
  }
}
//Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
    "outputSpeech": {
      "type": "PlainText",
      "text": outputText
    },
    "shouldEndSession": shouldEndSession
  }
}

generateReponse = (speechletResponse) => {
  return {
    "version": "1.0",
    "response": speechletResponse
  }
}
