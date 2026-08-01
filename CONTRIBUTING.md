# Contributing to HTTP Directory

Thanks for taking the time to improve HTTP Directory. Content corrections,
accessibility improvements, bug fixes, and new HTTP status-code guides are all
welcome.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Before You Start

- Check whether a related issue or pull request already exists.
- Open an issue first to discuss substantial changes.
- Keep each contribution focused on one objective.

## Local Setup

This project uses Node.js 22.22.3 or later and pnpm.

```bash
git clone https://github.com/lucho00cuba/http-directory.git
cd http-directory
pnpm install
pnpm dev
```

The development site is available at `http://localhost:4321`.

## Making Changes

1. Create a descriptive branch, such as `fix/status-link` or
   `docs/404-guide`.
2. Make your change while following the existing style.
3. Use relative links for internal content and ensure they work when deployed
   under the GitHub Pages path `/http-directory/`.
4. Update documentation whenever you change public behavior.

## Required Checks

Run the following before opening a pull request:

```bash
pnpm format:check
pnpm lint
pnpm build
```

To apply the configured formatting automatically:

```bash
pnpm format
```

## Pull Requests

Describe the problem your change solves, how you tested it, and include
screenshots for user-interface changes. Keep pull requests small, avoid
unrelated changes, and respond to review feedback.

## HTTP Content

Guides should be clear and technically accurate. Distinguish standard HTTP
status-code behavior from implementation-specific details. When citing a
specification or external documentation, link to the primary source.

## License

By contributing, you agree that your contributions are distributed under the
[MIT License](LICENSE).
