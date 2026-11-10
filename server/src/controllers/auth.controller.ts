import type { Request, Response } from 'express'
import { z } from 'zod'

import * as authService from '../services/auth.service.js'

// Registration validation
const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must contain at least 2 characters'),
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
})

// Login validation
const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Register controller
export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = registerSchema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        data: result.error.flatten(),
      })
      return
    }

    const { name, email, password } = result.data

    const authData = await authService.registerUser(
      name,
      email.toLowerCase(),
      password
    )

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: authData,
    })
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === 'DuplicateEmailError'
    ) {
      res.status(409).json({
        success: false,
        message: 'Email already registered',
        data: null,
      })
      return
    }

    console.error('Registration error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to register user',
      data: null,
    })
  }
}

// Login controller
export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = loginSchema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        data: result.error.flatten(),
      })
      return
    }

    const { email, password } = result.data

    const authData = await authService.loginUser(
      email.toLowerCase(),
      password
    )

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: authData,
    })
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Invalid email or password'
    ) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        data: null,
      })
      return
    }

    console.error('Login error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to login',
      data: null,
    })
  }
}