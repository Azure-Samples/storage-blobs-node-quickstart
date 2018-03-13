

# Storage Blobs Quickstart

The following sample includes the following features:

- **Uses async/await**: The [Azure Storage SDK API](https://github.com/Azure/azure-storage-node) is still callback-based, but the approach in this sample modernizes the syntax. API calls are wrapped in `Promises` and are executed in the context of an `async/await` operation.

- **Command-based interaction**: By passing a command to the `--command` parameter, you are able to explicitly tell the script which operation to execute (ex: upload, download, list, etc.)
 
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

Once the setup steps are complete, you can interact with the sample by passing a known command into the `--command` parameter.

For instance if you want to create a container in blob storage, then run the following command:

    node index.js --command createContainer

Commands available include:


| Command | Description |
|---------|---------|
|`createContainer` | Creates a container named `test` (succeeds even if container already exists) |
|`upload`          | Uploads the `example.txt` file |
|`download`        | Downloads the contents of the `example` blob to `example.txt` |
|`delete`          | Deletes the `example` blob |
|`list`            | Lists the contents of the `test` container to the console |

## Resources

You can use the [Azure Storage explorer](https://azure.microsoft.com/features/storage-explorer/) to see the data in your Azure account.