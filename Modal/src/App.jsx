import React, {useState} from 'react';

import style from './App.pcss';
import ModalWrapper from "./components/Modal/ModalWrapper";

const App = (props) => {

    const [opened, setOpened] = useState(false);
    const [opened1, setOpened1] = useState(false);

    return (
        <div>
            <ModalWrapper
                onOpen={() => setOpened(true)}
                onClose={() => setOpened(false)}
                isOpen={opened}
                trigger={
                    <div>First Modal</div>
                }
            >
                <ModalWrapper
                    onOpen={() => setOpened1(true)}
                    onClose={() => setOpened1(false)}
                    isOpen={opened1}
                    trigger={
                        <div>Second Modal</div>
                    }
                >
                    Content of Second Modal
                </ModalWrapper>
            </ModalWrapper>
        </div>
    );
};

export default App;