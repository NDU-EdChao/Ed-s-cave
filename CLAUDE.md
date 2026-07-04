# CLAUDE.md — TradeLink (在地技工/服務目錄 MVP)

## 專案是什麼
一個在地技工/服務「公開目錄 + 需求佈告欄」。定位:**只做資訊刊登,不媒合、不抽佣、不經手金流、不介入合約與糾紛**。使命是讓使用者(尤其新移民)能透明地繞過中間人,自己找到並直接聯絡技工。

## 不可違反的紅線(改動涉及以下時,先停下來問我)
- **只刊登、不媒合**:平台不安排配對、不代為接洽。
- **不抽佣、不經手金流、不賣「優先接觸權」**。
- **資訊透明**:不做「付費才看得到」的暗盤;付費置頂必須明確標示為廣告。
- **「已驗證」只代表身分/營業存在**,不得暗示已核實執照/保險/品質。UI 文案必須明示。
- **聯絡資訊 gated**:需求貼文不直接公開 contact,採「點擊揭露並記錄」。
- **隱私**:地址只顯示大概區域;個資最小化;守 PIPEDA / CASL。
- **平台被動中立(語言)**:提供中性語言菜單由**貼文者自選**;平台**不推薦、不引導特定語言**,**不做按族裔/語言篩掉應徵者**的功能。翻譯=讓更多人看懂(擴大);嚴禁做成篩選(排除)。
- **禁歧視性招聘條件**:ToS 明訂禁止帶族裔/原籍等受保護特徵的歧視性需求;提供檢舉入口 + 保留下架權(明知時能處理,責任留在貼文者)。

## 技術棧
- Next.js(App Router,SSR/SSG — 公開目錄頁必須可被爬蟲索引,SEO 是命脈)
- Supabase(Postgres + Auth + RLS + Storage)
- Vercel(部署)+ Cloudflare
- 之後才加:Stripe(付費方案)、翻譯 API(DeepL/Google)
- **MVP 不要**:整站多語言 UI、星等評價、複雜儀表板、金流

## 架構原則
- **city 是一級維度**:路由、篩選、內容都以 city 參數化(為多城市複製鋪路,但先只上一個城市)。
- 公開頁走 SSR/SSG;登入後互動(發需求、技工後台)可 client。
- 每個 city × 職類要有獨立可索引 URL + LocalBusiness/JobPosting 結構化資料。

## 資料表(核心)
cities / service_categories / users / contractors / contractor_categories(join) /
contractor_service_areas(join) / job_requests / job_request_translations /
contractor_clicks / ratings / subscriptions / ads / reports / admin_logs
> 詳細欄位見專案內 `規格書*.md` 與 `多語貼文模組規格.md`,以那些為事實來源。

## RLS 重點
- 公開讀:cities、service_categories、active 的 contractors、open 的 job_requests(但 contact_value 不直接曝光)。
- subscriptions / 金流相關寫入:只走 server / webhook 的 service role,**永不信任 client**。
- reports、admin_logs:admin only。
- contractor_clicks:可 insert;彙總讀取限 admin/該技工。
- 每次新增 table 一定同時寫 RLS policy,預設 deny。

## 慣例
- TypeScript;元件與 API route 分層清楚。
- 每完成一塊就 commit(小步)。
- 環境變數放 `.env.local`,別 commit;service role key 只在 server 端。
- 改 schema 用 migration 檔,不要手動改 DB 後不留紀錄。

## 開發規則(給 Claude Code)
- 動工前若需求不清,先問我,不要猜。
- 一次做一個模組,做完能跑、能部署,再進下一個。
- 我修正你之後,把該教訓補一條到本檔對應段落。

---

## 框架規則(Next.js 16)
本專案使用 Next.js 16(比訓練資料新,有破壞性變更)。寫任何 App Router / i18n 程式碼前,先讀 `node_modules/next/dist/docs/`。重點慣例:
- `params` 是 Promise,頁面/layout 要 `await params`。
- i18n 用 `app/[locale]/...`,`[locale]/layout.tsx` 為根 layout(帶 `<html lang>`)。
- middleware 在 Next 16 改名為 `proxy.ts`(語言偵測轉址用它)。

@AGENTS.md

## 規格書(事實來源)
詳見 `/docs`:主規格書、Sault冷啟動計畫、多語貼文模組規格。
`策略骨架_反中間人母語目錄` 屬**大都會移民/多語言那條戰線**,與 Sault 樸素版不同戰場,僅供脈絡,勿混做。
