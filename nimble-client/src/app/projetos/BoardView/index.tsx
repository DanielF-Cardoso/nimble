import TaskColumn from '@/app/(components)/TaskColumn'
import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/state/api'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

type BoardProps = {
  id: string
  setIsModalNewTaskOpen: (isOpen: boolean) => void
}

const taskStatus = ['A Fazer', 'Em Progresso', 'Em Revisão', 'Concluído']

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: String(id) })
  const [updateTaskStatus] = useUpdateTaskStatusMutation()

  const moveTask = (taskId: string, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus })
  }

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Ocorreu um erro enquanto carrega as tasks</div>

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  )
}

export default BoardView
