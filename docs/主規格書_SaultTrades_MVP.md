# Sault Trades / TradeLink — 可行性評估與 MVP 規格書

> 視角：資深產品經理 + 全端工程師 + 加拿大在地生活服務平台顧問
> 測試市場：Sault Ste. Marie, Ontario（人口約 72,000，2016→2021 下降 1.8%）

---

## 0. 一個必須先講的市場現實（會改變你的產品決策）

你的多語言 / AI 翻譯策略，是整個構想中風險最高的假設，因為它和「第一個城市」的實際人口結構不吻合：

| 指標 | Sault Ste. Marie | 安大略省 | 全國 |
|---|---|---|---|
| 移民人口比例 | 8.7% | 29.1% | 21.9% |
| 主要語言為英文 | 96.8% | — | — |
| 使用「其他語言」 | 約 0.4% | — | — |
| 可見少數族裔 | 4.5% | — | — |
| 中位年齡 | 45.4 歲 | — | — |
| 65 歲以上 | 24.9% | — | — |

補充：2011→2021 這裡的移民勞工還「減少了 30%」，人口整體衰退、老化。政府 2019 年才啟動 Rural and Northern Immigration Pilot（RNIP）想補人口。

**結論（已更新）**：要區分兩件事，別混為一談。
- **(1) 整站多語言 UI**（把整個介面翻成多語，服務在地非英語居民）— 與人口結構不符，**先跳過**。
- **(2) 刊登者可選的「單則翻譯」+ 各語言獨立分頁**— 這其實是**低成本的 SEO 長尾 + 供給端便利功能**，值得做，但排在冷啟動之後，列為 **Phase 1.5**（見第 7 節）。

在地唯一有規模的非英語族群是 Algoma 大學國際生（以印度裔、Punjabi / Hindi 為主），但要保守估：其主力其實在 **Brampton 校區**（Sault 主校區僅約 1,800 FTE，Brampton 近 5,000、約 92% 來自印度），且正受聯邦國際生名額緊縮影響。語言別**依各城市證據挑選**：Sault 以 **Hindi / Punjabi** 最有機會，簡體中文次之，**西班牙語在此地偏弱**（北安大略拉美人口極少，西語比較適合 GTA 或其他市場）。

---

## 1. 值不值得做：6 / 10

**它是什麼**：一個定位清楚、法規足跡低、技術複雜度低的「在地技工目錄 + 需求佈告欄」。小城市切入、避開多倫多紅海是聰明的楔子。

**為什麼不是 8–9 分**：
- **天花板低**。純廣告 / 訂閱、不抽佣，在 7 萬人且衰退的市場，收入模型是「行銷業務型」而非「規模型」。抓感覺：100 個付費技工 × 平均 CAD $50/月 ≈ 年營收 CAD $60k。這是一個好的「在地生意 / lifestyle business」，不是可融資的 venture-scale 新創。先想清楚你要哪一種。
- **免費替代品已經贏了**。小鎮的技工發現行為，早就發生在 Facebook 在地買賣社團、Facebook Marketplace、口碑。那才是你的真正對手，而且它免費、網路效應已成形。

**它為什麼仍有 6 分**：小市場策略確實有護城河（在地 SEO + 供給端關係難複製）、法律面若設計得當很乾淨、且有清楚的「北安大略複製劇本」（Sudbury、Thunder Bay、North Bay、Timmins）。若創辦人在地、執行聚焦、當作 bootstrap 生意經營，會活得不錯。

---

## 2. 最大風險前三名

1. **免費替代品（Facebook 社團 / Marketplace + 口碑）已擁有使用者行為** — 這是冷啟動殺手。你的產品必須提供 FB 社團給不了的東西：可篩選、SEO 可搜尋、供給端可信度。
2. **變現模型對雙邊市場是「反向」的** — 在還沒證明能帶來 leads（帶客量）之前，就要向供給端收 $29–99/月。市場太小 → 帶客量不足 → 技工不願付費 → 惡性循環。過早變現會直接殺死流動性。
3. **雞生蛋 + 市場衰退中的 TAM 極小** — 需要屋主與技工同時活躍，卻在人口萎縮的城市。達到雙邊流動性（liquidity）非常難。

