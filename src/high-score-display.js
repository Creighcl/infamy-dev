import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Loading from './loading';

const HighScoreDisplay = () => {
    let id = new URLSearchParams(useLocation().search).get('id');
    const [scores, setScores] = useState();
    const [error, setError] = useState();
    id = id.replace(/[^a-zA-Z0-9/-]+/, "");

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
                if (JSON.stringify(board) === '{}') {
                    throw new Error({ message: 'no scores' });
                }
                setScores(board);
            })
            .catch((e) => {
                setError(e.message);
            });

    }, [id]);

    if (error) return (<div>No Scores Submitted</div>);

    if (!scores) return (<Loading />);

    return (
        <div>
            <div className="banner-cell" colSpan="3">
                <div className="rank-banner-cell">
                    #1
                </div>
                <div className="name-banner-cell">
                    { scores[0].name }
                </div>
                <div className="score-banner-cell">
                    <NumberFormat
                        value={ scores[0].score }
                        displayType={'text'}
                        thousandSeparator={true}
                    />
                </div>
            </div>
            <table className="high-score-table">
                <tbody>
                    {
                        scores.slice(1).map(({ name, score, rank }, index) => (<tr className={ index % 2 ? '' : 'odd-row-decoration' } key={ name }>
                                <td style={ { width: '25vw', textAlign: 'center', fontFamily: 'Open Sans', fontWeight: 400, padding: '.5rem 0' } }>{ rank }</td>
                                <td style={ { width: '25vw', fontFamily: 'Recursive', fontWeight: 900, padding: '.5rem 0' } }>{ name }</td>
                                <td style={ { width: '25vw', textAlign: 'center', fontFamily: 'Open Sans', fontWeight: 500, padding: '.5rem 0' } }>
                                    <NumberFormat
                                        value={ score }
                                        displayType={'text'}
                                        thousandSeparator={true}
                                    />
                                </td>
                            </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default HighScoreDisplay;
