const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const jsonXml = require('jsontoxml');

admin.initializeApp(functions.config().firebase);

const MAXIMUM_PLAYERS_ON_HIGHSCORE_BOARD = 100;

const createAndRespondWithNewBoard = (id, response) => {
    const newBoard = {
        created: Date.now()
    };
    var updates = {
        ['/boards/' + id] : newBoard
    };
    admin.database().ref().update(updates);
    response.status(200).json(newBoard);
};

const updateScoreIfHigherForUserAndBoard = (score, name, id) => admin
    .database()
    .ref('/boards/' + id + '/scores/' + name)
    .once('value')
    .then((snapshot) => {
        if (!snapshot.val() || snapshot.val() < score) {
            return setScoreForUserAndBoard(score, name, id);
        }
        return Promise.resolve();
    });

const setScoreForUserAndBoard = (score, user, boardid) => admin
    .database()
    .ref('/boards/' + boardid + '/scores')
    .update({ [user]: score });

const resetScoreForBoard = (boardid) => admin.database().ref('/boards/' + boardid).update({ scores: null });

const resetHighscore = (req, res) => {
    const { id } = req.query;
    resetScoreForBoard(id)
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(() => {
            res.status(500).send('Unspecified Error');
        });
};

const removeHighscore = (req, res) => {
    const { name, id } = req.query;
    setScoreForUserAndBoard(null, name, id)
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(() => {
            res.status(500).send('Unspecified Error');
        });
};

const addHighscore = (req, res) => {
    const { score, name, id } = req.query;
    return cors(req, res, () => {
        updateScoreIfHigherForUserAndBoard(parseFloat(score), name, id)
            .then(() => {
                res.status(200).send('OK');
            })
            .catch(() => {
                res.status(500).send('Unspecified Error');
            });
    });
};


const fetchScoreboardWithKey = (request, response) => {
    const id = (request.query || {}).id;
    if (!id) response.status(404).send('No Board Specified');

    const thisBoardRef = admin.database().ref('/boards/' + id);
    thisBoardRef.once('value').then(function(snapshot) {
        return cors(request, response, () => {
            const currentBoard = snapshot.val();
            if (currentBoard !== null) {
                response.status(200).json(currentBoard);
                return;
            }
    
            if (id.length !== 36) {
                response.status(404).send('Board Not Found');
                return;
            }
    
            createAndRespondWithNewBoard(id, response);
        });
    })
    .catch(function(e) {
        response.status(500).send(e.message);
    });
};

const exportJson = (req, res) => {
    const id = (req.query || {}).id;
    if (!id) res.status(404).send('No Board Specified');

    const thisBoardRef = admin.database().ref('/boards/' + id + '/scores');
    thisBoardRef.once('value').then(function(snapshot) {
        return cors(req, res, () => {
            const currentBoard = snapshot.val();
            if (!currentBoard) {
                res.status(200).json([]);
                return;
            }
            const scores = Object.keys(currentBoard).map(name => ({ name, score: currentBoard[name]}));
            scores.sort((a, b) => b.score - a.score);
            const rawScoreArray = scores.map(o => o.score);
            const uniqueScores = rawScoreArray.filter((x, i) => rawScoreArray.indexOf(x) === i);
            const exportableBoard = scores.map(o => ({ ...o, rank: uniqueScores.indexOf(o.score) + 1 }));

            res.status(200).json(exportableBoard);
        });
    })
    .catch(function(e) {
        res.status(500).send(e.message);
    });
};

const exportXml = (req, res) => {
    const id = (req.query || {}).id;
    if (!id) res.status(404).send('No Board Specified');

    const thisBoardRef = admin.database().ref('/boards/' + id + '/scores');
    thisBoardRef.once('value').then(function(snapshot) {
        return cors(req, res, () => {
            const currentBoard = snapshot.val();
            if (!currentBoard) {
                const xmlBoard = jsonXml({ highscores: [] }, { xmlHeader: true });
                res.header('Content-Type','text/xml').status(200).send(xmlBoard);
                return;
            }
            const scores = Object.keys(currentBoard).map(name => ({ name, score: currentBoard[name]}));
            scores.sort((a, b) => b.score - a.score);
            const rawScoreArray = scores.map(o => o.score);
            const uniqueScores = rawScoreArray.filter((x, i) => rawScoreArray.indexOf(x) === i);
            const exportableBoard = scores.map(o => ({ ...o, rank: uniqueScores.indexOf(o.score) + 1 }));
            const xmlMappedBoard = exportableBoard.map(o => ({ name: 'player', attrs: { ...o } }));
            const xmlBoard = jsonXml({ highscores: xmlMappedBoard }, { xmlHeader: true });
            res.header('Content-Type','text/xml').status(200).send(xmlBoard);
        });
    })
    .catch(function(e) {
        res.status(500).send(e.message);
    });
};

const convertFirebaseScoreboardToArray = (fullBoard) => Object.keys(fullBoard.val()).map(name => ({ name, score: fullBoard.val()[name] }));

exports.pruneScoreboardOnCreate = functions.database.ref('/boards/{boardid}/scores/{newplayer}')
    .onCreate((snapshot, context) => {
      const { boardid } = context.params;
      return admin.database()
        .ref('/boards/' + boardid + '/scores')
        .once('value')
        .then(convertFirebaseScoreboardToArray)
        .then((arrayBoard) => {
            functions.logger.log("Hello 1");
            if (arrayBoard.length <= MAXIMUM_PLAYERS_ON_HIGHSCORE_BOARD) {
                return Promise.resolve();
            }
            arrayBoard.sort((a, b) => b.score - a.score);
            const lastPlaceScore = arrayBoard[MAXIMUM_PLAYERS_ON_HIGHSCORE_BOARD - 1].score;
            const scoresToDrop = arrayBoard.filter(o => o.score < lastPlaceScore);

            if (scoresToDrop.length === 0) {
                return Promise.resolve();
            }

            const deleteOperations = scoresToDrop.reduce((acc, { name }) => {
                return {
                    ...acc,
                    [name]: null
                }
            }, {});

            return admin
                .database()
                .ref('/boards/' + boardid + '/scores')
                .update(deleteOperations);
        });
    });

exports.getScoreboard = functions.https.onRequest(fetchScoreboardWithKey);
exports.addHighScore = functions.https.onRequest(addHighscore);
exports.removeHighScore = functions.https.onRequest(removeHighscore);
exports.resetHighScore = functions.https.onRequest(resetHighscore);
exports.exportXml = functions.https.onRequest(exportXml);
exports.exportJson = functions.https.onRequest(exportJson);
