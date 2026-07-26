#!/usr/bin/env node
/**
 * Valley(private) 조사 문서 → tungsten-notes(public) `content/` 동기화
 *
 * 여러 조사 묶음을 각자의 섹션 폴더로 내보낸다(아래 SECTIONS). 섹션을 추가할 때는
 * SECTIONS에 한 줄 넣고, Valley 워크플로의 `paths:` 트리거에도 같은 경로를 넣으면 된다.
 *
 * 선별 규칙 (QUARTZ_IMPLEMENTATION_PLAN §4-2, 공개 수위 A = 전체 공개):
 *   - 소스 디렉터리 바로 아래 완성 문서(*.md)만 복사 → 하위 `_parts/`(조립 조각)는 자동 제외
 *   - 섹션별 exclude/rename 으로 중복본·개정본을 정리 (텅스텐 §5 v1/v2)
 *
 * 콘텐츠 정규화:
 *   - Obsidian 하이라이트 `==**X**==` 는 Quartz v5의 remark-obsidian이 하이라이트 내부를
 *     raw text로 캡처해 안쪽 `**볼드**`를 파싱하지 못한다(리터럴 ** 노출).
 *     → `<span class="text-highlight"><strong>X</strong></span>` 로 변환해 하이라이트+볼드 둘 다 보존.
 *   - 순수 `==X==` 는 Quartz가 정상 처리하므로 그대로 둔다.
 *   - `$$...$$` 디스플레이 수식은 평문화한다(latex 플러그인이 통화 $ 오인식 때문에 꺼져 있음).
 *   - 코드펜스(```)와 인라인 코드(`) 안쪽은 변환하지 않는다.
 *
 * 각 섹션 폴더의 `index.md`(수기 작성한 목차)와 루트 `content/index.md`는 건드리지 않는다.
 *
 * 사용법:
 *   node scripts/sync-content.mjs "<valley root>" [dest content dir]
 *   예) node scripts/sync-content.mjs "D:/Claude/Financial_Reports/Valley"
 */

import fs from "node:fs"
import path from "node:path"

/**
 * 공개 대상 섹션.
 *   src    — Valley 루트 기준 상대 경로
 *   dest   — content/ 아래 섹션 폴더명 (URL 경로가 되므로 공백 대신 _)
 *   exclude/rename — 파일명 단위 선별
 */
const SECTIONS = [
  {
    label: "텅스텐 조사",
    src: "텅스텐 조사/docs",
    dest: "텅스텐_조사",
    // v1 중복 문서 — 개정본(v2)이 있으므로 공개 대상에서 제외
    exclude: ["5_전체_개괄.md"],
    // 개정본을 깔끔한 이름으로 발행
    rename: { "5_전체_개괄_v2.md": "5_전체_개괄.md" },
  },
  {
    label: "매크로 포워드 0727-0731",
    src: "매크로 포워드 0727-0731",
    dest: "매크로_포워드_0727-0731",
    exclude: [],
    rename: {},
  },
]

const valleyRoot = process.argv[2]
const contentDir = process.argv[3] ?? path.join(process.cwd(), "content")

if (!valleyRoot) {
  console.error('사용법: node scripts/sync-content.mjs "<valley root>" [dest content dir]')
  process.exit(1)
}
if (!fs.existsSync(valleyRoot)) {
  console.error(`Valley 루트를 찾을 수 없습니다: ${valleyRoot}`)
  process.exit(1)
}

let highlightCount = 0
let mathCount = 0
let linkCount = 0
let titleCount = 0

