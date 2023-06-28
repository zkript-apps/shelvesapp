"use client"
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import combineClasses from '@/helpers/combineClasses'
import Image from 'next/image';
import Link from 'next/link'
import useAuthStore from '@/store/useAuthStore'

const userNavigation = [
    { name: 'Create App', href: '/app/create' },
    { name: 'Logout', href: '/logout' },
];

const user = {
    name: 'Shelves',
    email: 'shelves@gmail.com',
    imageUrl: 'https://fakeimg.pl/50x50/60a5fa/ffffff?text=ADMIN',
};

const MainNavigation = () => {
    const role = useAuthStore((state) => state.role);
    if(role === 'ASSISTANT') {
        userNavigation.shift();
    }
    return (
        <Disclosure as="nav">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Link href="/home" className="font-bold text-xl">SHEL<span className="text-blue-600">VES</span></Link>
                                </div>

                            </div>

                            <div className="flex lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            {/* Actions section */}
                            <div className="hidden lg:ml-4 lg:block">
                                <div className="flex items-center">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3 flex-shrink-0">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-gray-50 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                                <span className="sr-only">Open user menu</span>
                                                <Image className="rounded-full" src={user.imageUrl} alt="Image" height={32} width={32} />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <Link
                                                                href={item.href}
                                                                className={combineClasses(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="border-b border-gray-200 bg-gray-50 lg:hidden">
                        <div className="border-t border-gray-200 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <Image className="rounded-full" src={user.imageUrl} alt="Image" height={40} width={40} />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default MainNavigation