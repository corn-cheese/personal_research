# 배포 런북 (텅스텐 조사 → 공개 사이트)

- 공개 레포: **`corn-cheese/personal_research`** (public)
- 공개 수위: **A (전체 공개)** · 동기화: **① GitHub Actions 자동**
- 검색엔진 색인: **차단(noindex)** 적용됨

---

## 완료된 것

| 항목 | 상태 |
|---|---|
| Quartz v5 프로젝트 | `D:\Claude\tungsten-notes` (폴더명은 로컬용, 레포명과 달라도 무방) |
| `quartz.config.yaml` | `ko-KR`, Noto Sans KR, 제목 「텅스텐 조사」, analytics·latex·sitemap 끔 |
| `vercel.json` | `cleanUrls`, 빌드/출력 설정, **`X-Robots-Tag: noindex` 헤더** |
| `content/` | 완성 문서 11개 + `index.md` |
| `scripts/sync-content.mjs` | 선별·리네임·하이라이트/수식 정규화 |
| 공개 레포 push | **완료** (orphan `main`, 단일 초기 커밋) |
| Valley 워크플로 파일 | `Valley/.github/workflows/publish-tungsten.yml` 생성됨 (**아직 미커밋**) |

로컬 미리보기:

```bash
cd D:\Claude\tungsten-notes && npx quartz build --serve
```

---

## 남은 것 — 계정 권한 필요

### 1. Vercel 연결 (직접)

1. Vercel → **Add New → Project → `corn-cheese/personal_research` import**
2. 빌드 설정은 `vercel.json`이 지정하므로 그대로 둔다
   (Build `npx quartz build` / Output `public` / Install `npm install`)
3. Node 버전 **22.x** 확인 (`.node-version` = v22.16.0)
4. Deploy

### 2. baseUrl 확정

배포 주소가 나오면 `quartz.config.yaml`의 `baseUrl`을 실제 주소로 맞춘다.
현재 값은 추정치 `personal-research.vercel.app` (도메인에 밑줄을 못 써서 Vercel이 `_`→`-`로 바꾼다).

```bash
cd D:\Claude\tungsten-notes
# quartz.config.yaml 의 baseUrl 수정 후
git commit -am "chore: baseUrl 확정" && git push
```

> 화면 렌더에는 영향 없고 RSS/OG 이미지의 절대 URL에만 쓰인다.

### 3. 자동 동기화 켜기

1. **PAT 발급**: GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens**
   - Repository access: **`personal_research` 하나만**
   - Permissions: **Contents → Read and write**
2. **Valley에 시크릿 등록**: `corn-cheese/Valley` → Settings → Secrets and variables → Actions
   → New repository secret → 이름 **`PUBLIC_REPO_TOKEN`**, 값 = 위 PAT
3. **워크플로 커밋** (Valley에서):

   ```bash
   cd D:\Claude\Financial_Reports\Valley
   git add .github/workflows/publish-tungsten.yml
   git commit -m "ci: 텅스텐 조사 공개 사이트 동기화"
   git push
   ```

   > ⚠️ Valley엔 미커밋 변경(`CLAUDE.md` 수정, `NG 조사/`, `THM 조사/`, `QUARTZ_IMPLEMENTATION_PLAN.md`)이 있다.
   > `git add .` 쓰지 말고 **워크플로 파일만** 지정할 것.

### 4. 동작 확인

`텅스텐 조사/docs`의 문서에 한 줄 추가 → Valley push → Actions 실행 →
`personal_research`에 커밋 생성 → Vercel 재배포 → 수 분 내 반영. 확인 후 원복.

---

## 알아둘 것

- **latex 플러그인은 계속 꺼둘 것.** 본문 통화 표기(`$700`, `$232/mtu`) 848건을 remarkMath가 수식으로 오인식해 530곳이 깨졌다. remarkMath가 옵션 없이 등록돼 `singleDollarTextMath`를 못 끈다. 문서 3의 진짜 수식 1개는 동기화 스크립트가 평문으로 바꾼다. **앞으로 문서에 진짜 수식을 쓰려면 이 제약을 기억할 것.**
- **하이라이트 `==**굵게**==`** 는 Quartz가 내부 볼드를 못 읽어 `**`가 그대로 보인다. 동기화 스크립트가 `<span class="text-highlight"><strong>…</strong></span>`로 바꾼다. **원본(Valley)은 건드리지 않는다.**
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