（法律風險真實但可控，見第 5 節；上面三個才是「會殺死生意」的風險。）

---

## 3. 最大機會前三名

1. **在地 SEO 壟斷**。這裡很多技工連網站都沒有。做出「snow removal Sault Ste. Marie」「electrician Sault Ste. Marie」這類城市 × 職類落地頁，搶下 Google 第一頁 = 免費、複利的需求來源，且完全繞過 FB 社團的護城河。這是真正的護城河。
2. **可複製的北安大略劇本**。冷啟動只要跑通一次，Sudbury / Thunder Bay / North Bay / Timmins 就是套版複製。真正的資產是劇本，不是程式碼。
3. **供給端關係 → 未來升級路徑**。有了已驗證的技工關係與意圖數據後，之後可加值（報價工具、預約、五金/保險/工具商合作）。多語言也屬於「以後」：若 RNIP 帶進技工供給，它會變成差異化。

---

## 4. MVP 該先做 / 不該先做

**該先做（v1 = 目錄 + 需求佈告欄）**
- 由你**手動預先建置**的技工目錄（別等自助註冊）
- 依城市 / 職類 / 是否緊急服務篩選
- 發布需求卡片：類別、大概區域（非完整地址）、描述、照片、希望時間、聯絡方式
- 技工卡片：公司名、類別、電話 / Email / FB / 網站 / Google Maps、「已驗證」徽章（定義要窄，見下）
- 基本後台審核 / 下架
- SEO 落地頁（城市 × 職類）

**不該先做**
- ⚠️ **整站多語言 UI**（為在地非英語居民做的完整介面翻譯）與市場不符 → 跳過。但**刊登者可選的單則翻譯 + 各語言分頁**改列 **Phase 1.5**（SEO 長尾，見第 7 節），不是 v1 核心，也不該搶在冷啟動之前
- ❌ **星等評價（v1）**：流動性低 → 評分少 = 噪音 + 管理 / 法律面，延後
- ❌ **付費方案 / Stripe（Day 1）**：先有流量與「已證明的帶客價值」再收費
- ❌ **只靠技工自助註冊來鋪供給**：你必須手動 seed 供給端
- ❌ 複雜數據儀表板

**「已驗證」徽章是法律陷阱**：只能代表「已確認商家身份 / 營業存在」，**不可**暗示「已核實執照 / 保險 / 品質」，否則你在邀請 negligent misrepresentation（過失不實陳述）索賠。在 UI 上明確寫清楚它的意思。

---

## 5. 技術方案建議

三個方案，用 MVP 需要的維度打分：

| 維度 | 方案一 Next.js+Supabase | 方案二 Astro/SvelteKit+Supabase | 方案三 WordPress+外掛 |
|---|---|---|---|
| 開發難度 | 中 | 中（人才較少） | 低 |
| 上線速度 | 中 | 中 | **快** |
| 成本 | 低 | 低 | **最低（前期）** |
| SEO | **極佳（SSR/SSG）** | **極佳（Astro 內容站王者）** | 佳（需外掛調校） |
| 多城市擴充 | **佳** | 佳 | 較弱 |
| 多語言 | 佳 | 佳 | 中 |
| 後台管理 | 佳（Supabase + 自建） | 中 | **現成** |
| 安全性 | 佳（RLS） | 佳 | **弱（攻擊面大）** |
| 未來可出售性 | **高（主流 stack）** | 中（人才池小） | 低（技術債） |

**建議：兩階段混合**
- **驗證期（4 週）**：用最省的東西測「屋主會不會發需求、技工會不會回」。WordPress + GeoDirectory，或 Softr/Airtable 無代碼，或極薄的 Next.js。用完可丟。
- **正式版（8–12 週）**：**Next.js + Supabase + Vercel + Cloudflare**。理由：目錄型產品 SEO 是命脈（Next.js 的 SSR/SSG 解決）、Supabase 便宜且內建 Auth + RLS + Storage、主流 stack 未來好賣。
- **Astro** 是方案一的強力替代：若網站主要是內容目錄、互動不重，Astro 的 SEO 與速度更頂，但招人 / 出售的人才池較小。
- **從 MVP 移除**：Stripe（延到 12 週）、AI translation API（延到 Phase 1.5）。

