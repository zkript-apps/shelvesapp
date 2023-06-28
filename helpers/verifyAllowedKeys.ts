const verifyAllowedKeys = (key: string[], obj: { [k: string]: any }) => {
  const propertyNames = Object.keys(obj);
  const arr = propertyNames.map((item) => key.includes(item));
  return !arr.some((item) => !item);
}

export default verifyAllowedKeys;
