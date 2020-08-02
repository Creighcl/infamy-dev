import React, { useState } from 'react';
import {
    useHistory
} from 'react-router-dom';
import { v1 as uuid } from 'uuid';

const LookupBoardButton = () => {
    const [lookupValue, setLookupValue] = useState('');
    const history = useHistory();

    const generateRandomKey = () => setLookupValue(uuid());
    const clearInput = () => setLookupValue("");

    const handleLookupValueChange = ({ target: { value } }) =>
        setLookupValue(value.replace(/[^a-zA-Z0-9/-]+/, ""));
    const handleLookupButtonClick = () => {
        if (lookupValue) {
            history.push(`/highscore/${lookupValue}`)
        }
    };

    return (
        <div className="sidebar-box">
            <input
                className="front-input"
                type="text"
                onChange={ handleLookupValueChange }
                placeholder="your scoreboard key"
                value={ lookupValue }
                size="38"
            />
            { lookupValue && (<span
                className='x-undo-field'
                onClick={ clearInput }
            >
                x
            </span>)}
            <br />
            <button
                className="front-button"
                onClick={ generateRandomKey }
            >
                RANDOM
            </button>
            <button
                className="front-button"
                onClick={ handleLookupButtonClick }
            >
                LOOKUP OR CREATE KEY
            </button>
        </div>
    );
};


export default LookupBoardButton;
