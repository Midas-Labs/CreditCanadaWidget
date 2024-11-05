import { forwardRef } from 'preact/compat';
import { h, JSX } from 'preact'; // Import h and JSX from preact
import { cn } from '../../lib/utils';

export type TextareaProps = JSX.HTMLAttributes<HTMLTextAreaElement> & {
  // Add any additional props here if needed
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

export { Textarea };
