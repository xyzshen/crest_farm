import Image from "next/image";
export default function TradingPostLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-[#f2f2f2] w-full">
            {children}
        </div>
    );
}
