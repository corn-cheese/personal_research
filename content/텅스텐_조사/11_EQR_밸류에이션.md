---
title: "11. EQR 밸류에이션 — 가격×생산 매트릭스와 요인 분석"
---

# 11. EQR 밸류에이션 — 가격×생산 매트릭스와 요인 분석

> 조사: opus5 xhigh (병렬 서브에이전트) · 검증/결론: fable5 (오케스트레이터) · 2026-07-26
> 파일 구성: §V(검증·결론, fable5) + 이하 원 조사 보고서 전문

---

## §V. 오케스트레이터 검증 및 결론 (fable5)

### V-1. 검증 방법과 결과

| 검증 항목 | 방법 | 결과 |
|---|---|---|
| 모델 계산 | 재현 스크립트 4개(eqr_model/sens/recon/ev.py) 전량 재실행 | **보고서 수치 100% 재현** (NAV, 9셀 매트릭스, 민감도, 역산 전부) |
| Forrest 16.8% 인수 | 외부 교차검증 (Bloomberg 2026-07-20, EQR ASX 공시 PDF, Mining.com US$133M) | **확인** — 862,131,779주 ÷ 5.14B = 16.77% ✓, A$189.7M ÷ 862.1M = A$0.220/주 ✓ |
| 시총 산술 | 5.14B × A$0.27 = A$1,388M | ✓ |
| 실현율 67% 역산 | A$160M × 0.6973 ÷ 118,946 mtu = US$938/mtu | ✓ (연평균 APT ≈$1,400 대비 67%) |
| APT 앵커 $3,100 | SMM 2026-06-11: APT CIF Rotterdam **$3,000–3,200/mtu** 안정 | **확인** |
| 중국 내수가 | SMM: 광둥 업체 7월 상반월 실집행가 **RMB 600,000/t (전월 −180,000)** ≈ $955/mtu | **보고서($1,195, 7/2 기준)보다 더 하락 진행 중** — 괴리 −61.5% → **−69% 부근으로 확대** |

### V-2. 하방 앵커 정합화 (3사 공통화 재계산)

본 보고서의 Bear(APT $1,450, 부분수렴)는 **3사 중 가장 관대한 하방**이다 (ALM 보고서는 $1,203 완전수렴, KMT는 $1,240). 동일 모델로 공통 앵커 재계산:

| Bear 정의 | APT | NAV/주(기본) | 현 주가 대비 |
|---|---|---|---|
| 본 보고서 (부분수렴, 서방 프리미엄 +21% 잔존) | $1,450 | A$0.1467 | −46% |
| **공통 하방 (−60%, KMT 보고서 기준)** | **$1,240** | **A$0.0946** | **−65%** |
| 완전수렴 (ALM 보고서 기준) | $1,203 | A$0.0854 | −68% |
| 공통 하방 × 생산 하방 (최악셀) | $1,240 | A$0.0034 | **−99% (사실상 전손)** |

**⇒ EQR의 하방은 보고서 헤드라인(−46%)이 아니라 −46~−68% 밴드로 읽어야 하며, 중국 내수가가 7월에도 급락 중이므로 수렴 목표가 자체가 내려가고 있다.**

### V-3. 남은 미확인 사항 (에이전트 자진신고 + 검증 후 잔존)

1. **할인율 8% · 존속 20년** — 가장 논쟁적 가정. 12% + 10년 상한이면 기본 NAV ≈ A$0.37(+37%)로 안전마진 소멸 (보고서 §6-3-C가 스스로 명시). 종합결론(문서 14)에서 3사 공통 할인율 비교 참조.
2. Q4 FY26 Appendix 5B 미게재 (기한 07-31) — 현금원가 정상화 $430, Mt Carbine 흑자전환 여부 미확정.
3. 생산 기본 200k mtu는 FY26 실적(118,946)의 1.68배 — 공격적. 시장내재 역산이 보여주듯 시장도 이를 다 믿지 않는 상태.
4. 실현율 67%는 역산 2건 근거, 계약 원문 미확인.
5. S&P/ASX 300 편입 여부 미확인.

### V-4. 결론 판정 (fable5)

1. **조사 신뢰 판정: 채택.** 계산 재현·핵심 사실 외부 확인 완료. 원안 검증(생산 −45% 과대, 원가 +146% 과소, 그러나 APT 2배가 상쇄)은 사용자 기존 모델에 대한 가장 중요한 업데이트다 — **"결론은 맞았지만 이유가 달랐다"는 것은 엣지가 아니라 경고**다.
2. **EQR = 하한 없는 순수 APT 지수 롱.** 내재가치 1요인은 국제 APT(±10%→±13.8%), 주가 1요인은 내러티브(Forrest 하루 +34%). 매트릭스 9셀 중 6셀이 현 주가 상회하나, 손실 3셀(가격 하방 행)은 공통 앵커 기준 −65% 이하로 깊다.
3. **가장 유용한 산출물은 역산이다**: 현 주가 A$0.27은 APT US$1,947(스팟 −37%)을 내포. 즉 시장은 이미 상당한 가격 조정을 할인했고, "APT 유지 + 램프업"이 동시에 성립하면 업사이드, 가격 수렴이 오면 하한이 없다.
4. **행동 관측 우선순위**: ① 07-31 Appendix 5B (자산별 원가·Mt Carbine 마진) ② 중국 내수가 추가 급락 여부(수렴 방아쇠) ③ 분기 실현율 60% 하회 여부 ④ 신주 발행 빈도.

---

*이하 원 조사 보고서 전문 (opus5 xhigh, 2026-07-26 작성) — 수치·출처 원문 유지.*

---

# EQ Resources Limited (ASX: EQR) — 텅스텐 밸류에이션 심층 조사

**작성 기준일: 2026-07-26** · 통화: A$(호주달러) 기준, US$ 병기 · AUD/USD = **0.6973** (tradingeconomics, 2026-07-24)

> **한 줄 요약**: 사용자의 기존 NAV 모델은 **생산량 가정(216,565 mtu)이 FY26 실적(118,946 mtu)의 1.8배로 과대**하고 **현금원가($232/mtu)가 실측치($571/mtu)의 40% 수준으로 과소**했다. 그러나 이 두 오류를 모두 교정해도 **국제 APT가가 $1,500 → $3,100/mtu로 2배 상승**한 효과가 이를 압도하여, 기본 시나리오 NAV는 여전히 현 주가 대비 **+106%**다. 문제는 이 상승분의 대부분이 **가격 한 변수**에 실려 있고, 그 가격이 중국 내수가 대비 **2.6배**라는 정책 인위성 위에 서 있다는 점이다.

---

## 0. 사용자 기존 모델 대비 무엇이 바뀌었나 (Executive Diff)

