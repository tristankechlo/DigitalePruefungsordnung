import { Alert, Button, Checkbox, Flex, Modal, Text, Title, UnstyledButton } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import ExternalLink from '../components/ExternalLink';
import { IconInfoCircle } from '@tabler/icons-react';
import classes from './style.module.css';
import { useState } from 'react';

const STORAGE_KEY = "hide-disclaimer";
const getInitialValue = (): boolean => {
    const temp = localStorage.getItem(STORAGE_KEY);
    return temp === "true";
}

export default function ProjectInfoModal() {

    const initial = getInitialValue();
    const [disclaimerHidden, hideDisclaimer] = useLocalStorage<boolean>({ key: STORAGE_KEY, defaultValue: initial });
    const [opened, { open, close }] = useDisclosure(!initial);
    const [checked, setChecked] = useState(false);

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
                        <Alert mt='md' variant='light' icon={<IconInfoCircle />} classNames={{ icon: classes.alertIcon }}>
                            <Text>Die API kann auch Inhalte (Qualifikationen/Prüfungsinhalte,...) enthalten, die noch nicht in einer Prüfungsordnung veröffentlicht wurden.</Text>
                            <Text mt='sm'>Bitte prüfe immer die aktuelle Prüfungsordnung für eine genaue Aussage welche Vorraussetzungen zum Erreichen einer Qualifikation benötigt werden.</Text>
                        </Alert>
                        <Checkbox mt='md' checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} label="Nicht erneut anzeigen" />
                        <Button fullWidth mt='md' onClick={closeModal}>Schließen</Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
            <UnstyledButton onClick={openModal} classNames={{ root: classes.openButton }}>
                Über dieses Projekt
                <IconInfoCircle size={16} />
            </UnstyledButton>
        </>
    );
}
