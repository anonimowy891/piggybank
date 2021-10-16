import { BaseAsset, ApplyAssetContext, ValidateAssetContext  } from 'lisk-sdk';
import { Asset, DefiAccount} from './types';
export class CreateDefiAsset extends BaseAsset {

	public name = 'createDefi';
 	public id = 0;

  // Define schema for asset
	public schema = {
    $id: 'defi/createDefi-asset',
		title: 'CreateDefiAsset transaction asset for defi module',
		type: 'object',
		required: ['amount', 'recipientAddress' ],
		properties: {
			amount: {
				dataType: 'uint64',
				fieldNumber: 1,
			},
			recipientAddress: {
				dataType: 'bytes',
				fieldNumber: 2,
				minLength: 20,
				maxLength: 20,
			},
			blockedTime: {
				dataType: 'uint32',
				fieldNumber: 3,
				minLength: 0,
				maxLength: 64,
			},
		},
	};


	public async apply({ asset, reducerHandler,transaction, stateStore }: ApplyAssetContext<Asset>): Promise<void> {
		await reducerHandler.invoke("token:debit", {address: transaction.senderAddress, amount: asset.amount})
		const recipient = await stateStore.account.getOrDefault<DefiAccount>(asset.recipientAddress);
		const addr = recipient.address.toString("hex");
		const addr2 = transaction.senderAddress.toString('hex');

		if ( addr == addr2)
		{

		if (recipient.defi.locked <= BigInt(0))
		{
			if (recipient.defi.start <= 0)
			{
		    recipient.defi.start = stateStore.chain.lastBlockHeaders[0].height + 1;
			recipient.defi.end = (stateStore.chain.lastBlockHeaders[0].height + 1) + asset.blockedTime;
			}
		}
		
		if (asset.blockedTime >= 0) 
		{
			if (recipient.defi.locked > BigInt(0))
			{
				if(recipient.defi.end <= stateStore.chain.lastBlockHeaders[0].height)
				{
					recipient.defi.end = (stateStore.chain.lastBlockHeaders[0].height + 1) + asset.blockedTime;
				} else 
				{
					recipient.defi.end += asset.blockedTime;
				}
			}
		}
		    recipient.defi.locked += asset.amount;
		} else 
		{
			recipient.defi.locked += asset.amount;
		}
		if (recipient.defi.end <= 0)
			{
			recipient.defi.start = stateStore.chain.lastBlockHeaders[0].height + 1;
			recipient.defi.end = (stateStore.chain.lastBlockHeaders[0].height + 1) + asset.blockedTime;
			}
			
		
		await stateStore.account.set(recipient.address, recipient);
	}
}
