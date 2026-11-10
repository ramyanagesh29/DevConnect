import { prisma } from '../config/database.js'

// Data required to create a developer
export interface CreateDeveloperInput {
  name: string
  email: string
  role: string
  bio?: string
  githubUrl?: string
}

// Data allowed when updating a developer
export interface UpdateDeveloperInput {
  name?: string
  email?: string
  role?: string
  bio?: string | null
  githubUrl?: string | null
}

// Create developer
export const createDeveloper = async (
  data: CreateDeveloperInput
) => {
  return await prisma.developer.create({
    data,
  })
}

// Get all developers
export const getAllDevelopers = async () => {
  return await prisma.developer.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

// Get developer by ID
export const getDeveloperById = async (id: string) => {
  return await prisma.developer.findUnique({
    where: {
      id,
    },
  })
}

// Update developer
export const updateDeveloper = async (
  id: string,
  data: UpdateDeveloperInput
) => {
  return await prisma.developer.update({
    where: {
      id,
    },
    data,
  })
}

// Delete developer
export const deleteDeveloper = async (id: string) => {
  return await prisma.developer.delete({
    where: {
      id,
    },
  })
}