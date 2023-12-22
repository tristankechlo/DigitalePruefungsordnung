import { Alert, Button, Checkbox, Flex, Modal, Text, Title, UnstyledButton } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import ExternalLink from '../components/ExternalLink';

const STORAGE_KEY = "hide-disclaimer";
const getInitialValue = (): boolean => {
    let temp = localStorage.getItem(STORAGE_KEY);
    return temp === "true";
}

export default function ProjectInfoModal() {

    const [disclaimerHidden, hideDisclaimer] = useLocalStorage<boolean>({ key: STORAGE_KEY });
    const [opened, { open, close }] = useDisclosure(disclaimerHidden);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        let initial = getInitialValue();
        // open disclaimer if it is not already accepted
        if (initial === false) { open(); }
        hideDisclaimer(initial);
        // set initial state of the checkbox
        setChecked(initial);
    }, []);

    const closeModal = () => {
        hideDisclaimer(!!checked)
        close();
    }

    const openModal = () => {
        setChecked(!!disclaimerHidden);
        open();
    }

    return (
        <>
            <Modal.Root opened={opened} onClose={closeModal} size='lg'>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header>
                        <Title order={3}>Über dieses Projekt</Title>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant='light' icon={<IconInfoCircle />}>
                            <Text>Dies ist <b>kein</b> offizielles Projekt der DLRG (Deutsche Lebens-Rettungs-Gesellschaft)!</Text>
                            <Flex direction='row' align='center'>
                                <Text>Offizielle Seite der DLRG:</Text>
                                <ExternalLink text='www.dlrg.de' href='https://www.dlrg.de' />
                            </Flex>
                        </Alert>
                        <Alert mt='md' variant='light' icon={<IconInfoCircle />}>
                            <Text>Jegliche Inhalte, die zum Anzeigen der Qualifikationen genutzt werden, stammen aus der öffentlichen API der DLRG.</Text>
                            <Flex direction='row' align='center'>
                                <Text>Link zur API:</Text>
                                <ExternalLink text='api.dlrg.net' href='https://api.dlrg.net/?urls.primaryName=Digitale%20Pr%C3%BCfungsordnung' />
                            </Flex>
                            <Text mt='sm'>Bei fehlenden Informationen oder inhaltlichen Fehlern ist es wahrscheinlich, dass dort sind die Daten nicht korrekt eingepflegt wurden.</Text>
                        </Alert>
                        <Checkbox mt='md' checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} label="Nicht erneut anzeigen" />
                        <Button fullWidth mt='md' onClick={closeModal}>Schließen</Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
            <UnstyledButton onClick={openModal}>Über dieses Projekt</UnstyledButton>
        </>
    );
}
