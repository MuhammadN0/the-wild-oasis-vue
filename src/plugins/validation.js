import { defineRule,  configure } from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  max_value as maxValue,
  min_value as minValue,
  confirmed,
  not_one_of as exclude
} from '@vee-validate/rules'

export default {
  install() {
    defineRule('exclude', exclude)
    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('confirmed', confirmed)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alpha_spaces: `The field ${ctx.field} must have alphabetics and spaces only`,
          email: `The field ${ctx.field} must be a valid email`,
          max_value: `The value of ${ctx.field} is too high`,
          min_value: `The value of ${ctx.field} is too low`,
          confirmed: `Passwords don't match`,
          tos: `You must agree to the terms of service`,
          exclude: 'Due to restrictions our service is not available in this country'
        }
        const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : 'This field is invalid'
        return message
      }
    })
  }
}
