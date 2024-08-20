import { ethers } from "ethers";

const setTimeout = (
  ms: number,
  fn?: () => void
): Promise<void> & { clear: () => void } => {
  let timeoutId: NodeJS.Timeout;
  const promise = new Promise<void>((resolve) => {
    timeoutId = global.setTimeout(() => {
      fn?.();
      resolve();
    }, ms);
  }) as Promise<void> & { clear: () => void };

  promise.clear = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return promise;
};

type RetryOptions = {
  maxTry?: number;
  timeout?: number;
  retryDelay?: number;
  onRetry?: (attempt: number, error: Error) => void;
};

export const safeTryFn = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T | null> => {
  const {
    maxTry = 3,
    timeout = 5000,
    retryDelay = 3000,
    onRetry = (attempt, error) =>
      console.log(`Attempt ${attempt} failed: ${error.message}. Retrying...`),
  } = options;

  for (let attempt = 1; attempt <= maxTry; attempt++) {
    try {
      let isTimeout = false;
      const timeoutPromise = setTimeout(timeout, () => (isTimeout = true));
      const result = await Promise.race([fn(), timeoutPromise]);
      timeoutPromise.clear();
      if (isTimeout) {
        console.log(`timeout!`);
        throw new Error("timeout!");
      }
      // If the function completed successfully (even if it returned undefined or null), return the result
      return result!;
    } catch (error) {
      if (attempt < maxTry) {
        onRetry(attempt, error as Error);
        await setTimeout(retryDelay);
      } else {
        throw new Error(
          `safeTryFn ${fn.name} error. failed after ${maxTry} attempts. Last error: ${error}`
        );
      }
    }
  }

  return null; // Return null if all attempts fail
};

const isAddress = (val: string) => ethers.utils.isAddress(val);
