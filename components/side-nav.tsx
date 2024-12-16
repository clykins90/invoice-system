import { 
  LayoutGrid, 
  FileText, 
  Activity, 
  Image, 
  FileIcon, 
  DollarSign,
  ClipboardList,
  BarChart3,
  ChevronDown
} from 'lucide-react'
import { Button } from './ui/button'

export function SideNav() {
  return (
    <div className="w-[80px] bg-[#2D3643] flex flex-col h-full text-gray-400">
      <Button variant="ghost" size="icon" className="mt-2 mx-auto">
        <ChevronDown className="w-5 h-5" />
      </Button>

      <div className="flex flex-col flex-1 justify-between py-2">
        <div className="flex flex-col">
          <Button variant="ghost" className="flex flex-col items-center h-14 py-1 text-white">
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[11px]">Overview</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-14 py-1">
            <Activity className="w-5 h-5" />
            <span className="text-[11px]">Activity</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-14 py-1">
            <FileText className="w-5 h-5" />
            <span className="text-[11px]">Fields</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-14 py-1">
            <FileText className="w-5 h-5" />
            <span className="text-[11px]">Notes</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-14 py-1">
            <Image className="w-5 h-5" />
            <span className="text-[11px]">Photos</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-14 py-1">
            <FileIcon className="w-5 h-5" />
            <span className="text-[11px]">Documents</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-14 py-1">
            <DollarSign className="w-5 h-5" />
            <span className="text-[11px]">Financials</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-14 py-1">
            <ClipboardList className="w-5 h-5" />
            <span className="text-[11px]">Work Orders</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-14 py-1">
            <ClipboardList className="w-5 h-5" />
            <span className="text-[11px]">Forms</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-14 py-1">
            <BarChart3 className="w-5 h-5" />
            <span className="text-[11px]">Profit Tracker</span>
          </Button>
        </div>
      </div>
    </div>
  )
} 