/** 코드펜스/인라인코드 밖에서만 변환기를 적용 */
function outsideCode(md, fn) {
  return md
    .split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g)
    .map((chunk, i) => {
      if (i % 2 === 1) return chunk // 코드펜스 그대로
      return chunk
        .split(/(`[^`\n]*`)/g)
        .map((seg, j) => (j % 2 === 1 ? seg : fn(seg)))
        .join("")
    })
    .join("")
}

function normalizeHighlights(md) {
  return outsideCode(md, (seg) =>
    seg.replace(/==\*\*([^\n]+?)\*\*==/g, (_m, inner) => {
      highlightCount++
      return `<span class="text-highlight"><strong>${inner}</strong></span>`
    }),
  )
}

/**
 * `$$...$$` 디스플레이 수식을 읽기 쉬운 평문으로 변환.
 * latex 플러그인을 껐기 때문에(통화 $ 오인식 방지) 남은 수식은 직접 풀어 쓴다.
 * 단순 구조(\frac, \sim, \approx, \% 등)만 지원하며, 그 외 명령은 백슬래시만 제거한다.
 */
function simplifyDisplayMath(md) {
  return md.replace(/\$\$([\s\S]+?)\$\$/g, (_m, body) => {
    mathCount++
    let s = body
      .replace(/\{,\}/g, ",") // 5{,}000 → 5,000 (중첩 중괄호 먼저 제거)
      .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1) / ($2)")
      .replace(/\\sim/g, "~")
      .replace(/\\approx/g, "≈")
      .replace(/\\times/g, "×")
      .replace(/\\cdot/g, "·")
      .replace(/\\%/g, "%")
      .replace(/\\left|\\right/g, "")
      .replace(/\\[a-zA-Z]+/g, (c) => c.slice(1)) // 미지원 명령은 백슬래시만 제거
      .replace(/[{}]/g, "")
      .replace(/\s+/g, " ")
      .trim()
    return s
  })
}

/**
 * 형제 문서를 가리키는 마크다운 링크의 잘못된 경로 접두사를 제거한다.
 *
 * 원본 문서들은 같은 `docs/` 안의 형제인데도 링크가 `](../1_텅스텐_총수요.md)` 처럼
 * `../` 를 달고 있거나(작성 당시의 잔재), 심지어 `](/mnt/user-data/uploads/.../5_전체_개괄.md)`
 * 같은 절대경로로 적혀 있다. 문서가 content/ 루트에 평평하게 놓였을 때는 `../` 가 루트 밖으로
 * 못 나가 우연히 맞는 곳에 떨어졌지만, 섹션 폴더로 옮긴 뒤에는 폴더 밖을 가리켜 깨진다.
 *
 * → 링크의 파일명이 **같은 섹션에서 실제로 발행되는 문서**일 때만 경로를 벗겨 형제 링크로 만든다.
 *   (`_parts/` 조각처럼 발행되지 않는 대상은 손대지 않는다 — 원본 그대로 두어야 원인이 드러난다.)
 */
function normalizeSiblingLinks(md, publishedNames) {
  return outsideCode(md, (seg) =>
    seg.replace(/\]\(([^)\n]+?\.md)(#[^)\n]*)?\)/g, (m, target, hash = "") => {
      const decoded = decodeURIComponent(target)
      const base = decoded.slice(decoded.lastIndexOf("/") + 1)
      if (base === decoded) return m // 이미 형제 링크 — 그대로
      const outName = publishedNames.get(base)
      if (!outName) return m // 발행 대상이 아님(_parts 조각 등) — 그대로
      linkCount++
      return `](${outName.replace(/ /g, "%20")}${hash})`
    }),
  )
}

/**
 * 문서 제목(`title:` 프론트매터)을 만들어 붙인다.
 *
 * 원본에 프론트매터가 없으면 Quartz는 **파일명**을 제목으로 쓴다. 텅스텐 문서는 파일명이
 * 한글이라 그나마 읽히지만, 매크로 문서는 `08_japan_tokyo_cpi_boj` 처럼 영문 스네이크케이스라
 * 빵부스러기·탐색기·검색결과·브라우저 탭이 전부 그렇게 나온다.
 *
 * 규칙: `<파일명의 번호>. <본문 H1>` — 번호를 남기는 이유는 탐색기 정렬이 제목 기준이라
 * 번호를 떼면 0·1·2…14 순서가 가나다순으로 흐트러지기 때문이다.
 * H1의 `문서 N.` 같은 중복 번호와, 사이드바에서 너무 길어지는 **말미의 날짜 절**은 덜어낸다.
 */
function buildTitle(outName, md) {
  const stem = outName.replace(/\.md$/, "")
  const num = stem.match(/^(\d+)/)?.[1] ?? ""

  const h1 = md.match(/^#\s+(.+?)\s*$/m)?.[1]
  // H1이 없는 문서(0번·6번)는 파일명에서 번호만 떼어 쓴다.
  let core = h1 ?? stem.replace(/^\d+[_\s]*/, "")

  core = core
    .replace(/^문서\s*/, "") // "문서 8. …" 의 접두어
    .replace(/^\d+(-v\d+)?\s*[.)]\s*/, "") // 중복 번호 "8. " / "5-v2. "
    // 말미의 날짜·시각 절 제거: " — 2026-07-31(금) 아침~낮 KST" 처럼
    // 구분선 뒤에 연도나 M/D 날짜가 있는 경우만. 부제(" — 가격의 제3축")는 남긴다.
    .replace(/\s+[—–-]\s+[^—–]*(?:\d{4}|\d{1,2}\/\d{1,2})[^—–]*$/, "")
    .trim()

  const title = num ? `${num}. ${core}` : core
  return title.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

/** 프론트매터가 없는 문서에 `title:` 을 붙인다(이미 있으면 손대지 않는다). */
function addTitleFrontmatter(md, outName) {
  if (/^---\r?\n/.test(md)) return md // 원본에 프론트매터가 있으면 그대로 존중
  titleCount++
  return `---\ntitle: "${buildTitle(outName, md)}"\n---\n\n${md.replace(/^﻿/, "")}`
}

let totalCopied = 0

for (const section of SECTIONS) {
  const srcDir = path.join(valleyRoot, section.src)
  const destDir = path.join(contentDir, section.dest)

  console.log(`\n[${section.label}] ${section.src} → content/${section.dest}/`)

  if (!fs.existsSync(srcDir)) {
    console.error(`  ! source 디렉터리를 찾을 수 없습니다: ${srcDir}`)
    process.exitCode = 1
    continue
  }
  fs.mkdirSync(destDir, { recursive: true })

  // 이전 동기화본(숫자로 시작하는 문서) 제거 → 원본에서 삭제된 문서가 남지 않도록.
  // index.md 등 수기 페이지는 숫자로 시작하지 않으므로 보존된다.
  for (const f of fs.readdirSync(destDir)) {
    if (/^\d/.test(f) && f.endsWith(".md")) fs.unlinkSync(path.join(destDir, f))
  }

  const exclude = new Set(section.exclude)
  const rename = new Map(Object.entries(section.rename))

  const entries = fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".md")) // 디렉터리(_parts) 자동 제외
    .map((e) => e.name)
    .sort()

  // 발행 대상 목록을 먼저 확정한다(링크 정규화가 "이 이름이 실제로 발행되는가"를 물어보므로).
  // 원본 파일명과 발행 파일명 둘 다 키로 넣어, 리네임 전 이름으로 걸린 링크도 따라가게 한다.
  const publishedNames = new Map()
  for (const name of entries) {
    if (exclude.has(name)) continue
    const outName = rename.get(name) ?? name
    publishedNames.set(name, outName)
    publishedNames.set(outName, outName)
  }

  let copied = 0
  const skipped = []
  for (const name of entries) {
    if (exclude.has(name)) {
      skipped.push(name)
      continue
    }
    const outName = rename.get(name) ?? name
    const raw = fs.readFileSync(path.join(srcDir, name), "utf8")
    const body = normalizeSiblingLinks(
      simplifyDisplayMath(normalizeHighlights(raw)),
      publishedNames,
    )
    const out = addTitleFrontmatter(body, outName)
    fs.writeFileSync(path.join(destDir, outName), out, "utf8")
    copied++
    console.log(`  + ${name}${outName !== name ? ` → ${outName}` : ""}  「${buildTitle(outName, body)}」`)
  }
  totalCopied += copied
  console.log(`  ${copied}개 복사${skipped.length ? ` · 제외(중복): ${skipped.join(", ")}` : ""}`)
}

console.log(
  `\n동기화 완료: 총 ${totalCopied}개 문서, 하이라이트 ${highlightCount}건 정규화, ` +
    `수식 ${mathCount}건 평문화, 형제 링크 ${linkCount}건 경로 교정, 제목 ${titleCount}건 생성`,
)
console.log(`(하위 _parts/ 조립 조각은 디렉터리이므로 자동 제외됨)`)
