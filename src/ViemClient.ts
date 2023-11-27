import { ComethWallet } from '@cometh/connect-sdk'
import {
  Chain,
  createPublicClient,
  extractChain,
  http,
  PublicClient,
  Transport
} from 'viem'
import {
  avalanche,
  avalancheFuji,
  gnosis,
  gnosisChiado,
  polygon,
  polygonMumbai,
  polygonZkEvm,
  polygonZkEvmTestnet
} from 'viem/chains'

import { ComethWalletActions, comethWalletActions } from './customActions'
import { musterTestnet } from './customChains'

const supportedChains = [
  polygon,
  polygonMumbai,
  avalanche,
  avalancheFuji,
  gnosis,
  gnosisChiado,
  polygonZkEvm,
  polygonZkEvmTestnet,
  musterTestnet
]

export type ComethClient = PublicClient<Transport, Chain> & ComethWalletActions

export const getViemClient = async (
  wallet: ComethWallet,
  rpc?: string
): Promise<ComethClient> => {
  const chain: Chain = extractChain({
    chains: supportedChains,
    id: wallet.chainId as any
  })

  return createPublicClient({
    chain,
    transport: http(rpc)
    /* eslint-disable */
    /* @ts-ignore */
  }).extend(comethWalletActions(wallet))
}



