#Requires -Version 5.1
<#
.SYNOPSIS
    Valley(private) 조사 원본을 공개 레포로 동기화하고 커밋·push 한다.

.DESCRIPTION
    GitHub Actions 자동 동기화를 쓰지 않는 대신 이 스크립트를 직접 실행한다.
    push 이후의 빌드·배포는 Vercel이 공개 레포를 직접 지켜보며 자동으로 처리하므로
    이 스크립트가 하는 일은 "Valley → 공개 레포 content/" 한 구간뿐이다.

    content/ 만 스테이징한다. quartz.config.yaml 이나 scripts/ 변경은
    성격이 다른 작업이므로 직접 커밋할 것 (git add . 은 쓰지 않는다).

.PARAMETER ValleyRoot
    Valley 저장소 루트. 기본값 D:\Claude\Financial_Reports\Valley

.PARAMETER Message
    커밋 메시지. 생략하면 "sync: 조사 문서 갱신 (시각)".

.PARAMETER Build
    push 전에 로컬 Quartz 빌드로 검증한다. 실패하면 커밋하지 않는다.

.PARAMETER DryRun
    동기화 결과와 변경 목록만 보여주고 커밋·push 하지 않는다.

.EXAMPLE
    .\publish.ps1
    동기화 → 커밋 → push (가장 흔한 사용법)

.EXAMPLE
    .\publish.ps1 -DryRun
    무엇이 바뀌는지만 확인

.EXAMPLE
    .\publish.ps1 -Build -Message "sync: FOMC 결과 반영"
    로컬 빌드로 검증한 뒤 지정한 메시지로 발행
#>
[CmdletBinding()]
param(
    [string]$ValleyRoot = "D:\Claude\Financial_Reports\Valley",
    [string]$Message,
    [switch]$Build,
    [switch]$DryRun
)

# $ErrorActionPreference = "Stop" 을 쓰지 않는다.
# Windows PowerShell 5.1 은 네이티브 exe 가 stderr 에 쓴 줄을 ErrorRecord(NativeCommandError)로
# 감싸는데, Stop 이면 그게 종료 오류가 된다. git 은 "CRLF will be replaced by LF" 같은 무해한
# 경고와 push 진행상황을 정상적으로 stderr 에 쓰므로, Stop 을 걸면 성공한 git 호출에도 스크립트가
# 죽는다(실제로 그렇게 죽었다). 대신 네이티브 호출마다 $LASTEXITCODE 를 직접 확인한다.
$ErrorActionPreference = "Continue"

# 이 스크립트가 있는 폴더가 곧 공개 레포 루트다. 어느 디렉터리에서 실행해도 동작한다.
$RepoRoot = $PSScriptRoot
Set-Location -Path $RepoRoot -ErrorAction Stop

function Write-Step($text) { Write-Host "`n▶ $text" -ForegroundColor Cyan }
function Write-Ok($text) { Write-Host "  $text" -ForegroundColor Green }
function Fail($text) {
    Write-Host "`n✗ $text" -ForegroundColor Red
    exit 1
}

# ─── 0. 사전 점검 ────────────────────────────────────────────────────────────
if (-not (Test-Path (Join-Path $RepoRoot "scripts\sync-content.mjs"))) {
    Fail "scripts\sync-content.mjs 가 없습니다. 이 스크립트는 공개 레포 루트에 있어야 합니다: $RepoRoot"
}
if (-not (Test-Path $ValleyRoot)) {
    Fail "Valley 루트를 찾을 수 없습니다: $ValleyRoot`n  다른 위치면 -ValleyRoot 로 지정하세요."
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Fail "node 를 찾을 수 없습니다. Node.js가 PATH에 있어야 합니다."
}

# ─── 1. 동기화 ───────────────────────────────────────────────────────────────
Write-Step "Valley 원본 동기화"
node (Join-Path $RepoRoot "scripts\sync-content.mjs") $ValleyRoot (Join-Path $RepoRoot "content")
if ($LASTEXITCODE -ne 0) {
    Fail "동기화 실패 (exit $LASTEXITCODE). 위 메시지를 확인하세요 — 섹션 소스 폴더가 사라졌을 수 있습니다."
}

# ─── 2. 선택: 로컬 빌드 검증 ─────────────────────────────────────────────────
if ($Build) {
    Write-Step "로컬 빌드 검증"
    # npx quartz build 가 아니라 bootstrap-cli 직접 실행 (이유는 DEPLOY.md)
    node (Join-Path $RepoRoot "quartz\bootstrap-cli.mjs") build
    if ($LASTEXITCODE -ne 0) {
        Fail "빌드 실패 (exit $LASTEXITCODE). 커밋하지 않았습니다 — 원본을 고친 뒤 다시 실행하세요."
    }
    Write-Ok "빌드 통과"
}

# ─── 3. 변경 확인 ────────────────────────────────────────────────────────────
Write-Step "변경 확인"
git add content
if ($LASTEXITCODE -ne 0) { Fail "git add 실패 (exit $LASTEXITCODE)" }

# --quiet 는 차이가 있으면 exit 1, 없으면 exit 0 을 준다.
git diff --staged --quiet content
$hasChanges = ($LASTEXITCODE -ne 0)

if (-not $hasChanges) {
    Write-Ok "원본과 공개본이 이미 같습니다 — 커밋할 것이 없습니다."
    # content/ 밖의 미커밋 변경이 있으면 알려준다 (이 스크립트가 다루지 않는 범위).
    $other = git -c core.quotepath=false status --porcelain | Where-Object { $_ -notmatch '^..\s+content/' }
    if ($other) {
        Write-Host "`n  참고 — content/ 밖에 미커밋 변경이 있습니다 (이 스크립트는 건드리지 않습니다):" -ForegroundColor Yellow
        $other | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
    }
    exit 0
}

$changed = git -c core.quotepath=false diff --staged --name-status content
Write-Host "  변경된 문서:" -ForegroundColor Yellow
$changed | ForEach-Object { Write-Host "    $_" }
$stat = git diff --staged --shortstat content
Write-Host "  $($stat.Trim())"

if ($DryRun) {
    Write-Host "`n■ DryRun — 커밋·push 하지 않았습니다." -ForegroundColor Magenta
    Write-Host "  스테이징은 남아 있습니다. 되돌리려면: git reset content" -ForegroundColor Magenta
    exit 0
}

# ─── 4. 커밋 ─────────────────────────────────────────────────────────────────
if (-not $Message) {
    $Message = "sync: 조사 문서 갱신 ($(Get-Date -Format 'yyyy-MM-dd HH:mm'))"
}
Write-Step "커밋"
git commit -m $Message --only content
if ($LASTEXITCODE -ne 0) { Fail "커밋 실패 (exit $LASTEXITCODE)" }
Write-Ok (git log --oneline -1)

# ─── 5. push ─────────────────────────────────────────────────────────────────
Write-Step "push (Vercel이 자동으로 재배포합니다)"
git push
if ($LASTEXITCODE -ne 0) {
    Fail "push 실패 (exit $LASTEXITCODE). 커밋은 남아 있으니 원인을 고친 뒤 'git push' 만 다시 하세요."
}

Write-Host "`n■ 발행 완료 — 2~3분 뒤 반영됩니다." -ForegroundColor Green
Write-Host "  https://personal-research-ten.vercel.app" -ForegroundColor Green
Write-Host "  확인: (Invoke-WebRequest 'https://personal-research-ten.vercel.app/' -UseBasicParsing).StatusCode"
