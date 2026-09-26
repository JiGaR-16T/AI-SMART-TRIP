import React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export const Accordion = RadixAccordion.Root;

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Item> {}

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  AccordionItemProps
>(({ className = "", style, ...props }, ref) => (
  <RadixAccordion.Item
    ref={ref}
    className={className}
    style={{
      borderBottom: "1px solid var(--color-border)",
      ...style,
    }}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger> {}

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  AccordionTriggerProps
>(({ children, className = "", style, ...props }, ref) => (
  <RadixAccordion.Header style={{ display: "flex", margin: 0 }}>
    <RadixAccordion.Trigger
      ref={ref}
      className={className}
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-4) 0",
        fontSize: "var(--text-base)",
        fontWeight: "var(--weight-semibold)",
        color: "var(--color-text)",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        ...style,
      }}
      {...props}
    >
      {children}
      <ChevronDown
        size={18}
        className="accordion-chevron"
        style={{
          transition: "transform var(--duration-normal) var(--ease-default)",
          color: "var(--color-text-secondary)",
        }}
      />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Content> {}

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  AccordionContentProps
>(({ children, className = "", style, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={className}
    style={{
      overflow: "hidden",
      paddingBottom: "var(--space-4)",
      fontSize: "var(--text-sm)",
      color: "var(--color-text-secondary)",
      lineHeight: "var(--leading-relaxed)",
      ...style,
    }}
    {...props}
  >
    {children}
  </RadixAccordion.Content>
));
AccordionContent.displayName = "AccordionContent";
