declare const Logger: {
    logWarning(moduleName: string, message: string): void;
    logInfo(moduleName: string, message: string): void;
    logError(moduleName: string, message: string): void;
};
export default Logger;
