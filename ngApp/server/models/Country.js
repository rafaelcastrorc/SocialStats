var _ = require('lodash');

function Country(_node) {
  _.extend(this, _node.properties);
}

module.exports = Country;
