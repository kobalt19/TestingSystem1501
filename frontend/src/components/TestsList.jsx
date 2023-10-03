import React from 'react';
import TestItem from './TestItem.jsx';


const TestsList = ({tests}) =>
{
    return (
        <div className="TestsList">
            {
                tests.map((test) =>
                {
                    <TestItem name={test.name} time={test.time}/>
                })
            }
        </div>
    )
}


export default TestsList;
