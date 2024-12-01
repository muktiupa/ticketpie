import Link from 'next/link'
import Image from 'next/image'
import { Home, Ticket, Briefcase, Users } from 'lucide-react'

interface SidebarProps {
  agencyLogo?: string
}

export function Sidebar({ agencyLogo }: SidebarProps) {
  return (
    <div className="flex flex-col h-full w-64 bg-gray-800 text-white">
      <div className="p-4">
        {agencyLogo ? (
          <Image
            src={agencyLogo}
            alt="Agency Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-600 mx-auto flex items-center justify-center text-2xl font-bold">
            Logo
          </div>
        )}
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 py-4">
          <li>
            <Link href="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Home className="mr-3" size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/generate-tickets" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Ticket className="mr-3" size={20} />
              Generate Tickets
            </Link>
          </li>
          <li>
            <Link href="/dashboard/trips" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Briefcase className="mr-3" size={20} />
              Trips Details
            </Link>
          </li>
          <li>
            <Link href="/dashboard/clients" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Users className="mr-3" size={20} />
              Client Details
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

