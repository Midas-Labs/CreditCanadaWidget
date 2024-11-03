import { FC, memo } from 'preact/compat'
import ReactMarkdown from 'preact-markdown'

interface ExtendedOptions {
    children?: React.ReactNode;
    className?: string;
}

export const MemoizedReactMarkdown: FC<ExtendedOptions> = memo(
    ReactMarkdown,
    (prevProps: ExtendedOptions, nextProps: ExtendedOptions) =>
      prevProps.children === nextProps.children &&
      prevProps.className === nextProps.className
  )


//CHANGED
//   import { FC, memo } from 'react'
//   import ReactMarkdown, { Options } from 'react-markdown'
  
//   export const MemoizedReactMarkdown: FC<Options> = memo(
//     ReactMarkdown,
//     (prevProps, nextProps) =>
//       prevProps.children === nextProps.children &&
//       prevProps.className === nextProps.className
//   )
  
  

