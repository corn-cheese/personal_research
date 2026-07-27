# 배포 런북 (리서치 노트 → 공개 사이트)

- 공개 레포: **`corn-cheese/personal_research`** (public)
- 공개 수위: **A (전체 공개)** · 동기화: **로컬에서 `publish.ps1` 직접 실행** (Actions 자동 동기화는 쓰지 않기로 함)
- 검색엔진 색인: **차단(noindex)** 적용됨

```
Valley (private)  ──[publish.ps1]──▶  personal_research (public)  ──[Vercel 자동]──▶  사이트
```

Vercel은 **공개 레포를 직접** 지켜본다. 즉 push만 되면 빌드·배포는 자동이고,
사람이 할 일은 왼쪽 구간(원본 → 공개 레포) 하나뿐이다.

---

## 발행하기 (평소 작업)

```bash
cd D:\Claude\tungsten-notes
```

```bash
.\publish.ps1
```

동기화 → 변경 확인 → 커밋 → push 를 한 번에 한다. 2~3분 뒤 사이트에 반영된다.

| 옵션 | 용도 |
|---|---|
| `-DryRun` | 무엇이 바뀌는지만 보고 커밋·push 하지 않는다 |
| `-Build` | push 전에 로컬 Quartz 빌드로 검증한다 (실패 시 커밋 안 함) |
| `-Message "..."` | 커밋 메시지 지정 (기본값은 `sync: 조사 문서 갱신 (시각)`) |
| `-ValleyRoot "..."` | Valley 위치가 다를 때 |

`content/` 만 스테이징하므로 `quartz.config.yaml`·`scripts/` 변경은 직접 커밋해야 한다.
원본과 공개본이 같으면 아무것도 하지 않고 끝난다(멱등).

> ⚠️ `publish.ps1` 은 **UTF-8 BOM** 으로 저장해야 한다. Windows PowerShell 5.1은 BOM이 없으면
> `.ps1` 을 ANSI로 읽어 한글 문자열이 깨진다. 편집 후 BOM이 사라졌으면:
> `$t=[IO.File]::ReadAllText($p,[Text.Encoding]::UTF8); [IO.File]::WriteAllText($p,$t,(New-Object Text.UTF8Encoding $true))`
>
> ⚠️ 스크립트에 `$ErrorActionPreference = "Stop"` 을 넣지 말 것. PS 5.1은 네이티브 exe의 stderr를
> ErrorRecord로 감싸는데, git은 CRLF 경고·push 진행상황을 정상적으로 stderr에 쓴다.
> Stop이면 **성공한 git 호출에도 스크립트가 죽는다**(실제로 그렇게 죽었다).
> 대신 호출마다 `$LASTEXITCODE` 를 확인한다.

---

## 완료된 것

| 항목 | 상태 |
|---|---|
| Quartz v5 프로젝트 | `D:\Claude\tungsten-notes` (폴더명은 로컬용, 레포명과 달라도 무방) |
| `quartz.config.yaml` | `ko-KR`, Noto Sans KR, 제목 「리서치 노트」, analytics·latex·sitemap 끔 |
| `vercel.json` | `cleanUrls`, 빌드/출력 설정, **`X-Robots-Tag: noindex` 헤더** |
| `content/텅스텐_조사/` | 완성 문서 15개 (0~14) + `index.md` |
| `content/매크로_포워드_0727-0731/` | 완성 문서 9개 (00~08) + `index.md` |
| `scripts/sync-content.mjs` | 다중 소스 선별·리네임·정규화(하이라이트/수식/형제링크/제목) |
| `publish.ps1` | 동기화+커밋+push 한 방 스크립트 (평소 발행 수단) |
| 공개 레포 push | **완료** |
| Valley 워크플로 | 자동 동기화를 안 쓰기로 해서 **제거 대상** — 아래 참조 |

로컬에서 눈으로 확인하려면 (빌드 후 정적 서브):

```bash
node ./quartz/bootstrap-cli.mjs build
```

```bash
npx -y serve -l 8099 public
```

`http://localhost:8099`. 동기화만 따로 돌리려면:

```bash
node scripts/sync-content.mjs "D:/Claude/Financial_Reports/Valley"
```

