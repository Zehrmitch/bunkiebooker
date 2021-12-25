/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import LoginButton from '../components/LoginButton';

export default function LandingPage() {
	return (
		<div className="relative bg-gray-50">
			<Popover className="relative bg-white shadow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<div className="flex justify-between items-center py-1 md:justify-start md:space-x-10">
						<div className="flex justify-start lg:w-0 lg:flex-1">
							<a href="/">
								<span className="sr-only">bunkie booker</span>
								<img
									className="h-24 w-auto sm:h-18"
									src="https://i.ibb.co/GVP1y2D/Bunkie-Booker-name-logo.png"
									alt=""
								/>
							</a>
						</div>
						<div className="-mr-2 -my-2 md:hidden">
							<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
								<span className="sr-only">Open menu</span>
								<MenuIcon className="h-6 w-6" aria-hidden="true" />
							</Popover.Button>
						</div>
						<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
							<a
								href="#"
								className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-yellow-300 hover:bg-yellow-400"
							>
								<LoginButton></LoginButton>
							</a>

							<a
								href="#"
								className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-yellow-300 hover:bg-yellow-400"
							>
								Sign up
							</a>
						</div>
					</div>
				</div>

				<Transition
					as={Fragment}
					enter="duration-200 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel
						focus
						className="absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden"
					>
						<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
							<div className="pt-4 pb-4 px-5">
								<div className="flex items-center justify-between">
									<div>
										<img
											className="h-16 w-auto sm:h-18"
											src="https://i.ibb.co/GVP1y2D/Bunkie-Booker-name-logo.png"
											alt="Workflow"
										/>
									</div>
									<div className="-mr-2">
										<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<span className="sr-only">Close menu</span>
											<XIcon className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>
								</div>
							</div>
							<div className="py-6 px-5 space-y-6">
								<div>
									<a
										href="#"
										className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-yellow-300 hover:bg-yellow-400"
									>
										Sign up
									</a>
									<a
										href="#"
										className="w-full flex items-center justify-center px-4 py-2 my-1 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-yellow-300 hover:bg-yellow-400"
									>
										<LoginButton></LoginButton>
									</a>
								</div>
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>

			<main className="lg:relative">
				<div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
					<div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
						<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
							<span className="block xl:inline">Rent any space</span>
							<br></br>
							<span className="block text-3xl text-blue-500 xl:inline">
								Flexible rentals
							</span>
						</h1>
						<p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
							To-Do: Add a description of what bunkie booker is. Maybe a problem
							statement?
						</p>
						<div className="mt-10 sm:flex sm:justify-center lg:justify-start">
							<div className="rounded-md shadow">
								<a
									href="#"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-yellow-200 hover:bg-yellow-300 md:py-4 md:text-lg md:px-10"
								>
									Get started
								</a>
							</div>
							<div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
								<a
									href="/contact"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-yellow-200 hover:bg-yellow-300 md:py-4 md:text-lg md:px-10"
								>
									Contact Us
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
					<img
						className="absolute inset-0 w-full h-full object-cover"
						src="https://i.ibb.co/CBdwVCN/background.jpg"
						alt=""
					/>
				</div>
			</main>
		</div>
	);
}
