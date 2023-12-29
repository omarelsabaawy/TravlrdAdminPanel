import React from 'react'
import NavBars from '@/components/NavBars';

const Businesses: React.FC = () => {
  return (
    <div>
        <NavBars />
        <div className="flex-grow p-1">
            <div className="p-1 sm:ml-64">
                <div className="p-1">
                    <div className="grid grid-cols-1 gap-4 mb-1">
                        <div className="flex items-center justify-left mt-2 h-50 rounded">
                            Business table
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Businesses