import SidePannel from '@/components/SidePannel'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_auth/')({
  component: Page,
})

function Page() {
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Flash Chat</h1>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[80vh]">
          <SidePannel/>
        </div>
      </div>
    </div>

  )

}
