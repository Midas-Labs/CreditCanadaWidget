import * as React from 'preact'
import { forwardRef } from 'preact/compat'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '../../lib/utils'

//CHANGED
const Separator = forwardRef<
  HTMLDivElement,
  { className?: string; orientation?: 'horizontal' | 'vertical'; decorative?: boolean } & JSX.IntrinsicAttributes
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = 'Separator'

export { Separator }
