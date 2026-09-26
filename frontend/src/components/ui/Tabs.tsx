import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

export const Tabs = RadixTabs.Root;

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof RadixTabs.List> {}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  TabsListProps
>(({ className = "", style, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={className}
    style={{
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "var(--color-bg-subtle)",
      padding: "0.25rem",
      borderRadius: "var(--radius-xl)",
      border: "1px solid var(--color-border)",
      gap: "0.25rem",
      ...style,
    }}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger> {}

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  TabsTriggerProps
>(({ className = "", style, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={className}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-2) var(--space-4)",
      borderRadius: "var(--radius-lg)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--color-text-secondary)",
      cursor: "pointer",
      border: "none",
      background: "transparent",
      outline: "none",
      transition: "all var(--duration-fast)",
      ...style,
    }}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof RadixTabs.Content> {}

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  TabsContentProps
>(({ className = "", style, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={className}
    style={{
      marginTop: "var(--space-4)",
      outline: "none",
      ...style,
    }}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
