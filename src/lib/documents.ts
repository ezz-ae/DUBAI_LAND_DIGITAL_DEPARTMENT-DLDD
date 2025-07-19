
interface DLDDocument {
  id: number;
  name: string;
  summary: string;
  keyTopics: string[];
  content: string;
}

export const dldChainDocuments: DLDDocument[] = [
  {
    id: 1,
    name: "DLDCHAIN Project Vision",
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
  }
];
