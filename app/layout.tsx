import "@styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient">
                        <main className="app">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
