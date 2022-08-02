export const range = (elements: number) => Array.from(Array(elements).keys());

export const random = (max: number): number =>
  Math.floor(Math.random() * max) + 1;

interface IDict {
  [key: string]: any;
}

export const toDict = (obj: object): IDict => {
  var arr = Object.entries(obj).map((e) => {
    const key = e[0];
    const value = e[1];
    return { [key]: value };
  });
  return Object.assign({}, ...arr);
};
