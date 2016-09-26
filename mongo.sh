# mongo.sh
#

mongo
use trola
col = db.favourites
col.createIndex({"name": 1,"user": 1}, {unique:true})