import React, { ReactNode, useState } from 'react'
import Header from '../(components)/Header'
import { Clock, Filter, Grid3X3, List, Share2, Table } from 'lucide-react'

type Props = {
  activeTab: string
  setActiveTab: (tabname: string) => void
}

const ProjectHeader = ({ id, activeTab, setActiveTab }: Props) => {
  const { osModalNewProjectOpen, setIsModalNewProjectOpen } = useState(false)
  return (
    <div className="px-4 xl:px-6">
      <div className="py-6 lg:pb-4 lg:pt-8">
        <Header name="Criação de Projeto" />
      </div>
      <div className="dark:border-stroke-dark flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Quadro"
            icon={<Grid3X3 className="size-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Lista"
            icon={<List className="size-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="size-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Tabela"
            icon={<Table className="size-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="size-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="size-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar Tarefa"
              className="dark:border-dark-secondary dark:bg-dark-secondary rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:text-white"
            />
            <Grid3X3 className="absolute left-3 top-2 size-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

type TabButtonProps = {
  name: string
  icon: ReactNode
  setActiveTab: (tabname: string) => void
  activeTab: string
}

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-px after:w-full hover:text-blue-600 sm:px-2 lg:px-4 dark:text-neutral-500 dark:hover:text-white ${isActive ? 'text-blue-600 after:bg-blue-600 dark:text-white' : ''}`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  )
}

export default ProjectHeader
