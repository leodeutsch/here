// @ts-check

module.exports = {
  name: "Here",
  slug: "here",
  version: "1.0.1",
  newArchEnabled: true,
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.leodeutsch.here"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: "e5b5af3d-d73e-4644-95bb-fb7319751077"
    },
    expo: {
      scheme: "myapp"
    }
  }
};
