# TaxCategory

> **TaxCategory** = `"S"` \| `"Z"` \| `"E"` \| `"AE"` \| `"K"` \| `"G"` \| `"O"`

Defined in: modules/payments/types.ts:17

VAT category of a line (EN 16931 UNCL5305): `S` standard rate, `Z` zero rated, `E` exempt (needs
`taxExemptionReason`), `AE` reverse charge, `K` intra-community supply, `G` export outside the EU, `O` outside the
scope of VAT.
