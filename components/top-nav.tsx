import { 
  Search, 
  Bell, 
  Clock, 
  Plus, 
  Home,
  Briefcase,
  Calendar,
  LineChart,
  MessageSquare
} from 'lucide-react'
import { Button } from './ui/button'

export function TopNav() {
  return (
    <div className="h-14 border-b bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="font-semibold">Birdie Roofing Co.</span>
        </div>
        
        <nav className="flex items-center gap-6">
          <a href="#" className="text-blue-500 hover:text-blue-600 flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>Jobs</span>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Calendar</span>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <LineChart className="w-4 h-4" />
            <span>Insights</span>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>Engage</span>
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button variant="ghost" size="icon">
          <Plus className="w-5 h-5 text-gray-600" />
        </Button>
        <Button variant="ghost" size="icon">
          <Clock className="w-5 h-5 text-gray-600" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5 text-gray-600" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </div>
  )
} 