const verifyRequiredKeys = (key: string[], obj: { [k: string]: any }) => {
    const arr = key.map((item) => obj.hasOwnProperty(item));
    return !arr.some((item) => !item);
}

export default verifyRequiredKeys;
