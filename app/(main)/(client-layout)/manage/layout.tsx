"use client"
import Sidebar from "./components/Sidebar"


const ManagePage = ({ children }: { children: any }) => {
  return <div className='w-full flex mt-1' style={{ minHeight: 'calc(100vh - 204px)' }}>
    <Sidebar />
    {children}
  </div>
}

export default ManagePage;