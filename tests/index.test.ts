import { runTest } from '../src/index'

describe('runTest function', () => {
  console.error = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should execute the function without error', async () => {
    const mockFn = jest.fn()
    await runTest(mockFn)
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(console.error).not.toHaveBeenCalled()
  })

  test('should catch TypeError and log it', async () => {
    const mockFn = jest.fn(() => {
      throw new TypeError('Test error')
    })
    await runTest(mockFn)
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(expect.any(TypeError))
  })

  test('should work with async functions', async () => {
    const mockAsyncFn = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })
    await runTest(mockAsyncFn)
    expect(mockAsyncFn).toHaveBeenCalledTimes(1)
    expect(console.error).not.toHaveBeenCalled()
  })

  test('should catch TypeError from async functions', async () => {
    const mockAsyncFn = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      throw new TypeError('Async TypeError')
    })
    await runTest(mockAsyncFn)
    expect(mockAsyncFn).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(expect.any(TypeError))
  })
})
