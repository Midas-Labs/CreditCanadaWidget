// import { FC, memo } from 'preact/compat'
// import ReactMarkdown from 'preact-markdown'

// interface ExtendedOptions {
//     children?: React.ReactNode;
//     className?: string;
// }

// export const MemoizedReactMarkdown: FC<ExtendedOptions> = memo(
//     ReactMarkdown,
//     (prevProps: ExtendedOptions, nextProps: ExtendedOptions) =>
//       prevProps.children === nextProps.children &&
//       prevProps.className === nextProps.className
//   )



//CHANGED
// import { FC, memo } from 'preact/compat';
// import ReactMarkdown from 'preact-markdown';

// interface ExtendedOptions {
//   children?: string;
//   className?: string;
//   remarkPlugins?: any[];
//   components?: Record<string, any>;
// }

// export const MemoizedReactMarkdown: FC<ExtendedOptions> = memo(
//   ReactMarkdown,
//   (prevProps: ExtendedOptions, nextProps: ExtendedOptions) =>
//     prevProps.children === nextProps.children &&
//     prevProps.className === nextProps.className &&
//     prevProps.remarkPlugins === nextProps.remarkPlugins &&
//     prevProps.components === nextProps.components
// );


import {h} from 'preact'
import { FC, memo } from 'preact/compat'
import ReactMarkdown from 'preact-markdown'

interface ExtendedOptions {
  markdown?: string
  className?: string
  remarkPlugins?: any[]
  components?: Record<string, any>
}

export const MemoizedReactMarkdown: FC<ExtendedOptions> = memo(
  (props) => <ReactMarkdown {...props} />,
  (prevProps: ExtendedOptions, nextProps: ExtendedOptions) =>
    prevProps.markdown === nextProps.markdown &&
    prevProps.className === nextProps.className &&
    prevProps.remarkPlugins === nextProps.remarkPlugins &&
    prevProps.components === nextProps.components
)
