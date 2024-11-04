# Compliance Engine

**DCAwesome** leverages Circle Compliance Engine's Transaction Screening APIs to address risks associated with high-risk entities or transactions.

## Compliance Rules

### Restrictive Rules

Our platform enforces the following compliance controls to mitigate risk:

- **Sanctions Risk Control**
  - **Action:** Transaction denial and wallet freeze
  - **Associated Risk:** If a user attempts to DCA into a token from a wallet flagged with sanctions risk, the transaction is automatically denied, and the wallet is frozen for further review.

- **Terrorist Financing Risk Control**
  - **Action:** Transaction denial and wallet freeze
  - **Associated Risk:** During DCA outflow setup, if the destination wallet is flagged for terrorist financing risk, the setup is denied, and the source wallet is frozen.

- **CSAM Risk Control**
  - **Action:** Transaction denial and wallet freeze
  - **Associated Risk:** If a counterparty wallet in a DCA setup shows CSAM risk indicators, all automated transactions are halted, and the wallet is frozen.

- **Illicit Behavior Risk Control**
  - **Action:** Transaction denial and wallet freeze
  - **Associated Risk:** A DCA strategy interacting with a wallet that exhibits illicit behavior patterns triggers an immediate suspension of automated trades.

- **PEP Risk Control**
  - **Action:** Transaction denial
  - **Associated Risk:** DCA setups involving wallets associated with politically exposed persons (PEPs) are automatically denied pending enhanced due diligence.

### Alert-Only Rules

These rules trigger alerts for compliance review without halting transactions:

- **High Illicit Behavior Risk Monitoring**
  - **Action:** Alert generation
  - **Associated Risk:** Alerts are generated for review when DCA transactions involve wallets with elevated risk patterns, allowing trades to continue uninterrupted.

- **Gambling Risk Monitoring**
  - **Action:** Alert generation
  - **Associated Risk:** DCA transactions with wallets showing gambling-related patterns trigger alerts for compliance review without interrupting automation.
