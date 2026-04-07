const fs = require('node:fs');

// get the arguments
const args_array = process.argv.splice(2);
// console.log(args_array);

const command_type = args_array[0];
const arg_value = args_array[1];

const file_path = "./task-data.json"

// create a json file if not already present
if (!fs.existsSync(file_path)) {
    fs.writeFileSync(file_path, JSON.stringify([]));
}

const getNextId = (tasks) => {
    if (tasks.length === 0) return 1;

    const maxId = tasks.reduce((max, task) => {
        return task.id > max ? task.id : max;
    }, 0);

    return maxId + 1;
};

switch(command_type){
    case "add":
        // add to json file
        fs.readFile(file_path, function(err, data){
            if(err) throw err; 
            let tasks = JSON.parse(data);
            
            const task = {"id": getNextId(tasks), "title": arg_value, "complete": false}
            tasks.push(task);

            fs.writeFile(file_path, JSON.stringify(tasks), function(){
                console.log('File modified successfully!');
            });
        });
        break;
    
    case "list":
        // list all task objects
        fs.readFile(file_path, 'utf-8', function(err, data){
            if(err) throw err;
            let tasks = JSON.parse(data);

            tasks.forEach(task => {
                console.log(`id: ${task.id}, title: ${task.title}, complete: ${task.complete}`);
            });
        })
        break;

    case "complete":
        // mark object as complete
        fs.readFile(file_path, 'utf-8', function(err, data){
            if(err) throw err;
            
            let tasks = JSON.parse(data);
            let task = tasks.find(task => task.id == arg_value);
            task.complete = true;

            fs.writeFile(file_path, JSON.stringify(tasks), function(){
                console.log('File modified successfully!');
            });
        })

        break;
            
    case "delete":
        // delete the task object
        fs.readFile(file_path, 'utf-8', function(err, data){
            if(err) throw err;
            let tasks = JSON.parse(data);

            const index = tasks.findIndex(task => task.id == arg_value);
            if (index !== -1) {
                tasks.splice(index, 1);
            }

            fs.writeFile(file_path, JSON.stringify(tasks), function(){
                console.log('File modified successfully!');
            });
        })

        break;

    default: 
        break;
}
