"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '../../lib/utils';

const Tabs = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-4", className)} {...props} />
);

/**
 * `segmented` (v3 default) is a grey track whose active thumb is a white, lightly shadowed
 * pill. `underline` keeps the indigo rule for page-level tab bars.
 */
const tabsListVariants = cva("flex items-center", {
  variants: {
    variant: {
      segmented: "inline-flex w-fit gap-0 rounded-sm bg-hover p-0.5",
      underline: "gap-1 border-b border-hairline",
    },
  },
  defaultVariants: { variant: "segmented" },
});

const TabsVariantContext = React.createContext<"segmented" | "underline">("segmented");

const TabsList = ({
  className, variant, ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) => (
  <TabsVariantContext.Provider value={variant ?? "segmented"}>
    <TabsPrimitive.List data-slot="tabs-list" className={cn(tabsListVariants({ variant }), className)} {...props} />
  </TabsVariantContext.Provider>
);

const TRIGGER = {
  segmented:
    "rounded-xs px-3 py-1 text-12 font-medium text-muted transition-all duration-400 ease-[var(--ease-out)] hover:text-strong data-[state=active]:bg-card data-[state=active]:text-strong data-[state=active]:shadow-[var(--shadow-xs)]",
  underline:
    "relative -mb-px h-9 border-b-2 border-transparent px-3 text-14 font-medium text-muted transition-colors duration-400 ease-[var(--ease-out)] hover:text-strong data-[state=active]:border-accent data-[state=active]:text-strong",
} as const;

const TabsTrigger = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) => {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        TRIGGER[variant],
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

const TabsContent = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content data-slot="tabs-content" className={cn("outline-none", className)} {...props} />
);

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
