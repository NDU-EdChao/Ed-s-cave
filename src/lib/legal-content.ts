import type { Locale } from "@/i18n/config";

export type LegalPageKey = "terms" | "privacy" | "disclaimer";

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalPageContent {
  title: string;
  reviewNotice: string;
  updated: string;
  sections: LegalSection[];
}

const updated = "Draft updated July 2026";

export const legalPages: Record<Locale, Record<LegalPageKey, LegalPageContent>> = {
  en: {
    terms: {
      title: "Terms of Service",
      reviewNotice: "Draft only. This page must be reviewed by a Canadian lawyer before launch.",
      updated,
      sections: [
        {
          heading: "Information board only",
          body: "Sault Trades publishes local service requests and related public listing information. The platform does not arrange introductions, contact either side on their behalf, handle payments, take commission, or take part in any contract or dispute.",
        },
        {
          heading: "Poster responsibility",
          body: "Posters are responsible for the accuracy, legality, and completeness of the information they submit. Posts may be edited for formatting, translated for readability, held for review, rejected, archived, or removed when required.",
        },
        {
          heading: "Service provider responsibility",
          body: "Anyone responding to a request is responsible for checking the request details, licensing rules, insurance, price, scope, schedule, safety, and contract terms before doing any work.",
        },
        {
          heading: "No restricted or discriminatory requirements",
          body: "Posts must not include requirements based on protected traits such as race, ethnic origin, place of origin, religion, sex, age, disability, or similar protected grounds. Language versions are provided for readability only and do not limit who may respond.",
        },
        {
          heading: "Reports and removals",
          body: "Users may report posts that appear unsafe, misleading, discriminatory, spammy, or otherwise inappropriate. Sault Trades may remove content or limit access when needed to protect the board and its users.",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      reviewNotice: "Draft only. This page must be reviewed by a Canadian privacy lawyer before launch.",
      updated,
      sections: [
        {
          heading: "What we collect",
          body: "We collect the minimum information needed to publish and manage service requests, such as approximate area, request details, chosen language, contact method, contact value, account email when sign-in is used, and safety/report information.",
        },
        {
          heading: "Approximate area only",
          body: "Public request pages should show an approximate area, not a full home address. Posters should not include unnecessary personal information in request text or photos.",
        },
        {
          heading: "Contact details",
          body: "Contact details are not shown directly on list pages. They are revealed from the request detail page and the reveal event may be logged for abuse prevention, security, and operational review.",
        },
        {
          heading: "Translations",
          body: "Request content may be translated so more readers can understand it. Translation is for readability and does not change the original request or limit who may respond.",
        },
        {
          heading: "Email and notices",
          body: "Transactional emails may be used for sign-in, request status, reports, and account operations. Marketing emails should only be sent where allowed and with required consent and unsubscribe controls.",
        },
      ],
    },
    disclaimer: {
      title: "Disclaimer",
      reviewNotice: "Draft only. This page must be reviewed by a Canadian lawyer before launch.",
      updated,
      sections: [
        {
          heading: "No platform guarantee",
          body: "Sault Trades does not guarantee the truth, completeness, quality, safety, licensing, insurance, price, availability, or outcome of any request, response, provider, poster, or work.",
        },
        {
          heading: "Verify independently",
          body: "Before hiring or accepting work, users should independently verify identity, licensing, insurance, references, scope, price, timing, permits, and safety requirements.",
        },
        {
          heading: "No contract role",
          body: "Any agreement is between the poster and the person or business they contact. Sault Trades is not a party to that agreement and does not resolve payment, service quality, injury, property damage, or other disputes.",
        },
        {
          heading: "Translations and drafts",
          body: "Translated content may contain mistakes. Users should compare the original language and ask the poster directly if any request detail is unclear.",
        },
      ],
    },
  },
  "zh-Hans": {
    terms: {
      title: "服务条款",
      reviewNotice: "草稿，仅供占位。上线前必须由加拿大律师审阅；中文固定文案也需要人工校对。",
      updated,
      sections: [
        {
          heading: "仅作为信息公告板",
          body: "Sault Trades 只刊登本地服务需求和相关公开信息。平台不安排介绍，不代表任何一方联系他人，不处理付款，不抽成，也不参与任何合约或纠纷。",
        },
        {
          heading: "发文者责任",
          body: "发文者必须对提交内容的准确性、合法性和完整性负责。平台可为格式整理、可读性翻译、审核、拒绝、封存或移除内容。",
        },
        {
          heading: "服务提供者责任",
          body: "回应需求的人必须自行确认需求细节、执照规则、保险、价格、范围、时间、安全和合约条件，再决定是否提供服务。",
        },
        {
          heading: "禁止受保护特征相关限制",
          body: "贴文不得包含基于种族、族裔、原籍、宗教、性别、年龄、残障或类似受保护特征的限制。语言版本只为方便阅读，不限制谁可以回应。",
        },
        {
          heading: "检举与下架",
          body: "使用者可检举看似不安全、误导、歧视、垃圾信息或不适当的贴文。Sault Trades 可在必要时移除内容或限制访问，以保护公告板和使用者。",
        },
      ],
    },
    privacy: {
      title: "隐私政策",
      reviewNotice: "草稿，仅供占位。上线前必须由加拿大隐私律师审阅；中文固定文案也需要人工校对。",
      updated,
      sections: [
        {
          heading: "我们收集什么",
          body: "我们只收集发布和管理服务需求所需的最少资料，例如大概区域、需求内容、所选语言、联络方式、联络值、使用登入时的账户电邮，以及安全/检举相关资料。",
        },
        {
          heading: "只显示大概区域",
          body: "公开需求页应显示大概区域，不显示完整住址。发文者不应在文字或照片中加入不必要的个人资料。",
        },
        {
          heading: "联络资料",
          body: "联络资料不会直接显示在列表页。它会在需求详情页揭露，揭露事件可能被记录，用于防止滥用、安全和营运审查。",
        },
        {
          heading: "翻译",
          body: "需求内容可能会被翻译，以便更多读者理解。翻译只用于可读性，不改变原始需求，也不限制谁可以回应。",
        },
        {
          heading: "电邮与通知",
          body: "交易性电邮可用于登入、需求状态、检举和账户操作。营销电邮只应在符合法规、取得必要同意并提供退订控制时发送。",
        },
      ],
    },
    disclaimer: {
      title: "免责声明",
      reviewNotice: "草稿，仅供占位。上线前必须由加拿大律师审阅；中文固定文案也需要人工校对。",
      updated,
      sections: [
        {
          heading: "平台不作保证",
          body: "Sault Trades 不保证任何需求、回应、服务提供者、发文者或工作的真实性、完整性、质量、安全、执照、保险、价格、可用性或结果。",
        },
        {
          heading: "请自行查证",
          body: "在聘用或接受工作前，使用者应自行确认身份、执照、保险、参考资料、范围、价格、时间、许可和安全要求。",
        },
        {
          heading: "平台不是合约一方",
          body: "任何协议都只存在于发文者与其联系的个人或商家之间。Sault Trades 不是该协议的一方，也不处理付款、服务质量、人身伤害、财产损害或其他纠纷。",
        },
        {
          heading: "翻译与草稿",
          body: "翻译内容可能有错误。若任何需求细节不清楚，使用者应对照原文并直接向发文者确认。",
        },
      ],
    },
  },
  pa: {
    terms: {
      title: "ਸੇਵਾ ਸ਼ਰਤਾਂ",
      reviewNotice: "ਡਰਾਫਟ ਕੇਵਲ। ਲਾਂਚ ਤੋਂ ਪਹਿਲਾਂ ਕੈਨੇਡੀਅਨ ਵਕੀਲ ਵੱਲੋਂ ਸਮੀਖਿਆ ਲੋੜੀਂਦੀ ਹੈ; ਪੰਜਾਬੀ ਲਿਖਤ ਨੂੰ ਵੀ ਮਨੁੱਖੀ校对 ਦੀ ਲੋੜ ਹੈ।",
      updated,
      sections: [
        {
          heading: "ਸਿਰਫ਼ ਜਾਣਕਾਰੀ ਬੋਰਡ",
          body: "Sault Trades ਸਥਾਨਕ ਸੇਵਾ ਬੇਨਤੀਆਂ ਅਤੇ ਸੰਬੰਧਤ ਜਨਤਕ ਜਾਣਕਾਰੀ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰਦਾ ਹੈ। ਪਲੇਟਫਾਰਮ ਪਛਾਣ ਨਹੀਂ ਕਰਵਾਉਂਦਾ, ਕਿਸੇ ਪੱਖ ਵੱਲੋਂ ਸੰਪਰਕ ਨਹੀਂ ਕਰਦਾ, ਭੁਗਤਾਨ ਨਹੀਂ ਸੰਭਾਲਦਾ, ਕਮਿਸ਼ਨ ਨਹੀਂ ਲੈਂਦਾ, ਅਤੇ ਕਿਸੇ ਕਰਾਰ ਜਾਂ ਝਗੜੇ ਵਿੱਚ ਸ਼ਾਮਲ ਨਹੀਂ ਹੁੰਦਾ।",
        },
        {
          heading: "ਪੋਸਟਰ ਦੀ ਜ਼ਿੰਮੇਵਾਰੀ",
          body: "ਪੋਸਟਰ ਆਪਣੇ ਦਿੱਤੇ ਗਏ ਡਾਟੇ ਦੀ ਸਹੀਤਾ, ਕਾਨੂੰਨੀਪਣ ਅਤੇ ਪੂਰਨਤਾ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਹਨ। ਪੋਸਟਾਂ ਨੂੰ ਫਾਰਮੈਟ, ਪੜ੍ਹਨਯੋਗ ਅਨੁਵਾਦ, ਸਮੀਖਿਆ, ਇਨਕਾਰ, ਆਰਕਾਈਵ ਜਾਂ ਹਟਾਉਣ ਲਈ ਸੰਭਾਲਿਆ ਜਾ ਸਕਦਾ ਹੈ।",
        },
        {
          heading: "ਸੇਵਾ ਦੇਣ ਵਾਲੇ ਦੀ ਜ਼ਿੰਮੇਵਾਰੀ",
          body: "ਬੇਨਤੀ ਦਾ ਜਵਾਬ ਦੇਣ ਵਾਲਾ ਹਰ ਵਿਅਕਤੀ ਕੰਮ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਵੇਰਵੇ, ਲਾਇਸੈਂਸ ਨਿਯਮ, ਬੀਮਾ, ਕੀਮਤ, ਕੰਮ ਦਾ ਦਾਇਰਾ, ਸਮਾਂ, ਸੁਰੱਖਿਆ ਅਤੇ ਕਰਾਰ ਦੀਆਂ ਸ਼ਰਤਾਂ ਖੁਦ ਜਾਂਚੇ।",
        },
        {
          heading: "ਭੇਦਭਾਵ ਵਾਲੀਆਂ ਸ਼ਰਤਾਂ ਮਨਾਹੀ ਹਨ",
          body: "ਪੋਸਟਾਂ ਵਿੱਚ race, ethnic origin, place of origin, religion, sex, age, disability ਜਾਂ ਹੋਰ protected grounds ਦੇ ਆਧਾਰ ਤੇ ਪਾਬੰਦੀਆਂ ਨਹੀਂ ਹੋਣੀਆਂ ਚਾਹੀਦੀਆਂ। ਭਾਸ਼ਾ ਵਰਜਨ ਸਿਰਫ਼ ਪੜ੍ਹਨ ਲਈ ਹਨ ਅਤੇ ਇਹ ਨਹੀਂ ਦੱਸਦੇ ਕਿ ਕੌਣ ਜਵਾਬ ਦੇ ਸਕਦਾ ਹੈ।",
        },
        {
          heading: "ਰਿਪੋਰਟ ਅਤੇ ਹਟਾਉਣਾ",
          body: "ਯੂਜ਼ਰ ਅਸੁਰੱਖਿਅਤ, ਗਲਤ, ਭੇਦਭਾਵਪੂਰਨ, spam ਜਾਂ ਹੋਰ ਅਣਉਚਿਤ ਪੋਸਟਾਂ ਦੀ ਰਿਪੋਰਟ ਕਰ ਸਕਦੇ ਹਨ। Sault Trades ਬੋਰਡ ਅਤੇ ਯੂਜ਼ਰਾਂ ਦੀ ਸੁਰੱਖਿਆ ਲਈ ਸਮੱਗਰੀ ਹਟਾ ਜਾਂ ਪਹੁੰਚ ਸੀਮਿਤ ਕਰ ਸਕਦਾ ਹੈ।",
        },
      ],
    },
    privacy: {
      title: "ਪਰਦੇਦਾਰੀ ਨੀਤੀ",
      reviewNotice: "ਡਰਾਫਟ ਕੇਵਲ। ਲਾਂਚ ਤੋਂ ਪਹਿਲਾਂ ਕੈਨੇਡੀਅਨ privacy lawyer ਵੱਲੋਂ ਸਮੀਖਿਆ ਲੋੜੀਂਦੀ ਹੈ; ਪੰਜਾਬੀ ਲਿਖਤ ਨੂੰ ਵੀ ਮਨੁੱਖੀ校对 ਦੀ ਲੋੜ ਹੈ।",
      updated,
      sections: [
        {
          heading: "ਅਸੀਂ ਕੀ ਇਕੱਠਾ ਕਰਦੇ ਹਾਂ",
          body: "ਅਸੀਂ ਸੇਵਾ ਬੇਨਤੀਆਂ ਪ੍ਰਕਾਸ਼ਿਤ ਅਤੇ ਸੰਭਾਲਣ ਲਈ ਘੱਟੋ-ਘੱਟ ਜਾਣਕਾਰੀ ਇਕੱਠੀ ਕਰਦੇ ਹਾਂ, ਜਿਵੇਂ approximate area, request details, chosen language, contact method, contact value, account email ਜਦੋਂ sign-in ਵਰਤਿਆ ਜਾਵੇ, ਅਤੇ safety/report information।",
        },
        {
          heading: "ਕੇਵਲ approximate area",
          body: "ਜਨਤਕ ਬੇਨਤੀ ਪੰਨੇ ਤੇ ਪੂਰਾ ਘਰ ਦਾ ਪਤਾ ਨਹੀਂ, ਸਿਰਫ਼ approximate area ਦਿਖਾਇਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਪੋਸਟਰਾਂ ਨੂੰ ਲਿਖਤ ਜਾਂ ਫੋਟੋਆਂ ਵਿੱਚ ਬੇਲੋੜੀ ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਨਹੀਂ ਦੇਣੀ ਚਾਹੀਦੀ।",
        },
        {
          heading: "ਸੰਪਰਕ ਜਾਣਕਾਰੀ",
          body: "ਸੰਪਰਕ ਜਾਣਕਾਰੀ list pages ਤੇ ਸਿੱਧੀ ਨਹੀਂ ਦਿਖਾਈ ਜਾਂਦੀ। ਇਹ request detail page ਤੋਂ reveal ਹੁੰਦੀ ਹੈ ਅਤੇ abuse prevention, security ਅਤੇ operational review ਲਈ reveal event ਲੌਗ ਹੋ ਸਕਦਾ ਹੈ।",
        },
        {
          heading: "ਅਨੁਵਾਦ",
          body: "ਬੇਨਤੀ ਦੀ ਸਮੱਗਰੀ ਅਨੁਵਾਦ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ ਤਾਂ ਜੋ ਹੋਰ ਪਾਠਕ ਸਮਝ ਸਕਣ। ਅਨੁਵਾਦ ਸਿਰਫ਼ ਪੜ੍ਹਨਯੋਗਤਾ ਲਈ ਹੈ; ਇਹ ਮੂਲ ਬੇਨਤੀ ਨਹੀਂ ਬਦਲਦਾ ਅਤੇ ਕਿਸੇ ਨੂੰ ਜਵਾਬ ਦੇਣ ਤੋਂ ਨਹੀਂ ਰੋਕਦਾ।",
        },
        {
          heading: "ਈਮੇਲ ਅਤੇ ਨੋਟਿਸ",
          body: "Transactional emails sign-in, request status, reports ਅਤੇ account operations ਲਈ ਵਰਤੀਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ। Marketing emails ਸਿਰਫ਼ ਜਿੱਥੇ ਮਨਜ਼ੂਰ ਹੋਣ, ਲੋੜੀਂਦੀ consent ਅਤੇ unsubscribe controls ਨਾਲ ਭੇਜੀਆਂ ਜਾਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ।",
        },
      ],
    },
    disclaimer: {
      title: "ਡਿਸਕਲੇਮਰ",
      reviewNotice: "ਡਰਾਫਟ ਕੇਵਲ। ਲਾਂਚ ਤੋਂ ਪਹਿਲਾਂ ਕੈਨੇਡੀਅਨ ਵਕੀਲ ਵੱਲੋਂ ਸਮੀਖਿਆ ਲੋੜੀਂਦੀ ਹੈ; ਪੰਜਾਬੀ ਲਿਖਤ ਨੂੰ ਵੀ ਮਨੁੱਖੀ校对 ਦੀ ਲੋੜ ਹੈ।",
      updated,
      sections: [
        {
          heading: "ਪਲੇਟਫਾਰਮ ਕੋਈ ਗਾਰੰਟੀ ਨਹੀਂ ਦਿੰਦਾ",
          body: "Sault Trades ਕਿਸੇ ਵੀ request, response, provider, poster ਜਾਂ work ਦੀ truth, completeness, quality, safety, licensing, insurance, price, availability ਜਾਂ outcome ਦੀ ਗਾਰੰਟੀ ਨਹੀਂ ਦਿੰਦਾ।",
        },
        {
          heading: "ਖੁਦ ਜਾਂਚ ਕਰੋ",
          body: "ਕਿਸੇ ਨੂੰ ਕੰਮ ਤੇ ਲਗਾਉਣ ਜਾਂ ਕੰਮ ਸਵੀਕਾਰ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ users ਨੂੰ identity, licensing, insurance, references, scope, price, timing, permits ਅਤੇ safety requirements ਖੁਦ ਜਾਂਚਣੇ ਚਾਹੀਦੇ ਹਨ।",
        },
        {
          heading: "ਪਲੇਟਫਾਰਮ ਕਰਾਰ ਦਾ ਪੱਖ ਨਹੀਂ",
          body: "ਕੋਈ ਵੀ agreement poster ਅਤੇ ਉਸ ਵਿਅਕਤੀ ਜਾਂ business ਦੇ ਵਿਚਕਾਰ ਹੁੰਦਾ ਹੈ ਜਿਸ ਨਾਲ ਉਹ ਸੰਪਰਕ ਕਰਦੇ ਹਨ। Sault Trades ਉਸ agreement ਦਾ ਪੱਖ ਨਹੀਂ ਹੈ ਅਤੇ payment, service quality, injury, property damage ਜਾਂ ਹੋਰ disputes ਹੱਲ ਨਹੀਂ ਕਰਦਾ।",
        },
        {
          heading: "ਅਨੁਵਾਦ ਅਤੇ ਡਰਾਫਟ",
          body: "ਅਨੁਵਾਦਿਤ ਸਮੱਗਰੀ ਵਿੱਚ ਗਲਤੀਆਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਜੇ ਕੋਈ request detail ਅਸਪਸ਼ਟ ਹੋਵੇ ਤਾਂ users ਨੂੰ original language ਨਾਲ ਮਿਲਾਉਣਾ ਅਤੇ poster ਨਾਲ ਸਿੱਧਾ ਪੁੱਛਣਾ ਚਾਹੀਦਾ ਹੈ।",
        },
      ],
    },
  },
};

export function getLegalPage(locale: Locale, page: LegalPageKey): LegalPageContent {
  return legalPages[locale][page];
}