| 항목 | 사용자 원안 (2026-01/02) | **본 조사 확인치 (2026-07)** | 방향 |
|---|---|---|---|
| 국제 APT가 | US$1,500/mtu | **US$3,100/mtu** (CIF Rotterdam, 2026-06-25) | ▲ +107% |
| FY26 생산량 | 216,565 mtu (Mt Carbine 2배 가정) | **118,946 mtu 실적** (전년 대비 **−29%**) | ▼ −45% |
| 광산 실현율 (실현가/APT) | 70% | **≈67%** (FY26·Q4 FY26 역산으로 검증 — 원안 유효) | ≈ 유지 |
| 그룹 현금원가 | US$232/mtu (FY25 Q2 기준) | **US$571/mtu** (Q3 FY26 실측), 정상화 추정 $430 | ▲ +146% |
| 주가 / 시총 | A$0.18 / A$857M | **A$0.27 / A$1,388M** | ▲ +50% |
| 발행주식수 | 약 4.76억×1000 = 4.761B(역산) | **5.14B** (2026-07-10) | ▲ +8% |
| 옵션(희석) | 481.8M | **300M** (대량 행사 완료) | ▼ 희석여력 축소 |
| 대주주 | Oaktree 15.96% | **Oaktree 전량 매각 → Andrew Forrest 16.8%** (2026-07-20) | 구조 전환 |
| 존속연수 | 18.79년 | 매장량/생산량 (기본 20년 상한) | 유사 |

**브리지(가정을 하나씩 갱신, APT $3,100 고정):**

| 단계 | 주당 NAV | Δ |
|---|---|---|
| ① 사용자 원안 (216,565mtu · 70% · $232 · 18.79y · 세율30% · 4.761B주) | A$0.8414 | — |
| ② 생산량 → 200,000 mtu (FY26 실적 118,946 기반 현실화) | A$0.7767 | −8% |
| ③ 현금원가 $232 → $430 | A$0.6969 | −10% |
| ④ 실현율 70% → 67% | A$0.6594 | −5% |
| ⑤ 존속 20y 상한 · 세율 28% | A$0.6972 | +6% |
| ⑥ 주식수 4.761B → 5.14B | A$0.6458 | −7% |
| ⑦ + 로열티2.5%·본사비·유지capex·성장capex·램프업 | **A$0.5561** | −14% |

즉 원안 대비 **−34%** 하향되나, 원안이 쓴 APT $1,500를 그대로 적용하면 주당 A$0.357(당시 주가 대비 +98%)였으므로 **가격 상승이 모델 오류를 상쇄하고도 남았다**.

---

## 1. 최신 현황

### 1-1. 주가·자본구조 (확인일 2026-07-24 / 2026-07-26)

| 항목 | 값 | 출처·기준일 |
|---|---|---|
| 주가 | **A$0.270** (전일종가 A$0.275) | Investing.com, 2026-07-24 |
| 일중 레인지 / 52주 레인지 | A$0.260–0.275 / **A$0.028–0.390** | Investing.com, 2026-07-24 |
| 연초 대비 / 12개월 | **+243% / 약 +694%** | Kalkine 2026-07-17; Investing.com |
| 발행주식수 | **5.14 B** | EQR Investor Presentation, 2026-07-14 (as at 2026-07-10) |
| 옵션 | **300 M** | 동상 |
| 완전희석 주식수 | **5.44 B** | 산출 |
| 시가총액 (기본 / 완전희석) | **A$1,388M / A$1,469M** | 산출 @A$0.27 |
| 현금 (2026-06-30) | **A$28M** (+1,384% YoY) | ASX "Platform set to capitalise…", 2026-07-09 |
| 매출채권 | A$17M | 동상 |
| 총차입 | 약 A$44M (스페인/Traxys €15M, Cronimet A$7.2M, 로열티부채·리스 포함) | stockanalysis.com; Q3 FY26 분기보고서 |
| **순부채(모델 적용)** | **약 A$20M** | 산출(오프테이크 선수금 버퍼 포함) |
| 대주주 | **Wonongarra(Andrew Forrest) 16.8%** — Oaktree 전량 인수 | ASX 공시 2026-07-20 |
| 애널리스트 | 2개사, 목표가 A$0.36–0.37 | Investing.com / stockanalysis.com |

**Forrest 거래 세부**: 2026-07-17 합의·07-20 공시. 862,131,779 보통주 + 35,555,556 옵션, 총 **A$189.7M(≈US$132.5M)** → **주당 A$0.220**의 장외 블록. 발표 당일 장중 +34.1%(고가 A$0.295). Oaktree(2023년 구제금융성 투자자) **완전 엑시트**, 이사 지명권 승계. → **신규 자금 유입 없는 소유권 이전**이며 생산·원가 개선 이벤트가 아님에 유의.

### 1-2. 최근 실적 (FY26 = 2025-07 ~ 2026-06)

| 분기 | 그룹 생산 (mtu WO₃) | 실현가 (US$/mtu) | 현금원가 (US$/mtu) | 마진 |
|---|---|---|---|---|
| Q1 FY26 (2025-09) | 28,834 | — | — | — |
| Q2 FY26 (2025-12) | 38,292 | **478** | **232** | 51% |
| Q3 FY26 (2026-03, 50년래 폭우·침수) | 23,505 | **1,004** | **571** | 43% |
| Q4 FY26 (2026-06) | **28,315** | ≈1,946 (매출역산) | 미공시 | — |
| **FY26 합계** | **118,946** (**−29% YoY**) | ≈938 (연간역산) | — | — |

- 자산별 FY26: **Mt Carbine 28,280 mtu / Barruecopardo 90,666 mtu** (Investor Presentation 2026-07-14)
- Q4 FY26 자산별: **Mt Carbine 13,050 mtu (+175% QoQ) / Barruecopardo 15,265 mtu**
- FY26 매출 **A$160M (+142% YoY)**, Q4 단독 매출 **A$79M (+140% QoQ, 사상 최대)**
- **Q3 FY26 Mt Carbine은 마이너스 마진**: 현금원가 $1,452 > 실현가 $1,189 (저품위 스톡파일 0.10~0.14% WO₃ 의존 + 저가동률). 같은 분기 Barruecopardo는 원가 $349 / 실현가 $965 (마진 64%).
- **회복 확인**: Barruecopardo 침수(약 190만 ㎥ 배수) 복구 완료, 2026-07-08 첫 발파·07-13 남부갱(120만 t @ **0.186% WO₃** — 기존 대비 고품위) 채굴 재개.

> ⚠️ **정식 Appendix 5B(Q4 FY26 분기활동보고서)는 2026-07-26 현재 미게재** (ASX 제출기한 07-31). 위 Q4 수치는 2026-07-09 ASX 공시 "Platform set to capitalise on Record Price Environment"의 헤드라인이며, **자산별 원가·실현가 명세는 아직 공개되지 않았다.**

### 1-3. 자산·매장량

