import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetch from 'node-fetch';
import Loading from './loading';

const HighScoreBoard = () => {
    const { id } = useParams();
    const [board, setBoard] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setBoard(undefined);
        fetch(`https://us-central1-infamy-dev.cloudfunctions.net/getScoreboard?id=${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                res.text().then(setError);
                return undefined;
            })
            .then((board) => {
                setBoard(board);
            })
            .catch((e) => {
                setError(e.message);
            });
    }, [id]);

    if (error) {
        return (<div>{ error }</div>);
    }

    if (!board) {
        return (<Loading />)
    }

    return (
        <div>
            <h2>HIGH SCORE!</h2>
            <div>
                <div>Board ID: <b>{ id }</b></div>
                <div>Created: <b>{ board.created || 'hmmm?' }</b></div>
                <hr />
                <h3>Get High Scores</h3>
                <div>
                    View Web Scoreboard<br />
                    <b>
                        { `infamy.dev/highscore/web?id=${id}` }
                    </b>
                </div>
                <div>
                    Fetch XML Scoreboard (top 100)<br />
                    <b>
                        { `infamy.dev/highscore/xml?id=${id}` }
                    </b>
                </div>
                <div>
                    Fetch JSON Scoreboard (top 100)<br />
                    <b>
                        { `infamy.dev/highscore/json?id=${id}` }
                    </b>
                </div>
                <h3>Update Scoreboard</h3>
                <div>
                    Add a Score for Mario of 100 points<br />
                    <b>
                        { `infamy.dev/highscore/add?id=${id}&name=Mario&score=100` }
                    </b>
                </div>
                <div>
                    Remove Mario from the Scoreboard<br />
                    <b>
                        { `infamy.dev/highscore/remove?id=${id}&name=Mario` }
                    </b>
                </div>
                <div>
                    Reset the Scoreboard<br />
                    <b>
                        { `infamy.dev/highscore/reset?id=${id}` }
                    </b>
                </div>
            </div>
        </div>
    );
};

export default HighScoreBoard;
