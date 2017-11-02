// MIT License
// Copyright (c) Microsoft Corporation. All rights reserved.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE

var fs = require('fs');
var path = require('path');
var readlineSync = require('readline-sync');
var storage = require('azure-storage');
var util = require('util');
var uuid = require('uuid');

// Create a blob client for interacting with the blob service from connection string
// How to create a storage connection string - http://msdn.microsoft.com/en-us/library/azure/ee758697.aspx
var connectionString = 'AzureStorageConnectionString';
var blobService = storage.createBlobService(connectionString);

// Prepare upload and download file path related variables
var USER_HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var DOCUMENT_FOLDER = path.join(USER_HOME, 'Documents');
if (!fs.existsSync(DOCUMENT_FOLDER)) {
  fs.mkdirSync(DOCUMENT_FOLDER);
}

var LOCAL_FILE_TO_UPLOAD = 'HelloWorld-' + uuid.v1() + '.txt';
var LOCAL_FILE_PATH = path.join(DOCUMENT_FOLDER, LOCAL_FILE_TO_UPLOAD);
var DOWNLOADED_FILE_NAME = LOCAL_FILE_TO_UPLOAD.replace('.txt', '_DOWNLOADED.txt');
var DOWNLOADED_FILE_PATH = path.join(DOCUMENT_FOLDER, DOWNLOADED_FILE_NAME);
var CONTAINER_NAME = 'quickstartcontainer-' + uuid.v1();
var BLOCK_BLOB_NAME = 'quickstartblob-' + LOCAL_FILE_TO_UPLOAD;

console.log('Azure Storage Node.js Client Library Blobs Quick Start\n');

console.log('1. Creating a container with public access:', CONTAINER_NAME, '\n');
blobService.createContainerIfNotExists(CONTAINER_NAME, { 'publicAccessLevel': 'blob' }, function (error) {
  handleError(error);

  console.log('2. Creating a file in ~/Documents folder to test the upload and download\n');
  console.log('   Local File:', LOCAL_FILE_PATH, '\n');
  fs.writeFileSync(LOCAL_FILE_PATH, 'Greetings from Microsoft!');

  console.log('3. Uploading BlockBlob:', BLOCK_BLOB_NAME, '\n');
  blobService.createBlockBlobFromLocalFile(CONTAINER_NAME, BLOCK_BLOB_NAME, LOCAL_FILE_PATH, function (error) {
    handleError(error);
    console.log('   Uploaded Blob URL:', blobService.getUrl(CONTAINER_NAME, BLOCK_BLOB_NAME), '\n');

    console.log('4. Listing blobs in container\n');
    blobService.listBlobsSegmented(CONTAINER_NAME, null, function (error, data) {
      handleError(error);

      for (var i = 0; i < data.entries.length; i++) {
        console.log(util.format('   - %s (type: %s)'), data.entries[i].name, data.entries[i].blobType);
      }
      console.log('\n');

      console.log('5. Downloading blob\n');
      blobService.getBlobToLocalFile(CONTAINER_NAME, BLOCK_BLOB_NAME, DOWNLOADED_FILE_PATH, function (error) {
        handleError(error);
        console.log('   Downloaded File:', DOWNLOADED_FILE_PATH, '\n');

        console.log('Sample finished running. When you hit <ENTER> key, the temporary files will be deleted and the sample application will exit.');
        readlineSync.question('\n');

        console.log('6. Deleting block Blob\n');
        blobService.deleteBlobIfExists(CONTAINER_NAME, BLOCK_BLOB_NAME, function (error) {
          handleError(error);

          console.log('7. Deleting container\n');
          blobService.deleteContainerIfExists(CONTAINER_NAME, function (error) {
            handleError(error);

            fs.unlinkSync(LOCAL_FILE_PATH);
            fs.unlinkSync(DOWNLOADED_FILE_PATH);
          });
        });
      });
    });
  });
});

function handleError(error) {
  if (error) {
    console.error('Exception thrown:\n', error);
    process.abort();
  }
}