| | Mt Carbine (호주 QLD) | Barruecopardo/Saloro (스페인) |
|---|---|---|
| 자원량 (JORC) | 41.4 Mt @ 0.23% WO₃ (**9,377,883 mtu**) | 22.9 Mt @ 0.20% WO₃ |
| **확정매장량(Reserve)** | 14.80 Mt @ 0.147% (**2,178,765 mtu**) | 13.87 Mt @ 0.14% (**1,890,888 mtu**) |
| 매장량/자원량 | 23% | 45% |
| 매장량 기준 광산수명 | 8년 (채광권 19년) | 9년 |
| 회사 목표 생산 | 2,250 t WO₃/yr = **225,000 mtu** | >1,600 t/yr = **>160,000 mtu** |
| FY26 실적 | 28,280 mtu (목표의 **12.6%**) | 90,666 mtu (목표의 **57%**) |

**합계 확정매장량 4,069,653 mtu** (사용자 원안과 동일 — 검증 완료).
그룹 목표(aspirational) **>3,850 t/yr = 385,000 mtu** — FY26 실적의 **3.24배**.

### 1-4. 오프테이크 구조 — **순수 지수연동, 하한 없음** (재확인)

| 상대 | 내용 |
|---|---|
| Masan High-Tech Materials | 호주(Mt Carbine) 생산량 **100% 오프테이크** |
| Traxys Europe (2026-02) | €15M/3년 선지급 facility + Barruecopardo 5년 마케팅계약, 최소 **3,500 t WO₃/yr**, 명목 약 A$4억(5년) |
| Cronimet | 오프테이크 선지급 A$5.1M + 운전자금 A$2.1M (2026-03 잔액) |

- **가격결정**: Fastmarkets APT 지수 연동, 경영진 확인 **"M 또는 M−1"** (당월/전월 지수) → 약 1개월 시차의 근실시간 전가.
- **가격 상한(cap) 조항 미발견 / 가격 하한(floor) 조항도 미발견.** Investor Presentation(2026-07-14)은 "**Long-term spot-priced agreements**", "**unhedged spot-price exposure**"로 명시.
- → **Almonty–GTP 계약이 갖는 $183/mtu 하한 같은 하방 방어장치가 EQR에는 없다.** 상방 레버리지가 큰 대신 하방도 무방비.

### 1-5. 정부 지원·자본조달

| 항목 | 상태 |
|---|---|
| 호주 연방보조금 A$600만 + QLD주 대출 A$2,000만 (합 **A$2,600만**) | **확정·집행** — 3사(EQR/Almonty/G6M) 중 유일한 확정 정부지원 |
| 미 EXIM US$34M Letter of Interest (2025-06-27) | **13개월째 정체** — Term Sheet/최종계약 전환 소식 없음 |
| 호주 핵심광물 생산세액공제(CMPTI) | 가공원가의 **10% 세액공제**, 2027-07-01~2040-06-30, 텅스텐 포함 (**본 모델 미반영 = 상방 옵션**) |
| Mt Carbine 확장 | **A$39M 승인**(2026-06-03), 파쇄 capa 1→2 Mtpa, **Q3 FY27 시운전**, 저품위 스톡파일 처리로 **+500 t WO₃/yr(=50,000 mtu)**. 자금원: 보유현금+영업CF |
| 희석 이력 | 발행주식 **1년간 +69.9%** / H1 FY26 반기 납입자본 +71%. 2026-07 중에도 6·8·13·22일 신주 quotation 공시 반복(옵션 행사) |

---

## 2. 밸류에이션 모델 — 방법론과 가정

### 2-1. 방법론

**확정매장량 기반 DCF-NAV**. 사용자 원안(단순 연금식)을 계승하되 다음을 추가했다: ①생산 램프업 곡선, ②매출연동 로열티, ③본사관리비, ④유지 capex(=감가상각 대용), ⑤성장 capex, ⑥순부채 차감, ⑦매장량 소진 로직(연도별 차감, 20년 상한).

```
FCF_t = [Q_t × (APT × 실현율) × (1−로열티) − Q_t × 현금원가 − 본사비]
        − 세금 − Q_t × 유지capex − 성장capex_t
NAV   = Σ FCF_t / (1+r)^t − 순부채       (t = 1 … min(매장량/Q, 20))
```

### 2-2. 가정표

| 변수 | 값 | 근거 |
|---|---|---|
| **실현율** (광산 실현가 ÷ 국제 APT) | **67%** | FY26 역산 US$938 / APT 연평균 ≈$1,400 = 67%; Q4 FY26 역산 US$1,946 / M−1 APT ≈$2,900 = 67%. **2개 독립 검증** |
| **현금원가** (US$/mtu) | 생산 하방 600 / 기본 430 / 상방 380 | Q2 FY26 $232(153k mtu 연환산) ↔ Q3 FY26 $571(94k 연환산). 고정비 흡수 효과를 물량에 연동 |
| **매출 로열티** | 2.5% | Regal Resources Royalties Fund(Mt Carbine) + Oaktree US$7.5M 로열티 |
| **본사관리비** | US$12M/yr | FY25 손익 기준 추정 |
| **유지 capex (=D&A)** | US$40/mtu | 업계 통상치 |
| **성장 capex** | US$27M (A$39M) 1차연도 일시 | Mt Carbine 확장 승인액 |
| **할인율** | **8%** (실질) | 사용자 원안 계승. ※ 10~12%가 더 방어적 — §5 민감도 참조 |
| **세율** | **28%** (호주30%/스페인25% 혼합) | 이월결손 A$80.95M은 **미반영(보수적)** |
| **확정매장량** | 4,069,653 mtu | Mt Carbine 2,178,765 + Barruecopardo 1,890,888 |
| **존속연수** | min(매장량÷생산량, **20년**) | 자원량은 매장량의 2.3~4.3배이나 **미반영(보수적)** |
| **램프업** | 1차년 70%, 2차년 90%, 3차년~ 100% (하방 시나리오는 100% 즉시) | 현 run-rate 대비 증산 필요분 반영 |
| **주식수** | 기본 5.14B / 완전희석 5.44B | 2026-07-10 |
| **순부채** | A$20M | 총차입 A$44M − 현금 A$28M + 선수금 버퍼 |
| **AUD/USD** | 0.6973 | 2026-07-24 |

### 2-3. 생산 시나리오 축 (최신 가이던스 기준 조정)

| 시나리오 | 정상상태 생산 | 근거 |
|---|---|---|
| **하방 (램프업 정체)** | **113,260 mtu/yr** | Q4 FY26 실적 28,315 mtu × 4 |
| **기본 (가이던스 부분달성)** | **200,000 mtu/yr** | Barruecopardo 130k(월 11k run-rate·설계 160k) + Mt Carbine 70k(Iolanthe 고품위 + 확장 +50k). **FY26 대비 1.68배** |
| **상방 (가이던스 근접·증설)** | **300,000 mtu/yr** | 회사 목표 385,000 mtu의 **78% 달성**. 애널리스트 FY27 매출 A$837M 추정치가 내포하는 281,000 mtu와 정합 |

