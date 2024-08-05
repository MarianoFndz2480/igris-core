export const Public = () => {
    return function <T extends { new (...args: any[]): object }>(constructor: T) {
        return class extends constructor {
            public = true
        }
    }
}
