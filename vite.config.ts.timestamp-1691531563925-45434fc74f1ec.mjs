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
    version: "1.34.0",
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
    permissions: ["storage", "unlimitedStorage", "sidePanel", "declarativeNetRequestWithHostAccess"],
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
    },
    declarative_net_request: {
      rule_resources: [
        {
          id: "ruleset_bing",
          enabled: true,
          path: "src/rules/bing.json"
        },
        {
          id: "ruleset_ddg",
          enabled: true,
          path: "src/rules/ddg.json"
        }
      ]
    }
  };
});

// vite.config.ts
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [tsconfigPaths(), react(), crx({ manifest: manifest_config_default })],
    build: {
      rollupOptions: {
        input: ["app.html"]
      }
    },
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : []
    },
    server: {
      strictPort: true,
      port: 5173,
      hmr: {
        clientPort: 5173
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21pbmd6L0RvY3VtZW50cy9jaGF0aHViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWluZ3ovRG9jdW1lbnRzL2NoYXRodWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21pbmd6L0RvY3VtZW50cy9jaGF0aHViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5jb25maWcnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW3RzY29uZmlnUGF0aHMoKSwgcmVhY3QoKSwgY3J4KHsgbWFuaWZlc3QgfSldLFxuICAgIGJ1aWxkOiB7XG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGlucHV0OiBbJ2FwcC5odG1sJ10sXG4gICAgICB9LFxuICAgIH0sXG4gICAgZXNidWlsZDoge1xuICAgICAgZHJvcDogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10gOiBbXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICAgIHBvcnQ6IDUxNzMsXG4gICAgICBobXI6IHtcbiAgICAgICAgY2xpZW50UG9ydDogNTE3MyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21pbmd6L0RvY3VtZW50cy9jaGF0aHViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWluZ3ovRG9jdW1lbnRzL2NoYXRodWIvbWFuaWZlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9taW5nei9Eb2N1bWVudHMvY2hhdGh1Yi9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3QoYXN5bmMgKGVudikgPT4ge1xuICByZXR1cm4ge1xuICAgIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gICAgbmFtZTogJ19fTVNHX2FwcE5hbWVfXycsXG4gICAgZGVzY3JpcHRpb246ICdfX01TR19hcHBEZXNjX18nLFxuICAgIGRlZmF1bHRfbG9jYWxlOiAnZW4nLFxuICAgIHZlcnNpb246ICcxLjM0LjAnLFxuICAgIGljb25zOiB7XG4gICAgICAnMTYnOiAnc3JjL2Fzc2V0cy9pY29uLnBuZycsXG4gICAgICAnMzInOiAnc3JjL2Fzc2V0cy9pY29uLnBuZycsXG4gICAgICAnNDgnOiAnc3JjL2Fzc2V0cy9pY29uLnBuZycsXG4gICAgICAnMTI4JzogJ3NyYy9hc3NldHMvaWNvbi5wbmcnLFxuICAgIH0sXG4gICAgYmFja2dyb3VuZDoge1xuICAgICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycsXG4gICAgICB0eXBlOiAnbW9kdWxlJyxcbiAgICB9LFxuICAgIGFjdGlvbjoge30sXG4gICAgaG9zdF9wZXJtaXNzaW9uczogW1xuICAgICAgJ2h0dHBzOi8vKi5iaW5nLmNvbS8nLFxuICAgICAgJ2h0dHBzOi8vKi5vcGVuYWkuY29tLycsXG4gICAgICAnaHR0cHM6Ly9iYXJkLmdvb2dsZS5jb20vJyxcbiAgICAgICdodHRwczovLyouY2hhdGh1Yi5nZy8nLFxuICAgIF0sXG4gICAgb3B0aW9uYWxfaG9zdF9wZXJtaXNzaW9uczogWydodHRwczovLyovKiddLFxuICAgIHBlcm1pc3Npb25zOiBbJ3N0b3JhZ2UnLCAndW5saW1pdGVkU3RvcmFnZScsICdzaWRlUGFuZWwnLCAnZGVjbGFyYXRpdmVOZXRSZXF1ZXN0V2l0aEhvc3RBY2Nlc3MnXSxcbiAgICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydodHRwczovL2NoYXQub3BlbmFpLmNvbS8qJ10sXG4gICAgICAgIGpzOiBbJ3NyYy9jb250ZW50LXNjcmlwdC9jaGF0Z3B0LWlucGFnZS1wcm94eS50cyddLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGNvbW1hbmRzOiB7XG4gICAgICAnb3Blbi1hcHAnOiB7XG4gICAgICAgIHN1Z2dlc3RlZF9rZXk6IHtcbiAgICAgICAgICBkZWZhdWx0OiAnQWx0K0onLFxuICAgICAgICAgIHdpbmRvd3M6ICdBbHQrSicsXG4gICAgICAgICAgbGludXg6ICdBbHQrSicsXG4gICAgICAgICAgbWFjOiAnQ29tbWFuZCtKJyxcbiAgICAgICAgfSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdPcGVuIENoYXRIdWIgYXBwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzaWRlX3BhbmVsOiB7XG4gICAgICBkZWZhdWx0X3BhdGg6ICdzaWRlcGFuZWwuaHRtbCcsXG4gICAgfSxcbiAgICBkZWNsYXJhdGl2ZV9uZXRfcmVxdWVzdDoge1xuICAgICAgcnVsZV9yZXNvdXJjZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAncnVsZXNldF9iaW5nJyxcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHBhdGg6ICdzcmMvcnVsZXMvYmluZy5qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAncnVsZXNldF9kZGcnLFxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgcGF0aDogJ3NyYy9ydWxlcy9kZGcuanNvbicsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRRLFNBQVMsb0JBQW9CO0FBQ3pTLE9BQU8sV0FBVztBQUNsQixTQUFTLFdBQVc7QUFDcEIsT0FBTyxtQkFBbUI7OztBQ0gwUCxTQUFTLHNCQUFzQjtBQUVuVCxJQUFPLDBCQUFRLGVBQWUsT0FBTyxRQUFRO0FBQzNDLFNBQU87QUFBQSxJQUNMLGtCQUFrQjtBQUFBLElBQ2xCLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxZQUFZO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxNQUNoQixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsUUFBUSxDQUFDO0FBQUEsSUFDVCxrQkFBa0I7QUFBQSxNQUNoQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLDJCQUEyQixDQUFDLGFBQWE7QUFBQSxJQUN6QyxhQUFhLENBQUMsV0FBVyxvQkFBb0IsYUFBYSxxQ0FBcUM7QUFBQSxJQUMvRixpQkFBaUI7QUFBQSxNQUNmO0FBQUEsUUFDRSxTQUFTLENBQUMsMkJBQTJCO0FBQUEsUUFDckMsSUFBSSxDQUFDLDRDQUE0QztBQUFBLE1BQ25EO0FBQUEsSUFDRjtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1IsWUFBWTtBQUFBLFFBQ1YsZUFBZTtBQUFBLFVBQ2IsU0FBUztBQUFBLFVBQ1QsU0FBUztBQUFBLFVBQ1QsT0FBTztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQSxRQUNBLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLElBQ0EsWUFBWTtBQUFBLE1BQ1YsY0FBYztBQUFBLElBQ2hCO0FBQUEsSUFDQSx5QkFBeUI7QUFBQSxNQUN2QixnQkFBZ0I7QUFBQSxRQUNkO0FBQUEsVUFDRSxJQUFJO0FBQUEsVUFDSixTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLElBQUk7QUFBQSxVQUNKLFNBQVM7QUFBQSxVQUNULE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7O0FEeERELElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDakQsU0FBTztBQUFBLElBQ0wsU0FBUyxDQUFDLGNBQWMsR0FBRyxNQUFNLEdBQUcsSUFBSSxFQUFFLGtDQUFTLENBQUMsQ0FBQztBQUFBLElBQ3JELE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLE9BQU8sQ0FBQyxVQUFVO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNLFNBQVMsZUFBZSxDQUFDLFdBQVcsVUFBVSxJQUFJLENBQUM7QUFBQSxJQUMzRDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLFFBQ0gsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