**PWA 決策**：可以做，且優於原生 App（免上架審核、免雙平台、免 Apple 年費、即時上線）。但守三條：
- **公開頁維持 SSR / SSG**（目錄頁、技工頁、城市 × 職類落地頁必須是爬蟲可索引的 HTML）——SEO 是獲客命脈，別做成 client-only SPA。可安裝的 App 外殼只疊在登入後的互動部分（發需求、技工後台）。
- **保持 responsive、桌機也能用**：手機優先 ≠ 只有手機能開。搜尋流量與偏高齡族群都有桌機比例。
- **「可安裝」當加分、不當策略**：加主畫面轉換率低（iOS 尤其埋得深、推播需 iOS 16.4+），主入口就是開網頁。
- 實作時機：PWA 那層（manifest + service worker）留到 8–12 週再加，工作量約數小時～一天。

---

## 6. 資料庫初步 Schema（Supabase / Postgres + RLS）

### 主要資料表與欄位

**cities**
`id, name, province, slug, is_active, center_lat, center_lng, launch_date`

**service_categories**
`id, name_en, slug, icon, parent_id(自關聯), is_emergency_eligible, sort_order`

**users**
`id, auth_id(→auth.users), role[homeowner|contractor|admin], display_name, email, phone, preferred_language, city_id, status[active|suspended], created_at`

**contractors**
`id, user_id, business_name, slug, phone, email, website, facebook_url, google_maps_url, logo_url, description, languages[], offers_emergency, is_verified, verification_note, license_self_declared(bool), insurance_self_declared(bool), plan_tier[free|boost|featured], featured_until, boosted_until, status[pending|active|rejected|suspended], created_at`

**contractor_categories**（多對多）
`contractor_id, category_id`

**contractor_service_areas**（多對多）
`contractor_id, city_id`

**job_requests**
`id, homeowner_user_id, category_id, city_id, title, description, area_label(非完整地址), photo_urls[], preferred_time, contact_method[phone|email], contact_value, status[open|closed|removed], is_flagged, created_at, expires_at`

**contractor_clicks**（分析）
`id, contractor_id, source[card|profile|phone|email|website|maps], viewer_session, city_id, created_at`

**ratings**（只有星等，無文字）
`id, contractor_id, rater_user_id, job_request_id(nullable), stars(1–5), created_at`　— UNIQUE(rater_user_id, contractor_id)

**subscriptions**
`id, contractor_id, plan, stripe_customer_id, stripe_subscription_id, status, current_period_end, price_cad, created_at`

**ads**
`id, advertiser_name, city_id, placement[city_home|category|sidebar], image_url, target_url, start_date, end_date, is_active, impressions, clicks`

**reports**
`id, reporter_user_id(nullable), target_type[job_request|contractor|rating], target_id, reason, status[open|reviewed|actioned], created_at`

**admin_logs**
`id, admin_user_id, action, target_type, target_id, metadata(jsonb), created_at`

### RLS / 權限設計要點

- **cities / service_categories**：public read；僅 admin write。
- **users**：本人 read/update 自己那列；admin 全權。
- **contractors**：`status='active'` 才 public read；owner read/write 自己；admin 全權。內部欄位（plan、boosted_until）不對外。
- **job_requests**：`status='open'` public read，但 **contact_value 不直接對外曝光** — 改為「登入技工才可見」或「點擊揭露並記錄」。這是最重要的隱私 / 反爬 / PIPEDA 槓桿。owner 全權，admin 全權。
- **contractor_clicks**：任何人可 insert（或走 Edge Function）；只有 admin / 該技工本人可讀「彙總」。
- **ratings**：僅登入 homeowner 可 insert，每 (rater, contractor) 一則；對外只揭露「平均 + 則數」，不揭露個別評分者身份；加 rate-limit 防刷。
- **subscriptions**：owner 讀自己、admin 全權；**寫入只走 server / webhook 的 service role，永不信任 client。**
- **ads**：active 者 public read；admin write。
- **reports**：登入可 insert；只有 admin 可讀。
- **admin_logs**：僅 admin；寫入走 service role。
- **通則**：Stripe 相關寫入一律 server-side + webhook 驗簽；照片 / Logo 用 Supabase Storage + 簽章存取政策。

