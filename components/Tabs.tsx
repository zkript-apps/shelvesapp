'use client'
import combineClasses from '@/helpers/combineClasses'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { T_APPS_COUNT } from '@/types/global'
const Tabs = ({ count = { active: 0, pending: 0 } }: { count: T_APPS_COUNT }) => {
    const pathname = usePathname();
    const tabs = [
        { name: 'Active', href: '/home/active', count: count.active, existActive: ['/home', '/home/active'] },
        { name: 'Pending', href: '/home/pending', count: count.pending, existActive: ['/home/pending'] },
    ]
    const activeTabName = tabs.find((tab) => tab.existActive.includes(pathname))?.name;
    return (
        <>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="mt-4 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    defaultValue={activeTabName}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px mt-2 flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={combineClasses(
                                    activeTabName === tab.name
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                                )}
                            >
                                {tab.name}
                                {tab.count ? (
                                    <span
                                        className={combineClasses(
                                            activeTabName === tab.name ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900',
                                            'ml-2 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block'
                                        )}
                                    >
                                        {tab.count}
                                    </span>
                                ) : null}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Tabs