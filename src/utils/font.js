import { Nunito, Nunito_Sans } from "next/font/google";

const Nunito_Sans_init = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito_sans",
});

export const nunito_sans = Nunito_Sans_init.variable;
