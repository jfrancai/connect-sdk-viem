import { MetaTransaction } from 'ethers-multisend'

export const isMetaTransactionArray = (
  safeTransactions: MetaTransaction | MetaTransaction[]
): safeTransactions is MetaTransaction[] => {
  return (safeTransactions as MetaTransaction[])?.length !== undefined
}

export const sleep = async (msInterval: number): Promise<void> => {
  return await new Promise((resolve) => setTimeout(resolve, msInterval))
}