---

## 섹션을 추가할 때

두 곳을 **같이** 고쳐야 한다. 한 곳만 고치면 조용히 안 돌거나 실패한다.

1. `scripts/sync-content.mjs` 의 **`SECTIONS`** — 소스 폴더 / 발행 폴더명 / exclude·rename
2. (자동 동기화를 되살린 경우에만) `Valley/.github/workflows/publish-research.yml` 의
   **`paths:`** 트리거 — 여기 빠지면 그 폴더를 고쳐도 워크플로가 아예 실행되지 않는다.
   `publish.ps1` 로 수동 발행할 때는 `SECTIONS` 만 고치면 된다.

그리고 `content/<새 섹션>/index.md` 목차와 루트 `content/index.md` 허브에 링크를 추가한다.
(섹션 폴더의 `index.md` 는 숫자로 시작하지 않으므로 동기화가 지우지 않는다)

---

## 사이트 주소

**https://personal-research-ten.vercel.app**

> `personal-research.vercel.app` 은 **무관한 타인의 Next.js 프로젝트**가 이미 선점한 주소다. 헷갈리지 말 것.
> Vercel 프로젝트 `corn-cheeses-projects/personal-research` 가 GitHub 레포에 연결돼 있어 **push하면 자동 재배포**된다.

섹션 주소:

- 텅스텐 조사 — <https://personal-research-ten.vercel.app/텅스텐_조사/>
- 매크로 포워드 0727-0731 — <https://personal-research-ten.vercel.app/매크로_포워드_0727-0731/>

---

## 남은 것 — Valley의 워크플로 제거

자동 동기화를 쓰지 않기로 했으므로, Valley에 커밋돼 있는 워크플로는 **지우는 게 맞다.**
`PUBLIC_REPO_TOKEN` 시크릿이 없어서, 원본 폴더를 고쳐 Valley에 push할 때마다
**실패한 Actions 실행과 실패 알림 메일이 쌓인다.**

```bash
cd D:\Claude\Financial_Reports\Valley
```

```bash
git rm .github/workflows/publish-research.yml
```

```bash
git commit -m "ci: 자동 동기화 워크플로 제거 (로컬 수동 발행으로 전환)"
```

```bash
git push
```

> ⚠️ 여기서 **`git add .` 을 절대 쓰지 말 것.** Valley엔 미커밋 상태인 조사 원본
> (`매크로 포워드 0727-0731/`, `텅스텐 조사/docs/11~14`, `월가아재_멘토링/week4/`)이 있어 함께 올라간다.
> 그 문서들은 이미 공개 사이트에 반영돼 있지만, Valley 히스토리에 넣을지는 별개 판단이다.

Valley에 push하기 싫으면 대신 GitHub Actions 탭에서 해당 워크플로를 `Disable` 해도 된다.
나중에 자동화를 되살리려면 git 히스토리에서 복구한 뒤 위 PAT 시크릿을 등록하면 된다
(fine-grained PAT, `personal_research` 하나만, Contents → Read and write).

### 자동 동기화를 되살렸을 때의 동작 확인

Actions → **Publish 리서치 노트 → public site** → `Run workflow`(수동 실행) 로 확인하는 게
가장 간단하다. 성공하면 `personal_research`에 `sync:` 커밋이 생기고 Vercel이 수 분 내 재배포한다.
(원본 문서를 건드려 트리거를 확인하려면 `텅스텐 조사/docs` 또는 `매크로 포워드 0727-0731` 아래를 고쳐야 한다.)

---

## 알아둘 것

