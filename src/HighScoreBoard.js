import React from 'react';
import { useParams } from 'react-router-dom';

const HighScoreBoard = () => {
    let { id } = useParams();
    id = id.replace(/[^a-zA-Z0-9/-]+/, "");
    return (
        <div>
            <h2 className="scoreboard-tips-title">
                Scoreboard&nbsp;
                <span className="id-highlight" title="Scoreboard Key">
                    { id }
                </span>
            </h2>
            <div className="scoreboard-tips-content">
                <div className="scoreboard-tips-subtitle">
                    Use the following URL patterns to interact with your scoreboard:
                </div>

                <div className="url-pattern-container">
                    <div className="url-pattern-set">
                        <div>
                            <div className="url-box-title">
                                View Web Scoreboard
                                <div className="svg-icon">
                                    <a
                                        href={`/highscore/web?id=${id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                                            <g><g><path d="M485,379.5l130.6,130.6l245.8-245.8l126.9,126.9l0.2-379L607.1,10l123.8,123.7L485,379.5L485,379.5z M986.4,546.3l-94.1-95.4l1.7,441.3l-784.7,0.4l0.8-782.7l438.9-2l-98-98H108C53.9,10,10,54,10,108v784c0,54.1,43.9,98,98,98h784c54.1,0,98-43.9,98-98L986.4,546.3z"/></g></g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="url-box">
                                infamy.dev/highscore/web?id=
                                <span className="id-highlight" title="Scoreboard Key">
                                    { id }
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="url-box-title">
                                Fetch XML Scoreboard (top 100)
                                <div className="svg-icon">
                                    <a
                                        href={`https://infamy.dev/highscore/xml?id=${id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                                            <g><g><path d="M485,379.5l130.6,130.6l245.8-245.8l126.9,126.9l0.2-379L607.1,10l123.8,123.7L485,379.5L485,379.5z M986.4,546.3l-94.1-95.4l1.7,441.3l-784.7,0.4l0.8-782.7l438.9-2l-98-98H108C53.9,10,10,54,10,108v784c0,54.1,43.9,98,98,98h784c54.1,0,98-43.9,98-98L986.4,546.3z"/></g></g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="url-box">
                                infamy.dev/highscore/xml?id=
                                <span className="id-highlight" title="Scoreboard Key">
                                    { id }
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="url-box-title">
                                Fetch JSON Scoreboard (top 100)
                                <div className="svg-icon">
                                    <a
                                        href={`https://infamy.dev/highscore/json?id=${id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                                            <g><g><path d="M485,379.5l130.6,130.6l245.8-245.8l126.9,126.9l0.2-379L607.1,10l123.8,123.7L485,379.5L485,379.5z M986.4,546.3l-94.1-95.4l1.7,441.3l-784.7,0.4l0.8-782.7l438.9-2l-98-98H108C53.9,10,10,54,10,108v784c0,54.1,43.9,98,98,98h784c54.1,0,98-43.9,98-98L986.4,546.3z"/></g></g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="url-box">
                                infamy.dev/highscore/json?id=
                                <span className="id-highlight" title="Scoreboard Key">
                                    { id }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="url-pattern-spacer" />
                    <div className="url-pattern-set">
                        <div>
                            <div className="url-box-title">
                                Add a Score for Mario of 100 points<br />
                            </div>
                            <div className="url-box">
                                infamy.dev/highscore/add?id=
                                <span className="id-highlight" title="Scoreboard Key">
                                    { id }
                                </span>
                                { "&name=Mario&score=100" }
                            </div>
                        </div>
                        <div>
                            <div className="url-box-title">
                                Remove Mario from the Scoreboard
                            </div>
                            <div className="url-box">
                                infamy.dev/highscore/remove?id=
                                <span className="id-highlight" title="Scoreboard Key">
                                    { id }
                                </span>
                                { "&name=Mario" }
                            </div>
                        </div>
                        <div>
                            <div className="url-box-title">
                                Reset the scoreboard
                            </div>
                            <div className="url-box">
                                infamy.dev/highscore/reset?id=
                                <span className="id-highlight" title="Scoreboard Key">
                                    { id }
                                </span>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HighScoreBoard;
