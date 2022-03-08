import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import {
	InformationCircleIcon,
	CurrencyDollarIcon,
} from '@heroicons/react/outline';
import Loading from '../components/Loading';

export default function ListingsPage() {
	const { user, getAccessTokenSilently } = useAuth0();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	async function getSpaces() {
		const token = await getAccessTokenSilently();
		setLoading(true);
		axios
			.get('http://localhost:8080/api/spaces', {
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
			.finally(() => {
				setLoading(false);
			});
	}

	useEffect(() => {
		getSpaces();
	}, []);

	function isAvailability(props) {
		const available = props.availability;
		if (available === true) {
			return (
				<span className='px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full'>
					Available
				</span>
			);
		}
		return (
			<span className='px-2 py-1 text-yellow-600 text-xs font-medium bg-yellow-300 rounded-full'>
				Rented
			</span>
		);
	}

	if (loading) return <Loading />;
	else {
		return (
			<ul
				role='list'
				className='grid gridxs-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
			>
				{data.spaces.map((item) => (
					<li
						key={item.name}
						className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'
					>
						<div className='flex-1 flex flex-col p-8'>
							<img
								className='w-auto h-auto flex-shrink-0 mx-auto'
								src={item.images[0].url}
								alt=''
							/>
							<h3 className='mt-6 text-gray-900 text-sm font-medium'>
								{item.name}
							</h3>
							<dl className='mt-1 flex-grow flex flex-col justify-between'>
								<dt className='sr-only'>Title</dt>
								<dd className='text-gray-500 text-sm'>
									{item.description}
								</dd>
								<dt className='sr-only'>Role</dt>
								<dd className='mt-3'>{isAvailability(item)}</dd>
							</dl>
						</div>
						<div className='-mt-px flex divide-x divide-gray-200'>
							<div className='w-0 flex-1 flex'>
								<a
									href={'/app/space/' + item.id}
									className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'
								>
									<InformationCircleIcon
										className='w-5 h-5 text-gray-400'
										aria-hidden='true'
									/>
									<span className='ml-3'>View</span>
								</a>
							</div>
							<div className='-ml-px w-0 flex-1 flex'>
								<a
									href={'/app/space/' + item.id}
									className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'
								>
									<a className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'>
										<CurrencyDollarIcon
											className='w-5 h-5 text-gray-400'
											aria-hidden='true'
										/>
										<span className='ml-3'>
											Price: {item.price}
										</span>
									</a>
								</a>
							</div>
						</div>
					</li>
				))}
			</ul>
		);
	}
}
