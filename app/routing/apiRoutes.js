const path = require('path');
const friendsArray = require('../data/friends');

module.exports = (app) => {

    app.get('/api/friends', (req, res) => {

        res.json(friendsArray);
    });

    app.post('/api/friends', (req, res) => {

        //USER SCORES
        let input = req.body;
        let scores = input.scores;

        //USER MATCH
        let matchName = '';
        let matchImage = '';

        let totalDiff = 1000;

        //LOOP THROUGH FRIENDS ARRAY
        for (let i = 0; i < friendsArray.length; i++) {

            let diff = 0;

            //LOOP THROUGH RESPECTIVE SCORES OF USER AND FRIENDS
            for (let x = 0; x < scores.length; x++) {

                diff += Math.abs(parseInt(friendsArray[i].scores[x]) - scores[x]);

                if (diff < totalDiff) {

                    totalDiff = diff;
                    matchName = friendsArray[i].name;
                    matchImage = friendsArray[i].photo;
                }
                 
            }
        }

        friendsArray.push(input);

        res.json({ matchName: matchName, matchImage: matchImage });
    });
};