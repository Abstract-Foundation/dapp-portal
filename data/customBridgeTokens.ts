export type CustomBridgeToken = {
  chainId: number;
  l1Address: string;
  l2Address: string;
  symbol: string;
  bridgedSymbol: string;
  decimals: number;
  name?: string;
  bridgingDisabled?: true;
  hideAlertMessage?: true;
  learnMoreUrl?: string;
  l1BridgeAddress?: string;
  l2BridgeAddress?: string;
  bridges: {
    label: string;
    iconUrl: string;
    depositUrl?: string;
    withdrawUrl?: string;
  }[];
};

export const customBridgeTokens: CustomBridgeToken[] = [
  {
    chainId: 1,
    l1Address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    l2Address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    bridges: [
      {
        label: "Stargate",
        iconUrl: "/img/stargate.svg",
        depositUrl:
          "https://stargate.finance/bridge?srcChain=ethereum&srcToken=0xdAC17F958D2ee523a2206206994597C13D831ec7&dstChain=abstract&dstToken=0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
        withdrawUrl:
          "https://stargate.finance/bridge?srcChain=abstract&srcToken=0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4&dstChain=ethereum&dstToken=0xdAC17F958D2ee523a2206206994597C13D831ec7",
      },
      {
        label: "Jumper",
        iconUrl: "/img/jumper.svg",
        depositUrl:
          "https://jumper.exchange/?fromChain=1&fromToken=0xdAC17F958D2ee523a2206206994597C13D831ec7&toChain=2741&toToken=0x703b52F2b28fEbcB60E1372858AF5b18849FE867",
        withdrawUrl:
          "https://jumper.exchange/?fromChain=2741&fromToken=0x703b52F2b28fEbcB60E1372858AF5b18849FE867&toChain=1&toToken=0xdAC17F958D2ee523a2206206994597C13D831ec7",
      },
    ],
    symbol: "USDT",
    bridgedSymbol: "USDT",
    name: "Tether",
    bridgingDisabled: true,
  },
  {
    chainId: 1,
    l1Address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    l2Address: "0x703b52F2b28fEbcB60E1372858AF5b18849FE867",
    bridges: [
      {
        label: "Stargate",
        iconUrl: "/img/stargate.svg",
        depositUrl:
          "https://stargate.finance/bridge?srcChain=ethereum&srcToken=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&dstChain=abstract&dstToken=0x84A71ccD554Cc1b02749b35d22F684CC8ec987e1",
        withdrawUrl:
          "https://stargate.finance/bridge?srcChain=abstract&srcToken=0x84A71ccD554Cc1b02749b35d22F684CC8ec987e1&dstChain=ethereum&dstToken=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
      {
        label: "Jumper",
        iconUrl: "/img/jumper.svg",
        depositUrl:
          "https://jumper.exchange/?fromChain=1&fromToken=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB4&toChain=2741&toToken=0x84A71ccD554Cc1b02749b35d22F684CC8ec987e1",
        withdrawUrl:
          "https://jumper.exchange/?fromChain=2741&fromToken=0x84A71ccD554Cc1b02749b35d22F684CC8ec987e1&toChain=1&toToken0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB4",
      },
    ],
    symbol: "USDC",
    bridgedSymbol: "USDC.e",
    name: "USD Coin",
    bridgingDisabled: true,
  },
];
