'use client';

import React, { ChangeEvent, FunctionComponent } from 'react';

export async function getBase64(file: File | Blob): Promise<string> {
	// wrap in promise to make it async.
	var base64: string = await new Promise((resolve, reject) => {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			//console.log(reader.result);
			resolve(reader.result as string);
		};
		reader.onerror = reject;
		/* reader.onerror = function (error) {
			//console.error('Error: ', error);
			reject(error);
		}; */

	});

	return base64;
}

export interface HandleFilesChangeProps {
	files: FileList;
	file: File;
	e: ChangeEvent<HTMLInputElement>;
	fileHeaders: { 'content-type': string, 'content-length': string };
}

export interface HandleFilesChange {
	(filesData: HandleFilesChangeProps): void;
}

export type AcceptExample = 'image/*;capture=camera' | 'image/png, image/jpeg;capture=camera' | 'image/png, image/jpeg';

export type Capture = boolean | 'user' | 'environment' | undefined;

export class FilesProps {
	fileAccept?: AcceptExample | string;
	multiple?: boolean = false;
	handleFileChange?: HandleFilesChange;
	capture?: Capture;
}

const FileUploader: FunctionComponent<FilesProps> = (props: FilesProps) => {
	const { fileAccept, handleFileChange, multiple, capture } = props;
	//console.log('FileUploader', { props });

	const internalHandleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		let files = e?.target?.files;
		if (files && files.length > 0) {
			var file = files[0];

			// 👇 Set headers manually for single file upload
			const fileHeaders = {
				'content-type': file.type,
				'content-length': `${file.size}`, // 👈 Headers need to be a string
			};

			if (handleFileChange) {
				handleFileChange({ e, files, file, fileHeaders })				
			}
			//console.log('handleFileChange', { e, files, file, fileHeaders });
		}
	};


	return (
		<>
			<input type="file" capture={capture} multiple={multiple} accept={fileAccept} onChange={internalHandleFileChange} />
		</>
	)
}

export default FileUploader;