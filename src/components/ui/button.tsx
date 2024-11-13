import { h, JSX } from 'preact';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { forwardRef } from 'preact/compat';
import { Slot as RadixSlot } from '@radix-ui/react-slot';

// Define button variants with cva
const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium shadow rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-md bg-grey hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'shadow-none hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 shadow-none hover:underline',
      },
      size: {
        default: 'h-8 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Define ButtonProps interface
export interface ButtonProps
  extends Omit<JSX.IntrinsicElements['button'], 'size'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Slot = forwardRef<HTMLButtonElement, JSX.HTMLAttributes<HTMLButtonElement>>(
  (props, ref) => (
    <RadixSlot ref={ref} {...props} /> 
  )
);

// Define Button component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
