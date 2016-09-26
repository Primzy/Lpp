# Trola bus

## Install
### Node


After pulling the repository run the following code in the terminal
```
    npm install
```
### Mongo

#### Install
Installing mongo is very easy with homebrew. Run your terminal and execute the following code:
```
    brew install mongodb -g
```
More info: [Mongo installation guide]

To run the mongo service type the following code into terminal:
```
    mongod
```
More info: [Mongo service guide]

You may have some problems with permissions or the existance of the /data/db folder
```
    sudo chown mongodb:mongodb /data/db
```

#### Set-up
Once your mongo server is up and running set up the database by runing the following code:
```
	mongo
	use trola
	fav = db.favourites
	fav.createIndex({"name": 1,"user": 1}, {unique:true})
```
This creates the database and favourites collection. The last line adds an unique index to the favourites collection




[Mongo installation guide]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ "Mongo installation guide"
[Mongo service guide]: https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/ "Mongo services guide"



## Todo
---
1. Add live data
2. Send push notifications when bus is near (i need to leave 5min before the bus arrives)
3. Add filters
    * ~~by bus number~~
    * by arrival time
4. Update UI