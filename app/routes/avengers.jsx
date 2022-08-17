import { Outlet } from '@remix-run/react';

export default function Index() {
    return (
        <main className="container mx-auto">
            <h1>Hello from avengers route!</h1>
            <Outlet />
        </main>
    )
}