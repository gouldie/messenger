import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String
  },
  password: String,
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }]
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User