> 회사 공식 목표(385,000 mtu)를 "기본"에 놓지 않은 이유: FY26 실적이 목표의 **30.9%**, Mt Carbine은 목표의 **12.6%**에 불과하며, 회사 스스로 이를 "aspirational objectives"로 표기하고 "commissioning·mine scheduling·ore availability·funding 성공 조건부"라고 단서를 달았다.

---

## 3. 과제1 — 가격 시나리오별 내재가치

### 3-1. 3층 가격 앵커 확정 (2026-07 실측)

**실측 현황 (기준일 명시):**

| 지표 | 값 | 출처 · 기준일 |
|---|---|---|
| **국제 APT** (88.5% WO₃ min, CIF Rotterdam/Baltimore) | **US$3,100/mtu** | critical-minerals-news.com, **2026-06-25** |
| 국제 APT (레인지) | US$3,000–3,265/mtu | CTIA 영문판, **2026-07-07 / 07-08** |
| 국제 APT (EQR 인용) | US$3,000/mtu | EQR ASX 공시, **2026-06-30 기준** |
| **중국 내수 APT** | US$105,775/t = **US$1,195/mtu** | critical-minerals-news.com, **2026-07-02** |
| 중국 내수 APT (교차확인) | RMB 660,000/t ≈ US$1,099/mtu | CTIA, 2026-07-07 (CNY/USD 6.787 내재) |
| 중국 65% 흑중석 정광 | RMB 455,000/t | CTIA, 2026-07-07 |
| 중국 65% 백중석 정광 | RMB 454,000/t | CTIA, 2026-07-07 |
| 중국 탄화텅스텐 분말 | RMB 1,000/kg ≈ US$147/kg | CTIA, 2026-07-08 |
| 중국 70% 페로텅스텐 | RMB 700,000/t ≈ US$147/kg W | CTIA, 2026-07-08 |
| **페로텅스텐 CIF Rotterdam (75%)** | **US$210/kg W** | critical-minerals-news.com, **2026-06-25** |
| 페로텅스텐 FOB China | US$205/kg W | 동상, 2026-07-02 |

**⇒ 실측 이중시장 괴리: 중국 내수 APT는 국제가 대비 −61.5% (국제가 = 내수가의 2.59배).**
과제 지시문의 "−40~−50%" 가정보다 **괴리가 훨씬 크다.** (사용자 문서 5_v2의 "−55~68%" 프레임과는 정합.)
※ 흥미로운 비대칭: **페로텅스텐 괴리는 −30%에 그쳐** APT(−61.5%)보다 훨씬 작다 — 중국의 수출통제가 APT/정광 단계에 집중되고 합금 단계에는 덜 걸려 있음을 시사.

**세 시나리오 수치화 (3층 전부):**

| 층 | **하방 Bear** | **기본 Base** | **상방 Bull** |
|---|---|---|---|
| **(b) 제련 — 국제 APT (US$/mtu)** | **1,450** (−53%) | **3,100** (0%) | **4,350** (+40%) |
| **(a) 원광 — EQR 실현 정광가 (US$/mtu)** = 67%×APT | **972** | **2,077** | **2,914** |
| **(c) 산출물 — 페로텅스텐 Rotterdam (US$/kg W)** | **98** | **210** | **294** |
| 참조: 중국 내수 APT 대비 배율 | 1.21× | 2.59× | 3.64× |

**시나리오 근거:**
- **Base**: 현 국제가 유지. 2026-06-25 실측 $3,100. 중국 쿼터 1차 +3.45%에 그쳐 단기 공급 증가분 미미, 명단 2027년말까지 동결.
- **Bear ($1,450, −53%)**: 중국 정책 완화 또는 재고 방출로 국제가가 내수가($1,195) 방향으로 **86.6% 수렴** [(3,100−1,450)÷(3,100−1,195)]. 완전수렴이 아닌 이유 — DFARS/비중국 조달 의무와 물류·관세가 만드는 잔여 서구 프리미엄(**+21.3%**, 즉 $1,450 = $1,195 × 1.213)이 남는다고 가정. 사용자 문서 5_v2의 원광 하락 −50% 프레임과 정합.
- **Bull ($4,350, +40%)**: 역사적 유사 사례 근거 — ①2026-03-13 **단일 세션 +36%** 급등으로 $3,000 도달(SMM/metal.com), ②12개월 **+900%** 상승 실적(NAI500, 2026-04), ③일본 칸토덴카·센트럴글래스 WF6(세계 정제 capa 25%) **2026-07-01 영구 중단**, 재인증 18~24개월. +40%는 2026년 실현 변동성 대비 **보수적**.

### 3-2. 가격 시나리오별 주당 내재가치 (생산 기본 200,000 mtu 고정)

| 시나리오 | APT | 실현가 | 존속 | **NAV/주 (기본주식수)** | 현주가 대비 | **NAV/주 (완전희석)** | 현주가 대비 |
|---|---|---|---|---|---|---|---|
| **상방 Bull** | $4,350 | $2,914 | 20년 | **A$0.8663** | **+221%** | A$0.8185 | +203% |
| **기본 Base** | $3,100 | $2,077 | 20년 | **A$0.5561** | **+106%** | A$0.5255 | +95% |
| **하방 Bear** | $1,450 | $972 | 20년 | **A$0.1467** | **−46%** | A$0.1386 | −49% |

**확률가중 기대 NAV** (사용자 문서 5_v2 확률 적용 — 12M 상승30/보합55/하락15):
- 생산 기본 고정: **A$0.5878 (+118%)**
- 생산축까지 가중(상방20/기본45/하방35): **A$0.5212 (+93%)**, 완전희석 A$0.4924 (+82%)

---

## 4. 과제2 — 가격 × 생산 9셀 매트릭스

### 4-1. 기본 주식수 기준 (5.14B주) — A$/주 (현 주가 A$0.27 대비 %)

| 가격 ＼ 생산 | **상방 300,000 mtu** | **기본 200,000 mtu** | **하방 113,260 mtu** |
|---|---|---|---|
| **상방 APT $4,350** | **A$1.1176 (+314%)** | A$0.8663 (+221%) | A$0.4572 (+69%) |
| **기본 APT $3,100** | A$0.7304 (+171%) | **A$0.5561 (+106%)** | A$0.2748 (**+2%**) |
| **하방 APT $1,450** | A$0.2192 (−19%) | A$0.1467 (−46%) | **A$0.0340 (−87%)** |

### 4-2. 완전희석 기준 (5.44B주) — A$/주 (현 주가 대비 %)

| 가격 ＼ 생산 | **상방 300,000 mtu** | **기본 200,000 mtu** | **하방 113,260 mtu** |
|---|---|---|---|
| **상방 APT $4,350** | **A$1.0560 (+291%)** | A$0.8185 (+203%) | A$0.4320 (+60%) |
| **기본 APT $3,100** | A$0.6901 (+156%) | **A$0.5255 (+95%)** | A$0.2597 (**−4%**) |
| **하방 APT $1,450** | A$0.2071 (−23%) | A$0.1386 (−49%) | A$0.0322 (−88%) |

