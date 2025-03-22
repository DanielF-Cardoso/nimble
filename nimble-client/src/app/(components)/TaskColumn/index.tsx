import { Task as TaskType } from '@/state/api'
import { EllipsisVertical, Plus } from 'lucide-react'
import { useDrop } from 'react-dnd'

type TaskColumnProps = {
  status: string
  tasks: TaskType[]
  moveTask: (taskId: number, toStatus: string) => void
  setIsModalNewTaskOpen: (isOpen: boolean) => void
}

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const tasksCount = tasks.filter((task) => task.status === status).length

  const statusColor: any = {
    'A Fazer': 'bg-red-500',
    'Em Progresso': 'bg-yellow-500',
    'Em Revisão': 'bg-blue-500',
    Concluído: 'bg-green-500',
  }

  return (
    <div
      ref={(instance) => {
        drop(instance)
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? 'bg-blue-100 dark:bg-neutral-950' : ''}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 ${statusColor[status]} rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="dark:bg-dark-secondary flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}{' '}
            <span
              className="dark:bg-dark-tertiary ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none"
              style={{ width: '1.5rem', height: '1.5rem' }}
            >
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="dark:bg-dark-tertiary flex size-6 items-center justify-center rounded bg-gray-200 dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskColumn
