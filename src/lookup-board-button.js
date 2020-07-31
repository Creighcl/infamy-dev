import React, { useState } from 'react';
import {
    Link,
    useHistory
} from 'react-router-dom';

const LookupBoardButton = () => {
    const [lookupValue, setLookupValue] = useState('');
    const history = useHistory();

    const handleLookupValueChange = ({ target: { value } }) => setLookupValue(value);
    const handleLookupButtonClick = () => {
        history.push(`/highscore/${lookupValue}`)
    };

    return (
        <div className="sidebar-box">
            <input
                type="text"
                onChange={ handleLookupValueChange }
                placeholder="leaderboard key"
                value={ lookupValue }
            />
            <button
                onClick={ handleLookupButtonClick }
            >
                Lookup Existing Scoreboard
            </button>
            <p>
            <Link
                to={`/highscore/example`}
            >
                Check out an example scoreboard
            </Link>
            </p>
        </div>
    );
};


export default LookupBoardButton;
