# 🚀 GitHub Setup Guide for CoreWatch

Follow these steps to push your CoreWatch project to GitHub.

## Prerequisites

- Git installed on your system
- GitHub account created
- GitHub repository created (can be empty)

## Step 1: Initialize Git Repository

Open your terminal in the project root directory and run:

```bash
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: CoreWatch - Real-time Performance Tracker"
```

## Step 4: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `corewatch` or `system-monitor-dashboard`
5. Add description: "Real-time system monitoring dashboard with React and Node.js"
6. Choose Public or Private
7. **DO NOT** initialize with README (we already have one)
8. Click "Create repository"

## Step 5: Connect to GitHub

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Example:
```bash
git remote add origin https://github.com/johndoe/corewatch.git
```

## Step 6: Push to GitHub

For the first push:

```bash
git branch -M main
git push -u origin main
```

## Step 7: Verify

Visit your GitHub repository URL to see your project online!

## Future Updates

After making changes to your code:

```bash
git add .
git commit -m "Description of your changes"
git push
```

## Common Git Commands

- `git status` - Check which files have changed
- `git log` - View commit history
- `git pull` - Get latest changes from GitHub
- `git branch` - List all branches
- `git checkout -b feature-name` - Create a new branch

## Troubleshooting

### Authentication Issues

If you encounter authentication errors, you may need to:

1. **Use Personal Access Token (Recommended)**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
   - Use token as password when pushing

2. **Use SSH (Alternative)**
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

### Already Initialized Repository

If you get "already exists" error:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

## Adding a README Badge

After pushing, add this to your GitHub profile or README:

```markdown
[![CoreWatch](https://img.shields.io/badge/CoreWatch-System%20Monitor-blue)](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)
```

## Next Steps

1. Add screenshots to your README
2. Create GitHub releases for versions
3. Enable GitHub Pages for documentation (optional)
4. Add GitHub Actions for CI/CD (optional)

---

Need help? Check [GitHub Docs](https://docs.github.com) or open an issue!
