const Document = require('vertex-camo').Document
const props = {
  name: {type:String, default:''},
  email: {type:String, default:''},
  text: {type:String, default:''},
  schema: { type: String, default: 'message', immutable: true },
  timestamp: { type: Date, default: new Date(), immutable: true }
}

class Message extends Document {
  constructor () {
    super()
    this.schema(props)
  }

  static get resourceName (){
    return 'message'
  }

  static collectionName(){
    return 'messages'
  }
}

module.exports = Message
