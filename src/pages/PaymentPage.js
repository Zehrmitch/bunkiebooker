import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';

export default function PaymentPage() {
	const { user, isLoading, getAccessTokenSilently } = useAuth0();
	const [data, setData] = useState(null);
	const [numDays, setNumDays] = useState(5);
	const [discount, setDiscount] = useState('$24.01');
	const [discountCode, setDiscountCode] = useState('christmasSavings');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		alert(JSON.stringify(data));
		var form = document.getElementById('newSpaceForm');
		form.reset();
	};

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

	function getSubTotal() {
		var subtotal = parseInt(data.space[0].price.replace(/\$/g, '')) * numDays;
		return subtotal.toFixed(2);
	}

	function getTotal() {
		var total =
			(parseInt(data.space[0].price.replace(/\$/g, '')) * numDays -
				parseInt(discount.replace(/\$/g, ''))) *
			1.14;
		return total.toFixed(2);
	}

	function getTax() {
		var tax =
			(parseInt(data.space[0].price.replace(/\$/g, '')) * numDays -
				parseInt(discount.replace(/\$/g, ''))) *
			0.14;
		return tax.toFixed(2);
	}

	function getDiscount() {
		return discount;
	}

	function getCode() {
		return discountCode;
	}

	if (data === null) return <p>Loading</p>;

	return (
		<main className="lg:min-h-full lg:overflow-hidden lg:flex lg:flex-row-reverse">
			<h1 className="sr-only">Checkout</h1>

			{/* Mobile order summary */}
			<section
				aria-labelledby="order-heading"
				className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
			>
				<Disclosure as="div" className="max-w-lg mx-auto">
					{({ open }) => (
						<>
							<div className="flex items-center justify-between">
								<h2
									id="order-heading"
									className="text-lg font-medium text-gray-900"
								>
									Your Order
								</h2>
								<Disclosure.Button className="font-medium text-indigo-600 hover:text-indigo-500">
									{open ? (
										<span>Hide full summary</span>
									) : (
										<span>Show full summary</span>
									)}
								</Disclosure.Button>
							</div>

							<Disclosure.Panel>
								<ul
									role="list"
									className="divide-y divide-gray-200 border-b border-gray-200"
								>
									<li key="key1" className="flex py-6 space-x-6">
										<img
											src={data.space[0].images[0].url}
											className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
										/>

										<div className="flex flex-col justify-between space-y-4">
											<div className="text-sm font-medium space-y-1">
												<h3 className="text-gray-900">{data.space[0].name}</h3>
												<p className="text-gray-900">{data.space[0].price}</p>
												<p className="text-gray-500">
													Time Period: {numDays} Days
												</p>
											</div>
											<div className="flex space-x-4">
												<button
													type="button"
													onClick={() => setNumDays(numDays + 1)}
													className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
												>
													+
												</button>
												<div className="flex border-l border-gray-300 pl-4">
													<button
														type="button"
														onClick={() =>
															numDays > 1
																? setNumDays(numDays - 1)
																: setNumDays(1)
														}
														className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
													>
														-
													</button>
												</div>
											</div>
											<div className="flex space-x-4">
												<button
													type="button"
													className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
												>
													Edit
												</button>
												<div className="flex border-l border-gray-300 pl-4">
													<button
														type="button"
														className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
													>
														Remove
													</button>
												</div>
											</div>
										</div>
									</li>
								</ul>

								<form className="mt-10">
									<label
										htmlFor="discount-code-mobile"
										className="block text-sm font-medium text-gray-700"
									>
										Discount code
									</label>
									<div className="flex space-x-4 mt-1">
										<input
											type="text"
											id="discount-code-mobile"
											name="discount-code-mobile"
											className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
										/>
										<button
											type="submit"
											className="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
										>
											Apply
										</button>
									</div>
								</form>

								<dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
									<div className="flex justify-between">
										<dt>Subtotal</dt>
										<dd className="text-gray-900">
											${getSubTotal()} -&nbsp;
											<a className="text-gray-400">
												(${parseInt(data.space[0].price.replace(/\$/g, ''))} x{' '}
												{numDays})
											</a>
										</dd>
									</div>
									<div className="flex justify-between">
										<dt className="flex">
											Discount
											<span className="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">
												{getCode()}
											</span>
										</dt>
										<dd className="text-gray-900">-{getDiscount()}</dd>
									</div>
									<div className="flex justify-between">
										<dt>Taxes</dt>
										<dd className="text-gray-900">{getTax()}</dd>
									</div>
								</dl>
							</Disclosure.Panel>

							<p className="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-300 pt-6 mt-6">
								<span className="text-base">Total</span>
								<span className="text-base">{getTotal()}</span>
							</p>
						</>
					)}
				</Disclosure>
			</section>
			{/* Order summary */}

			<section
				aria-labelledby="summary-heading"
				className="hidden bg-gray-50 w-full h-full max-w-md flex-col lg:flex"
			>
				<h1 className="pl-6 py-6 text-xl font-medium text-gray-900 border-b border-gray-300 p-6">
					Order Summary
				</h1>
				<h2 id="summary-heading" className="sr-only">
					Order summary
				</h2>
				<li className="flex py-6 space-x-6 px-6">
					<img
						src={data.space[0].images[0].url}
						className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
					/>
					<div className="flex flex-col justify-between space-y-4">
						<div className="text-sm font-medium space-y-1">
							<h3 className="text-gray-900">{data.space[0].name}</h3>
							<p className="text-gray-900">{data.space[0].price}</p>
							<p className="text-gray-500">Time Period: {numDays} Days</p>
						</div>
						<div className="flex space-x-4">
							<button
								type="button"
								onClick={() => setNumDays(numDays + 1)}
								className="text-lg font-medium text-indigo-600 hover:text-yellow-500"
							>
								+
							</button>
							<div className="flex border-l border-gray-300 pl-4">
								<button
									type="button"
									onClick={() =>
										numDays > 1 ? setNumDays(numDays - 1) : setNumDays(1)
									}
									className="text-lg font-medium text-indigo-600 hover:text-yellow-500"
								>
									-
								</button>
							</div>
						</div>
						<div className="flex space-x-4">
							<button
								type="button"
								className="text-sm font-medium text-red-500 hover:text-red-700"
							>
								Remove
							</button>
						</div>
					</div>
				</li>

				<div className="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-300 p-6">
					<form>
						<label className="block text-sm font-medium text-gray-700">
							Discount code
						</label>
						<div className="flex space-x-4 mt-1">
							<input
								type="text"
								id="discount-code"
								name="discount-code"
								className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
							/>
							<button
								type="submit"
								className="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
							>
								Apply
							</button>
						</div>
					</form>

					<dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
						<div className="flex justify-between">
							<dt>Subtotal</dt>
							<dd className="text-gray-900">{getSubTotal()}</dd>
						</div>
						<div className="flex justify-between">
							<dt className="flex">
								Discount
								<span className="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">
									{getCode()}
								</span>
							</dt>
							<dd className="text-gray-900">-{discount}</dd>
						</div>
						<div className="flex justify-between">
							<dt>Taxes</dt>
							<dd className="text-gray-900">{getTax()}</dd>
						</div>
						<div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
							<dt className="text-base">Total</dt>
							<dd className="text-base">${getTotal()}</dd>
						</div>
					</dl>
				</div>
			</section>

			{/* Checkout form */}
			<section
				aria-labelledby="payment-heading"
				className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
			>
				<h1 className="pl-6 pt-6 pb-2 text-xl font-medium text-gray-900">
					Payment Information
				</h1>
				<div className="max-w-lg mx-auto">
					<form
						id="newSpaceForm"
						className="mt-6"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="grid grid-cols-12 gap-y-6 gap-x-4">
							<div className="col-span-full">
								<label
									htmlFor="email-address"
									className="block text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<div className="mt-1">
									<input
										type="email"
										id="email-address"
										name="email-address"
										autoComplete="email"
										required
										{...register('email', { required: true })}
										className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
									/>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="name-on-card"
									className="block text-sm font-medium text-gray-700"
								>
									Name on card
								</label>
								<div className="mt-1">
									<input
										type="text"
										id="name-on-card"
										name="name-on-card"
										autoComplete="cc-name"
										required
										{...register('name', {
											required: true,
											maxLength: 40,
										})}
										className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
									/>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="card-number"
									className="block text-sm font-medium text-gray-700"
								>
									Card number
								</label>
								<div className="mt-1">
									<input
										type="text"
										id="card-number"
										name="card-number"
										maxLength="16"
										required
										{...register('cardNumber', {
											required: true,
											maxLength: 16,
											minLength: 16,
										})}
										autoComplete="cc-number"
										className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
									/>
								</div>
							</div>

							<div className="col-span-8 sm:col-span-9">
								<label
									htmlFor="expiration-date"
									className="block text-sm font-medium text-gray-700"
								>
									Expiration date (MM/YY)
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="expiration-date"
										id="expiration-date"
										autoComplete="cc-exp"
										required
										maxLength="5"
										{...register('cardExpiry', {
											required: true,
											maxLength: 5,
										})}
										className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
									/>
								</div>
							</div>

							<div className="col-span-4 sm:col-span-3">
								<label
									htmlFor="cvc"
									className="block text-sm font-medium text-gray-700"
								>
									CVC
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="cvc"
										id="cvc"
										autoComplete="csc"
										maxLength="3"
										required
										{...register('cvc', {
											required: true,
										})}
										className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
									/>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="address"
									className="block text-sm font-medium text-gray-700"
								>
									Address
								</label>
								<div className="mt-1">
									<input
										type="text"
										id="address"
										name="address"
										required
										{...register('address', {
											required: true,
										})}
										autoComplete="street-address"
										className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
									/>
								</div>
							</div>

							<div className="col-span-full sm:col-span-4">
								<label
									htmlFor="city"
									className="block text-sm font-medium text-gray-700"
								>
									City
								</label>
								<div className="mt-1">
									<input
										type="text"
										id="city"
										name="city"
										required
										autoComplete="address-level2"
										{...register('city', {
											required: true,
										})}
										className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
									/>
								</div>
							</div>

							<div className="col-span-full sm:col-span-4">
								<label
									htmlFor="region"
									className="block text-sm font-medium text-gray-700"
								>
									State / Province
								</label>
								<div className="mt-1">
									<input
										type="text"
										id="region"
										name="region"
										required
										{...register('region', {
											required: true,
										})}
										autoComplete="address-level1"
										className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
									/>
								</div>
							</div>

							<div className="col-span-full sm:col-span-4">
								<label
									htmlFor="postal-code"
									className="block text-sm font-medium text-gray-700"
								>
									Postal code
								</label>
								<div className="mt-1">
									<input
										type="text"
										id="postal-code"
										name="postal-code"
										required
										autoComplete="postal-code"
										{...register('postalCode', {
											required: true,
										})}
										className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
									/>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Pay {getTotal()}
						</button>

						<p className="flex justify-center text-sm font-medium text-gray-500 mt-6">
							<LockClosedIcon
								className="w-5 h-5 text-gray-400 mr-1.5"
								aria-hidden="true"
							/>
							Payment details stored in plain text
						</p>
					</form>
					<div className="relative my-8">
						<div
							className="absolute inset-0 flex items-center"
							aria-hidden="true"
						>
							<div className="w-full border-t border-gray-200" />
						</div>
						<div className="relative flex justify-center">
							<span className="px-4 bg-white text-sm font-medium text-gray-500">
								or
							</span>
						</div>
					</div>
					<button
						type="button"
						className="w-full flex items-center justify-center bg-black border border-transparent text-white rounded-md py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
					>
						<span className="sr-only">Pay with Apple Pay</span>
						<svg
							className="h-5 w-auto"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 20"
						>
							<path d="M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z" />
						</svg>
					</button>
				</div>
			</section>
		</main>
	);
}
