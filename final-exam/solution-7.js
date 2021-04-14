var pipeline = [
    {
        $unwind: '$airlines'
    },
    {
        $lookup: {
            from: 'air_routes',
            localField: 'airlines',
            foreignField: 'airline.name',
            as: 'planes'
        }
    },
    {
        $unwind: '$planes'
    },
    {
        $match: {
            $or: [
                { 'planes.src_airport': 'JFK', 'planes.dst_airport': 'LHR' },
                { 'planes.src_airport': 'LHR', 'planes.dst_airport': 'JFK' }
            ]
        }
    },
    {
        $group: {
            _id: '$airlines',
            count: { $sum: 1 },
            name: { $addToSet: '$name' }
        }
    }
];
db.air_alliances.aggregate(pipeline);
# { "_id" : "Delta Air Lines", "count" : 2, "name" : [ "SkyTeam" ] }
# { "_id" : "American Airlines", "count" : 2, "name" : [ "OneWorld" ] }
# { "_id" : "British Airways", "count" : 2, "name" : [ "OneWorld" ] }
# { "_id" : "Malaysia Airlines", "count" : 2, "name" : [ "OneWorld" ] }
# { "_id" : "Finnair", "count" : 2, "name" : [ "OneWorld" ] }
# { "_id" : "Air France", "count" : 2, "name" : [ "SkyTeam" ] }
# { "_id" : "Iberia Airlines", "count" : 2, "name" : [ "OneWorld" ] }
## OneWorld, with 5 carriers
