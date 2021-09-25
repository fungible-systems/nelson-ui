export declare type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string | number})`;
export declare type Contract = {
    [key: string]: CSSVarFunction | null | Contract;
};
export declare type MapLeafNodes<Obj, LeafType> = {
    [Prop in keyof Obj]: Obj[Prop] extends Record<string | number, any> ? MapLeafNodes<Obj[Prop], LeafType> : LeafType;
};
