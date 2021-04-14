# Chapter 3: Core Aggregation - Combining Information
# Lab - $unwind
var pipeline = [
    {
        $match: {
            'imdb.rating': {
                $gt: 0
            },
            languages: {
                $in: ['English']
            }
        }
    },
    {
        $project: {
            cast: 1,
            'imdb.rating': 1
        }
    },
    {
        $unwind: '$cast'
    },
    {
        $group: {
            _id: '$cast',
            numFilms: {
                $sum: 1
            },
            average: {
                $avg: '$imdb.rating'
            }
        }
    },
    {
        $sort: {
            numFilms: -1
        }
    },
    {
        $limit: 1
    }
];
db.movies.aggregate(pipeline);
# { "_id" : "John Wayne", "numFilms" : 107, "average" : 6.424299065420561 }
