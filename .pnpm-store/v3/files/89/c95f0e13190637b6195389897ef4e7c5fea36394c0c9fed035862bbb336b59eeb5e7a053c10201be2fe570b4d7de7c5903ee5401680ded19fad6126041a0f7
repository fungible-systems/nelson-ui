import { FileScope, Adapter } from '@vanilla-extract/css';
export declare type IdentifierOption = ReturnType<Adapter['getIdentOption']>;
interface ProcessVanillaFileOptions {
    source: string;
    filePath: string;
    outputCss?: boolean;
    identOption?: IdentifierOption;
    serializeVirtualCssPath?: (file: {
        fileName: string;
        base64Source: string;
        fileScope: FileScope;
    }) => string;
}
export declare function processVanillaFile({ source, filePath, outputCss, identOption, serializeVirtualCssPath, }: ProcessVanillaFileOptions): string;
export {};
