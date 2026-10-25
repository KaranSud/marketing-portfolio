import { Fraunces, Geist } from "next/font/google";

// Flow type: serif headlines (Fraunces), sans body (Geist). Shared by the home page and case pages.
export const serif = Fraunces({ subsets: ["latin"], weight: ["400", "500"], variable: "--fl-serif" });
export const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--fl-sans" });
export const flowFonts = `${serif.variable} ${sans.variable}`;
