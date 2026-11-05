# Projects

Every project on the Projects page lives here as its own file. Nothing is hard-coded in
`index.html` or `assets/js/app.js`.

## Add a project

1. Copy `_template.json` and rename it after the project, for example `warp-notes.json`.
2. Fill in the fields. `id` must match the file name without `.json`.
3. Add the file name to `index.json`. The order in that list is the order on the page.

```json
[
  "warp-notes.json",
  "warp-launcher.json"
]
```

4. Commit and push. The page fetches `projects/index.json`, then each file, and builds
   the cards from them.

## Fields

| Field      | What it does                                                   |
| ---------- | -------------------------------------------------------------- |
| `id`       | Unique slug, also used in the URL (`#project-warp-notes`)       |
| `name`     | Card and page title                                            |
| `tagline`  | One line under the title on the detail page                    |
| `desc`     | Description paragraph on the detail page                       |
| `version`  | Version label, shown on the card                                |
| `released` | First release date                                             |
| `updated`  | Last update date                                               |
| `size`     | Download size, shown on the card                                |
| `license`  | License label                                                  |
| `platform` | Supported platforms                                            |
| `labels`   | Screenshot labels; one thumbnail is drawn per label            |
| `features` | Bullet list on the detail page                                 |

## Remove a project

Delete its file and remove its name from `index.json`.
