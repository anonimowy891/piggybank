import { UnlockDefiAsset } from '../../../../../src/app/modules/defi/assets/unlock_defi_asset';

describe('UnlockDefiAsset', () => {
  let transactionAsset: UnlockDefiAsset;

	beforeEach(() => {
		transactionAsset = new UnlockDefiAsset();
	});

	describe('constructor', () => {
		it('should have valid id', () => {
			expect(transactionAsset.id).toEqual(1);
		});

		it('should have valid name', () => {
			expect(transactionAsset.name).toEqual('unlockDefi');
		});

		it('should have valid schema', () => {
			expect(transactionAsset.schema).toMatchSnapshot();
		});
	});

	describe('validate', () => {
		describe('schema validation', () => {
      it.todo('should throw errors for invalid schema');
      it.todo('should be ok for valid schema');
    });
	});

	describe('apply', () => {
    describe('valid cases', () => {
      it.todo('should update the state store');
    });

    describe('invalid cases', () => {
      it.todo('should throw error');
    });
	});
});
