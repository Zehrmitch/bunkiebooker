import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ImageUploadButton from '../components/ImageUploadButton';
import axios from 'axios';

export default function Test() {
	const [uploadProgress, setUploadProgress] = useState(0);

	// State for images list and pagination
	const [images, setImages] = useState([]);
	const [limit, setLimit] = useState(10);
	const [offset, setOffset] = useState(0);
	const [imageCount, setImageCount] = useState(null);

	const [checkedImages, setCheckedImages] = useState([]);
	const [numCheckedImages, setNumCheckedImages] = useState(0);

	const [updateFlag, setUpdateFlag] = useState(false);

	const [filesToUpload, setFilesToUpload] = useState(0);
	const [uploadedFiles, setUploadedFiles] = useState(false);

	// Takes an array of images and uploads them one at a time
	// Step 1: GET request to api to retrieve signed URL
	// Step 2: PUT request to signed URL to upload image to s3
	// Step 3: POST request to api to confirm upload and create
	//         image record
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
									console.log('Response from s3');
								})
								.catch((error) => {
									alert('ERROR ' + JSON.stringify(error));
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
		<div class="container flex h-screen overflow-y-hidden bg-white mx-auto">
			<div class="flex flex-col flex-1 h-full overflow-hidden">
				<main class="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
					<div class="flex items-center flex-row justify-between p-2">
						<div class="flex flex-row space-x-2">
							<ImageUploadButton
								uploadImages={uploadImages}
								filesToUpload={filesToUpload}
							/>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
