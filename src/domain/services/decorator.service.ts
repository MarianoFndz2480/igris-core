export const ModelNotIncludeTenant = () => {
    return function <T extends { new (...args: any[]): object }>(constructor: T) {
        return class extends constructor {
            modelIncludeTenant = false
        }
    }
}