---

## 5+. 法律與風險邊界（加拿大 / 安大略）

- **人力仲介 / 派遣認定**：安大略《就業標準法》(ESA) 對 temporary help agency 與 recruiter 有牌照制度（2024 起）。純資訊佈告欄若**從不**僱用、指派、派遣工人，也**不向工人收取媒合費**，一般不屬於派遣。守則：絕不向「工人」收費取得工作、不控制指派、不宣稱自己「供應勞力」。定位為「刊登 / 廣告服務」。**上線前找安大略律師審一次。**
- **避免被視為承包 / 工程責任方**：保持「場地」角色 — 不核實品質、不保證施工、不依能力排名（付費置頂需明確標示為廣告）、不經手金流 / 合約。放上清楚免責：平台非任何協議之當事人。
- **執照 / 保險自我聲明**：**要求**技工自行聲明具備必要執照 / 保險 / 資格，並標示「由商家自行申報，平台未核實」。安大略強制工種（電工走 ESA/ECRA、瓦斯 / HVAC 走 TSSA）— 平台只捕捉聲明 + 免責，不當執法者。
- **PIPEDA**：適用（商業活動 + 個資）。需隱私政策、同意、目的限制、保護措施、查閱 / 更正、外洩通報。最小化蒐集（遮蔽地址 = 加分）。Supabase 選加 / 美區域，並在隱私政策揭露跨境儲存。
- **CASL（反垃圾訊息法）**：只要你寄 email 給技工 / 廣告主 / 通知，就需同意 + 退訂 + 寄件人識別。廣告 / 訂閱模式常忽略這條。
- **誹謗**：**不開放文字評論確實顯著降低誹謗曝險**（沒有使用者產生的誹謗性文字）。星等仍可能衍生「惡意不實 / 干擾營業」主張，但風險遠低於文字。彙總化 + 需登入 + 反刷評可再降低。
- **假評論 / 刷星**：Competition Bureau 近年嚴打假評論（2022 及 2024 修法針對欺騙性評論）。即使只有星等，誘導 / 造假評分也可能構成「虛假或誤導」。需反詐機制 + 政策。
- **ToS / Privacy / Disclaimer**：三者皆需，外加「廣告揭露」與「平台非交易當事人」免責。**上線前不可缺。**
- **無障礙**：安大略 AODA / WCAG（依組織規模適用），列為良好實務。

---

## 7. 開發時程與成本估算

> 費率參考：加拿大中階全端 freelance 約 CAD $50–100/hr；agency $100–200/hr。創辦人自建 = 主要成本是時間。

**4 週版（純驗證：有人發需求嗎？技工會回嗎？）**
- 內容：手動預建目錄、需求發布表單、城市 × 職類篩選、聯絡揭露、Top 職類 SEO 落地頁。無屋主帳號、無金流、無評價。
- Stack：WordPress+GeoDirectory / Softr+Airtable / 薄 Next.js。
- 成本：主要是時間；工具 ~$0–500。若外包 1 名 dev ~80–120 hr → 約 **CAD $4k–10k**；無代碼路徑 <$1k + 時間。

**8 週版（單城市正式產品）**
- 內容：Next.js + Supabase + Vercel + Cloudflare；技工自助註冊 + 認領、後台審核、需求發布（照片 + 遮蔽區域）、聯絡揭露 + 點擊記錄、基本廣告版位（人工銷售）、ToS/Privacy/Disclaimer、單語（EN）。
- 成本：1 名全端 ~250–350 hr → **CAD $15k–30k**（外包），或創辦人自建；基礎設施 ~$50–150/月。