**범위: A$0.0322 ~ A$1.1176 (현 주가 대비 −88% ~ +314%) — 35배 스프레드.**

### 4-3. USD 환산 병기 (기본 주식수, US$/주)

| 가격 ＼ 생산 | 상방 | 기본 | 하방 |
|---|---|---|---|
| **상방** | US$0.779 | US$0.604 | US$0.319 |
| **기본** | US$0.509 | US$0.388 | US$0.192 |
| **하방** | US$0.153 | US$0.102 | US$0.024 |

### 4-4. 매트릭스 판독

1. **NAV가 현 주가를 밑도는 셀은 가격 하방 3셀뿐** (9셀 중 3셀). 즉 **현 주가는 "가격이 반토막 나지 않는다"에 베팅한 수준**이며, 생산 램프업이 완전히 실패해도(하방 생산) 기본 가격만 유지되면 주가는 대략 정당화된다(+2%).
2. **비대칭이 크다**: 가격 하방 × 생산 하방(−87%)의 손실이 가격 상방 × 생산 상방(+314%)의 이익과 대략 3.6 : 1이나, 확률(12M 하락 15%)을 곱하면 기대값은 강하게 (+)다.
3. **생산 상방의 한계효용이 체감한다**: 300,000 mtu에서는 매장량이 **13.6년**에 소진돼(20년 상한 미달) 증산의 NPV 기여가 잘린다. **EQR의 상방을 제약하는 것은 처리능력이 아니라 확정매장량**이다. 자원량(Mt Carbine 9.38M mtu 등)의 매장량 전환이 다음 리레이팅 축.

### 4-5. 시장 내재가정 (역산)

| 질문 | 답 |
|---|---|
| A$0.27을 정당화하는 APT는? (생산 기본) | **US$1,947/mtu** — 현 스팟 $3,100 대비 **−37%** |
| 생산 하방(113,260)이면? | **US$3,067/mtu** ≈ 현 스팟 |
| 생산 상방(300,000)이면? | US$1,614/mtu |
| 현 APT $3,100에서 주가를 정당화하는 생산량은? | **103,125 mtu/yr** — FY26 실적(118,946)보다도 낮음 |
| APT 하방 $1,450이면 필요 생산량은? | 692,303 mtu/yr — **매장량상 불가능** |

**⇒ 시장은 대략 "현 생산 수준 + APT $3,100 유지" 또는 "생산 2배 + APT −37%" 중 하나를 가격에 반영하고 있다.** 둘 다 동시에 성립하면 상당한 업사이드가 남는다.

### 4-6. 참고 배수

| 지표 | 값 |
|---|---|
| EV (시총 A$1,388M + 순부채 A$20M) | **A$1,408M (US$982M)** |
| EV / 확정매장량 | US$241/mtu (현 APT의 7.8%) |
| EV/EBITDA (기본가 × 하방생산) | 6.6× |
| EV/EBITDA (기본가 × 기본생산) | **3.2×** |
| EV/EBITDA (기본가 × 상방생산) | 2.0× |

FY27 예시 손익 (기본가격 US$2,077/mtu 실현):
- 하방 113,260 mtu → 매출 A$337M, EBITDA A$214M (마진 64%)
- 기본 200,000 mtu → 매출 A$596M, EBITDA **A$440M** (마진 74%)
- 상방 300,000 mtu → 매출 A$894M, EBITDA A$691M (마진 77%)

※ 애널리스트 컨센서스(1~2개사) FY27 매출 A$837M / 이익 A$476M은 본 모델의 **상방 생산 시나리오에 근접**. 커버리지가 얇아 신뢰도 낮음.

---

## 5. 과제3 — 요인 분석

### 5-1. 민감도 계산 (기본 셀 A$0.5561 대비)

| 변수 | +10% | −10% | **\|탄력성\|** | 순위 |
|---|---|---|---|---|
| **국제 APT 가격** | +13.8% | −13.8% | **13.8** | **1** |
| **실현율 (APT 대비 %)** | +13.8% | −13.8% | **13.8** | **1(공동)** |
| **주식수 (희석)** | −9.1% | +11.1% | **10.1** | **3** |
| **생산량** | +7.8% | −10.6% | **9.2** | **4** |
| 할인율 | −6.0% | +6.6% | 6.3 | 5 |
| 세율 | −4.0% | +4.0% | 4.0 | 6 |
| **현금원가** | −2.9% | +2.9% | **2.9** | **7** |

**비(非)10% 충격:**

| 충격 | 영향 |
|---|---|
| 존속연수 20년 → 10년 | **−33.6%** |
| 할인율 8% → 12% | **−25.1%** |
| 주식수 +30% (추가 희석) | **−23.1%** |
| 할인율 8% → 6% | +17.7% |
| 존속연수 20년 → 15년 | −13.6% |
| 세율 28% → 21% | +9.9% |
| 순부채 A$20M → A$220M | −7.0% |
| 존속연수 20년 → 30년 | **+1.6%** (거의 무의미 — 8% 할인 하에서 20년 이후 현금흐름은 잔여가치가 없다시피) |

### 5-2. 【내재가치 요인】 랭킹

| 순위 | 요인 | 왜 | 관측 지표 |
|---|---|---|---|
| **1** | **국제 APT 가격** (±10% → ±13.8%) | 순수 지수연동·무헤지·상하한 없음. M/M−1로 1개월 내 전가. 레버리지 >1인 유일한 대변수 | Fastmarkets APT CIF Rotterdam 주간 |
| **2** | **실현율 (67%)** | 수학적으로 APT와 동일 탄력성. 그러나 **관측 난이도가 훨씬 높다** — 계약 재협상·정광 품위 하락·TC/RC 인상이 조용히 갉아먹을 수 있음. **가장 과소평가된 리스크** | 분기별 실현가 ÷ M−1 APT |
| **3** | **매장량·존속연수** (20→10년 = −33.6%) | 단일 최대 충격. 확정매장량이 자원량의 23%(Mt Carbine)에 불과. 상방 생산 시 13.6년으로 단축돼 증산 효과를 스스로 잠식 | JORC 매장량 업데이트, 시추결과 |
| **4** | **희석/주식수** (+30% → −23.1%) | 1년간 +69.9% 실적. 확장 capex A$39M + 잠재 프로젝트 자금수요 | Appendix 2A/3B 발행 공시 빈도 |
| **5** | **생산량** (±10% → ~±9.2%) | 비대칭: 하방(−10.6%)이 상방(+7.8%)보다 큼 — 매장량 제약 때문 | 분기 mtu |
| 6 | 할인율/리스크 프리미엄 | 8%→12%면 −25.1%. Forrest 편입·계속기업 주석 해소는 이 채널로 작동 | 신용 스프레드, 감사의견 |
| **7** | **현금원가** (±10% → ±2.9%) | **의외로 최하위.** 현 가격($2,077 실현 vs $430 원가)에서 마진이 79%라 원가 민감도가 구조적으로 눌려 있다. **단, 가격 하방 시나리오에서는 순위가 급등**한다 |

