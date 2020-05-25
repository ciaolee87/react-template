export interface BizResponse<T> {
	code: number;
	msg: string;
	body: T;
}

export interface BizReactor<T> {
	success: BizReact<T>;
	before?: () => void;
	complete?: BizReact<T>;
	default?: BizReact<T>;

	[code: number]: BizReact<T>;
}

export type BizReact<T> = (res: BizResponse<T>) => void;
