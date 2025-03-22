import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany()
    res.status(200).json(projects)
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Erro ao listar projetos: ${error.message}` })
  }
}

export const getProjectById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { projectId } = req.params
    const project = await prisma.project.findUnique({
      where: {
        id: projectId?.toString(),
      },
    })
    res.status(200).json(project)
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Erro ao buscar projeto: ${error.message}` })
  }
}

export const createProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    })
    res.status(201).json(newProject)
  } catch (error: any) {
    res.status(500).json({ message: `Erro ao criar projeto: ${error.message}` })
  }
}
