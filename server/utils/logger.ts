const info = <T>(...info: T[]) => {
  console.log(...info);
};

const error = <T>(...errors: T[]) => {
  console.error(...errors);
};

export default { info, error };
