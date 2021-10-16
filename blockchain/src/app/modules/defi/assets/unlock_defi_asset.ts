import { BaseAsset, ApplyAssetContext, ValidateAssetContext } from 'lisk-sdk';
import { Asset, DefiAccount} from './types';

export class UnlockDefiAsset extends BaseAsset {
	public name = 'unlockDefi';
  public id = 1;

  // Define schema for asset
  public schema = {
    $id: 'defi/createDefi-asset',
		title: 'CreateDefiAsset transaction asset for defi module',
		type: 'object',
		required: ['recipientAddress' ],
		properties: {
			recipientAddress: {
				dataType: 'bytes',
				fieldNumber: 2,
				minLength: 20,
				maxLength: 20,
			},
		},
	};


	public async apply({ reducerHandler,transaction, stateStore }: ApplyAssetContext<Asset>): Promise<void> {
		const recipient = await stateStore.account.getOrDefault<DefiAccount>(transaction.senderAddress);
		if (stateStore.chain.lastBlockHeaders[0].height >= recipient.defi.end)
		{

			if ((recipient.defi.end - recipient.defi.start)>=10){
			await reducerHandler.invoke("token:credit", {address: transaction.senderAddress, amount: (recipient.defi.locked * BigInt(105))/BigInt(100)})
			recipient.defi.start = 0;
			recipient.defi.end = 0;
		} else 
			{
			await reducerHandler.invoke("token:credit", {address: transaction.senderAddress, amount: (recipient.defi.locked)})
			recipient.defi.start = 0;
			recipient.defi.end = 0;	
		}



			recipient.defi.locked = BigInt(0);
			await stateStore.account.set(recipient.address, recipient);

		} else {
			throw new Error(
				`You must wait until block ${recipient.defi.end} will be reached`,
			);
		}
	}
}