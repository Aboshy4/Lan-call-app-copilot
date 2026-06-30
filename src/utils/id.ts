export const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
export const makeSessionCode = () => Math.floor(100000 + Math.random() * 900000).toString();
