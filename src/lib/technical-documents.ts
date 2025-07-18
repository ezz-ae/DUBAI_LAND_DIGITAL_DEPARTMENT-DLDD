
interface CodeContent {
    type: 'code';
    language: string;
    text: string;
}

interface TextContent {
    type: 'paragraph' | 'heading' | 'subheading';
    text: string;
}

interface ListContent {
    type: 'list';
    items: string[];
}

type ContentItem = CodeContent | TextContent | ListContent;

interface TechnicalDocument {
  id: number;
  name: string;
  summary: string;
  content: ContentItem[];
}

export const technicalDocuments: TechnicalDocument[] = [
    {
        id: 1,
        name: "Technical Whitepaper Section",
        summary: "An overview of the DLDCHAIN system, including its modular components, smart contract architecture, tokenization model, and API structure.",
        content: [
            { type: 'heading', text: '1. System Overview' },
            { type: 'paragraph', text: 'DLDCHAIN is a Layer 1 sovereign blockchain system purpose-built to tokenize, govern, and automate Dubai’s real estate infrastructure. The stack is composed of modular components written in Solidity, Rust (for future VM variants), and supporting backend APIs and dApps. The chain operates entirely independently, with no middleware, third-party wallets, or custodianship dependency. It introduces EBRAM — a domain-specific contract engine — as the heart of programmable legal automation.' },
            { type: 'heading', text: '2. Smart Contract Logic Architecture' },
            { type: 'subheading', text: 'EBRAM Contract Engine (Core Layer)' },
            { type: 'list', items: [
                'Implements EBRAMProperty, EBRAMAgreement, and EBRAMNode contracts.',
                'Each contract contains: an immutable metadata hash (propertyHash), a state machine logic (Drafted, Signed, Verified, Minted), embedded governance checks via roles (DLD, Owner, Developer, Tenant), and logic extensions via addClause(), amend(), dispute().'
            ] },
             { type: 'subheading', text: 'Layered Ownership Model' },
            { type: 'list', items: [
                'Smart contracts maintain nested ownership: Root Contract (Land Token), Mid Layer (Building or Development Contract), and Unit Token (Fractional or Whole).',
                'Dynamic liquidity status (isLiquid()) enforced at each layer.'
            ] },
            { type: 'subheading', text: 'Pool-Based Liquid Ownership' },
            { type: 'list', items: [
                'DXBTOKENS can be grouped under OwnershipPool contracts.',
                'Pool officers can: Freeze/Unlock ownership slices, Distribute liquidity based on logic (rent, ROI, exit), and Govern rental returns (when applicable).',
                'Pool tokens are ERC-1155-like hybrids with embedded usage clauses.'
            ] },
            { type: 'heading', text: '3. Tokenization Flexibility Model' },
            { type: 'code', language: 'plaintext', text: 
`Token        Use Case                     Nature           Tradability
-----------  ---------------------------  ---------------  -----------
DXB-Land     Freehold / Plot              ERC-721          Rare
DXB-Unit     Residential/Commercial Unit  ERC-721          Tradable
DXB-Share    Fraction of ownership        ERC-1155         High
DXB-License  Agency/Broker Certificate    Soulbound        No
DXB-Right    Time-bound usage token       ERC-20 (Wrapped) Yes` },
            { type: 'heading', text: '4. Integration & API Architecture' },
            { type: 'subheading', text: 'REST & WebSocket API Endpoints' },
             { type: 'list', items: [
                '<code>/verify-ownership</code>: Verify smart contract-based ownership',
                '<code>/create-agreement</code>: Draft a new EBRAM contract',
                '<code>/escalate-dispute</code>: Trigger dispute protocol',
                '<code>/token-info</code>: View DXBTOKEN metadata & liquidity'
            ] },
            { type: 'subheading', text: 'Government System Integration Plan' },
            { type: 'list', items: [
                'DLD Registry System (read/write bridge)',
                'Visa Authority Integration (Mashroi Onboarding API)',
                'Payment Gateways (linked with UNIVESTOR wallet engine)',
                'eCourt System — Automated dispute escalation'
            ] },
            { type: 'heading', text: '5. Security & Compliance' },
            { type: 'list', items: [
                'Full auditing framework: Slither, MythX, custom DubaiLegalCheck',
                'Immutable deployment pipeline using IPFS + Arweave',
                'All contracts digitally signed by DLD chain governor node',
                'Tiered admin structure with emergency break-glass override logic'
            ] },
        ]
    },
    {
        id: 2,
        name: "Core Smart Contracts",
        summary: "Sample Solidity code for core DLDCHAIN contracts, including EBRAM, the EBRAMTokenPool, and the DLDChainToken for enforcing ownership rules.",
        content: [
            { type: 'heading', text: 'EBRAM Core Contract' },
            { type: 'paragraph', text: 'This contract represents the fundamental building block for a property on the DLDCHAIN, managing its lifecycle from drafting to final validation.' },
            { type: 'code', language: 'solidity', text: `// DLDCHAIN Engineering Kit: EBRAM Smart Contract (Core Sample)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EBRAM {
    address public developer;
    address public dldAuthority;
    string public propertyHash;
    string public metadataURI; // IPFS or Arweave link
    uint256 public squareFeet;

    enum Status { Drafted, SignedByDeveloper, VerifiedByDLD, EBRAMINTED }
    Status public status;

    mapping(address => bool) public authorizedSigners;
    mapping(address => bool) public tokenHolders;

    event EBRAMDrafted(string propertyHash);
    event DeveloperSigned(address indexed dev);
    event DLDVerified(address indexed dld);
    event EBRAMINTED(string propertyHash);

    modifier onlyDeveloper() {
        require(msg.sender == developer, "Not authorized");
        _;
    }

    modifier onlyDLD() {
        require(msg.sender == dldAuthority, "Only DLD can verify");
        _;
    }

    constructor(string memory _propertyHash, string memory _metadataURI, uint256 _squareFeet, address _dldAuthority) {
        developer = msg.sender;
        dldAuthority = _dldAuthority;
        propertyHash = _propertyHash;
        metadataURI = _metadataURI;
        squareFeet = _squareFeet;
        status = Status.Drafted;

        emit EBRAMDrafted(_propertyHash);
    }

    function signByDeveloper() external onlyDeveloper {
        require(status == Status.Drafted, "Already signed");
        status = Status.SignedByDeveloper;
        emit DeveloperSigned(msg.sender);
    }

    function verifyByDLD() external onlyDLD {
        require(status == Status.SignedByDeveloper, "Developer not signed");
        status = Status.VerifiedByDLD;
        emit DLDVerified(msg.sender);
    }

    function finalizeEBRAMINT() external onlyDLD {
        require(status == Status.VerifiedByDLD, "Not verified yet");
        status = Status.EBRAMINTED;
        emit EBRAMINTED(propertyHash);
    }

    function getStatus() public view returns (string memory) {
        if (status == Status.Drafted) return "Drafted";
        if (status == Status.SignedByDeveloper) return "Signed by Developer";
        if (status == Status.VerifiedByDLD) return "Verified by DLD";
        return "EBRAMINTED";
    }
}` },
            { type: 'heading', text: 'EBRAM Token Pool Contract' },
            { type: 'paragraph', text: 'This contract manages the lifecycle of a tokenized property pool, from its listing to its finalization, controlled by the EBRAM system.' },
            { type: 'code', language: 'solidity', text: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EBRAMTokenPool {
    enum Status { None, MakeListed, MakeID, MakeIn, MakeOut, MakeDismissed }
    enum Role { None, PoolOfficer, TokenHolder, EBRAM, ServiceManager }

    struct TokenPool {
        address property;
        address[] tokenHolders;
        uint256 totalTokens;
        uint256[4] distribution; // [40, 40, 10, 10] = LIQ, HOLDERS, EBRAM, SERVICE
        Status status;
        address poolOfficer;
        mapping(address => uint256) balances;
    }

    mapping(bytes32 => TokenPool) public pools;
    mapping(address => Role) public roles;

    event MakeListed(bytes32 indexed poolId);
    event MakeIDConfirmed(bytes32 indexed poolId);
    event MakeInConfirmed(bytes32 indexed poolId);
    event MakeOutExecuted(bytes32 indexed poolId);
    event MakeDismissed(bytes32 indexed poolId);

    modifier onlyEBRAM() {
        require(roles[msg.sender] == Role.EBRAM, "Not authorized");
        _;
    }

    function assignRole(address user, Role role) external onlyEBRAM {
        roles[user] = role;
    }

    function makeList(
        bytes32 poolId,
        address property,
        address poolOfficer,
        uint256 totalTokens
    ) external onlyEBRAM {
        TokenPool storage pool = pools[poolId];
        require(pool.status == Status.None, "Already exists");
        pool.property = property;
        pool.totalTokens = totalTokens;
        pool.status = Status.MakeListed;
        pool.poolOfficer = poolOfficer;
        pool.distribution = [40, 40, 10, 10];
        emit MakeListed(poolId);
    }

    function makeID(bytes32 poolId) external onlyEBRAM {
        TokenPool storage pool = pools[poolId];
        require(pool.status == Status.MakeListed, "Invalid status");
        pool.status = Status.MakeID;
        emit MakeIDConfirmed(poolId);
    }

    function makeIn(bytes32 poolId) external onlyEBRAM {
        TokenPool storage pool = pools[poolId];
        require(pool.status == Status.MakeID, "Invalid status");
        pool.status = Status.MakeIn;
        emit MakeInConfirmed(poolId);
    }

    function makeOut(bytes32 poolId) external onlyEBRAM {
        TokenPool storage pool = pools[poolId];
        require(pool.status == Status.MakeIn, "Invalid status");
        pool.status = Status.MakeOut;
        emit MakeOutExecuted(poolId);
    }

    function makeDismiss(bytes32 poolId) external onlyEBRAM {
        TokenPool storage pool = pools[poolId];
        require(pool.status == Status.MakeOut, "Invalid status");
        pool.status = Status.MakeDismissed;
        emit MakeDismissed(poolId);
    }
}`},
            { type: 'heading', text: 'DLDChain Ownership vs. Trade Enforcement' },
            { type: 'paragraph', text: 'This contract is critical for enforcing the core principle that a token can either be owned (resalable by owner) or escrowed for trading, but not both simultaneously.' },
            { type: 'code', language: 'solidity', text: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DLDChainToken {
    struct DXBToken {
        address owner;
        bool tradeEnabled;
    }

    mapping(uint => DXBToken) public dxbTokens;
    address public dldAdmin;

    constructor() {
        dldAdmin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == dldAdmin, "Only DLD Admin can perform this action");
        _;
    }

    modifier enforceNonDualRights(uint tokenId) {
        DXBToken memory token = dxbTokens[tokenId];
        if (token.tradeEnabled == true) {
            require(token.owner == address(0), "Trade requires escrow (no owner)");
        }
        if (token.owner != address(0)) {
            require(token.tradeEnabled == false, "Owner cannot trade token");
        }
        _;
    }

    // EBRAMINT: Create a new token (only by admin)
    function mintToken(uint tokenId, address ownerAddress) public onlyAdmin {
        dxbTokens[tokenId] = DXBToken(ownerAddress, false);
    }

    // MAKE-IN: Enable trading by escrowing the token
    function enableTrade(uint tokenId) public onlyAdmin {
        dxbTokens[tokenId].owner = address(0);
        dxbTokens[tokenId].tradeEnabled = true;
    }

    // MAKE-OUT: Reassign ownership and disable trade
    function disableTradeAndAssignOwner(uint tokenId, address newOwner) public onlyAdmin {
        dxbTokens[tokenId].tradeEnabled = false;
        dxbTokens[tokenId].owner = newOwner;
    }

    // MAKE-DISMISS: Retire the token (zero ownership and disable trade)
    function dismissToken(uint tokenId) public onlyAdmin {
        dxbTokens[tokenId].tradeEnabled = false;
        dxbTokens[tokenId].owner = address(0);
    }

    // Retrieve token status
    function getTokenStatus(uint tokenId) public view returns (address owner, bool tradeEnabled) {
        DXBToken memory token = dxbTokens[tokenId];
        return (token.owner, token.tradeEnabled);
    }
}` },
        ]
    },
    {
        id: 3,
        name: "System Architecture & Layouts",
        summary: "Visual and structural layouts of the DLDCHAIN ecosystem, including the repository structure and the Hyperledger Fabric network design.",
        content: [
            { type: 'heading', text: 'Liquidity Map Flow' },
            { type: 'code', language: 'plaintext', text: `[EBRAMINT] --> [MAKE Request] --> [MAKE-IN] --> [DXBTOKEN Trading] --> [MAKE-OUT] --> [MAKE-DISMISS]
    |               |               |               |                 |                |
(CDID + Legal)  (Pool Signed)   (Token = Escrow) (Layered Orders) (Ownership Claim)   (Finalize)` },
            { type: 'heading', text: 'Core Repository Structure' },
            { type: 'code', language: 'bash', text: `DLDCHAIN-CORE/
├── contracts/ # Solidity & Chaincode
│   ├── EBRAMTokenPool.sol
│   ├── DLDStablecoin.sol
│   └── EscrowUtils.sol
├── fabric-chaincode/ # Hyperledger Fabric chaincode (Go/JavaScript)
│   ├── ebram_contract.go
│   └── make_system_chaincode.go
├── sdk/ # JavaScript / Python SDKs
│   ├── js/
│   └── python/
├── docs/ # Legal models, enforcement logic, architecture
│   ├── EBRAM_Contract_Tree.md
│   ├── LiquidityLifecycle.md
│   └── TokenPoolStates.md
├── api/ # OpenAPI definitions for OneWallet & EBRAM
│   └── dldchain.openapi.yaml
├── .gitignore
├── README.md
└── LICENSE` },
            { type: 'heading', text: 'Blockchain Network Layout (Hyperledger Fabric)' },
            { type: 'code', language: 'plaintext', text: `FabricNetwork:
├── Orderers (DLD Consortium)
│   ├── Dubai Land Department
│   ├── VARA
│   └── CBUAE (audit/log)
├── Peers:
│   ├── EBRAM Node (Legal Chaincode Engine)
│   ├── Mashroi Node (Broker Oracles)
│   ├── Ejari Node (Rental enforcement)
│   └── Milka Node (Title verification)
├── Channels:
│   ├── DLD-VARA (Compliance + KYC)
│   ├── DLD-Banks (Liquidity requests)
│   └── DLD-Mashroi (Broker tokenization ops)
└── Chaincodes:
    ├── EBRAMContractTree
    ├── MAKE_Liquidity_Engine
    ├── TokenPoolRentalEngine
    └── ShariahInheritanceModule` },
        ]
    },
    {
        id: 4,
        name: "Advanced EBRAM Scenarios",
        summary: "Examples of how the EBRAM language and its backend Python execution layer handle complex, real-world real estate scenarios.",
        content: [
            { type: 'heading', text: '1. Rental Agreement — Late Payment Trigger' },
            { type: 'subheading', text: 'EBRAM Clause (Legal Logic Layer):' },
            { type: 'code', language: 'ebram', text: `IF tenant.payment.status == late FOR > 7d AND no_response_from_owner FOR 3d
THEN trigger notice_to_DLD AND lock_token_transfer = TRUE` },
            { type: 'subheading', text: 'Python Execution (Backend Layer):' },
            { type: 'code', language: 'python', text: `if tenant.is_late(days=7) and not owner.responded(within=3):
    notify_DLD(tenant.id)
    lock_property_token(property.id)` },
            { type: 'heading', text: '2. Auto Renewal with On-Time History' },
            { type: 'subheading', text: 'EBRAM Clause:' },
            { type: 'code', language: 'ebram', text: `IF tenant.payment_history == GREEN FOR > 6mo AND no_violation == TRUE
THEN auto_extend_contract FOR 1y` },
            { type: 'subheading', text: 'Python Execution:' },
            { type: 'code', language: 'python', text: `if tenant.status_color == "GREEN" and tenant.violation_count == 0:
    extend_contract(contract.id, additional_years=1)` },
            { type: 'heading', text: '3. Sales Contract with Dynamic Milestones' },
            { type: 'subheading', text: 'EBRAM Clause:' },
            { type: 'code', language: 'ebram', text: `IF payment.plan == 10_90 AND dev.milestone == 'roof_done'
THEN request_payment(10%) FROM buyer.wallet` },
            { type: 'subheading', text: 'Python Execution:' },
            { type: 'code', language: 'python', text: `if contract.payment_plan == "10_90" and dev.reached_milestone("roof_done"):
    request_payment(buyer.wallet, amount=contract.total * 0.10)` },
            { type: 'heading', text: '4. Commission Contract With Escrow Release Logic' },
            { type: 'subheading', text: 'EBRAM Clause:' },
            { type: 'code', language: 'ebram', text: `IF broker.role == exclusive AND sale.status == completed
THEN release_commission TO broker.wallet AFTER 7d IF no_dispute == TRUE` },
            { type: 'subheading', text: 'Python Execution:' },
            { type: 'code', language: 'python', text: `if broker.is_exclusive and sale.status == "completed" and not sale.disputed():
    release_escrow_to(broker.wallet, delay_days=7)` },
            { type: 'heading', text: '5. Legal Enforcement Triggered by Police Report' },
            { type: 'subheading', text: 'EBRAM Clause:' },
            { type: 'code', language: 'ebram', text: `IF police.report.submitted == TRUE AND report.type == 'contract breach'
THEN notify_DLD AND freeze_funds(wallet_id)` },
            { type: 'subheading', text: 'Python Execution:' },
            { type: 'code', language: 'python', text: `if police_report.exists(user.id, type="contract breach"):
    notify_DLD_case(user.id)
    freeze_wallet(user.wallet)` },
             { type: 'heading', text: '6. EBRAMGPT Entry Point (Text-to-Logic)' },
            { type: 'subheading', text: 'Natural Language Input:' },
            { type: 'paragraph', text: '"If the tenant doesn’t pay rent within 5 days, and the owner doesn’t reply for 2 more days, send a report to DLD and stop token transfer."' },
            { type: 'subheading', text: 'EBRAMGPT Output:' },
            { type: 'code', language: 'ebram', text: `IF tenant.payment.status == late FOR > 5d AND no_response_from_owner FOR 2d
THEN trigger notice_to_DLD AND lock_token_transfer = TRUE` },
        ]
    }
];
