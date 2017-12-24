


#Fake Server

 json-server is fake Server REST API to test applications. Easy to install and use it with few steps. 


#Step-1: Open the command prompt and run the following command in the project root folder .
	This command will install fake DB server in the system level.
	- npm install -g json-server 
	
#Step-2: Create a db.json file in a project root directory. 
		
		{
      "books": [
        {
          "name": "Android Book11",
          "author": "demo144444",
          "page": "1012",
          "date": "12-10-2017",
          "id": 1
        },
    
        {
          "id": 2,
          "name": "Java Book11",
          "author": "bbb",
          "page": "1012",
          "date": "12-10-2017"
        },
        {
          "name": "Dhiman Book11",
          "author": "amritpal",
          "page": "1012",
          "date": "12-10-2017",
          "id": 3
        },
        {
          "id": 4,
          "name": "Designer Book11",
          "author": "ddd",
          "page": "1012",
          "date": "12-10-2017"
        },
        {
          "id": 5,
          "name": "Android Book11",
          "author": "gggg",
          "page": "1012",
          "date": "12-10-2017"
        },
        {
          "id": 6,
          "name": "IOS Book11",
          "author": "jjjj",
          "page": "1012",
          "date": "12-10-2017"
        },
        {
          "name": "dfdfg",
          "author": "ggd",
          "page": "dfg",
          "date": "qdgfdgf",
          "id": 7
        },
        {
          "name": "insonix",
          "author": "insonix",
          "page": "1231",
          "date": "sep",
          "id": 8
        },
        {
          "name": "Angular007",
          "author": "demo144444",
          "page": "1012",
          "date": "12-10-2017",
          "id": 9
        },
        {
          "id": 10,
          "name": "Creative Book12",
          "author": "bbb",
          "page": "1012",
          "date": "12-10-2017"
        },
        {
          "id": 11,
          "name": "Tester Book11",
          "author": "ddd",
          "page": "1012",
          "date": "12-10-2017"
        },
        {
          "id": 12,
          "name": "Python07",
          "author": "gggg",
          "page": "1012",
          "date": "12-10-2017"
        },
        {
          "id": 13,
          "name": "Xamarin Book19",
          "author": "jjjj",
          "page": "1012",
          "date": "12-10-2017"
        }
      ]
    }

		

#Step-3: Now we need to run the json-server in project root folder.
    Open Terminal/Prompt
		- json-server --watch db.json 
		

#Step-4: Fake DB server Url open in browser.
		http://localhost:3000/books
		

#Step-5: 
    Run 'npm install' and then 'npm start' using command prompt in project root folder. 
    Now access the URL http://localhost:4200 
    
	
