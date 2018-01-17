# Sacrina Node.js SDK

## System Requirements

- Node.js - https://nodejs.org/en/download/


## Installation

Install Sacrina SDK using npm:
	
	npm install sacrina --save
	
Alternatively, clone this repository and use SDK locally:

	git clone https://github.com/sacrina/sacrina-node.git

Then go into the Sacrina SDK folder and run `npm link`:
	
	cd /sacrina-node
	npm link
	
Then go inside the directory where you want to use Sacrina SDK and run:

	npm link sacrina


## Configuration

Register for Sacrina account and get your key. The use:


	var sacrina = require('sacrina').sacrinarest;

    
    sacrina = new sacrinarest();
    sacrina.add_key('[your API key]');

## Usage

### Add dataset

You can add dataset as a list as:

    lis = ['data 1', 'data 2', 'data 3',..];
    sacrina.add_dataset(list);
    
Or you can add data one by one as:

    sacrina.add_data('Data 1');

### Upload dataset

Upload your dataset to Sacrina using:

    sacrina.upload_dataset();
    
### Select an existing dataset

You can select an exisiting dataset using the id parameter:

    sacrina.select_dataset([dataset_id]);

### Create model

To create a new model using your added dataset, use the following:

    sacrina.create_model();

### Select model

To select an existing model using its id, use the following:

    sacrina.select_model([model_id]);

### Train model

To start your model training, use the following:

    sacrina.train_model();

### Check model status

To check the status of training, use the following:

    sacrina.check_model_status();

### Create project

To create a new project, use the following:

    sacrina.create_project(gen, sector_min, sector_max);

### Select project

To select an existing project using its id, use the following:

    sacrina.select_project(project_id);

### Execute project

To execute the selected project, use the following:

    sacrina.execute_project();

### Check project status

To check the project status, use the following:

    sacrina.check_project_status();

### Download results

To download the results of the selected project, use the following:

    sacrina.download_results();
