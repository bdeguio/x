import type { Theme } from "@clerk/types";

export const clerkAppearance: Theme = {
  layout: {
    socialButtonsPlacement: "bottom",
    logoPlacement: "none",
    showOptionalFields: true,
  },
  variables: {
    colorPrimary: "#000000",
    colorBackground: "#ffffff",
    colorText: "#1f2937",
    colorInputBackground: "#ffffff",
    colorInputText: "#111827",
    borderRadius: "8px",
    fontSize: "16px",
    fontFamily: "Inter, sans-serif",
    spacingUnit: "4",
  },
};
