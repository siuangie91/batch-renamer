# Batch-renamer

Simple node.js tool to batch rename files from one folder to another with a specified prefix.

## Usage

1. Clone this repo.
1. Install the app.
   ```bash
   cd path/to/batch-renamer
   nvm use && yarn
   ```
1. Run the app with the arguments:
   ```bash
   yarn batch-rename -o <absolute path to origin folder> -p <desired prefix>
   ```

Run `yarn batch-rename --help` to see arguments/options.

## Arguments

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Alias</th>
      <th>Description</th>
      <th>Example</th>
      <th>Required?</th>
    </tr>
  </thead>
  <tr>
    <td><code>--origin</code></td>
    <td><code>-o</code></td>
    <td>Absolute path to original folder of files to rename</td>
    <td><code>/Users/userName/Desktop/originalFolder</code></td>
    <td>Yes</td>
  </tr>
  <tr>
    <td><code>--prefix</code></td>
    <td><code>-p</code></td>
    <td>Prefix for the renamed files</td>
    <td><code>new-name</code></td>
    <td>Yes</td>
  </tr>
  <tr>
    <td><code>--target</code></td>
    <td><code>-t</code></td>
    <td>
      Absolute path to folder to save renamed files to. Creates the folder if it doesn't already exist.
      <br /><br />
      ℹ️ <em>If not provided, a new folder called <code>{originalFolder}_renamed</code> will be created.</em>
    </td>
    <td><code>/Users/userName/Desktop/renameToHere</code></td>
    <td>No</td>
  </tr>
  <tr>
    <td><code>--startingIndex</code></td>
    <td><code>-s</code></td>
    <td>
      Custom starting index for renamed files.
      <br />
      If not provided, file numbers will start at <code>001</code>.
      <br /><br />
      ℹ️ <em>Note that file numbers will have at least 3 digits (leading zeroes are added as necessary).</em>
    </td>
    <td><code>13</code></td>
    <td>No</td>
  </tr>
</table>
         
## Example

### Without starting index

Given this folder on your desktop:

```bash
original
  |_file.jpg
  |_image.png
```

whose absolute path is `~/Desktop/original`, rename all the files in there with prefix of `Renamed`:

```bash
yarn batch-rename -o ~/Desktop/original -p Renamed
```

Results in:

```bash
original # origin folder
  |_file.jpg
  |_image.png

original_renamed # new folder, created if not already existing
  |_Renamed-001.jpg
  |_Renamed-002.png
```

### With starting index

Using that same [folder](#without-starting-index), rename all of the files with starting index of 300:

```bash
yarn batch-rename -o ~/Desktop/original -p Renamed -s 300
```

Results in:

```bash
original # origin folder
  |_file.jpg
  |_image.png

original_renamed # new folder, created if not already existing
  |_Renamed-300.jpg
  |_Renamed-301.png
```

Useful when used with [`--target`](#with-specified-target-folder).

### With specified target folder

#### Target folder already exists

Given this folder structure on your desktop:

```bash
original # contains file to rename
  |_file.jpg
  |_image.png

other # will contain renamed files
  |_Prefix-301.js
```

Rename all of the files in `original` with starting index of 302, prefix of `Prefix` and store in the `other` folder:

```bash
yarn batch-rename -o ~/Desktop/original -p Prefix -t ~/Desktop/other -s 302
```

Results in:

```bash
original # origin folder
  |_file.jpg
  |_image.png

other # now also contains renamed files from original
  |_Prefix-301.js
  |_Prefix-302.jpg
  |_Prefix-303.png
```

This is useful for when you already have files in the target folder with the given prefix.

#### Target folder does not yet exist

Given this folder on your desktop:

```bash
original # contains file to rename
  |_file.jpg
  |_image.png
```

Rename all of the files in `original` and store in a new `copy` folder in the `~/Desktop/subfolder/` directory with a prefix of `Copied`:

```bash
yarn batch-rename -o ~/Desktop/original -p Copied -t ~/Desktop/subfolder/copy
```

Results in:

```bash
Desktop
  |_original # origin folder
    |_file.jpg
    |_image.png
  |_subfolder
    |_copy # created new folder that did not exist before
      |_Copied-001.js
      |_Copied-002.jpg
```

This is useful for when you know exactly where you want the target folder to go.
