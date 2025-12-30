# Check if Git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Git is not installed or not in your PATH." -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/downloads"
    Read-Host -Prompt "Press Enter to exit"
    exit
}

# 1. Check status
Write-Host "Checking Git status..." -ForegroundColor Cyan
git status

# 2. Add all changes
Write-Host "Adding files..." -ForegroundColor Green
git add .

# 3. Commit changes
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "Update from Dashboard Assistant: $timestamp"
Write-Host "Committing: $commitMsg" -ForegroundColor Green
git commit -m "$commitMsg"

# 4. Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment Successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Deployment Failed. Please check the errors above." -ForegroundColor Red
}

Read-Host -Prompt "Press Enter to close"