> **핵심 결론(내재가치)**: **국제 APT 가격 > 실현율 > 매장량/존속연수**. 원가는 현 가격대에서 거의 무의미하나, APT가 $1,450으로 내려가면 Mt Carbine은 다시 마이너스 마진 구간(원가 $1,452 실측 사례)에 진입한다 — 즉 **원가는 "상시 중요 변수"가 아니라 "가격 하방에서만 켜지는 스위치"**다.

### 5-3. 【주가(시장가격) 요인】 랭킹

| 순위 | 요인 | 현 상태 (2026-07) | 방향 |
|---|---|---|---|
| **1** | **내러티브 / 유명투자자 후광** | **Andrew Forrest 16.8% 인수(07-20) 단일 뉴스로 장중 +34.1%.** 신규 자금 유입 0, 생산·원가 개선 0인 **순수 소유권 이전**인데도 시총 A$1.4B 재평가. 서방 최대 텅스텐 생산자 서사 | ▲▲ (단, 되돌림 위험) |
| **2** | **APT 스팟 모멘텀** | 12개월 +900%, YTD +243%. 주가–APT 베타 ≈1. 다만 2026-07-17 하루 −9.18% 등 되돌림 시작 징후 | ▲▼ |
| **3** | **희석 / 물량 부담** | 발행주식 1년 +69.9%. 2026-07에만 4회 신주 quotation. 잔여 옵션 300M(5.8%). **주가 상승률이 APT 상승률에 미달한 핵심 원인** | ▼▼ |
| **4** | **오버행 / 대주주 회전** | Oaktree(A$0.05 매수 추정)가 A$0.22에 전량 엑시트 = **약 4.4배 차익 실현**. Macquarie 5.19%(2026-01) 등 기관 회전 진행 중. "기관→개인 물량 이전" 가능성 상존 | ▼ |
| **5** | **인덱스 편입** | 시총 A$1.4B로 S&P/ASX 300 편입 요건에 진입. 유동성 요건 충족 시 패시브 매수 유발 (**미확인 — 검증 필요**) | ▲ (잠재) |
| **6** | **유동성** | 일거래량 21.5M주(회전율 0.42%). 소형주 치고는 양호하나 A$1.4B 시총 대비 얇음 → 양방향 변동성 증폭 | ▲▼ |
| **7** | **정보 공백 / 공시 지연** | **Q4 FY26 Appendix 5B 미게재**(07-31 기한). 자산별 원가·마진 미공개 상태에서 주가만 선행. 게재 시 재평가 이벤트 | ▲▼ |
| 8 | 공매도 | ASIC 공매도 잔고 미확인(데이터갭). 급등주 특성상 존재 추정 | ▼ (미확인) |

> **핵심 결론(주가)**: **내러티브(Forrest 후광) > APT 모멘텀 > 희석**. 2026-07 한 달만 놓고 보면 **주가를 움직인 것은 펀더멘털이 아니라 대주주 교체 뉴스 하나**였다.

### 5-4. 통합 결론 — 무엇이 가장 큰 영향인가

**국제 APT 가격이 내재가치와 주가 양쪽에서 1~2위를 차지하는 유일한 변수다.**
그러나 **시간축이 다르다**:

- **12개월 이내**: 주가는 **내러티브·모멘텀·희석**이 지배한다. Forrest 뉴스가 하루에 +34%를 만든 반면, FY26 생산량이 **−29%** 역성장했다는 사실은 주가에 거의 반영되지 않았다.
- **24개월 이상**: 내재가치 요인(APT × 실현율 × 매장량)으로 수렴한다.

**따라서 이 종목의 진짜 위험은 "가격이 틀리는 것"이 아니라 "가격이 맞아도 실현율·매장량·희석 세 채널로 주주 몫이 새는 것"이다.** 원가 인플레이션은 사용자 문서가 크게 다뤘으나, 정량적으로는 **7개 변수 중 최하위(±2.9%)**로 확인됐다 — 현 가격대에 한해서다.

---

## 6. 결론 · 리스크 · 반증 조건

### 6-1. 결론

1. **사용자 원안의 "Upside 약 2배" 결론은 우연히 여전히 유효하나, 이유가 완전히 바뀌었다.** 원안은 생산 216,565 mtu와 원가 $232로 낙관했고 APT $1,500로 비관했다. 실제로는 생산이 118,946 mtu(−45% vs 가정), 원가가 $571(+146%)로 악화됐지만 **APT가 2배 오르며 상쇄**했다. **모델의 정확도가 아니라 오차의 상쇄가 결론을 유지시켰다** — 이는 재현 가능한 우위가 아니다.
2. **기본 시나리오 NAV A$0.5561 (완전희석 A$0.5255), 현 주가 대비 +106%(+95%).** 확률가중 기대 NAV는 A$0.52 (+93%).
3. **현 주가 A$0.27은 APT US$1,947/mtu(스팟 −37%)를 내포한다.** 시장은 이미 상당한 가격 조정을 할인해 놓았다 — 사용자의 "엄청 싸지 않다"는 판단보다 **시장은 덜 낙관적**이다.
4. **9셀 중 6셀이 현 주가 상회.** 손실 셀은 전부 가격 하방 행. **가격 하방(12M 확률 15%) 하나가 유일한 실질 파괴 경로.**
5. **Forrest 편입은 펀더멘털 이벤트가 아니다.** Oaktree → Forrest 소유권 이전이며 회사로 유입된 신규 자본은 0. 주가 +34%는 순수 재평가. **이 재평가 부분(약 A$300M 이상)은 되돌림 가능한 가치다.**
6. **EQR은 하한 없는 순수 지수 롱이다.** Almonty의 GTP 하한($183/mtu) 같은 방어장치가 없다. 상방을 원한다면 정확한 도구이나, 하방 방어를 원한다면 잘못된 도구다.

### 6-2. 주요 리스크

| 리스크 | 실현 여부 | 심각도 |
|---|---|---|
| **중국 정책 완화 → 국제가 내수가 수렴** | 미실현 (내수가 −61.5% 괴리 5개월+ 지속에도 정책 불변) | **최대** — 단독으로 −46~−87% |
| **램프업 미달** | **이미 실현** — FY26 −29% 역성장, 회사 목표 대비 30.9% | 높음 |
| **운영 차질(기상)** | **이미 2회 실현** — Q3 FY26 50년래 폭우로 그룹 −39% | 중간(복구 확인됨) |
| **원가 인플레이션** | **이미 실현** — $232→$571, 마진 51%→43%. 확장전략 자체가 저품위 스톡파일 처리 = 구조적 원가 상승 내장 | 중간(가격 하방 시 高) |
| **지분 희석** | **진행 중** — 1년 +69.9%, 2026-07에만 4회 | 중간 |
| **매장량 제약** | 구조적 — 확정매장량이 자원량의 23~45% | 중간 |
| **Appendix 5B 정보 공백** | Q4 FY26 미게재 (07-31 기한) | 단기 高 |
| **Mt Carbine 세그먼트 적자** | H1 FY26 호주 A$1,625만 적자 vs 스페인 A$929만 흑자 | 중간 |
| **정부 마진 규제** | **근거 없음** — 다수 구매자·지수연동 구조상 록히드마틴식 메커니즘 부재 | 낮음 |

