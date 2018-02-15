require('dotenv').config();

const fs = require('fs');
const path = require('path');
const storage = require('azure-storage');
const args = require('yargs').argv;

const blobService = storage.createBlobService();
const containerName = 'test';
const sourceFilePath = path.resolve('./example.txt');
const blobName = path.basename(sourceFilePath, path.extname(sourceFilePath));

const createContainer = () => {
    return new Promise((resolve, reject) => {
        blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, err => {
            if(err) {
                reject(err);
            } else {
                resolve({ message: 'Container created' });
            }
        });
    });
};

const upload = () => {
    return new Promise((resolve, reject) => {
        blobService.createBlockBlobFromLocalFile(containerName, blobName, sourceFilePath, err => {
            if(err) {
                reject(err);
            } else {
                resolve({ message: 'Upload complete' });
            }
        });
    });
};

const download = () => {
    const dowloadFilePath = sourceFilePath;
    return new Promise((resolve, reject) => {
        blobService.getBlobToLocalFile(containerName, blobName, dowloadFilePath, err => {
            if(err) {
                reject(err);
            } else {
                resolve({ message: 'Download complete' });
            }
        });
    });
};

const list = () => {
    return new Promise((resolve, reject) => {
        blobService.listBlobsSegmented(containerName, null, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve({ message: `Items in container: ${containerName}`, data: data });
            }
        });
    });
};

const deleteBlock = () => {
    return new Promise((resolve, reject) => {
        blobService.deleteBlobIfExists(containerName, blobName, err => {
            if(err) {
                reject(err);
            } else {
                resolve({ message: 'Block blob deleted' });
            }
        });
    });
};

const _module = {
    "createContainer": createContainer,
    "upload": upload,
    "download": download,
    "delete": deleteBlock,
    "list": list
};

const commandExists = () => {
    const cmd = args.command;
    const exists = !!_module[cmd];

    if(!exists) {
        console.log(`The '${cmd}' command does not exist. Try one of these:`);
        Object.keys(_module).forEach(key => console.log(`- ${key}`));
    }

    return exists;
};

const executeCommand = async () => {
    const response = await _module[args.command]();

    console.log(response.message);

    if(response.data) {
        response.data.entries.forEach(entry => {
            console.log('Name:', entry.name, ' Type:', entry.blobType)
        });
    }
};

try {
    console.log(`Executing '${args.command}'...`);

    if(commandExists()){
        executeCommand();
    }
} catch(e) {
    console.log(e);
}