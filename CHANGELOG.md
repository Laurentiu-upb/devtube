# Changelog

This file tracks the changes and fixes applied to the project.

## [Current Date] - Troubleshooting and Bug Fixes

Today, we addressed a critical issue that was preventing the development server from starting. Here's a summary of the steps taken to resolve the problem:

1.  **Diagnosed the "react-scripts: command not found" error:** This was the initial and most persistent error.
2.  **Attempted standard fixes:**
    *   Ran `npm install` multiple times.
    *   Deleted `node_modules` and `package-lock.json` and re-installed dependencies.
3.  **Identified the root cause:** After inspecting `package.json`, we discovered that `react-scripts` had an invalid version number (`^0.0.0`), likely caused by a previous `npm audit fix --force` command.
4.  **Corrected `package.json`:** Updated the `react-scripts` version to a stable release (`5.0.1`).
5.  **Resolved port conflict:** After fixing the `react-scripts` issue, a new error emerged: "Something is already running on port 3000."
6.  **Freed up the port:** Identified and terminated the process that was occupying port 3000.
7.  **Successful start:** The development server is now running as expected.

### Next Steps

*   Address the remaining vulnerabilities identified by `npm audit`.

## 2023-10-27

- **Feature Removal**: Removed the old login system, including the `InDevelopmentPage` and the logout button from the `Navbar`.
