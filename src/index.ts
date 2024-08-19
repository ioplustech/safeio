// TODO
type Fn = () => void | Promise<void>;
export const runTest = async (Fn: Fn) => {
  try {
    await Fn();
  } catch (err) {
    if (err instanceof TypeError) {
      console.error(err);
    }
  }
};
