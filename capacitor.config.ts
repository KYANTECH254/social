import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.social.app",
  appName: "Social",
  webDir: "public", 
  server: {
    url: "https://social254.vercel.app", 
    cleartext: true,
  },
  plugins: {
    SplashScreen: { launchShowDuration: 0 },
  },
};

export default config;
