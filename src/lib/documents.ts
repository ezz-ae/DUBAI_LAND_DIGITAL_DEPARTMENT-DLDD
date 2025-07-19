
interface DLDDocument {
  id: number;
  name: string;
  group: string;
  lang: 'en' | 'ar';
  summary: string;
  keyTopics: string[];
  content: string;
}

export const dldChainDocuments: DLDDocument[] = [
  {
    id: 1,
    name: "DLDCHAIN Project Vision",
    group: 'vision',
    lang: 'en',
    summary: "A high-level overview of the DLDCHAIN project, its goals, and its potential impact on Dubai's real estate market.",
    keyTopics: ["Sovereign Ledger", "Tokenization", "Smart Contracts", "Ecosystem"],
    content: `<h3>Project Vision & Goals</h3>
<p>The DLDCHAIN project represents a paradigm shift in real estate governance, establishing a sovereign, government-led blockchain ecosystem for Dubai. Its primary goal is to create a single, immutable source of truth for all property-related data and transactions, thereby enhancing security, transparency, and efficiency across the entire market.</p>
<h4>Core Objectives:</h4>
<ul>
  <li><strong>Secure Ownership:</strong> Guarantee unimpeachable proof of property ownership through a decentralized ledger.</li>
  <li><strong>Inspire Confidence:</strong> Foster a climate of trust and confidence for global investors by providing a stable and transparent regulatory framework.</li>
  <li><strong>Reduce Friction:</strong> Drastically reduce the time, cost, and complexity associated with real estate transactions.</li>
  <li><strong>Enhance Liquidity:</strong> Unlock new levels of market liquidity through asset tokenization.</li>
</ul>

<h3>Key Components</h3>
<p>The ecosystem is built upon several foundational pillars:</p>
<p><strong>DXBTOKENS:</strong> Native digital assets representing direct, legally-recognized ownership of real estate. This moves beyond fractional ownership to true, divisible title.</p>
<p><strong>DLD Digital Dirham:</strong> A fiat-pegged stablecoin that will be the exclusive currency for all transactions within the DLDCHAIN, ensuring price stability and regulatory oversight.</p>
<p><strong>EBRAM:</strong> An advanced smart contract system designed to automate complex legal agreements, from rentals to sales, minimizing disputes and administrative overhead.</p>
<p><strong>Mashroi:</strong> An AI-powered hub for real estate professionals that serves as the mandatory gateway for licensing, compliance, and data synchronization.</p>

<h3>Conclusion</h3>
<p>By integrating these components, DLDCHAIN aims to not only revolutionize Dubai's real estate sector but also to create an exportable model for sovereign digital governance that can be adopted by cities worldwide. It is designed to be a foundational, enduring piece of national infrastructure, authored and operated for the world.</p>`
  },
  {
    id: 19,
    name: "رؤية مشروع DLDCHAIN",
    group: 'vision',
    lang: 'ar',
    summary: "نظرة عامة عالية المستوى على مشروع DLDCHAIN وأهدافه وتأثيره المحتمل على سوق العقارات في دبي.",
    keyTopics: ["السجل السيادي", "الترميز", "العقود الذكية", "النظام البيئي"],
    content: `<h3>رؤية المشروع وأهدافه</h3>
<p>يمثل مشروع DLDCHAIN نقلة نوعية في حوكمة العقارات، حيث يؤسس نظامًا بيئيًا سياديًا قائمًا على البلوك تشين بقيادة الحكومة في دبي. يتمثل هدفه الأساسي في إنشاء مصدر واحد للحقيقة، غير قابل للتغيير، لجميع البيانات والمعاملات المتعلقة بالعقارات، مما يعزز الأمن والشفافية والكفاءة في السوق بأكمله.</p>
<h4>الأهداف الأساسية:</h4>
<ul>
  <li><strong>تأمين الملكية:</strong> ضمان إثبات لا يرقى إليه الشك لملكية العقارات من خلال سجل لامركزي.</li>
  <li><strong>إلهام الثقة:</strong> تعزيز مناخ من الثقة للمستثمرين العالميين من خلال توفير إطار تنظيمي مستقر وشفاف.</li>
  <li><strong>تقليل الاحتكاك:</strong> تقليل الوقت والتكلفة والتعقيد المرتبط بالمعاملات العقارية بشكل كبير.</li>
  <li><strong>تعزيز السيولة:</strong> إطلاق مستويات جديدة من سيولة السوق من خلال ترميز الأصول.</li>
</ul>

<h3>المكونات الرئيسية</h3>
<p>يقوم النظام البيئي على عدة ركائز أساسية:</p>
<p><strong>DXBTOKENS:</strong> أصول رقمية أصلية تمثل ملكية مباشرة ومعترف بها قانونيًا للعقارات. وهذا يتجاوز الملكية الجزئية إلى سند ملكية حقيقي وقابل للقسمة.</p>
<p><strong>الدرهم الرقمي لدائرة الأراضي والأملاك:</strong> عملة مستقرة مرتبطة بالعملة الورقية ستكون العملة الحصرية لجميع المعاملات داخل DLDCHAIN، مما يضمن استقرار الأسعار والرقابة التنظيمية.</p>
<p><strong>إبرام (EBRAM):</strong> نظام عقود ذكية متقدم مصمم لأتمتة الاتفاقيات القانونية المعقدة، من الإيجارات إلى المبيعات، مما يقلل من النزاعات والنفقات الإدارية.</p>
<p><strong>مشروعي (Mashroi):</strong> مركز مدعوم بالذكاء الاصطناعي للمهنيين العقاريين يعمل كبوابة إلزامية للترخيص والامتثال ومزامنة البيانات.</p>

<h3>الخاتمة</h3>
<p>من خلال دمج هذه المكونات، يهدف DLDCHAIN ليس فقط إلى إحداث ثورة في قطاع العقارات في دبي، ولكن أيضًا إلى إنشاء نموذج قابل للتصدير للحوكمة الرقمية السيادية يمكن أن تتبناه المدن في جميع أنحاء العالم. إنه مصمم ليكون قطعة أساسية ودائمة من البنية التحتية الوطنية، تم تأليفها وتشغيلها للعالم.</p>`
  }
];
