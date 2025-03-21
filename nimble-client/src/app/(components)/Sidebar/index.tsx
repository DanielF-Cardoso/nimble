'use client'

import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import SidebarLinks from '../SidebarLinks'
import { setIsSidebarCollapsed } from '@/state'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { useGetProjectsQuery } from '@/state/api'

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true)
  const [showPriority, setShowPriority] = useState(true)

  const { data: projects } = useGetProjectsQuery()
  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  )

  return (
    <div
      className={`fixed z-40 flex h-full ${isSidebarCollapsed ? 'hidden w-0' : 'w-64'} flex-col justify-between overflow-y-auto
     bg-white shadow-xl transition-all duration-300 dark:bg-black`}
    >
      <div className="flex size-full flex-col justify-start">
        {/* Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            NIMBLE
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="size-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/next.svg" alt="Logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              TIME 1
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Privado</p>
            </div>
          </div>
        </div>
        {/* Links */}
        <nav className="z-10 w-full">
          <SidebarLinks icon={Home} label="Início" href="/" />
          <SidebarLinks
            icon={Briefcase}
            label="Linha do Tempo"
            href="/linha-do-tempo"
          />
          <SidebarLinks icon={Search} label="Pesquisar" href="/search" />
          <SidebarLinks
            icon={Settings}
            label="Configurações"
            href="/configuracoes"
          />
          <SidebarLinks icon={User} label="Usuários" href="/users" />
          <SidebarLinks icon={Users} label="Times" href="/teams" />
        </nav>

        {/* Projetos */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projetos</span>
          {showProjects ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>

        {showProjects &&
          projects?.map((project) => (
            <SidebarLinks
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}

        {/* Prioridades */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Prioridades</span>
          {showPriority ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLinks
              icon={AlertCircle}
              label="Urgente"
              href="/prioridade/urgente"
            />
            <SidebarLinks
              icon={ShieldAlert}
              label="Alta"
              href="/prioridade/alta"
            />
            <SidebarLinks
              icon={AlertTriangle}
              label="Media"
              href="/prioridade/media"
            />
            <SidebarLinks
              icon={AlertOctagon}
              label="Baixa"
              href="/prioridade/baixa"
            />
            <SidebarLinks
              icon={Layers3}
              label="Pendências"
              href="/prioridade/pendencias"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Sidebar
