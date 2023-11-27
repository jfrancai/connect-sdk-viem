import { deepHexlify } from '@alchemy/aa-core'
import { ComethWallet, SendTransactionResponse } from '@cometh/connect-sdk'
import { Hash } from 'viem'

import { isMetaTransactionArray } from '../utils/utils'

export type MetaTransaction = {
  readonly to: string
  readonly value: bigint
  readonly data: string
}

export const sendTransaction = async (
  wallet: ComethWallet,
  safeTxData: MetaTransaction | MetaTransaction[]
): Promise<Hash> => {
  let result: SendTransactionResponse
  const formattedTxData = deepHexlify(safeTxData)
  if (isMetaTransactionArray(formattedTxData)) {
    result = await wallet.sendBatchTransactions(formattedTxData)
  } else {
    result = await wallet.sendTransaction(formattedTxData)
  }

  return result.safeTxHash as Hash
}
