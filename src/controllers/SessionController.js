const knex = require('../database/knex')
const AppError = require('../utils/AppError')

const authConfig = require('../configs/auth')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class SessionController {
  async create(req, res) {
    const { email, password } = req.body

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('Email e/ou senha inválido!', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Email e/ou senha incorreto!', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
    })

    delete user.password

    return res.status(201).json({ user })
  }
}

module.exports = SessionController
