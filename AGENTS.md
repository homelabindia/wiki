# Homelab India Wiki

MkDocs Material site for Indian homelabbers, published at <https://wiki.homelabindia.org>.

## Commands

```bash
mise install                    # installs uv
uv run mkdocs serve             # preview at localhost:8000
uv run mkdocs build --strict    # check the site builds without broken links
```

## Layout

- `docs/hardware/`, `docs/software/`, `docs/community-guides/`: wiki pages.
- `docs/blog/posts/`: dated posts, such as deals and builds. Give each post
  `date` and `categories` front matter.
- `docs/assets/images/`: images used in pages.
- `mkdocs.yml`: site config and the sidebar `nav`. Add every new page to `nav`.
- `site/` and `.cache/` are build output; do not edit or commit them.

## Writing pages

- Set the sidebar icon in the page's front matter with a Material icon name,
  for example `icon: 'material/battery-charging'`. Browse names at
  <https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/>.
- Start each page with one `#` title and use `##`/`###` for sections.
- Keep content India-specific: Indian sellers, prices in ₹ (`6k`, `₹14,400`),
  and buying links.
- For seller entries, include contact details, location, and what the
  community has bought there.
- Mark first-hand reviews with the author, as in `*By techno*`.

## Checks

CI runs MegaLinter with markdownlint only on changed files. Before opening a
PR, run `uv run mkdocs build --strict` and
`npx markdownlint-cli <changed .md files>`.
