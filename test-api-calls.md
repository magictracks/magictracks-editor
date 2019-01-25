# Projects

## POST

### Create a new project

http://localhost:3030/projects

```json
{
  "title": "my new super awesome project",
  "description": "this is a project about what I love about NYC"
}
```

## PUT

### push a branch to a project

http://localhost:3030/projects?_id=5c364a6f7d651e63a61df557

```json
{
  "$push": {
    "branches": {
      "branchName": "my branch 1",
      "description": "my super exciting awesome time in NYC"
    }
  }
}
```

## PUT

### push a playlist to a project

http://localhost:3030/projects?branches._id=5c366d297c88256de3bcd1c8

```json
{
  "$push": {
    "branches.$.playlists": {
      "branchName": "master",
      "playlist": "5c34d9d12acbb141874f5a0a"
    }
  }
}
```

## PUT

### remove a branch from a project

http://localhost:3030/projects?_id=5c364a6f7d651e63a61df557

```json
{"$pull":{
	"branches":{
        "_id": "5c366d297c88256de3bcd1c8"
        }
    }
}
```

## PUT 
### remove a playlist from a branch

http://localhost:3030/projects?branches._id=5c368586fc5ebd74c50c6f60

```
{"$pull":{
	"branches.$.playlists":{
        "_id": "5c3685a4fc5ebd74c50c6f61"
        }
    }
}
```


*** 
***
***

# Playlists

## POST - post a new playlist
http://localhost:3030/playlists

data:
```json
{
    "title":"Coding Train Introduction to Git & Github",
    "description":"Ride along with Dan Shiffman on the Coding Train with this introduction to Git and Github for poets"
}
```

result:
```json
{
    "title": "Coding Train Introduction to Git & Github ",
    "description": "Ride along with Dan Shiffman on the Coding Train with this introduction to Git and Github for poets",
    "featureType": "playlists",
    "uniqueName": "empty-eggs",
    "collaborators": [],
    "suggested": [],
    "selectedColor": 3,
    "colors": [
        "#FF725C",
        "#FFD700",
        "#FF80CC",
        "9EEBCF",
        "#CDECFF",
        "#A463F2"
    ],
    "_id": "5c38c316e6127f303b118e6c",
    "branches": [
        {
            "description": "default",
            "images": [],
            "_id": "5c38c316e6127f303b118e6d",
            "branchName": "default",
            "branchOwner": "test1",
            "links": []
        }
    ],
    "owner": "test1",
    "createdAt": "2019-01-11T16:23:50.349Z",
    "updatedAt": "2019-01-11T16:23:50.349Z",
    "__v": 0
}
```

## GET - get the playlist by the id and specified branch

http://localhost:3030/playlists?_id=5c38c10ff1330b2f0df9a3df&branches.branchName=default

params:
```json
{
    "id":"5c38c10ff1330b2f0df9a3df",
    "branches.branchName":"default"
}
```

result:
```json
{
    "data": [
        {
            "title": "Introduction to HTML & CSS with P5.js",
            "description": "An introduction to HTML and CSS with P5.js with Coding Train and Dan Shiffman",
            "featureType": "playlists",
            "uniqueName": "gaping-grass",
            "collaborators": [],
            "suggested": [],
            "selectedColor": 4,
            "colors": [
                "#FF725C",
                "#FFD700",
                "#FF80CC",
                "9EEBCF",
                "#CDECFF",
                "#A463F2"
            ],
            "_id": "5c38c10ff1330b2f0df9a3df",
            "branches": [
                {
                    "description": "default",
                    "images": [],
                    "links": [],
                    "_id": "5c38c10ff1330b2f0df9a3e0",
                    "branchName": "default",
                    "branchOwner": "test1"
                }
            ],
            "owner": "test1",
            "createdAt": "2019-01-11T16:15:11.093Z",
            "updatedAt": "2019-01-11T16:15:11.093Z",
            "__v": 0
        }
    ]
}
```


## PATCH - patch the specified branch with a new Link of the given playlist
http://localhost:3030/playlists?_id=5c38c10ff1330b2f0df9a3df&branches.branchName=default

params:
```json
{
    "id":"5c38c10ff1330b2f0df9a3df",
    "branches.branchName":"default"
}
```

data: 
```json
{
    "$push":{
        "branches.$.links":{
            "branchName":"default",
            "link":"5c38c9703aaece347d2fa428"
            }
        }
}
```

result:
```json
[
    {
        "_id": "5c38c10ff1330b2f0df9a3df",
        "title": "Introduction to HTML & CSS with P5.js",
        "description": "An introduction to HTML and CSS with P5.js with Coding Train and Dan Shiffman",
        "featureType": "playlists",
        "uniqueName": "gaping-grass",
        "collaborators": [],
        "suggested": [],
        "selectedColor": 4,
        "colors": [
            "#FF725C",
            "#FFD700",
            "#FF80CC",
            "9EEBCF",
            "#CDECFF",
            "#A463F2"
        ],
        "branches": [
            {
                "description": "default",
                "_id": "5c38c10ff1330b2f0df9a3e0",
                "branchName": "default",
                "branchOwner": "test1",
                "links": [
                    {
                        "_id": "5c38cf6ad527a836b9997562",
                        "branchName": "default",
                        "link": "5c38c9703aaece347d2fa428"
                    }
                ]
            }
        ],
        "owner": "test1",
        "createdAt": "2019-01-11T16:15:11.093Z",
        "updatedAt": "2019-01-11T17:16:26.894Z",
        "__v": 0
    }
]
```


*** 
***
***

# Links