**Phase 1.5（8→12 週之間插入，語言 SEO 層 — 可選但划算）**
- 定位：不是為了「翻 UI 給在地人看」，而是**刊登者可選的單則機器翻譯 + 各語言獨立可索引分頁**，吃零競爭的長尾搜尋，並方便移民 / 國際生技工用母語管理自己的刊登。
- 內容：接 DeepL / Google Translate API；先做 **1–2 個高價值語言**（Sault 建議 Hindi / Punjabi，簡中次之）；刊登者可**自行編輯 / 核准**翻譯（符合「依刊登者需要」，也把翻譯正確性責任落在刊登者，降低平台責任）。
- 技術要點（缺一不可）：
  - **hreflang 標記**（含 x-default）避免被 Google 當重複內容；各語言版本互指。
  - **只在有實際內容時才產生語言分頁** — 嚴禁自動大量產生空白 / 薄內容頁，否則會被判為 doorway pages 反而**傷 SEO**。
  - 固定 UI、職類名、**法律免責文字**需人工校對，不可純機器翻譯（免責被翻錯是真實風險）。
  - 建立技工術語詞彙表（furnace / eavestrough / drywall / HVAC 等 MT 常錯詞）。
- 成本：翻譯 API 依用量計，MVP 規模每月約 **CAD $10–50**；工程整合 ~40–70 hr → 外包約 **CAD $2.5k–6k**（沿用既有 i18n 架構更低）；法律免責文字專業校對一次性約 **CAD $300–800 / 語言**。

**12 週版（變現 + 打磨 + 可複製）**
- 內容：加 Stripe（置頂 / 精選）、星等評價（彙總 + 需登入 + 反刷）、數據儀表板、多城市架構（城市為一級維度）。（語言 SEO 層若要做，已在 Phase 1.5 完成。）
- 成本：全外包累計 **CAD $30k–55k**；基礎設施 $100–300/月。法律（ToS/Privacy/ESA 審閱）一次性 **CAD $2k–5k**。

---

## 8. Sault Ste. Marie 冷啟動策略（成敗關鍵）

1. **先鋪供給，且是手動**。別等技工註冊。從 Google Maps、Yellow Pages、FB 商家頁、Kijiji 蒐集在地技工，上線即預載 150–300 張技工卡，讓網站「Day 1 就是活的」。（公開營業資訊可用，並提供認領 / 退出。）
2. **需求還沒來，先贏 SEO**。發布城市 × 職類落地頁，讓 Google 搜「snow removal Sault Ste Marie」的人找到你。免費、複利、繞過 FB 護城河。
3. **到需求已在的地方 seed**。創辦人親自在現有 Sault FB 社團裡「幫忙提供名單 + 附上你的站」，當有用的在地索引而非洗版。找 1–2 位在地知名技工當 anchor tenant。
4. **季節楔子**。對準高痛點季節需求切入 — **除雪（10–11 月）** 是北安大略殺手級楔子：急迫、週期性、人人都需要。先壟斷一個職類，再擴。
5. **在地夥伴 / PR**：**SooToday**（當地最強在地媒體）、Sault Star、Chamber of Commerce、Home Hardware / 建材行（會轉介，也是你的首批廣告主）、房仲（新屋主需要技工）。
6. **供給端先免費**。在流動性出現前不開收費。前 6–12 個月：免費、專注流動性與體驗。

---

## 9. 未來出售時，哪些數據最有價值

（假設賣給 HomeStars / Jobber / Thumbtack / Angi / Yelp 型買家）

1. **已驗證的技工關係 + 各城市聯絡圖譜** — 最難複製；北安大略跨城市、已認領且活躍的供給基礎。
2. **需求意圖數據**：job_request 依 職類 × 城市 × 季節 的量 → 證明市場需求與各職類經濟性。意圖數據是金礦。
3. **可複製的冷啟動劇本 + 在地品牌 / SEO 排名**（網域權重、[職類]+[城市] 第一頁排名）→ 對買家是「turnkey 北安大略進場」。
4. **互動 / 轉換指標**：技工點擊率、聯絡轉換、回訪 → 單位經濟故事。
5. **第一方名單**（具 CASL 同意）：技工與屋主 email。

價值最低的：程式碼本身（商品化）。買家買的是網路、數據、市場地位。

