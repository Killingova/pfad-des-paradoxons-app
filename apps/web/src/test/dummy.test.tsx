// ─── apps/web/src/test/dummy.test.tsx ────────────────────────────────────────

import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('DummyComponent – Web', () => {
  it('should render "Hello World"', () => {
    render(<div>Hello World</div>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should render "Hello Test"', () => {
    const { container } = render(<div>Hello Test</div>)
    expect(container.textContent).toBe('Hello Test')
  })
})
