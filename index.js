// index.js
import { AppRegistry } from "react-native";
import App from "./App";
import "./global.css";

if (typeof document !== "undefined") {
  AppRegistry.registerComponent("main", () => App);
  AppRegistry.runApplication("main", {
    rootTag: document.getElementById("root"),
  });
} else {
  const { registerRootComponent } = require("expo");
  registerRootComponent(App);
}
