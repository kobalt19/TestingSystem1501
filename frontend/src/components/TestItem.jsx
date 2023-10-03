import React from 'react';


const TestItem = ({name, time}) =>
{
    return (
        <div className="TestItem">
            <p style={{fontWeight: 'bold', textAlign: 'left'}}>Тест по теме: {name}</p>
            <p style={{textAlign: 'right'}}>Время выполнения: {time}</p>
        </div>
    )
}

export default TestItem;
