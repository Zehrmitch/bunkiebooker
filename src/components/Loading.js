import React from 'react';

export default function Loading() {
	return (
		<section className="py-12 bg-white overflow-hidden md:py-20 lg:py-24">
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative">
					<div className="max-w-3xl mx-auto text-center text-3xl leading-9 font-medium text-red-400">
						<p>Loading...</p>
					</div>
				</div>
			</div>
		</section>
	);
}
