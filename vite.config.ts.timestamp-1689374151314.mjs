// vite.config.ts
import { defineConfig } from "file:///Users/mingz/Documents/chathub/node_modules/vite/dist/node/index.js";
import react from "file:///Users/mingz/Documents/chathub/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx } from "file:///Users/mingz/Documents/chathub/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import tsconfigPaths from "file:///Users/mingz/Documents/chathub/node_modules/vite-tsconfig-paths/dist/index.mjs";

// manifest.config.ts
import { defineManifest } from "file:///Users/mingz/Documents/chathub/node_modules/@crxjs/vite-plugin/dist/index.mjs";
var manifest_config_default = defineManifest(async (env) => {
  return {
    manifest_version: 3,
    name: "__MSG_appName__",
    description: "__MSG_appDesc__",
    default_locale: "en",
    version: "1.26.1",
    icons: {
      "16": "src/assets/icon.png",
      "32": "src/assets/icon.png",
      "48": "src/assets/icon.png",
      "128": "src/assets/icon.png"
    },
    background: {
      service_worker: "src/background/index.ts",
      type: "module"
    },
    action: {},
    host_permissions: [
      "https://*.bing.com/",
      "https://*.openai.com/",
      "https://bard.google.com/",
      "https://*.chathub.gg/"
    ],
    optional_host_permissions: ["https://*/*"],
    permissions: ["storage", "unlimitedStorage", "sidePanel"],
    content_scripts: [
      {
        matches: ["https://chat.openai.com/*"],
        js: ["src/content-script/chatgpt-inpage-proxy.ts"]
      }
    ],
    commands: {
      "open-app": {
        suggested_key: {
          default: "Alt+J",
          windows: "Alt+J",
          linux: "Alt+J",
          mac: "Command+J"
        },
        description: "Open ChatHub app"
      }
    },
    side_panel: {
      default_path: "sidepanel.html"
    }
  };
});

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [tsconfigPaths(), react(), crx({ manifest: manifest_config_default })],
  build: {
    rollupOptions: {
      input: ["app.html", "sidepanel.html"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21pbmd6L0RvY3VtZW50cy9jaGF0aHViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWluZ3ovRG9jdW1lbnRzL2NoYXRodWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21pbmd6L0RvY3VtZW50cy9jaGF0aHViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5jb25maWcnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdHNjb25maWdQYXRocygpLCByZWFjdCgpLCBjcngoeyBtYW5pZmVzdCB9KV0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IFsnYXBwLmh0bWwnLCAnc2lkZXBhbmVsLmh0bWwnXSxcbiAgICB9LFxuICB9LFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21pbmd6L0RvY3VtZW50cy9jaGF0aHViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWluZ3ovRG9jdW1lbnRzL2NoYXRodWIvbWFuaWZlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9taW5nei9Eb2N1bWVudHMvY2hhdGh1Yi9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3QoYXN5bmMgKGVudikgPT4ge1xuICByZXR1cm4ge1xuICAgIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gICAgbmFtZTogJ19fTVNHX2FwcE5hbWVfXycsXG4gICAgZGVzY3JpcHRpb246ICdfX01TR19hcHBEZXNjX18nLFxuICAgIGRlZmF1bHRfbG9jYWxlOiAnZW4nLFxuICAgIHZlcnNpb246ICcxLjI2LjEnLFxuICAgIGljb25zOiB7XG4gICAgICAnMTYnOiAnc3JjL2Fzc2V0cy9pY29uLnBuZycsXG4gICAgICAnMzInOiAnc3JjL2Fzc2V0cy9pY29uLnBuZycsXG4gICAgICAnNDgnOiAnc3JjL2Fzc2V0cy9pY29uLnBuZycsXG4gICAgICAnMTI4JzogJ3NyYy9hc3NldHMvaWNvbi5wbmcnLFxuICAgIH0sXG4gICAgYmFja2dyb3VuZDoge1xuICAgICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycsXG4gICAgICB0eXBlOiAnbW9kdWxlJyxcbiAgICB9LFxuICAgIGFjdGlvbjoge30sXG4gICAgaG9zdF9wZXJtaXNzaW9uczogW1xuICAgICAgJ2h0dHBzOi8vKi5iaW5nLmNvbS8nLFxuICAgICAgJ2h0dHBzOi8vKi5vcGVuYWkuY29tLycsXG4gICAgICAnaHR0cHM6Ly9iYXJkLmdvb2dsZS5jb20vJyxcbiAgICAgICdodHRwczovLyouY2hhdGh1Yi5nZy8nLFxuICAgIF0sXG4gICAgb3B0aW9uYWxfaG9zdF9wZXJtaXNzaW9uczogWydodHRwczovLyovKiddLFxuICAgIHBlcm1pc3Npb25zOiBbJ3N0b3JhZ2UnLCAndW5saW1pdGVkU3RvcmFnZScsICdzaWRlUGFuZWwnXSxcbiAgICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydodHRwczovL2NoYXQub3BlbmFpLmNvbS8qJ10sXG4gICAgICAgIGpzOiBbJ3NyYy9jb250ZW50LXNjcmlwdC9jaGF0Z3B0LWlucGFnZS1wcm94eS50cyddLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGNvbW1hbmRzOiB7XG4gICAgICAnb3Blbi1hcHAnOiB7XG4gICAgICAgIHN1Z2dlc3RlZF9rZXk6IHtcbiAgICAgICAgICBkZWZhdWx0OiAnQWx0K0onLFxuICAgICAgICAgIHdpbmRvd3M6ICdBbHQrSicsXG4gICAgICAgICAgbGludXg6ICdBbHQrSicsXG4gICAgICAgICAgbWFjOiAnQ29tbWFuZCtKJyxcbiAgICAgICAgfSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdPcGVuIENoYXRIdWIgYXBwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzaWRlX3BhbmVsOiB7XG4gICAgICBkZWZhdWx0X3BhdGg6ICdzaWRlcGFuZWwuaHRtbCcsXG4gICAgfSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFEsU0FBUyxvQkFBb0I7QUFDelMsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsV0FBVztBQUNwQixPQUFPLG1CQUFtQjs7O0FDSDBQLFNBQVMsc0JBQXNCO0FBRW5ULElBQU8sMEJBQVEsZUFBZSxPQUFPLFFBQVE7QUFDM0MsU0FBTztBQUFBLElBQ0wsa0JBQWtCO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLElBQ2IsZ0JBQWdCO0FBQUEsSUFDaEIsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFlBQVk7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLE1BQ2hCLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxRQUFRLENBQUM7QUFBQSxJQUNULGtCQUFrQjtBQUFBLE1BQ2hCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsMkJBQTJCLENBQUMsYUFBYTtBQUFBLElBQ3pDLGFBQWEsQ0FBQyxXQUFXLG9CQUFvQixXQUFXO0FBQUEsSUFDeEQsaUJBQWlCO0FBQUEsTUFDZjtBQUFBLFFBQ0UsU0FBUyxDQUFDLDJCQUEyQjtBQUFBLFFBQ3JDLElBQUksQ0FBQyw0Q0FBNEM7QUFBQSxNQUNuRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFlBQVk7QUFBQSxRQUNWLGVBQWU7QUFBQSxVQUNiLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxVQUNULE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsUUFDQSxhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFlBQVk7QUFBQSxNQUNWLGNBQWM7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOzs7QUQxQ0QsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLGNBQWMsR0FBRyxNQUFNLEdBQUcsSUFBSSxFQUFFLGtDQUFTLENBQUMsQ0FBQztBQUFBLEVBQ3JELE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLE9BQU8sQ0FBQyxZQUFZLGdCQUFnQjtBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
