import Top from 'pages/Top';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  safeWallet,
  metaMaskWallet,
  trustWallet,
  uniswapWallet,
} from '@rainbow-me/rainbowkit/wallets';
const projectId = 'a3b73d2039c3858bc39e1f97a15a5f08';

function App() {
  const defaultChains = [
    {
      ...polygonMumbai,
      iconUrl:
        'https://pbs.twimg.com/profile_images/1597775748580134914/bLhE1aY1_400x400.jpg',
    },
  ];

  const { chains, publicClient } = configureChains(defaultChains, [
    publicProvider(),
  ]);

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet({ chains }),
        metaMaskWallet({ projectId, chains }),
        walletConnectWallet({ projectId, chains }),
        coinbaseWallet({ chains, appName: 'TrustAuthyGame' }),
        safeWallet({
          chains: chains,
        }),
        trustWallet({ projectId, chains }),
        uniswapWallet({ projectId, chains }),
        rainbowWallet({ projectId, chains }),
      ],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        // locale=""
        modalSize="wide"
        theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        <Top />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
