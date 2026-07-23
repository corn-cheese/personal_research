#!/usr/bin/env node
/**
 * Valley(private) `텅스텐 조사/docs` → tungsten-notes(public) `content/` 동기화
 *
 * 선별 규칙 (QUARTZ_IMPLEMENTATION_PLAN §4-2, 공개 수위 A = 전체 공개):
 *   - `docs/` 바로 아래 완성 문서(*.md)만 복사 → 하위 `_parts/`(조립 조각 30개)는 자동 제외
 *   - `5_전체_개괄.md`(v1)은 제외, `5_전체_개괄_v2.md`를 `5_전체_개괄.md`로 이름 변경해 복사
 *
 * 콘텐츠 정규화:
 *   - Obsidian 하이라이트 `==**X**==` 는 Quartz v5의 remark-obsidian이 하이라이트 내부를
 *     raw text로 캡처해 안쪽 `**볼드**`를 파싱하지 못한다(리터럴 ** 노출).
 *     → `<span class="text-highlight"><strong>X</strong></span>` 로 변환해 하이라이트+볼드 둘 다 보존.
 *   - 순수 `==X==` 는 Quartz가 정상 처리하므로 그대로 둔다.
 *   - 코드펜스(```)와 인라인 코드(`) 안쪽은 변환하지 않는다.
 *
 * 사용법:
 *   node scripts/sync-content.mjs "<source docs dir>" [dest content dir]
 */

import fs from "node:fs"
import path from "node:path"

const srcDir = process.argv[2]
const destDir = process.argv[3] ?? path.join(process.cwd(), "content")

if (!srcDir) {
  console.error('사용법: node scripts/sync-content.mjs "<source docs dir>" [dest content dir]')
  process.exit(1)
}
if (!fs.existsSync(srcDir)) {
  console.error(`source 디렉터리를 찾을 수 없습니다: ${srcDir}`)
  process.exit(1)
}
fs.mkdirSync(destDir, { recursive: true })

/** v1 중복 문서 — 개정본(v2)이 있으므로 공개 대상에서 제외 */
const EXCLUDE = new Set(["5_전체_개괄.md"])
/** 개정본을 깔끔한 이름으로 발행 */
const RENAME = new Map([["5_전체_개괄_v2.md", "5_전체_개괄.md"]])

let highlightCount = 0
let mathCount = 0

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

// 이전 동기화본(숫자로 시작하는 문서) 제거 → 삭제된 원본이 남지 않도록. index.md 등 수기 페이지는 보존.
for (const f of fs.readdirSync(destDir)) {
  if (/^\d/.test(f) && f.endsWith(".md")) fs.unlinkSync(path.join(destDir, f))
}

const entries = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter((e) => e.isFile() && e.name.endsWith(".md")) // 디렉터리(_parts) 자동 제외
  .map((e) => e.name)
  .sort()

let copied = 0
const skipped = []
for (const name of entries) {
  if (EXCLUDE.has(name)) {
    skipped.push(name)
    continue
  }
  const outName = RENAME.get(name) ?? name
  const raw = fs.readFileSync(path.join(srcDir, name), "utf8")
  const out = simplifyDisplayMath(normalizeHighlights(raw))
  fs.writeFileSync(path.join(destDir, outName), out, "utf8")
  copied++
  console.log(`  + ${name}${outName !== name ? ` → ${outName}` : ""}`)
}

console.log(
  `\n동기화 완료: ${copied}개 문서 복사, 하이라이트 ${highlightCount}건 정규화, 수식 ${mathCount}건 평문화`,
)
if (skipped.length) console.log(`제외(중복): ${skipped.join(", ")}`)
console.log(`(하위 _parts/ 조립 조각은 디렉터리이므로 자동 제외됨)`)
