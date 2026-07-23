# personal_research

개인 리서치 노트를 웹으로 읽기 위한 정적 사이트. 현재 콘텐츠는 **텅스텐(W) 원광 및 EQ Resources(ASX: EQR) 조사**.

- 사이트 생성기: [Quartz v5](https://quartz.jzhao.xyz/) (MIT, `LICENSE.txt`)
- 호스팅: Vercel
- 본문은 `content/`에 있으며, 별도 비공개 저장소의 원본에서 자동 동기화된다 (`scripts/sync-content.mjs`)
- 배포·운영 절차는 [DEPLOY.md](DEPLOY.md) 참고

## 로컬 실행

```bash
npm install
npx quartz build --serve
```

`http://localhost:8080`

---

이 저장소는 검색엔진 색인을 차단한다(`X-Robots-Tag: noindex`).
내용은 개인의 조사와 의견이며 투자 권유가 아니다.
