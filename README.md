# Batch-renamer

Simple node.js tool to batch rename files from one folder to another with a specified prefix.

## Assumptions

After cloning this repo, the original folder must exist as a direct sibling of it:

```bash
batch-renamer # your cloned version of this tool
rename-files-in-this-folder # the folder containing files to rename
```

## Usage

1. Clone this repo.
1. Install the app.
   ```bash
   cd 'path/to/batch-renamer'
   nvm use && yarn
   ```
1. Run the app with the arguments:
   ```bash
   yarn batch-rename <name of origin folder> <desired prefix>
   ```

### Example

Given this folder structure:

```bash
batch-renamer # app
renameFilesInThisFolder # origin folder
  |_file.jpg
  |_image.png
```

Rename all the files in there with prefix of `Renamed`:

```bash
yarn batch-rename renameFilesInThisFolder Renamed
```

Results in:

```bash
batch-renamer # app
renameFilesInThisFolder # origin folder
  |_file.jpg
  |_image.png

renameFilesInThisFolder_renamed # new folder, created if not already existing
  |_Renamed-01.jpg
  |_Renamed-02.jpg
```
