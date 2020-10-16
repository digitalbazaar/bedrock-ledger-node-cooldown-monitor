/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const brLedgerNode = require('bedrock-ledger-node');
require('bedrock-cooldown');

bedrock.events.on('bedrock-cooldown.report', async ({addAlert}) => {
  const nodeIterator = await brLedgerNode.getNodeIterator(null);
  for(const promise of nodeIterator) {
    const ledgerNode = await promise;
    await bedrock.events.emit(
      `bedrock-ledger-node-cooldown-monitor.report`, {
        addAlert,
        ledgerNode
      });
  }
});
