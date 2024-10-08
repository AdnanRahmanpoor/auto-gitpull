# Auto Git Pull Extension for VS Code


![](src/gitpull128px.png)

## Overview

The **Auto Git Pull** extension for Visual Studio Code automatically fetches and pulls the latest changes from your Git repository whenever you open a project or detect changes. This helps streamline your workflow by ensuring you always have the latest code without manual intervention.

## Features

- Automatically performs `git fetch` and `git pull` when a workspace is opened.
- Option to enable or disable automatic pulls.
- Specify which projects to include for automatic pulling.
- Continuous checking for changes at user-defined intervals.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/adnanrp/auto-gitpull.git
   cd auto-gitpull

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Extension**:
   ```bash
   npm run compile
   ```

4. **Package the Extension**:
   ```bash
   vsce package
   ```

5. **Install the Extension**:

   ``` 
   Open Visual Studio Code.
   
   Go to the Extensions view (Ctrl+Shift+X).
   
   Click on the three dots in the top right corner and select 
   
   Install from VSIX....
   
   Choose the generated .vsix file.
   ```

## Configuration

You should specify the name of the project (folder name) in the settings, **if the extension didn't work or provided an error, ensure that none of the parent directory has a space in them.**

Example Configuration:
   ```json
   {
      "gitPullOnOpen.enabled": true,
      "gitPullOnOpen.projects": ["ProjectA", "ProjectB"],
      "gitPullOnOpen.continuousPull.enabled": true,
      "gitPullOnOpen.continuousPull.interval": 30000 // Check every 30 seconds
   }
   ```

## Usage
Once installed, the extension will automatically fetch and pull updates from your Git repositories based on your configuration settings. You can monitor the Output panel for logs related to fetching and pulling operations.


## Contributing
Contributions are welcome! Please feel free to submit issues or pull requests.

Fork the repository.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
Thanks to the VS Code team for creating such an extensible platform!