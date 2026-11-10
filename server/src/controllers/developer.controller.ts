import type { Request, Response } from 'express'

import * as developerService from '../services/developer.service.js'

// Check whether a value is a non-empty string
const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0
}

// Check whether the request body is an object
const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// Identify Prisma database errors
const getPrismaErrorCode = (error: unknown): string | undefined => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    return error.code
  }

  return undefined
}

// Create developer
export const createDeveloper = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!isObject(req.body)) {
      res.status(400).json({
        success: false,
        message: 'Invalid request body',
        data: null,
      })
      return
    }

    const { name, email, role, bio, githubUrl } = req.body

    if (
      !isNonEmptyString(name) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(role)
    ) {
      res.status(400).json({
        success: false,
        message: 'Name, email and role are required',
        data: null,
      })
      return
    }

    if (
      (bio !== undefined && typeof bio !== 'string') ||
      (githubUrl !== undefined && typeof githubUrl !== 'string')
    ) {
      res.status(400).json({
        success: false,
        message: 'Bio and GitHub URL must be strings',
        data: null,
      })
      return
    }

    const developer = await developerService.createDeveloper({
      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
      ...(typeof bio === 'string' ? { bio } : {}),
      ...(typeof githubUrl === 'string' ? { githubUrl } : {}),
    })

    res.status(201).json({
      success: true,
      message: 'Developer created successfully',
      data: developer,
    })
  } catch (error) {
    if (getPrismaErrorCode(error) === 'P2002') {
      res.status(409).json({
        success: false,
        message: 'Email already exists',
        data: null,
      })
      return
    }

    console.error('Create developer error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to create developer',
      data: null,
    })
  }
}

// Get all developers
export const getAllDevelopers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const developers = await developerService.getAllDevelopers()

    res.status(200).json({
      success: true,
      message: 'Developers retrieved successfully',
      data: developers,
    })
  } catch (error) {
    console.error('Get developers error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve developers',
      data: null,
    })
  }
}

// Get developer by ID
export const getDeveloperById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const developer = await developerService.getDeveloperById(
      req.params.id
    )

    if (!developer) {
      res.status(404).json({
        success: false,
        message: 'Developer not found',
        data: null,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Developer retrieved successfully',
      data: developer,
    })
  } catch (error) {
    console.error('Get developer error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve developer',
      data: null,
    })
  }
}

// Update developer
export const updateDeveloper = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    if (!isObject(req.body)) {
      res.status(400).json({
        success: false,
        message: 'Invalid request body',
        data: null,
      })
      return
    }

    const body = req.body
    const data: developerService.UpdateDeveloperInput = {}

    if ('name' in body) {
      if (!isNonEmptyString(body.name)) {
        res.status(400).json({
          success: false,
          message: 'Name must be a non-empty string',
          data: null,
        })
        return
      }
      data.name = body.name.trim()
    }

    if ('email' in body) {
      if (!isNonEmptyString(body.email)) {
        res.status(400).json({
          success: false,
          message: 'Email must be a non-empty string',
          data: null,
        })
        return
      }
      data.email = body.email.trim()
    }

    if ('role' in body) {
      if (!isNonEmptyString(body.role)) {
        res.status(400).json({
          success: false,
          message: 'Role must be a non-empty string',
          data: null,
        })
        return
      }
      data.role = body.role.trim()
    }

    if ('bio' in body) {
      if (body.bio !== null && typeof body.bio !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Bio must be a string or null',
          data: null,
        })
        return
      }
      data.bio = body.bio
    }

    if ('githubUrl' in body) {
      if (body.githubUrl !== null && typeof body.githubUrl !== 'string') {
        res.status(400).json({
          success: false,
          message: 'GitHub URL must be a string or null',
          data: null,
        })
        return
      }
      data.githubUrl = body.githubUrl
    }

    if (Object.keys(data).length === 0) {
      res.status(400).json({
        success: false,
        message: 'Provide at least one valid field to update',
        data: null,
      })
      return
    }

    const developer = await developerService.updateDeveloper(
      req.params.id,
      data
    )

    res.status(200).json({
      success: true,
      message: 'Developer updated successfully',
      data: developer,
    })
  } catch (error) {
    const code = getPrismaErrorCode(error)

    if (code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Developer not found',
        data: null,
      })
      return
    }

    if (code === 'P2002') {
      res.status(409).json({
        success: false,
        message: 'Email already exists',
        data: null,
      })
      return
    }

    console.error('Update developer error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to update developer',
      data: null,
    })
  }
}

// Delete developer
export const deleteDeveloper = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const developer = await developerService.deleteDeveloper(
      req.params.id
    )

    res.status(200).json({
      success: true,
      message: 'Developer deleted successfully',
      data: developer,
    })
  } catch (error) {
    if (getPrismaErrorCode(error) === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Developer not found',
        data: null,
      })
      return
    }

    console.error('Delete developer error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to delete developer',
      data: null,
    })
  }
}