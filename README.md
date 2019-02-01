

# Storage Blobs Quickstart

> **WARNING** 
> You are viewing a tutorial for the legacy version of the Azure Storage Node.js SDK. Please go [here](https://github.com/Azure-Samples/azure-storage-js-v10-quickstart) to view the latest JavaScript SDK (v10).

The following sample includes the following features:

- **Uses async/await**: The [Azure Storage SDK API](https://github.com/Azure/azure-storage-node) is still callback-based, but the approach in this sample modernizes the syntax. API calls are wrapped in `Promises` and are executed in the context of an `async/await` operation.

- **Uses environment variables**: This sample accesses the connection string from an environment variable. The use of environment variables is representative of how you would access sensitive information in production.


To run this sample, you need an [Azure account](https://azure.microsoft.com/free/), a [blob storage account](https://docs.microsoft.com/azure/storage/common/storage-create-storage-account), and the associated blob storage connection string.

## Set up
First, clone the repository on your machine:

    git clone https://github.com/Azure-Samples/storage-blobs-node-quickstart.git

Then, switch to the appropriate folder:

    cd storage-blobs-node-quickstart

Next, install the dependencies:

    npm install

Now, add your blob storage connection string as an environment variable named `AZURE_STORAGE_CONNECTION_STRING` to a file named `.env`.

> **Note**: This repository includes a file named `.env.example`. You can rename this file by removing `.example` and adding the correct value for your connection string in the `.env` file.

## Running the sample

Once the setup, you can run the sample by using `npm start`.

```bash
npm start
```
When complete, the application should produce output similar to the following:

```bash
Containers:
 - container-one
 - container-two
Container "demo" is created
Blob "quickstart.txt" is uploaded
Local file "./readme.md" is uploaded
Blobs in "demo" container:
 - quickstart.txt
 - readme.md
Blob downloaded blob content: "hello Blob SDK"
Blob "quickstart.txt" is deleted
Container "demo" is deleted
Done
```

## Resources

You can use the [Azure Storage explorer](https://azure.microsoft.com/features/storage-explorer/) to see the data in your Azure account.
