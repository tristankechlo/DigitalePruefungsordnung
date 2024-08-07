import { Group, UnstyledButton, ScrollArea, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import classes from './style.module.css';
import { Suspense, useEffect } from "react";
import { useResizing } from "../types/use-resizing";
import Loading from "./Loading";


export default function PageLayout() {

    const [opened, { toggle, close }] = useDisclosure(false);

    // check whether or not the window is currently being resized, disables navigation animations
    const resizing = useResizing({ transitionDuration: 200 });

    // close the navbar when navigating to a new page, and not when clicking on the nav-item
    const location = useLocation();
    useEffect(() => close(), [location, close]);

    return (
        <div className={classes.appshell}>
            <header className={classes.header}>
                <Group h="100%" px="md" justify='space-between'>
                    <UnstyledButton component={NavLink} to="/" title="Home">
                        <Title c='#ffed00' size='1em'>Digitale Prüfungsordnung</Title>
                        {/* <Image height={40} src="https://api.dlrg.net/logo/v1/stammverband/svg?size=144&line1=Digitale&line2=Pr%C3%BCfungsordnung&farbe=vollfarbe&stacked=false" alt="Logo" /> */}
                    </UnstyledButton>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" color='white' />
                </Group>
            </header>
            <nav className={classes.nav} data-opened={opened} data-resizing={resizing}>
                <Navigation />
            </nav>
            <main className={classes.main}>
                <ScrollArea.Autosize type='hover' h='100%'>
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </ScrollArea.Autosize>
            </main>
        </div>
    );
}