import React, { useState, Component } from 'react';
import ImageUploadButton from '../components/ImageUploadButton';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function NewSpacePage() {
	const [filesToUpload, setFilesToUpload] = useState(0);
	const [uploadedFiles, setUploadedFiles] = useState(false);
	const [imageUrls, setImageUrls] = useState([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		alert(JSON.stringify(data));
		var form = document.getElementById('myForm');
		form.reset();
	};

	const uploadImages = async (files) => {
		setFilesToUpload(files.length);
		setUploadedFiles(false);

		await Promise.all(
			files.map(async (file) => {
				var fileName = file.name;
				var fileType = file.type;
				console.log(file);

				try {
					axios
						.post('http://localhost:8080/sign_s3', {
							fileName: fileName,
							fileType: fileType,
						})
						.then((response) => {
							var returnData = response.data.data.returnData;
							var signedRequest = returnData.signedRequest;
							console.log('Recieved a signed request ' + signedRequest);

							// Put the fileType in the headers for the upload
							var options = {
								headers: {
									'Content-Type': fileType,
								},
							};

							axios
								.put(signedRequest, file, options)
								.then((result) => {
									console.log(result);
									console.log('Response from s3');
								})
								.catch((error) => {
									console.log(error);
								});
						});
				} catch (error) {
					console.log(error);
				}
			})
		);

		setFilesToUpload(0);
		setUploadedFiles(true);
	};

	return (
		<form
			className="space-y-8 divide-y divide-gray-200"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="space-y-8 divide-y divide-gray-200">
				<div>
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Create a new space.
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							This information is public.
						</p>
					</div>

					<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label className="block text-sm font-medium text-gray-700">
								Space Name
							</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									name="name"
									id="name"
									required
									{...register('SpaceName', { required: true })}
									className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-r-md sm:text-sm  rounded p-1"
								/>
							</div>
						</div>

						<div className="sm:col-span-6">
							<div className="grid grid-cols-1 sm:grid-cols-6">
								<div className="sm:col-span-2">
									<label className="block text-sm font-medium text-gray-700">
										Space Price
									</label>
									<div className="mt-1 flex rounded-md shadow-sm">
										<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-white bg-white text-gray-500 sm:text-sm">
											$
										</span>
										<input
											type="text"
											name="price"
											id="price"
											required
											{...register('Price', { required: true })}
											className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-r-md sm:text-sm  rounded p-1"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="sm:col-span-6">
							<label className="block text-sm font-medium text-gray-700">
								Description
							</label>
							<div className="mt-1">
								<textarea
									id="about"
									name="about"
									maxLength={100}
									rows={3}
									required
									{...register('Description', { required: true })}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-1"
									defaultValue={''}
								/>
							</div>
							<p className="mt-2 text-sm text-gray-500">
								Write a brief description about the space.
							</p>
						</div>
						<div className="sm:col-span-6">
							<ImageUploadButton
								uploadImages={uploadImages}
								filesToUpload={filesToUpload}
							/>
						</div>
					</div>
				</div>
				<div className="pt-8">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Personal Information
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							This information is private.
						</p>
					</div>
					<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label className="block text-sm font-medium text-gray-700">
								First name
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="first-name"
									id="first-name"
									autoComplete="given-name"
									required
									{...register('FirstName', { required: true })}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label className="block text-sm font-medium text-gray-700">
								Last name
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="last-name"
									id="last-name"
									autoComplete="family-name"
									required
									{...register('LastName', { required: true })}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
								/>
							</div>
						</div>

						<div className="sm:col-span-4">
							<label className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									{...register('Email', { required: true })}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
								/>
							</div>
						</div>

						<div className="sm:col-span-4 pt-4">
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">
									Property Information
								</h3>
								<p className="mt-1 text-sm text-gray-500">
									This information is private.
								</p>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label className="block text-sm font-medium text-gray-700">
								Country
							</label>
							<div className="mt-1">
								<select
									id="country"
									name="country"
									autoComplete="country-name"
									required
									{...register('Country', { required: true })}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
								>
									<option>Canada</option>
									<option>United States</option>
									<option>Mexico</option>
								</select>
							</div>
						</div>

						<div className="sm:col-span-6">
							<label className="block text-sm font-medium text-gray-700">
								Street address
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="street-address"
									id="street-address"
									autoComplete="street-address"
									required
									{...register('Address', { required: true })}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label className="block text-sm font-medium text-gray-700">
								City
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="city"
									id="city"
									autoComplete="address-level2"
									required
									{...register('City', { required: true })}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label className="block text-sm font-medium text-gray-700">
								State / Province
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="region"
									id="region"
									autoComplete="address-level1"
									required
									{...register('Region', { required: true })}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label className="block text-sm font-medium text-gray-700">
								ZIP / Postal code
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="postal-code"
									id="postal-code"
									autoComplete="postal-code"
									required
									{...register('PostalCode', { required: true })}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="pt-5">
				<div className="flex justify-end">
					<button
						type="button"
						className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Save
					</button>
					{imageUrls}
				</div>
			</div>
		</form>
	);
}
