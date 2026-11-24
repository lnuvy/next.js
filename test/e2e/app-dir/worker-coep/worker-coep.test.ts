import { nextTestSetup } from 'e2e-utils'
import { retry } from 'next-test-utils'

describe('worker-coep', () => {
  const { next } = nextTestSetup({
    files: __dirname,
    // The header is set by the Next.js server, which does not serve
    // `/_next/static` on deployments.
    skipDeployment: true,
  })

  it('should load a web worker on a page with COEP: require-corp', async () => {
    const browser = await next.browser('/')

    await retry(async () => {
      expect(await browser.elementByCss('#worker-state').text()).toBe('hello')
    })
  })
})
