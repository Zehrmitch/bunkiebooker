import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const collections = [
	{
		name: 'City Living',
		href: '#',
		imageSrc:
			'https://s3.us-east-2.amazonaws.com/bunkiebooker.bucket/Spaces/DevImg/Cityhome.jpeg',
		imageAlt:
			'Brown leather key ring with brass metal loops and rivets on wood table.',
		description: 'City houses for a quick get away from home.',
	},
	{
		name: 'Cottages',
		href: '#',
		imageSrc:
			'https://s3.us-east-2.amazonaws.com/bunkiebooker.bucket/Spaces/DevImg/cottage-4.jpeg',
		imageAlt:
			'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
		description: 'Remote cottages for a relaxing get away.',
	},
	{
		name: 'Unique Homes',
		href: '#',
		imageSrc:
			'https://s3.us-east-2.amazonaws.com/bunkiebooker.bucket/Spaces/DevImg/unique.jpeg',
		imageAlt:
			'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
		description: 'One of a kind homes that are just as weird as you are.',
	},
];

export default function HomePage() {
	const { getAccessTokenSilently } = useAuth0();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const token = await getAccessTokenSilently({
					audience: 'https://api.bunkiebooker.com',
				});
				axios
					.get('http://localhost:8080/api/private', {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then(function (response) {
						// handle success
						console.log(response);
					});

				// const res = await response.json();
			} catch (e) {
				console.error(e);
			}
		})();
	}, [getAccessTokenSilently]); // use effect docs

	return (
		<div className='bg-white'>
			{/* Mobile menu */}
			<Transition.Root show={mobileMenuOpen} as={Fragment}>
				<Dialog
					as='div'
					className='fixed inset-0 flex z-40 lg:hidden'
					onClose={setMobileMenuOpen}
				>
					<Transition.Child
						as={Fragment}
						enter='transition-opacity ease-linear duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition-opacity ease-linear duration-300'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter='transition ease-in-out duration-300 transform'
						enterFrom='-translate-x-full'
						enterTo='translate-x-0'
						leave='transition ease-in-out duration-300 transform'
						leaveFrom='translate-x-0'
						leaveTo='-translate-x-full'
					>
						<div className='relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto'>
							<div className='px-4 pt-5 pb-2 flex'>
								<button
									type='button'
									className='-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400'
									onClick={() => setMobileMenuOpen(false)}
								>
									<span className='sr-only'>Close menu</span>
									<XIcon
										className='h-6 w-6'
										aria-hidden='true'
									/>
								</button>
							</div>

							{/* Links */}
						</div>
					</Transition.Child>
				</Dialog>
			</Transition.Root>

			{/* Hero section */}
			<div className='relative bg-gray-900'>
				{/* Decorative image and overlay */}
				<div
					aria-hidden='true'
					className='absolute inset-0 overflow-hidden'
				>
					<img
						src='https://s3.us-east-2.amazonaws.com/bunkiebooker.bucket/Spaces/DevImg/Landing+House.jpeg'
						alt=''
						className='w-full h-full object-center object-cover'
					/>
				</div>
				<div
					aria-hidden='true'
					className='absolute inset-0 bg-gray-900 opacity-50'
				/>

				<div className='relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0'>
					<h1 className='text-4xl font-extrabold tracking-tight text-white lg:text-6xl'>
						New homes are here!
					</h1>
					<p className='mt-4 text-xl text-white'>
						Look at the newest listings in all categories.
					</p>
					<a
						href='/spaces'
						className='mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100'
					>
						View Listings
					</a>
				</div>
			</div>

			<main>
				<section
					aria-labelledby='collection-heading'
					className='max-w-xl mx-auto pt-24 px-4 py-24 sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8'
				>
					<h2
						id='collection-heading'
						className='text-2xl font-extrabold tracking-tight text-gray-900'
					>
						Shop by Category
					</h2>
					<p className='mt-4 text-base text-gray-500'>
						Each season, things change and you should go discover
						the natural world.
					</p>

					<div className='mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8'>
						{collections.map((collection) => (
							<a
								key={collection.name}
								href={collection.href}
								className='group block'
							>
								<div
									aria-hidden='true'
									className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6'
								>
									<img
										src={collection.imageSrc}
										alt={collection.imageAlt}
										className='w-full h-[185px] object-center object-cover'
									/>
								</div>
								<h3 className='mt-4 text-base font-semibold text-gray-900'>
									{collection.name}
								</h3>
								<p className='mt-2 text-sm text-gray-500'>
									{collection.description}
								</p>
							</a>
						))}
					</div>
				</section>
			</main>

			<footer aria-labelledby='footer-heading' className='bg-gray-900'>
				<h2 id='footer-heading' className='sr-only'>
					Footer
				</h2>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='border-t border-gray-800 py-10'>
						<p className='text-sm text-gray-400'>
							Copyright &copy; 2021 Bunkie Booker Inc.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
