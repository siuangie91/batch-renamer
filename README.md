# Batch-renamer

Simple node.js tool to batch rename files from one folder to another at the same level with a specified prefix.

## Usage

1. Clone this repo.
1. Install the app.
   ```bash
   cd 'path/to/batch-renamer'
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
      <th>Description</th>
      <th>Example</th>
      <th>Required?</th>
    </tr>
  </thead>
  <tr>
    <td><code>-o</code>, <code>--origin</code></td>
    <td>Absolute path to original folder of files to rename</td>
    <td>/Users/userName/Desktop/originalFolder</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td><code>-p</code>, <code>--origin</code></td>
    <td>Prefix for the renamed files</td>
    <td>new-name</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td><code>-s</code>, <code>--startingIndex</code></td>
    <td>
      Custom starting index for renamed files.
      <br />
      If not provided, file numbers will start at <code>001</code>.
      <br /><br />
      ℹ️ <em>Note that file numbers will have at least 3 digits (leading zeroes are adding as necessary).</em>
    </td>
    <td>13</td>
    <td>No</td>
  </tr>
</table>
         
### Example

#### Without starting index

Given this folder on your desktop:

```bash
original
  |_file.jpg
  |_image.png
```

whose absolute path is `/Users/MyUser/Desktop/original`, rename all the files in there with prefix of `Renamed`:

```bash
yarn batch-rename -o original -p Renamed
```

Results in:

```bash
original # origin folder
  |_file.jpg
  |_image.png

original_renamed # new folder, created if not already existing
  |_Renamed-001.jpg
  |_Renamed-002.jpg
```

#### With starting index

Using that same [folder](#without-starting-index), rename all of the files with starting index of 300:

```bash
yarn batch-rename -o original -p Renamed -s 300
```

Results in:

```bash
original # origin folder
  |_file.jpg
  |_image.png

original_renamed # new folder, created if not already existing
  |_Renamed-300.jpg
  |_Renamed-301.jpg
```

This is useful for when you already have files in the target folder with the given prefix.
