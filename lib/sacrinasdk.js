//Using Node.js and ES6

//You'll have to install this dependency like this: npm install request --save
var request = require('request');
class SacrinaSDK {
    // Use Sacrina REST API

    constructor() {

        this.key = null;
        this.dataset = [];
        this.headers = {};
        this.dataset_id = null;
        this.model_id = null;
        this.project_id = null;
        this.results = [];
        this.model_progress = 0;
        this.project_progress = 0;
        this.results_downloaded = false;
    }

    //add key
    add_key(key) {

        this.key = key
        this.headers ={
            'Accept': 'application/json',
            'Api-Key': this.key,
        };
    }

    //create dataset
    add_data(input_string) {

        if (typeof input_string !== "string") {

            console.log('input_string paramter is not string, please check your input');
        }
        else {

            this.dataset.push(input_string);
        }
    }

    add_dataset(input_array) {

        var notString = false;
        for(var value of input_array) {
            if(typeof value !== "string")
                notString = true;
        }
        if ((!(input_array instanceof Array)) || (notString == true)) {

            console.log('input_array paramter is not an array of strings, please check your input');
        }
         else {

            this.dataset.push.apply(this.dataset, input_array);
         }
    }

    //upload dataset to sacrina;

    upload_dataset() {

        //create dataset
        var that = this;
        var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/learning/datasets/',
            headers : this.headers,
            json : {'title':'my-dataset','description':'asdasdasdasd'}
        };
        request.post(options,function(error, response, body) {
        if (error || response.statusCode != 201) {
            console.log('error creating dataset');
        }
        
        that.dataset_id = body['id'];
         for (var item of that.dataset) {
            var options = {
                strictSSL : false,
                url : 'https://sacrina.com/REST/learning/datas/',
                headers : that.headers,
                json : {'title':'data1', 'dataset_id': 'https://sacrina.com/REST/learning/datasets/' 
                + String(that.dataset_id) + '/', 'content': String(item) }
            }
            request.post(options,function(error, response, body) {
                if (error || response.statusCode != 201) {
                    console.log('error uploading data to dataset');
                }
               
            });
        }
         console.log('Dataset upload completed') ;
        });

        //upload data to dataset
       
        
    }

    //add an existing dataset
    select_dataset(dataset_id){

        this.dataset_id = dataset_id;
        var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/learning/datasets/' + String(this.dataset_id) + '/',
            headers : this.headers
        };
        request.get(options,function(error, response, body) {

            if (error || response.statusCode != 200)
                return "error";
            else
                return body;
        });
    }

    create_model(){

        var that = this;
        var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/learning/models/',
            headers : this.headers,
            json : {'title':'mymodel','datasets': 'https://sacrina.com/REST/learning/datasets/' + String(this.dataset_id) + '/'}
        };
        
        request.post(options,function(error, response, body) {
            
            if (error || response.statusCode != 201)
                console.log("error");

            else {

                var response_json = body;
                that.model_id = response_json['id'];
                console.log(body);
            }
        });
    }

    //add an old model
    select_model(model_id) {

        this.model_id = model_id;
        var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/learning/models/' + String(this.model_id) + '/',
            headers : this.headers
        };
         request.get(options,function(error, response, body) {

            if (error || response.statusCode != 200)
                return "error";
            else
                return body;
        });
    }

    //train the model
    train_model(){

        var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/learning/models/' + String(this.model_id) + '/?train',
            headers : this.headers
        };
        request.get(options,function(error, response, body) {
            console.log("TRENING: ");
            console.log(body);
            if (error || response.statusCode != 200)
                return "error";
            else
                return body;
        });
    }


    //check model training status
    check_model_status() {

        var that = this;
        var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/learning/models/' + String(this.model_id) + '/',
            headers : this.headers
        };
        request.get(options,function(error, response, body) {

            if (error || response.statusCode != 200)
                return "error";
            else {
                
                var response_json = JSON.parse(body);
                var status = response_json['status'];
                that.model_progress = response_json['progress'];
                console.log(that.model_progress);
            }
        });
    }

    //create a project with the model
    create_project(gen, sector_min, sector_max) {

        var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/production/projects/',
            headers : this.headers,
            json : {'name':'myproject','model': 'https://sacrina.com/REST/learning/models/' + String(this.model_id) + '/', 'gen': gen, 'sector_min': sector_min, 'sector_max': sector_max }
        };
        
        request.post(options,function(error, response, body) {
            if (response.statusCode != 201)
                return "error";

            else {
                var response_json = body;
                this.project_id = response_json['id'];
                return body;
            }
        });
    }

    //add an existing project
    select_project(project_id) {

        this.project_id = project_id;
        var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/production/projects/' + String(this.project_id) + '/',
            headers : this.headers
        };
       
        request.get(options,function(error, response, body) {

            if (error || response.statusCode != 200)
                return "error";
            else 
                return body;
        });

    }

    //execute the project
    execute_project() {
        var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/production/projects/' + String(this.project_id) + '/?execute',
            headers : this.headers
        };
        request.get(options,function(error, response, body) {

            if (error || response.statusCode != 200)
                return "error";
            else 
                return body;
        });

    }

    //check project status
    check_project_status() {
         var that = this;
         var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/production/projects/' + String(this.project_id) + '/',
            headers : this.headers
        };
        
        request.get(options,function(error, response, body) {

            if (error || response.statusCode != 200)
                console.log("error");
            else 
                var response_json = JSON.parse(body);
                var status = response_json['status'];
                that.project_progress = response_json['progress'];
                console.log(that.project_progress);
        });

    }

    //download results
    download_results() {
        var that = this;
        var options = {
            strictSSL : false,
            url : 'https://sacrina.com/REST/production/results/?project_id=' + String(this.project_id),
            headers : this.headers
        };
        request.get(options,function(error, response, body) {

            if (error || response.statusCode != 200)
                console.log("error");
            else {
                var response_json = body;
                for (var item of response_json){
                    if (response_json.hasOwnProperty(key) && key == 'content')      
                            that.results.push(item["content"]);
                      }
                }
                that.results_downloaded = true;

            
        });
    }
    
}
exports.SacrinaSDK = SacrinaSDK;
