import React, { useState, Component } from 'react';
import axios from 'axios';

class ImageUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			success: false,
			url: '',
			file: '',
		};
	}

	handleChange = (ev) => {
		this.setState({ success: false, url: '' });
	};
	// Perform the upload
	handleUpload = (ev) => {
		if (this.uploadInput.files[0] == null) {
			alert('Please select an image');
			return;
		}
		let file = this.uploadInput.files[0];
		// Split the filename to get the name and type
		let fileParts = this.uploadInput.files[0].name.split('.');
		let fileName = fileParts[0];
		let fileType = fileParts[1];
		console.log('Preparing the upload');
		axios
			.post('http://localhost:8080/sign_s3', {
				fileName: fileName,
				fileType: fileType,
			})
			.then((response) => {
				var returnData = response.data.data.returnData;
				var signedRequest = returnData.signedRequest;
				var url = returnData.url;
				this.setState({ url: url });
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
						this.setState({ success: true });
					})
					.catch((error) => {
						alert('ERROR ' + JSON.stringify(error));
					});
			})
			.catch((error) => {
				alert(JSON.stringify(error));
			});
	};

	render() {
		const SuccessMessage = () => (
			<div style={{ padding: 50 }}>
				<h3 style={{ color: 'green' }}>Upload Sucessful</h3>
				<a href={this.state.url}>Access the file here</a>
				<br />
			</div>
		);

		return (
			<>
				<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
					<div className="space-y-1 text-center">
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
							aria-hidden="true"
						>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<div className="flex text-sm text-gray-600">
							<label
								htmlFor="file-upload"
								className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
							>
								<span>Upload a file</span>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									className="sr-only"
									ref={(ref) => {
										this.uploadInput = ref;
									}}
									onChange={this.handleChange}
								/>
							</label>
							<p className="pl-1">or drag and drop</p>
						</div>
						<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
					</div>
				</div>
				<button onClick={this.handleUpload}>Upload Image</button>
				{this.state.success ? <SuccessMessage /> : null}
			</>
		);
	}
}
export default ImageUpload;
