import React from 'react';
import {
    useHistory
} from 'react-router-dom';
import { v1 as uuid } from 'uuid';

const NewBoardButton = () => {
    let history = useHistory();

    function goToNewBoardUrl() {
      history.push(`/highscore/${uuid()}`);
    }

    return (<div className="sidebar-box">
        <button onClick={ goToNewBoardUrl }>Create New Scoreboard</button>
    </div>);
};

export default NewBoardButton;
