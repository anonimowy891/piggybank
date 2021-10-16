
export interface Asset {
	readonly amount: bigint;
	readonly recipientAddress: Buffer;
	readonly blockedTime: number;
}

export interface DefiAccount {
    token: {
		balance: bigint;
	};
	defi: {
		locked: bigint;
		start: number;
		end: number;
	};
}