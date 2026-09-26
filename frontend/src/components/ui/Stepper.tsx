import React from "react";
import { Check } from "lucide-react";

export interface StepItem {
  id: string | number;
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
  orientation?: "horizontal" | "vertical";
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
}) => {
  return (
    <nav
      aria-label="Progress Stepper"
      style={{
        display: "flex",
        flexDirection: orientation === "horizontal" ? "row" : "column",
        gap: orientation === "horizontal" ? "var(--space-2)" : "var(--space-4)",
        width: "100%",
      }}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div
            key={step.id}
            style={{
              display: "flex",
              flexDirection: orientation === "horizontal" ? "column" : "row",
              alignItems: orientation === "horizontal" ? "center" : "flex-start",
              flex: 1,
              position: "relative",
              cursor: onStepClick ? "pointer" : "default",
            }}
            onClick={() => onStepClick?.(index)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                width: orientation === "horizontal" ? "100%" : "auto",
              }}
            >
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "var(--radius-full)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--weight-bold)",
                  backgroundColor: isCompleted
                    ? "var(--color-success-500)"
                    : isCurrent
                    ? "var(--color-primary-600)"
                    : "var(--color-neutral-200)",
                  color: isCompleted || isCurrent ? "#ffffff" : "var(--color-text-secondary)",
                  zIndex: 2,
                  flexShrink: 0,
                  transition: "all var(--duration-fast)",
                }}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : index + 1}
              </div>

              {orientation === "horizontal" && index < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    backgroundColor: isCompleted ? "var(--color-success-500)" : "var(--color-neutral-200)",
                    margin: "0 var(--space-2)",
                  }}
                />
              )}
            </div>

            <div
              style={{
                marginTop: orientation === "horizontal" ? "var(--space-2)" : 0,
                marginLeft: orientation === "vertical" ? "var(--space-3)" : 0,
                textAlign: orientation === "horizontal" ? "center" : "left",
              }}
            >
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: isCurrent ? "var(--weight-bold)" : "var(--weight-medium)",
                  color: isCurrent ? "var(--color-primary-600)" : "var(--color-text)",
                }}
              >
                {step.title}
              </div>
              {step.description && (
                <div style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)" }}>
                  {step.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
};
