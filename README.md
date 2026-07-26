# personal_research

개인 리서치 노트를 웹으로 읽기 위한 정적 사이트. 현재 콘텐츠는 두 섹션이다.

- **텅스텐 조사** — 텅스텐(W) 원광 및 EQ Resources(ASX: EQR) 등 3사 밸류에이션 (15개 문서)
- **매크로 포워드 0727-0731** — 2026-07-27~31 주간 매크로 이벤트 사전 조사 (9개 문서)

<!-- -->

- 사이트 생성기: [Quartz v5](https://quartz.jzhao.xyz/) (MIT, `LICENSE.txt`)
- 호스팅: Vercel
- 본문은 `content/`에 있으며, 별도 비공개 저장소의 원본에서 자동 동기화된다 (`scripts/sync-content.mjs`)
- 배포·운영 절차는 [DEPLOY.md](DEPLOY.md) 참고

## 로컬 실행

```bash
npm install
node ./quartz/bootstrap-cli.mjs build
npx -y serve -l 8099 public
```

`http://localhost:8099` (`npx quartz build` 는 쓰지 말 것 — 이유는 DEPLOY.md 참고)

---

이 저장소는 검색엔진 색인을 차단한다(`X-Robots-Tag: noindex`).
내용은 개인의 조사와 의견이며 투자 권유가 아니다.