- **latex 플러그인은 계속 꺼둘 것.** 본문 통화 표기(`$700`, `$232/mtu`) 848건을 remarkMath가 수식으로 오인식해 530곳이 깨졌다. remarkMath가 옵션 없이 등록돼 `singleDollarTextMath`를 못 끈다. 문서 3의 진짜 수식 1개는 동기화 스크립트가 평문으로 바꾼다. **앞으로 문서에 진짜 수식을 쓰려면 이 제약을 기억할 것.**
- **하이라이트 `==**굵게**==`** 는 Quartz가 내부 볼드를 못 읽어 `**`가 그대로 보인다. 동기화 스크립트가 `<span class="text-highlight"><strong>…</strong></span>`로 바꾼다. **원본(Valley)은 건드리지 않는다.**
- **원본의 형제 링크에 `../` 가 붙어 있다.** 같은 `docs/` 안의 형제인데도 `](../1_텅스텐_총수요.md)`
  처럼 적혀 있고, 한 곳은 `](/mnt/user-data/uploads/.../5_전체_개괄.md)` 절대경로다. 문서가 `content/`
  루트에 평평하게 있을 때는 `../` 가 루트 밖으로 못 나가 **우연히** 맞는 곳에 떨어졌는데, 섹션 폴더로
  옮기면 폴더 밖을 가리켜 깨진다. 동기화 스크립트가 **발행 대상 문서명과 일치할 때만** 경로를 벗긴다.
  `_parts/` 조각을 가리키는 링크(36개)는 원본 그대로 두므로 여전히 깨진 상태다 — 발행 대상이 아니고,
  고치려면 원본을 손대야 하므로 의도적으로 남겼다.
- **제목은 동기화 스크립트가 만든다.** 원본에 프론트매터가 없어서 Quartz가 파일명을 제목으로 쓴다.
  매크로 문서는 `08_japan_tokyo_cpi_boj` 같은 영문 스네이크케이스라 빵부스러기·탐색기·검색결과·
  브라우저 탭이 전부 그렇게 나왔다. 이제 `<번호>. <본문 H1>` 로 생성한다.
  **번호를 떼지 말 것** — 탐색기 정렬이 제목 문자열 기준이라 번호가 없으면 0·1·2…14 순서가 흐트러진다.
  원본에 프론트매터를 직접 쓰면 스크립트는 그 문서를 건드리지 않는다.
- **`ignorePatterns`에 `5_전체_개괄.md`를 넣지 말 것.** v1 제외/v2 리네임은 동기화 스크립트가 source 단계에서 처리하므로, 여기 넣으면 리네임된 v2 본문이 통째로 사라진다(실제로 한 번 사라졌다).
- **`quartz.config.yaml`은 `quartz.config.default.yaml`을 병합이 아니라 완전 대체**한다. 플러그인 하나만 바꾸려 해도 전체 파일을 유지해야 한다.
- **이미지**는 `post-image.valley.town` 외부 URL 그대로다(12개 로드 확인). CDN이 사라지면 깨지므로 장기 보관이 필요하면 레포 미러링을 고려.
- **noindex**는 `vercel.json`의 `X-Robots-Tag` 헤더로 건다. `robots.txt`로 막지 않은 이유는, 크롤링을 막으면 크롤러가 noindex 지시 자체를 못 읽어 URL만 색인될 수 있기 때문이다. 색인을 다시 허용하려면 이 헤더를 지우고 `enableSiteMap: true`로 되돌리면 된다.
- 공개 레포 히스토리는 **orphan 단일 커밋**으로 시작했다(Quartz upstream 히스토리 미포함).
- ⚠️ **실행 권한 비트 주의 (Windows 함정).** 이 저장소는 `core.filemode=false`(Windows)라 git이 실행 비트를 감지하지 못한다.
  파일을 새로 추가하면 `100644`로 기록되는데, shebang이 있는 실행 파일이 그렇게 올라가면
  **Linux(Vercel)에서 실행되지 않아 빌드가 exit 1로 실패한다.** 실제로 첫 배포가 이 이유로 실패했다.
  새로 추가하는 실행 파일은 아래처럼 비트를 직접 세울 것:

  ```bash
  git update-index --chmod=+x <파일경로>
  ```

  현재 `100755`로 맞춰둔 파일: `quartz/bootstrap-cli.mjs`, `quartz/bootstrap-worker.mjs`,
  `quartz/plugins/loader/install-plugins.ts`, `scripts/sync-content.mjs`.
- 빌드 명령은 `npx quartz build`가 아니라 **`node ./quartz/bootstrap-cli.mjs build`** 를 쓴다.
  `quartz`가 `node_modules/.bin`에 링크되지 않아 `npx`가 레지스트리에서 엉뚱한 패키지를 받아올 수 있고,
  실행 비트에도 의존하게 되기 때문이다.
