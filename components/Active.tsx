"use client"
import {
  ChevronRightIcon,
  ArrowPathIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link'
import Tabs from './Tabs'
import { T_APP } from '@/types/global'
import moment from 'moment'
import toast from 'react-hot-toast';
import TableSkeleton from './TableSkeleton'
import useGetApps from '@/hooks/useGetApps'
import useGetItemsCount from '@/hooks/useGetAppsCount'
import { PlayIcon, ClockIcon, LinkIcon, EyeIcon, EyeSlashIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import copyToClipboard from '@/helpers/copyToClipboard'

export default function Active() {
  const { data: apps, isLoading: isItemsLoading } = useGetApps('ACTIVE');
  const { data: itemsCount, isLoading: isItemsCountLoading } = useGetItemsCount();
  if (typeof apps === 'string') {
    toast.error(apps);
  }
  if (typeof itemsCount === 'string') {
    toast.error(itemsCount);
  }
  const isItemsReady = typeof apps === 'object' && !isItemsLoading;
  return (
    <main className="pb-16 pt-8">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex items-center">
            <h2 className="flex-1 text-lg font-medium text-gray-900">Apps</h2>
            <Link href="/home/active" prefetch={false} className="flex-none flex gap-1 items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 disabled:opacity-50 disabled:cursor-progress">
              <ArrowPathIcon className="h-5 w-5" />
              Refresh
            </Link>
          </div>
          {!isItemsCountLoading ? <Tabs count={itemsCount} /> : (
            <div className="pt-8 flex flex-col lg:flex-row gap-2 animate-pulse">
              <div className="w-24 h-6 bg-gray-200 rounded-lg"></div>
              <div className="w-24 h-6 bg-gray-200 rounded-lg"></div>
            </div>
          )}
        </div>

        {/* Stacked list */}
        <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
          {isItemsReady ? apps.map((item: T_APP) => {
            return (
              <li key={item.id} className="group">
                <Link href={`/app/${item.id}`} className="group block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="min-w-0 flex-1 pl-1 md:grid md:grid-cols-3 md:gap-4">
                        <div className="flex items-center">
                          <p className="truncate text-lg font-medium text-blue-600">{item.name}</p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm flex items-center text-gray-900">
                              <PlayIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                                aria-hidden="true"
                              />
                              <Link href={item.playStoreUrl} target="_blank" onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:underline transition">Play Store URL</Link>
                              <DocumentDuplicateIcon
                                className="ml-1.5 h-5 w-5 flex-shrink-0 text-gray-400 invisible group-hover:visible hover:text-gray-600 transition"
                                aria-hidden="true"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.nativeEvent.stopImmediatePropagation();
                                  e.stopPropagation();
                                  copyToClipboard(item.playStoreUrl);
                                }}
                              />
                            </p>
                            <p className="mt-2 text-sm flex items-center text-gray-900">
                              <LinkIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                                aria-hidden="true"
                              />
                              <Link href={item.redirectLink} target="_blank" onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:underline transition">Native App URL</Link>
                              <DocumentDuplicateIcon
                                className="ml-1.5 h-5 w-5 flex-shrink-0 text-gray-400 invisible group-hover:visible hover:text-gray-600 transition"
                                aria-hidden="true"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.nativeEvent.stopImmediatePropagation();
                                  e.stopPropagation();
                                  copyToClipboard(item.playStoreUrl);
                                }}
                              />
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <div>
                          <p className="flex items-center text-sm text-gray-900">
                              {item.enabled ? (
                                <EyeIcon
                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                                  aria-hidden="true"
                                />
                              ) : (
                                <EyeSlashIcon
                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                                  aria-hidden="true"
                                />
                              )}
                              {item.enabled ? "Native app is active on shelve" : "Native app is disabled on shelve"}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <ClockIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                                aria-hidden="true"
                              />
                              Added {item.createdAt ? moment(new Date(item.createdAt)).from(new Date()) : "- - -"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            )
          }) : <TableSkeleton />}
        </ul>
      </div>
    </main>
  )
}
