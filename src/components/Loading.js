import React from 'react';
import loading from '../assets/loading.svg';

export default function Loading() {
	return (
		<section className='py-12 bg-white overflow-hidden md:py-20 lg:py-24'>
			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='relative'>
					<div className='spinner mt-64 flex items-center justify-center'>
						<img src={loading} alt='Loading...' />
					</div>
				</div>
			</div>
		</section>
	);
}
