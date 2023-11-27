import { ComethWallet } from '@cometh/connect-sdk'
import { Chain, Hash, PublicClient, TransactionReceipt, Transport } from 'viem'

import { getTransaction } from './getTransaction'
import { MetaTransaction, sendTransaction } from './sendTransaction'

export type ComethWalletActions = {
  sendTransaction: (args: MetaTransaction | MetaTransaction[]) => Promise<Hash>
  getTransaction: (args: Hash) => Promise<TransactionReceipt>
}

export const comethWalletActions = (
  wallet: ComethWallet
): ((client: PublicClient<Transport, Chain>) => ComethWalletActions) => {
  return (client) => ({
    sendTransaction: async (args) => sendTransaction(wallet, args),
    getTransaction: async (args) => getTransaction(client, wallet, args)
  })
}

export { getTransaction, sendTransaction }