### 6-3. 반증 조건 — 이 결론이 틀리려면 무엇이 관측되어야 하는가

**A. "기본 NAV +106%" 결론이 틀리려면 (하방 반증):**

1. **중국 상무부 쿼터 +15~20% 증량 또는 수출허가 명단 확대**, 그리고 해관 월간 APT 수출이 0톤대 → 수백 톤으로 회복. (현재: 2026년 1차 쿼터 +3.45%만, 명단 2027년말까지 동결)
2. **국제 APT 4주 연속 −15% 이상 하락 & 국제/내수 배율 1.5배 이하로 축소.** (현재 2.59배, 5개월+ 유지)
3. **분기 실현율이 APT의 60% 미만으로 하락** — 계약 재협상·정광 품위 저하 신호. (현재 67%, 2회 검증)
4. **Q4 FY26 Appendix 5B에서 Mt Carbine이 여전히 마이너스 마진**이고 그룹 현금원가가 US$600/mtu를 상회.
5. **FY27 상반기(2026-12 분기) 그룹 생산이 30,000 mtu를 하회** — 즉 램프업이 Q4 FY26 수준에서 정체.
6. **12개월 내 발행주식수 +20% 이상 추가 희석** (신규 자본조달 A$200M+ 규모).
7. Forrest/Wonongarra의 조기 매각 또는 이사 지명권 미행사.

**B. "이미 상당 부분 선반영, 안전마진 부족" 결론이 틀리려면 (상방 반증):**

1. **Mt Carbine 확장(A$39M)이 Q3 FY27 예정대로 시운전**되고 분기 생산이 **50,000 mtu**를 넘어섬 (= 연 200,000 mtu 궤도).
2. **미 EXIM US$34M이 Letter of Interest → Term Sheet/최종 대출계약으로 전환** (13개월 정체 해소). 또는 EXIM "Project Vault"($100억) 대상에 텅스텐/EQR 편입.
3. **JORC 매장량 대폭 증가** — Mt Carbine 7,830m(27홀, 2026-04 착수)·Barruecopardo 12,200m(37홀, 2026-05 착수) 시추 결과로 매장량/자원량 비율이 23% → 40%+ 상승. 존속연수 제약(민감도 3위)이 완화.
4. **미 DLA 텅스텐 실물 매입 공고 또는 EU 비축 배정에 EQR 정광 편입** — Almonty–GTP식 전속 계약 체결.
5. **호주 CMPTI(가공원가 10% 세액공제, 2027-07 시행) 적용 확정** — 본 모델 미반영.
6. **S&P/ASX 300 편입 확정** — 패시브 자금 유입.
7. Barruecopardo 남부갱(0.186% WO₃) 품위 개선이 원가를 US$350/mtu 이하로 되돌림.

**C. 모델 방법론 자체가 틀리려면:**

- 할인율 8%가 부적절 — 계속기업 주석 이력·단일상품·소형주 리스크를 감안하면 12%가 타당할 수 있다. 그 경우 기본 NAV는 **A$0.4166 (+54%)**로 하락하며, 매트릭스 중앙 셀의 매력이 크게 감소한다.
- 20년 상한이 관대 — 매장량 기준 실제 광산수명은 Mt Carbine 8년·Barruecopardo 9년이다. **10년 상한을 적용하면 기본 NAV는 A$0.3692 (+37%)**로 떨어지며, 이 경우 "안전마진 없음"이 정확한 판정이 된다. **이것이 본 보고서에서 가장 논쟁적인 가정이다.**

### 6-4. 확신도 등급

| 항목 | 확신도 | 비고 |
|---|---|---|
| 주가·시총·주식수 | **높음** | 회사 공시 직접 확인 |
| FY26 생산량 118,946 mtu | **높음** | ASX 공시 + 프레젠테이션 2개 교차 |
| 국제 APT $3,100 | **높음** | 3개 출처 교차 (EQR 공시 포함) |
| 중국 내수가 괴리 −61.5% | **중간~높음** | 2개 출처, 환율 내재 역산 |
| 실현율 67% | **중간~높음** | 2회 독립 역산, 단 계약 원문 미확인 |
| 현금원가 정상화 $430 | **중간** | Q4 FY26 자산별 원가 미공개 |
| 생산 시나리오 200k/300k | **낮음~중간** | 회사 목표는 385k이나 실적 괴리 극심 |
| 순부채 A$20M | **중간** | 6월말 총차입 원문 미확인 |
| 할인율 8% · 존속 20년 | **낮음** | 사용자 원안 계승, 방법론적 논쟁 지점 |

---

## 7. 출처 목록

### 회사 1차 자료 (ASX)
- EQ Resources, ASX 공시 "Platform set to capitalise on Record Price Environment", 2026-07-09 — https://www.eqresources.com.au/site/pdf/c87b9d68-57d3-4b9e-9c32-6d312aacc697/Platform/ListPage/Platform-set-to-capitalise-on-Record-Price-Environment.pdf
- EQ Resources, "EQR Investor Presentation", 2026-07-14 — https://www.eqresources.com.au/site/pdf/30e71243-2105-4040-8639-74d02ae7f964/Platform/ListPage/EQR-Investor-Presentation.pdf
- EQ Resources, "Dr Andrew Forrest AO to acquire a 16.8% interest in EQR", 2026-07-20 — https://www.eqresources.com.au/site/showdownloaddoc.aspx?AnnounceGuid=6869fc4a-ec9f-4318-95a5-528e737af9f7&Platform=Email
- EQ Resources, "Quarterly Activities/Appendix 5B Cash Flow Report – March 2026", 2026-04-28 — https://www.eqresources.com.au/site/pdf/01f9b10e-4a8d-4ddd-838a-3b73d6a865a7/Quarterly-ActivitiesAppendix-5B-Cash-Flow-ReportMarch-2026.pdf
- EQ Resources, "Updated Investor Presentation", 2025-10-22 — https://www.eqresources.com.au/site/pdf/4eaec4b8-e3e9-4c68-86ad-991bb802e2c3/Updated-Investor-Presentation.pdf
- EQ Resources, ASX 공시 목록 — https://www.eqresources.com.au/site/invest-in-us/asx-announcements
- EQ Resources, 2025 Annual Report — https://www.eqresources.com.au/site/pdf/3de677b5-a70e-4942-884d-23cb80f7cebc/2025-Annual-Report.pdf

