import React from 'react';
import * as CoreUI from '@coreui/react';

const TestsList = ({tests}) =>
{
    const columns = [
        {
            key: 'id',
            label: '#',
            _props: {scope: 'col'}
        },
        {
            key: 'link',
            label: 'Ссылка на тест',
            _props: {scope: 'col'}
        },
        {
            key: 'desc',
            label: 'Описание теста',
            _props: {scope: 'col'}
        }
    ];
    const items = [];
    tests.forEach(test =>
        {
            items.push(
                {
                    id: test.id,
                    link: <CoreUI.CLink href={`/test/${test.id}`}>{test.name}</CoreUI.CLink>,
                    desc: test.desc
                }
            );
        }
    )
    return (
        // <CoreUI.CListGroup className="TestsList">
        //     {tests.map(test =>
        //             <CoreUI.CListGroupItem>
        //                 <CoreUI.CCard>
        //                     <CoreUI.CRow align-items-start>
        //                         <CoreUI.CCol>
        //                             <CoreUI.CLink href={`/test/${test.id}`}>{test.name}</CoreUI.CLink>
        //                         </CoreUI.CCol>
        //                         <CoreUI.CCol>
        //                             <span>{test.desc}</span>
        //                         </CoreUI.CCol>
        //                     </CoreUI.CRow>
        //                 </CoreUI.CCard>
        //             </CoreUI.CListGroupItem>
        //         )
        //     }
        // </CoreUI.CListGroup>
        <CoreUI.CTable className="TestsList" columns={columns} items={items}/>
    )
};


export default TestsList;
