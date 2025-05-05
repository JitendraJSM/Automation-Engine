# Trea Editor Best Practices

## Workspace Indexing Optimization

### Current Behavior

- Trea Editor performs workspace indexing each time you open the project
- This is particularly noticeable in large projects like this puppeteer repository which contains many files and directories

### Why Indexing is Important

Indexing enables essential features like:

- Code navigation
- Symbol search
- Intelligent code completion
- Reference finding
- Type checking

### Storage Solution

To improve subsequent load times, Trea Editor implements local storage of index data:

- Caches the index data in the project's root directory
- Only re-indexes files that have changed since the last indexing
- Uses the cached data for unchanged files

### Configuration Setup

1. Create a `.trea` directory in your project root to store the cache (similar to how other IDEs handle it):

   - VS Code uses `.vscode` folder
   - JetBrains IDEs use `.idea` folder
   - Eclipse uses `.settings` folder

2. Add the cache directory to `.gitignore` to prevent it from being committed to version control:

```
# Trea Editor cache
.trea/
```

3. Configure Trea Editor settings in `.trea/config.json`:

```json
{
  "indexing": {
    "cacheEnabled": true,
    "cacheLocation": ".trea/index-cache",
    "excludePatterns": ["node_modules/**", "dist/**", "build/**", ".git/**"],
    "incrementalIndexing": true,
    "watchFileChanges": true
  }
}
```

### Benefits

With this configuration:

1. Trea Editor checks for existing cache in the `.trea` directory
2. Uses the cached index if available
3. Only re-indexes files that have changed since the last session
4. Significantly reduces startup indexing time

The next time you open your project, you should notice a much faster indexing process since it will only need to verify and update changed files rather than rebuilding the entire index.