### 가격 (텅스텐)
- Critical Minerals News, "Tungsten Price Today: APT Spot, Market & Outlook" (APT CIF Rotterdam $3,100/mtu 2026-06-25; 중국 내수 APT $105,775/t 2026-07-02; FeW Rotterdam $210/kg W) — https://critical-minerals-news.com/tungsten-price/
- CTIA(厦门中钨在线) 영문판, "Tungsten Prices Fall Back to End-of-2025 Levels", 2026-07-07 — https://www.ctia.com.cn/en/news/51337.html
- CTIA 영문판, "Tungsten Market Demand Under Pressure", 2026-07-08 — https://www.ctia.com.cn/en/news/51387.html
- SMM/metal.com, "European Tungsten Market Surges 36%, APT Prices Hit $3,000/mtu Amid Tight Supply Conditions", 2026-03-13 — https://news.metal.com/newscontent/103804145-european-tungsten-market-surges-36-apt-prices-hit-3000mtu-amid-tight-supply-conditions
- NAI 500, "Rotterdam APT Trading Up 900% Over 12 Months, Tungsten Crisis Explained", 2026-04 — https://nai500.com/blog/2026/04/rotterdam-apt-trading-up-900-over-12-months-tungsten-crisis-explained/
- Fastmarkets, "Tungsten prices | APT, concentrate & ferro-tungsten" (벤치마크 정의) — https://www.fastmarkets.com/metals-and-mining/minor-metals/tungsten-prices/
- Fastmarkets, "Tungsten markets fragmenting as domestic Chinese APT market diverges from exports" — https://www.fastmarkets.com/insights/tungsten-markets-fragmenting-as-domestic-chinese-apt-market-diverges-from-exports/

### 주가·재무 데이터
- Investing.com, EQ Resources Ltd (ASX:EQR) — https://www.investing.com/equities/carbine-tungsten-ltd
- stockanalysis.com, EQ Resources (ASX:EQR) Statistics — https://stockanalysis.com/quote/asx/EQR/statistics/
- Simply Wall St, EQ Resources (ASX:EQR) Forecast — https://simplywall.st/stocks/au/materials/asx-eqr/eq-resources-shares/future
- Stocklight, EQ Resources (ASX:EQR) — https://stocklight.com/stocks/au/asx-eqr/eq-resources
- TradingEconomics, AUD/USD (2026-07-24, 0.6973) — https://tradingeconomics.com/australia/currency

### 실적·운영 (2차)
- Investing.com, "Earnings call transcript: EQ Resources Q3 2026", 2026-05 — https://www.investing.com/news/transcripts/earnings-call-transcript-eq-resources-q3-2026-highlights-strong-financial-performance-93CH-4643471
- The Bull, "EQ Resources Shares Holding Strong on Record Production", 2026-07-09/10 — https://thebull.com.au/news/eq-resources-shares-holding-strong-on-record-production/
- Kalkine, "EQ Resources (ASX:EQR) Shares Fall Around 9% as the Tungsten Rally Takes a Breather", 2026-07-17 — https://kalkine.com.au/news/general-news/eq-resources-limited-asxeqr-shares-fall-around-9-as-the-tungsten-rally-takes-a-breather
- Mining.com.au, "EQ Resources greenlights Mt Carbine expansion project", 2026-06-03 — https://mining.com.au/eq-resources-greenlights-mt-carbine-expansion-project/
- Kalkine, "EQ Resources (ASX:EQR) Bets A$39 Million on Doubling Mt Carbine's Capacity" — https://kalkine.com.au/news/mining/eq-resources-asxeqr-bets-a39-million-on-doubling-mt-carbines-capacity
- Kalkine, "EQ Resources (ASX:EQR) Share Price in Focus as Southern Pit Mining Restarts", 2026-07-13 — https://kalkine.com.au/news/mining/eq-resources-asxeqr-share-price-in-focus-as-southern-pit-mining-restarts
- Proactive Investors, "Andrew Forrest takes 16.8% stake in EQ Resources", 2026-07-20 — https://www.proactiveinvestors.com/companies/news/1095677/
- Discovery Alert, "Andrew Forrest's $190M EQ Resources Tungsten Stake Explained", 2026-07 — https://discoveryalert.com.au/andrew-forrest-eq-resources-tungsten-critical-minerals-2026/
- Stocks Down Under, "Andrew Forrest takes 16.8% of EQ Resources (ASX:EQR) as Oaktree exits" — https://stocksdownunder.com/eq-resources-asxeqr-andrew-forrest-oaktree-stake/
- Mining Weekly, "Australia's EQ Resources surges as billionaire Andrew Forrest takes 16.8% stake", 2026-07-20 — https://www.miningweekly.com/article/australias-eq-resources-surges-as-billionaire-andrew-forrest-takes-168-stake-2026-07-20
- NAI 500, "Forrest Stake in EQ Resources Shifts Tungsten Story", 2026-07 — https://nai500.com/blog/2026/07/forrest-stake-in-eq-resources-shifts-tungsten-story/
- Mining.com, "EQ Resources receives EXIM letter of interest for Mt Carbine tungsten project" — https://www.mining.com/eq-resources-receives-exim-letter-of-interest-for-mt-carbine-tungsten-project-in-queensland/
- Mining-technology.com, "EQ Resources secures $124m worth of tungsten long-term offtake agreements" — https://www.mining-technology.com/news/eq-resources-offtake-tungsten/
- Skillings Mining Review, "EQ Resources Finalizes Major Tungsten Offtake Agreement with Traxys" — https://skillings.net/eq-resources-finalizes-major-tungsten-offtake-agreement-with-traxys/
- Smallcaps.com.au, "EQ Resources to acquire Vietnam's largest ferrotungsten plant in $13.5m deal" — https://smallcaps.com.au/eq-resources-acquire-vietnam-largest-ferrotungsten-plant/
- EXIM.gov, "EXIM Approves Project Vault Loan…", 2026-02-02 — https://www.exim.gov/news/project-vault

### 사용자 기존 조사 문서 (참조·검증 대상)
- `0_기존 EQR 투자 근거.md` — 원본 NAV 모델 (본 보고서 §0에서 검증·갱신)
- `4_EQ_Resources.md` — 분기별 실현가/원가 실측치, 오프테이크 구조, 재무제표 분해
- `5_전체_개괄_v2.md` — 이중시장 2차원 시나리오 프레임, 확률(12M 30/55/15, 24M 47/25/28), 밸류체인 3분해
- `10_대안_비교_실행.md` — EQR/Almonty/G6M 대조, 정부지원 A$2,600만, GTP 하한 $183/mtu 분석
- `7_중국_정책_리버설.md`, `8_글로벌_재고.md`, `9_상방_시나리오.md`, `2_텅스텐_밸류체인.md`

### 재현 스크립트
- `/home/claude/tungsten/eqr_model.py` (NAV·매트릭스), `/home/claude/tungsten/eqr_sens.py` (민감도·손익분기), `/home/claude/tungsten/eqr_recon.py` (원안 브리지), `/home/claude/tungsten/eqr_ev.py` (확률가중), `/home/claude/tungsten/matrix.json`
