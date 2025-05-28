import type { Theme } from "@clerk/types";

export const clerkAppearance: Theme = {
  layout: {
    socialButtonsPlacement: "bottom",
    logoPlacement: "inside",
    showOptionalFields: false,
    helpPageUrl: "/help",
    termsPageUrl: "/terms",
    privacyPageUrl: "/privacy",
  },
  variables: {
    colorPrimary: "#6366f1", // soft indigo
    colorBackground: "var(--clerk-color-background)",
    colorText: "var(--clerk-color-text)",
    colorInputBackground: "var(--clerk-color-input-background)",
    colorInputText: "var(--clerk-color-input-text)",
    borderRadius: "12px",
    fontSize: "16px",
    fontFamily: "'Inter', sans-serif",
    spacingUnit: "4",
  },
};
