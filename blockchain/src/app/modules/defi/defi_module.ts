/* eslint-disable class-methods-use-this */

import {
    AfterBlockApplyContext,
    AfterGenesisBlockApplyContext, BaseModule,
    BeforeBlockApplyContext, StateStore,

    TransactionApplyContext
} from 'lisk-sdk';
import { CreateDefiAsset } from './assets/create_defi_asset';
import { UnlockDefiAsset } from "./assets/unlock_defi_asset";

export class DefiModule extends BaseModule {
    public actions = {
        // Example below
        // getlocked: async (params) => this._dataAccess.account.get(params.address).defi.locked,
        // getBlockByID: async (params) => this._dataAccess.blocks.get(params.id),
    };
    public id = 1000;
    public name = 'defi';
    public events = [
        // Example below
        // 'defi:newBlock',
    ];
    public transactionAssets = [new CreateDefiAsset, new UnlockDefiAsset()];
    public accountSchema = {
		type: 'object',
		properties: {
            locked: {
                fieldNumber: 1,
				dataType: 'uint64',
            },
            start: {
                fieldNumber: 2,
				dataType: 'uint32',
            },
            end: {
                fieldNumber: 3,
				dataType: 'uint32',
            },
		},
		default: {
            locked: BigInt(0),
            start: 0,
            end: 0,
		},
	};


    public async beforeBlockApply(_input: BeforeBlockApplyContext) {
        // Get any data from stateStore using block info, below is an example getting a generator
        // const generatorAddress = getAddressFromPublicKey(_input.block.header.generatorPublicKey);
		// const generator = await _input.stateStore.account.get<TokenAccount>(generatorAddress);
    }

    public async afterBlockApply(_input: AfterBlockApplyContext) {
        // Get any data from stateStore using block info, below is an example getting a generator
        // const generatorAddress = getAddressFromPublicKey(_input.block.header.generatorPublicKey);
		// const generator = await _input.stateStore.account.get<TokenAccount>(generatorAddress);
    }

    public async beforeTransactionApply(_input: TransactionApplyContext) {
        // Get any data from stateStore using transaction info, below is an example
        // const sender = await _input.stateStore.account.getOrDefault<TokenAccount>(_input.transaction.senderAddress);
    }

    public async afterTransactionApply(_input: TransactionApplyContext) {
        // Get any data from stateStore using transaction info, below is an example
        // const sender = await _input.stateStore.account.getOrDefault<TokenAccount>(_input.transaction.senderAddress);
    }

    public async afterGenesisBlockApply(_input: AfterGenesisBlockApplyContext) {
        // Get any data from genesis block, for example get all genesis accounts
        // const genesisAccoounts = genesisBlock.header.asset.accounts;
    }
}
