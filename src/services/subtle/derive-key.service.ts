const ab2base64 = (buf: ArrayBuffer) => window.btoa(String.fromCharCode.apply(null, new Uint8Array(buf) as any));

function _base64ToArrayBuffer(base64: string) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

async function deriveKey(password: string, salt: string, iterations: number, keyLength: number, digest: string) {
    const pwUtf8 = new TextEncoder().encode(password);
    const saltUtf8 = new TextEncoder().encode(salt);
    const importedKey = await window.crypto.subtle.importKey(
        'raw',
        pwUtf8,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );
    const derivedKeyArray = await window.crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: saltUtf8,
            iterations,
            hash: { name: digest }
        },
        importedKey,
        keyLength * 8
    );
    return new Uint8Array(derivedKeyArray);
}

export async function encryptDeriveAES(plaintext: string, password: string) {
    const key = await deriveKey(password, "my_salt", 100000, 32, 'SHA-256');
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const alg = { name: 'AES-CBC', iv: iv };
    const keyObject = await window.crypto.subtle.importKey('raw', key, alg, false, ['encrypt']);
    const plaintextArray = new TextEncoder().encode(plaintext);
    const encryptedArray = await window.crypto.subtle.encrypt(alg, keyObject, plaintextArray);
    return { encrypted: ab2base64(Array.from(new Uint8Array(encryptedArray)) as any), iv: ab2base64(Array.from(iv) as any) };
}

export async function decryptDeriveAES(encrypted: string, password: string, iv: string) {
    const key = await deriveKey(password, "my_salt", 100000, 32, 'SHA-256');
    const alg = { name: 'AES-CBC', iv: new Uint8Array(_base64ToArrayBuffer(iv)) };
    const keyObject = await window.crypto.subtle.importKey('raw', key, alg, false, ['decrypt']);
    const encryptedArray = new Uint8Array(_base64ToArrayBuffer(encrypted));
    const decryptedArray = await window.crypto.subtle.decrypt(alg, keyObject, encryptedArray);
    return new TextDecoder().decode(decryptedArray);
}

const test = async () => {
    const encrypted = `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`,
        password = `asdfjhkJKH@##@$`,
        iv = `eaYlCJZxHQgumxJdoxn2Zg==`
    // const { encrypted, iv } = await encryptDeriveAES(plaintext, password)
    const decrypted = await decryptDeriveAES(encrypted, password, iv)
    console.log({ encrypted, iv })
    console.log({ decrypted })
}

// test();