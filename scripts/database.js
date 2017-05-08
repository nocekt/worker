"use strict";

var Database = function(tables) {
	this._indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	this._IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	this._IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

	if (!this._indexedDB) {
		console.log("Browser doesn't support a stable version of IndexedDB.");
		return;
	}

    var db, openRequest = this._indexedDB.open("newDatabase", 1);
    openRequest.onerror = function(event) {
        console.log("Unable to create new database.");
    };
    openRequest.onsuccess = function(event) {
        db = openRequest.result;
    };
    openRequest.onupgradeneeded = function(event) {
        tables.forEach(function(table) {
            var store = openRequest.result.createObjectStore(table, {keyPath: "id"});
        });
    }

    var waitUntilReady = function(callback) {
        if(db) {
            callback();
        }
        else {
            openRequest.addEventListener("success", callback);
        }
    }

	this.insert = function(table, data) {
        waitUntilReady(function(){
            var request = db.transaction([table], "readwrite").objectStore(table).add(data);

            request.onsuccess = function(event) {
                console.log("Data has been added to your database.");
            };
            request.onerror = function(event) {
                console.log("Failed to add data to your database.");
            };
        });
	}

    this.query = function(table, callback) {
        waitUntilReady(function(){
            var request = db.transaction(table).objectStore(table).getAll();
            
            request.onsuccess = function(event) {
                if(request.result) {
                    console.log("Successfully fetched data from database.");
                    callback(request.result);
                }
                else {
                    console.log("Requested data couldn't be found in your database.");        
                }
            };
            request.onerror = function(event) {
                console.log("Unable to retrieve data from database.");
            };
        });
    }

    this.delete = function(table, id) {
        waitUntilReady(function(){
            var request = db.transaction(table, "readwrite").objectStore(table).delete(id);

            request.onsuccess = function(event) {
                console.log("Data has been deleted from your database.");
            };

            request.onerror = function(event) {
                console.log("Unable to delete data from database.");
            }; 
        });
    }
}
