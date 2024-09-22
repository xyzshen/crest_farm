import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Crest Farm",
    description: "crest farm web3",
    icons: {
        icon: './favicon.ico',
    },
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">

            <body>
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                groupTitleFontSize: 16
                            }
                        },
                    }}
                >
                    {children}
                </ConfigProvider>
            </body>
        </html>
    );
}
