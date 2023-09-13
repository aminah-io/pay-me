"use client";
import { WagmiConfig, createConfig, configureChains, sepolia } from "wagmi";
import { publicProvider } from "@wagmi/core/providers/public";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const { chains } = configureChains([sepolia], [publicProvider()])

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: "demo",
    chains,

    // Required
    appName: "PayMe dApp",

    // Optional
    appDescription: "An app for people to get paid",
    appUrl: "https://family.co", // your app"s url
    appIcon: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <ConnectKitProvider mode="dark">
          <body>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "105vh" }}>
              <div style={{flexGrow: 1}}>{children}</div>
            </div>
          </body>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  );
}
