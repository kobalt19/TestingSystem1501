import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as CoreUI from '@coreui/react';


const TestsList = ({tests}) =>
{
    const navigate = useNavigate();

    const startTest = (test) =>
    {
        navigate(`/complete_test?id=${test.id}`);
    }

    return (
        <CoreUI.CCardGroup className="TestsList">
            {
                tests.map(
                    test =>
                    {
                        return (
                            <CoreUI.CRow style={{alignItems: 'center'}}>
                                <CoreUI.CCol>
                                    <CoreUI.CCard>
                                        <CoreUI.CCardBody>
                                            <CoreUI.CCardTitle>1. {test.desc}</CoreUI.CCardTitle>
                                            <br/>
                                            <CoreUI.CButton color="primary" onClick={() => startTest(test)}>Начать</CoreUI.CButton>
                                        </CoreUI.CCardBody>
                                    </CoreUI.CCard>
                                </CoreUI.CCol>
                            </CoreUI.CRow>
                        )
                    }
                )
            }
        </CoreUI.CCardGroup>
    )
};


export default TestsList;
