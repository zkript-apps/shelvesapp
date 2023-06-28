import React from 'react'

const LoadingSkeleton = ({ isFull = true }: { isFull?: boolean }) => {
    return (
        <main className="pb-16">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {isFull && (
                    <div className="px-4 py-4 sm:px-6 flex lg:px-0 animate-pulse">
                        <div className="flex-1">
                            <div className="w-44 h-6 bg-gray-200 rounded-lg"></div>
                        </div>
                        <div className="w-24 h-6 bg-gray-200 rounded-lg"></div>
                    </div>
                )}
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

export default LoadingSkeleton