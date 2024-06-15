export function generateUniqueKey() {
    const timestamp: number = Date.now();
    const randomNum: number = Math.floor(Math.random() * 1000000);
    return `${timestamp}${randomNum}`;
}
