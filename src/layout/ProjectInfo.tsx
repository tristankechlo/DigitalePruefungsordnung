import { Alert, Button, Checkbox, Flex, Modal, Text, Title, UnstyledButton } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import ExternalLink from '../components/ExternalLink';
import classes from './style.module.css';

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
    }, [open, hideDisclaimer]);

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
                <Modal.Content aria-label='Informationen über dieses Projekt'>
                    <Modal.Header>
                        <Title order={3}>Über dieses Projekt</Title>
                        <Modal.CloseButton title='Info schließen' aria-label='Info schließen' />
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant='light' icon={<IconInfoCircle />} classNames={{ icon: classes.alertIcon }}>
                            <Text>Dies ist <b>kein</b> offizielles Projekt der DLRG (Deutsche Lebens-Rettungs-Gesellschaft)!</Text>
                            <Flex direction='row' align='center' wrap='wrap'>
                                <Text>Offizielle Seite der DLRG:</Text>
                                <ExternalLink text='www.dlrg.de' href='https://www.dlrg.de' />
                            </Flex>
                        </Alert>
                        <Alert mt='md' variant='light' icon={<IconInfoCircle />} classNames={{ icon: classes.alertIcon }}>
                            <Text>Jegliche Inhalte, die zum Anzeigen der Qualifikationen genutzt werden, stammen aus der öffentlichen API der DLRG.</Text>
                            <Flex direction='row' align='center' wrap='wrap'>
                                <Text>Link zur API:</Text>
                                <ExternalLink text='api.dlrg.net' href='https://api.dlrg.net/?urls.primaryName=Digitale%20Pr%C3%BCfungsordnung' />
                            </Flex>
                            <Text mt='sm'>Bei fehlenden Informationen oder inhaltlichen Fehlern ist es wahrscheinlich, dass die Daten dort nicht korrekt eingepflegt worden sind.</Text>
                        </Alert>
                        <Checkbox mt='md' checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} label="Nicht erneut anzeigen" />
                        <Button fullWidth mt='md' onClick={closeModal}>Schließen</Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
            <UnstyledButton onClick={openModal} classNames={{ root: classes.openButton }}>Über dieses Projekt</UnstyledButton>
        </>
    );
}
