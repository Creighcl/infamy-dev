import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from './loading';

const HighScoreDisplay = () => {
    const id = new URLSearchParams(useLocation().search).get('id');
    const [scores, setScores] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setScores(undefined);
        fetch(`https://us-central1-infamy-dev.cloudfunctions.net/exportJson?id=${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                res.text().then(setError);
                return undefined;
            })
            .then((board) => {
                setScores(board);
            })
            .catch((e) => {
                setError(e.message);
            });

    }, [id]);

    if (error) return (<div>{ error }</div>);

    if (!scores) return (<Loading />);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        scores.map(({ name, score, rank }) => (<tr key={ name }>
                                <td>{ rank }</td>
                                <td>{ name }</td>
                                <td>{ score }</td>
                            </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default HighScoreDisplay;
