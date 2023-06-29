import React from 'react';

const History = ({ history }) => {
    return (
        <div>
            <h2>Search History</h2>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default History;
