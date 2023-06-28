import React from 'react'

const TableSkeleton = () => {
    return (
        <main className="pb-16">
            <div className={`mx-auto max-w-7xl`}>
                <div className="px-4 py-12 sm:px-6 lg:flex-auto lg:px-0 animate-pulse">
                    <div className="w-1/2 h-6 bg-gray-200 rounded-lg"></div>
                    <div className="w-1/3 h-6 bg-gray-200 rounded-lg mt-4"></div>
                    <div className="w-3/5 h-6 bg-gray-200 rounded-lg mt-4"></div>
                    <div className="w-1/5 h-6 bg-gray-200 rounded-lg mt-4"></div>
                </div>
            </div>
        </main>
    )
}

export default TableSkeleton