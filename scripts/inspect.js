const fs = require("fs");
const path = require("path");

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  directory: "\x1b[1;34m", // Bright blue
  file: "\x1b[37m", // White
  // Different colors for each navigator type
  stackNavigator: "\x1b[1;31m", // Bright red
  tabNavigator: "\x1b[1;32m", // Bright green
  topTabNavigator: "\x1b[1;33m", // Bright yellow
  drawerNavigator: "\x1b[1;35m", // Bright magenta
  customNavigator: "\x1b[1;36m", // Bright cyan
  slotElement: "\x1b[38;5;208m", // Bright orange
  unknownNavigator: "\x1b[1;90m", // Bright black/gray
};

// Parse command line arguments
const args = process.argv.slice(2);
const showExtensions = !args.includes("--no-ext");

// Function to get color for navigator type based on the type
function getNavigatorColor(navigatorType) {
  switch (navigatorType) {
    case "Stack Navigator":
      return colors.stackNavigator;
    case "Tab Navigator":
      return colors.tabNavigator;
    case "Material Top Tab Navigator":
      return colors.topTabNavigator;
    case "Drawer Navigator":
      return colors.drawerNavigator;
    case "Custom Navigator":
      return colors.customNavigator;
    case "Slot Element":
      return colors.slotElement;
    default:
      return colors.unknownNavigator;
  }
}

// Function to extract navigator type from a _layout.tsx file
function extractNavigatorType(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Check for different navigator types with more specific patterns
    if (
      content.includes("createStackNavigator") ||
      (content.includes("Stack") && content.includes("expo-router"))
    ) {
      return "Stack Navigator";
    }

    if (
      content.includes("createBottomTabNavigator") ||
      (content.includes("<Tabs") && content.includes("expo-router"))
    ) {
      return "Tab Navigator";
    }

    if (
      content.includes("createMaterialTopTabNavigator") ||
      content.includes("<MaterialTopTabs")
    ) {
      return "Material Top Tab Navigator";
    }

    if (
      content.includes("createDrawerNavigator") ||
      (content.includes("<Drawer") && content.includes("expo-router"))
    ) {
      return "Drawer Navigator";
    }

    // Check for any other navigator type
    if (
      (content.includes("Navigator") || content.includes("expo-router")) &&
      !content.includes("ThemeProvider")
    ) {
      return "Custom Navigator";
    }

    // Check for Slot element (often used for passing child elements in Expo Router)
    if (content.includes("Slot") || content.includes("<Slot")) {
      return "Slot Element";
    }

    return "Unknown Navigator";
  } catch (_) {
    return "Error reading file";
  }
}

// Function to filter and sort directory items
function getFilteredItems(dir) {
  return fs
    .readdirSync(dir)
    .filter((item) => {
      // Skip files/folders with + in their names and .DS_Store
      if (item.includes("+") || item === ".DS_Store") {
        return false;
      }

      const itemPath = path.join(dir, item);
      const isDir = fs.statSync(itemPath).isDirectory();

      // Always include directories
      if (isDir) {
        return true;
      }

      // For files, only include .tsx or .jsx files
      return item.endsWith(".tsx") || item.endsWith(".jsx");
    })
    .sort((a, b) => {
      // Directories first, then files
      const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
      const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });
}

// Function to print folder structure with navigator info
function printFolderStructure(
  dir,
  prefix = "",
  isLast = true,
  navigatorInfo = {}
) {
  const baseName = path.basename(dir);

  // Skip files/folders with + in their names
  if (baseName.includes("+")) return;

  const connector = isLast ? "└── " : "├── ";

  // Print directory name with navigator info if available
  let displayName = `${colors.directory}${baseName}${colors.reset}`;
  if (navigatorInfo[dir]) {
    const navigatorType = navigatorInfo[dir];
    const navigatorColor = getNavigatorColor(navigatorType);
    displayName += ` ${navigatorColor}[${navigatorType}]${colors.reset}`;
  }

  console.log(`${prefix}${connector}${displayName}`);

  // Prepare prefix for children
  const newPrefix = prefix + (isLast ? "    " : "│   ");

  try {
    // Get all items in the directory
    const items = getFilteredItems(dir);

    // Create a separate list for directories and files (excluding _layout.tsx)
    const directories = [];
    const files = [];

    items.forEach((item) => {
      const itemPath = path.join(dir, item);
      const isDir = fs.statSync(itemPath).isDirectory();

      if (isDir) {
        directories.push(item);
      } else if (item !== "_layout.tsx") {
        files.push(item);
      }
    });

    // Process directories first
    directories.forEach((item, index) => {
      const itemPath = path.join(dir, item);
      const isLastDir = index === directories.length - 1;
      const isLastItem = isLastDir && files.length === 0;

      // Check for _layout.tsx in this directory
      const layoutPath = path.join(itemPath, "_layout.tsx");
      if (fs.existsSync(layoutPath)) {
        // Extract navigator type and add to navigatorInfo
        navigatorInfo[itemPath] = extractNavigatorType(layoutPath);
      }

      // Recursively print subdirectory
      printFolderStructure(itemPath, newPrefix, isLastItem, navigatorInfo);
    });

    // Then process files
    files.forEach((item, index) => {
      const isLastItem = index === files.length - 1;
      const fileConnector = isLastItem ? "└── " : "├── ";

      // Handle file extension display
      let displayName = item;
      if (!showExtensions) {
        // Remove file extension
        displayName = path.parse(item).name;
      }

      console.log(
        `${newPrefix}${fileConnector}${colors.file}${displayName}${colors.reset}`
      );
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}: ${error.message}`);
  }
}

// Process the entire app structure recursively to collect navigator info first
function collectNavigatorInfo(dir, navigatorInfo = {}) {
  try {
    const items = fs.readdirSync(dir).filter((item) => !item.includes("+"));

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const isDir = fs.statSync(itemPath).isDirectory();

      if (isDir) {
        // Check for _layout.tsx in this directory
        const layoutPath = path.join(itemPath, "_layout.tsx");
        if (fs.existsSync(layoutPath)) {
          // Extract navigator type and add to navigatorInfo
          navigatorInfo[itemPath] = extractNavigatorType(layoutPath);
        }

        // Recursively collect from subdirectory
        collectNavigatorInfo(itemPath, navigatorInfo);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}: ${error.message}`);
  }

  return navigatorInfo;
}

// Main function
function main() {
  const appDir = path.join(process.cwd(), "app");

  // Check if app directory exists
  if (!fs.existsSync(appDir)) {
    console.error(
      "Error: app directory not found. Make sure to run this script from the project root."
    );
    process.exit(1);
  }

  // First pass: collect navigator info for all directories
  const navigatorInfo = {};

  // Check if root app folder has a _layout.tsx
  const rootLayoutPath = path.join(appDir, "_layout.tsx");
  if (fs.existsSync(rootLayoutPath)) {
    navigatorInfo[appDir] = extractNavigatorType(rootLayoutPath);
  }

  // Collect all navigator info first
  collectNavigatorInfo(appDir, navigatorInfo);

  // Second pass: print the structure with navigator info
  printFolderStructure(appDir, "", true, navigatorInfo);
}

main();
