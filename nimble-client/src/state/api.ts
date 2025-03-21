import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export enum Priority {
  Urgent = 'Urgente',
  High = 'Alta',
  Medium = 'Média',
  Low = 'Baixa',
  Backlog = 'Pendências',
}

export enum Status {
  ToDo = 'A Fazer',
  WorkInProgress = 'Em Progresso',
  UnderReview = 'Em Revisão',
  Completed = 'Concluído',
}

export interface User {
  userId?: number
  username: string
  email: string
  profilePictureUrl?: string
  cognitoId?: string
  teamId?: number
}

export interface Attachment {
  id: number
  fileURL: string
  fileName: string
  taskId: number
  uploadedById: number
}

export interface Project {
  id: string
  name: string
  description?: string
  startDate?: string
  endDate?: string
}

export interface Task {
  id: number
  title: string
  description?: string
  status?: Status
  priority?: Priority
  tags?: string
  startDate?: string
  dueDate?: string
  points?: number
  projectId: number
  authorUserId?: number
  assignedUserId?: number

  author?: User
  assignee?: User
  comments?: Comment[]
  attachments?: Attachment[]
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  reducerPath: 'api',
  tagTypes: ['Projects', 'Tasks'],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => 'api/projects',
      providesTags: ['Projects'],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: 'api/projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),
    getTasks: build.query<Task[], { projectId: string }>({
      query: (projectId) => `api/tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Tasks' as const, id }))
          : [{ type: 'Tasks' as const }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: 'tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: string; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Tasks', id: taskId },
      ],
    }),
  }),
})

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
} = api
