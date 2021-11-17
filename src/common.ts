export interface Save {
    name: string;
    date: Date;
    data: Uint8Array;
    thumbnail: string;
}

export class Rom {
    constructor (
        public readonly name: string,
        public readonly buffer: Uint8Array,
        public readonly fingerprint: Uint8Array,
    ) {}

    get hex () {
        return this.fingerprint.reduce((hex, byte) => hex + byte.toString(16).padStart(2, '0'), '');
    }

    static async fromFile (file: File): Promise<Rom> {
        const buffer = new Uint8Array(await file?.arrayBuffer());
        const fingerprint = new Uint8Array(await crypto.subtle.digest('SHA-256', buffer));

        return new Rom(
            file.name,
            buffer,
            fingerprint,
        );
    }
}
