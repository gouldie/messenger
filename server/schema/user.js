import Joi from 'joi'

const username = Joi.string().alphanum().min(3).max(30).required().label('Username')
const password = Joi.string().min(6).max(50).required().label('Password')

export const signUp = Joi.object().keys({
  username, password
})

export const signIn = Joi.object().keys({
  username, password
})
