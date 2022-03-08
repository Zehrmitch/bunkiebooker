import React from 'react';
import { useState, useEffect } from 'react';
import { Disclosure, RadioGroup, Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/solid';
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

const product = {
	rating: 4,
	colors: [
		{
			name: 'Washed Black',
			bgColor: 'bg-gray-700',
			selectedColor: 'ring-gray-700',
		},
		{ name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
		{
			name: 'Washed Gray',
			bgColor: 'bg-gray-500',
			selectedColor: 'ring-gray-500',
		},
	],
	details: [
		{
			name: 'Features',
			items: [
				'Great location',
				'Four bedrooms',
				'Three bathrooms',
				'Modern interior',
				'Wifi',
				'Pet friendly',
			],
		},
	],
};
const people = [
	{
		name: 'Lindsay Walton',
		imageUrl:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
	},
];
const activityItems = [
	{
		id: 1,
		person: people[0],
		project: 'Workcation',
		commit: '2d89f0c8',
		environment: 'production',
		time: '1h',
	},
	{
		id: 2,
		person: people[0],
		project: 'Bunkiebooker',
		commit: '2d89f0c8',
		environment: 'Dev',
		time: '5h',
	},
	{
		id: 3,
		person: people[0],
		project: 'Machine Learning',
		commit: '2d89f0c8',
		environment: 'Local',
		time: '3d',
	},
	// More items...
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function SpaceOverviewPage() {
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	const { user, isLoading, getAccessTokenSilently } = useAuth0();
	const [data, setData] = useState(null);

	let { id } = useParams();

	useEffect(() => {
		getSpace();

		return () => {
			setData(null);
		};
	}, []);

	async function getSpace() {
		const token = await getAccessTokenSilently();
		axios
			.get('http://localhost:8080/api/space/' + id, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
			})
			.finally(() => {});
	}

	if (data === null) return <NotFoundPage />;

	return (
		<div className='bg-white'>
			<div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
				<div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
					{/* Image gallery */}
					<Tab.Group as='div' className='flex flex-col-reverse'>
						{/* Image selector */}
						<div className='hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none'>
							<Tab.List className='grid grid-cols-4 gap-6'>
								{data.space[0].images.map((img) => (
									<Tab
										key={img.id}
										className='relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50'
									>
										{({ selected }) => (
											<>
												<span className='sr-only'>
													{img.id}
												</span>
												<span className='absolute inset-0 rounded-md overflow-hidden'>
													<img
														src={img.url}
														alt=''
														className='w-full h-full object-center object-cover'
													/>
												</span>
												<span
													className={classNames(
														selected
															? 'ring-yellow-400'
															: 'ring-transparent',
														'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
													)}
													aria-hidden='true'
												/>
											</>
										)}
									</Tab>
								))}
							</Tab.List>
						</div>

						<Tab.Panels className='w-full aspect-w-1 aspect-h-1'>
							{data.space[0].images.map((img) => (
								<Tab.Panel key={img.id}>
									<img
										src={img.url}
										className='w-full h-full object-center object-cover sm:rounded-lg'
									/>
								</Tab.Panel>
							))}
						</Tab.Panels>
					</Tab.Group>

					{/* Product info */}
					<div className='mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0'>
						<h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
							{data.space[0].name}
						</h1>

						<div className='mt-3'>
							<h2 className='sr-only'>Product information</h2>
							<p className='text-3xl text-gray-900'>
								{data.space[0].price}
							</p>
						</div>

						{/* Reviews */}
						<div className='mt-3'>
							<h3 className='sr-only'>Reviews</h3>
							<div className='flex items-center'>
								<a href='#details-heading'>
									<div className='flex items-center'>
										{[0, 1, 2, 3, 4].map((rating) => (
											<StarIcon
												key={rating}
												className={classNames(
													product.rating > rating
														? 'text-yellow-300 hover:text-yellow-400'
														: 'text-gray-300',
													'h-5 w-5 flex-shrink-0'
												)}
												aria-hidden='true'
											/>
										))}
									</div>
								</a>
							</div>
						</div>

						<div className='mt-6'>
							<h3 className='sr-only'>Description</h3>

							<div
								className='text-base text-gray-700 space-y-6'
								dangerouslySetInnerHTML={{
									__html: data.space[0].information,
								}}
							/>
						</div>

						<form className='mt-6'>
							{/* Colors */}
							<div>
								<h3 className='text-sm text-gray-600'>Color</h3>

								<RadioGroup
									value={selectedColor}
									onChange={setSelectedColor}
									className='mt-2'
								>
									<RadioGroup.Label className='sr-only'>
										Choose a color
									</RadioGroup.Label>
									<div className='flex items-center space-x-3'>
										{product.colors.map((color) => (
											<RadioGroup.Option
												key={color.name}
												value={color}
												className={({
													active,
													checked,
												}) =>
													classNames(
														color.selectedColor,
														active && checked
															? 'ring ring-offset-1'
															: '',
														!active && checked
															? 'ring-2'
															: '',
														'-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
													)
												}
											>
												<RadioGroup.Label
													as='p'
													className='sr-only'
												>
													{color.name}
												</RadioGroup.Label>
												<span
													aria-hidden='true'
													className={classNames(
														color.bgColor,
														'h-8 w-8 border border-black border-opacity-10 rounded-full'
													)}
												/>
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>

							<div className='mt-10 flex sm:flex-col1'>
								<a href={'/app/payment/' + data.space[0].id}>
									<p className='max-w-xs flex-1 bg-yellow-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-yellow-600 sm:w-full'>
										Rent this space
									</p>
								</a>
								<button
									type='button'
									className='ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500'
								>
									<HeartIcon
										className='h-6 w-6 flex-shrink-0'
										aria-hidden='true'
									/>
									<span className='sr-only'>
										Add to favorites
									</span>
								</button>
							</div>
						</form>

						<section
							aria-labelledby='details-heading'
							className='mt-12'
						>
							<h2 id='details-heading' className='sr-only'>
								Additional details
							</h2>

							<div className='border-t divide-y divide-gray-200'>
								{product.details.map((detail) => (
									<Disclosure as='div' key={detail.name}>
										{({ open }) => (
											<>
												<h3>
													<Disclosure.Button className='group relative w-full py-6 flex justify-between items-center text-left'>
														<span
															className={classNames(
																open
																	? 'text-yellow-400'
																	: 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															{detail.name}
														</span>
														<span className='ml-6 flex items-center'>
															{open ? (
																<MinusSmIcon
																	className='block h-6 w-6 text-yellow-300 group-hover:text-yellow-400'
																	aria-hidden='true'
																/>
															) : (
																<PlusSmIcon
																	className='block h-6 w-6 text-gray-400 group-hover:text-gray-500'
																	aria-hidden='true'
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel
													as='div'
													className='pb-6 prose prose-sm'
												>
													<ul role='list'>
														{detail.items.map(
															(item) => (
																<li key={item}>
																	• {item}
																</li>
															)
														)}
													</ul>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</div>
						</section>

						<section
							aria-labelledby='details-heading'
							className='mt-6'
						>
							<h2 id='details-heading' className='sr-only'>
								Reviews
							</h2>

							<div className='border-t divide-y divide-gray-200'>
								<Disclosure as='div' key='Review'>
									{({ open }) => (
										<>
											<h3>
												<Disclosure.Button className='group relative w-full py-6 flex justify-between items-center text-left'>
													<span
														className={classNames(
															open
																? 'text-yellow-400'
																: 'text-gray-900',
															'text-sm font-medium'
														)}
													>
														Reviews
													</span>
													<span className='ml-6 flex items-center'>
														{open ? (
															<MinusSmIcon
																className='block h-6 w-6 text-yellow-300 group-hover:text-yellow-400'
																aria-hidden='true'
															/>
														) : (
															<PlusSmIcon
																className='block h-6 w-6 text-gray-400 group-hover:text-gray-500'
																aria-hidden='true'
															/>
														)}
													</span>
												</Disclosure.Button>
											</h3>
											<Disclosure.Panel
												as='div'
												className='pb-6 prose prose-sm'
											>
												<ul
													role='list'
													className='divide-y divide-gray-200'
												>
													{activityItems.map(
														(activityItem) => (
															<li
																key={
																	activityItem.id
																}
																className='py-4'
															>
																<div className='flex space-x-3'>
																	<img
																		className='h-6 w-6 rounded-full'
																		src={
																			activityItem
																				.person
																				.imageUrl
																		}
																		alt=''
																	/>
																	<div className='flex-1 space-y-1'>
																		<div className='flex items-center justify-between'>
																			<h3 className='text-sm font-medium'>
																				{
																					activityItem
																						.person
																						.name
																				}
																			</h3>
																			<p className='text-sm text-gray-500'>
																				{
																					activityItem.time
																				}
																			</p>
																		</div>
																		<div className='flex items-center'>
																			<div className='flex items-center'>
																				{[
																					0,
																					1,
																					2,
																					3,
																					4,
																				].map(
																					(
																						rating
																					) => (
																						<div>
																							<StarIcon
																								href='#details-heading'
																								key={
																									rating
																								}
																								className={classNames(
																									product.rating >
																										rating
																										? 'text-yellow-300 hover:text-yellow-400'
																										: 'text-gray-300',
																									'h-5 w-5 flex-shrink-0'
																								)}
																								aria-hidden='true'
																							/>
																						</div>
																					)
																				)}
																				<p className='text-sm text-gray-300'>
																					(
																					{
																						product.rating
																					}

																					)
																				</p>
																			</div>
																		</div>
																		<p className='text-sm text-gray-500'>
																			Had
																			a
																			wonderful
																			weekend
																			with
																			my
																			family
																			here!
																		</p>
																	</div>
																</div>
															</li>
														)
													)}
												</ul>
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
