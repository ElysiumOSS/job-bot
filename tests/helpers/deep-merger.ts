export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function deepMerge<T>(target: T, src: DeepPartial<T>): T {
    for (const key in src) {
        if (!Object.prototype.hasOwnProperty.call(src, key)) continue;
        if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
        if (
            src[key] &&
            typeof src[key] === 'object' &&
            !Array.isArray(src[key]) &&
            typeof target[key] === 'object'
        ) {
            deepMerge(target[key], src[key] as any);
        } else {
            target[key] = src[key] as any;
        }
    }
    return target;
}
