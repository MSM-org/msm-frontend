# GitHub Pages client preview

Repository: https://github.com/MSM-org/msm-frontend

Expected preview URL after a successful deployment: https://msm-org.github.io/msm-frontend/

The manual workflow at `.github/workflows/pages.yml` builds and verifies the website before uploading `dist` to GitHub Pages. It sets `VITE_BASE_PATH=/msm-frontend/` and leaves `VITE_SITE_URL` empty so the approval preview stays noindex. It does not deploy on every push.

## Publish

1. Commit and push the website and workflow files to the repository. The workflow must exist on the repository's default branch for the Run workflow button to appear.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source → GitHub Actions**.
3. Open **Actions → Deploy client preview to GitHub Pages → Run workflow**. Select the branch containing the website version to review.
4. After both jobs succeed, use the URL shown in the deployment job to share the preview.

GitHub Free requires a public repository for Pages. Do not change repository visibility solely to enable hosting without deciding whether the source should be public. Pages previews are publicly accessible; noindex does not make the site private.

For another review version, push the changes and run the workflow again. No paid domain is required.

## Local check

In PowerShell, set `$env:VITE_BASE_PATH='/msm-frontend/'`, then run `npm run build` and `npm run test:seo`. Use `npm run preview` and open `/msm-frontend/` on the displayed local server. Remove the environment variable afterward to return to root-path development.

Generated route directories allow page refreshes and direct links. The generated `404.html` supplies the not-found page. Shared React links use the router basename; links and images inside the HTML design exports receive the same prefix.

This setup prepares a client review preview. It does not publish by itself, and it is not the final commercial hosting decision.

[GitHub Pages custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
