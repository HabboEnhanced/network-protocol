const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class GetUserFlatCategoriesComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.GetUserFlatCategories);
  }
}

module.exports = GetUserFlatCategoriesComposer;