---

## 10. 最小可行產品規格書（MVP Spec）

**產品名稱**：Sault Trades（暫）
**一句話定位**：Sault Ste. Marie 的在地技工目錄與需求佈告欄 — 只做資訊媒合，不承包、不派遣、不經手金流。
**首發城市**：Sault Ste. Marie（單一城市，架構預留多城市）
**首發語言**：English（v1）；刊登者可選單則翻譯 + 語言 SEO 分頁列為 Phase 1.5（Sault 建議 Hindi / Punjabi 先行）
**目標（上線後 90 天）**：≥ 200 張技工卡、≥ 150 則需求發布、≥ 30% 技工卡點擊聯絡轉換、Top 5 職類 Google 第一頁。

**In scope（v1）**
- 技工目錄（手動預載）+ 城市 / 職類 / 緊急服務篩選
- 技工卡：公司名、類別、語言、電話 / Email / 網站 / FB / Google Maps、「已驗證＝身份確認」徽章（定義明示）、自我聲明執照 / 保險（標示未核實）
- 需求卡片發布：類別、大概區域（非完整地址）、描述、照片、希望時間、聯絡方式
- 聯絡資訊「點擊揭露並記錄」（反爬 / 隱私）
- 技工自助註冊 + 認領 + 後台審核
- 後台：管理使用者 / 技工 / 需求卡、審核、下架、檢舉處理、廣告版位（人工）、admin log
- SEO 落地頁（城市 × 職類）
- ToS / Privacy Policy / Disclaimer / 廣告揭露

**Out of scope（v1，延後）**
- 整站多語言 UI → 跳過（與市場不符）
- 刊登者可選單則翻譯 + 語言 SEO 分頁 → **Phase 1.5**（非 v1，冷啟動之後才做）
- 星等評價 → 12 週版
- Stripe 付費置頂 / 精選 / 月費 → 12 週版（先證明帶客價值）
- 數據儀表板（進階）→ 12 週版
- 金流 / 合約 / 糾紛處理 → 永不做（核心定位）

**技術架構**：Next.js（SSR/SSG for SEO）+ Supabase（Postgres + Auth + RLS + Storage）+ Vercel + Cloudflare + Google Maps API。（Stripe、翻譯 API 後加。）

**關鍵非功能需求**
- 手機優先、卡片式 UI
- SEO：每個城市 × 職類獨立可索引 URL、結構化資料（LocalBusiness schema）
- 隱私：地址遮蔽、聯絡資訊 gated、PIPEDA + CASL 合規
- 安全：Supabase RLS、金流走 service role、Storage 簽章存取
- 多城市：city 為一級維度，內容 / 路由 / 篩選皆以 city 參數化

**上線 Gate（Definition of Done）**
- [ ] ToS / Privacy / Disclaimer 已上線且經律師審閱
- [ ] ≥ 200 張預載技工卡
- [ ] Top 5 職類 SEO 落地頁上線
- [ ] 聯絡揭露記錄 + 檢舉 + 後台審核可運作
- [ ] 「已驗證」與「自我聲明」文案明確免責

**Phase 1.5 Gate（語言 SEO 層 DoD）**
- [ ] 每個語言版本皆有正確 hreflang 標記（含 x-default），且與英文版互指
- [ ] 語言分頁**只在有實際內容**（已認領 / 已翻譯的刊登）時才產生，無空白 / 薄內容頁
- [ ] 機器翻譯後刊登者可編輯 / 核准；**核准前不對外索引**
- [ ] 固定 UI、職類名、法律免責文字經**人工校對**（非純機器翻譯）
- [ ] 技工術語詞彙表已建立並套用
- [ ] 上線語言別依該城市證據挑選（非固定清單）

---

### 一句話總結
把它當作**「在地 SEO 目錄 + 除雪季楔子」**的 bootstrap 生意來做，砍掉**整站多語言 UI** 與付費牆的過早投入，先用手動供給和 SooToday / FB 社團打穿冷啟動；**語言 SEO 分頁留到 Phase 1.5** 當長尾放大器 —— 這是這個構想最務實、最可能活下來的路徑。
