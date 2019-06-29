import Joi from 'joi'

const username = Joi.string().alphanum().min(3).max(30).required().label('Username')
const password = Joi.string().min(8).max(50).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/).required().label('Password').options({
  language: {
    string: {
      regex: {
        base: 'must have at least one lowercase letter, one uppercase letter, and one digit.'
      }
    }
  }
})

export const signUp = Joi.object().keys({
  username, password
})

export const signIn = Joi.object().keys({
  username, password
})
