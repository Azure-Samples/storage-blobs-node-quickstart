# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

# How to run this project

## Create a storage account using the Azure portal

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) before you begin.

First, create a new general-purpose storage account to use for this quickstart. 

1. Go to the [Azure portal](https://portal.azure.com) and log in using your Azure account. 
2. On the Hub menu, select **New** > **Storage** > **Storage account - blob, file, table, queue**. 
3. Enter a name for your storage account. The name must be between 3 and 24 characters in length and may contain numbers and lowercase letters only. It must also be unique.
4. Set `Deployment model` to **Resource manager**.
5. Set `Account kind` to **General purpose**.
6. Set `Performance` to **Standard**. 
7. Set `Replication` to **Locally Redundant storage (LRS)**.
8. Set `Storage service encryption` to **Disabled**.
9. Set `Secure transfer required` to **Disabled**.
10. Select your subscription. 
11. For `resource group`, create a new one and give it a unique name. 
12. Select the `Location` to use for your storage account.
13. Check **Pin to dashboard** and click **Create** to create your storage account. 

After your storage account is created, it is pinned to the dashboard. Click on it to open it. Under SETTINGS, click **Access keys**. Select a key and copy the CONNECTION STRING to the clipboard, then paste it into Notepad for later use.

## Clone this repo and install Azure Storage Node.js client library

To complete this quickstart, make sure Node.js is correctly installed and then clone this repo.

```
git clone https://github.com/Azure-Samples/storage-blobs-node-quickstart
```

Install Azure Storage Node.js client library by typing following commands:
```
cd storage-blobs-node-quickstart
npm install
```

## Configure your storage connection string

In the application, you must provide your storage connection string to create a `BlobService` object. Open the `index.js` file in your IDE. Replace **AzureStorageConnectionString** with your connection string. 

```
var connectionString = 'AzureStorageConnectionString';
var blobService = storage.createBlobService(connectionString);
```

## Run it!

```
node index.js
```