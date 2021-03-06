# Sacrina Node.js SDK

## System Requirements

- Node.js - https://nodejs.org/en/download/


## Installation

Install Sacrina SDK using npm:
	
	npm install sacrinasdk --save
	
Alternatively, clone this repository and use SDK locally:

	git clone https://github.com/sshussain270/Sacrina-node-SDK.git

Then go into the Sacrina SDK folder and run `npm link`:
	
	cd /Sacrina-node-SDK
	npm link
	
Then go inside the directory where you want to use SacrinaSDK, and run:

	npm link sacrinasdk


## Configuration

Register for Sacrina account and get your key. The use:


	var SacrinaSDK = require('sacrinasdk').SacrinaSDK;

    
    sacrinasdk = new SacrinaSDK();
    sacrinasdk.add_key('[your API key]');

## Usage

### Add dataset

You can add dataset as a list as:

    lis = ['data 1', 'data 2', 'data 3',..];
    sacrinasdk.add_dataset(list);
    
Or you can add data one by one as:

    sacrinasdk.add_data('Data 1');

### Upload dataset

Upload your dataset to Sacrina using:

    sacrinasdk.upload_dataset();
    
### Select an existing dataset

You can select an exisiting dataset using the id parameter:

    sacrinasdk.select_dataset([dataset_id]);

### Create model

To create a new model using your added dataset, use the following:

    sacrinasdk.create_model();

### Select model

To select an existing model using its id, use the following:

    sacrinasdk.select_model([model_id]);

### Train model

To start your model training, use the following:

    sacrinasdk.train_model();

### Check model status

To check the status of training, use the following:

    sacrinasdk.check_model_status();

### Create optional feature

To create a new optional feature, use the following:

    sacrinasdk.create_optional_feature([keywords]);

### Add optional feature sample

To add a sample to optional feature, use the following:

    sacrinasdk.add_optional_feature_sample([optional_feature_id], [title], [content]);

### Select optional feature

To select an optional feature, use the following

    sacrinasdk.select_optional_feature([optional_feature_id]);

### Extract optional feature

To extract optional feature, use the following:

    sacrinasdk.extract_optional_feature();

### Check optional feature status

To optional feature status, use the following:

    sacrinasdk.check_optional_feature_status();
### Create project

To create a new project, use the following:

    sacrinasdk.create_project(gen_min, gen_max, sector_min, sector_max, limit, optional_feature_ids);

### Select project

To select an existing project using its id, use the following:

    sacrinasdk.select_project(project_id);

### Execute project

To execute the selected project, use the following:

    sacrinasdk.execute_project();

### Check project status

To check the project status, use the following:

    sacrinasdk.check_project_status();

### Download results

To download the results of the selected project, use the following:

    sacrinasdk.download_results();
