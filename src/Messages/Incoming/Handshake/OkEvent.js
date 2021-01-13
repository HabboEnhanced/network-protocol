const MessageHandler = require('../MessageHandler');

const GetGdprRequestComposer = require('../../Outgoing/User/GetGdprRequestComposer');
const SubscriptionGetUserInfoComposer = require('../../Outgoing/User/SubscriptionGetUserInfoComposer');
const InfoRetrieveComposer = require('../../Outgoing/User/InfoRetrieveComposer');
const GetInventoryPeerComposer = require('../../Outgoing/User/GetInventoryPeerComposer');
const GetPetInventoryComposer = require('../../Outgoing/User/GetPetInventoryComposer');
const GetCreditsComposer = require('../../Outgoing/User/GetCreditsComposer');
const GetAvailableBadgesComposer = require('../../Outgoing/User/GetAvailableBadgesComposer');
const GetUserAchievementsComposer = require('../../Outgoing/User/GetUserAchievementsComposer');
const GetAccountPreferencesComposer = require('../../Outgoing/User/GetAccountPreferencesComposer');
const GetAvatarListComposer = require('../../Outgoing/User/GetAvatarListComposer');
const GetEmailStatusComposer = require('../../Outgoing/User/GetEmailStatusComposer');
const MessengerInitComposer = require('../../Outgoing/User/MessengerInitComposer');
const GetFriendRequestsComposer = require('../../Outgoing/User/GetFriendRequestsComposer');
const GetIgnoreListComposer = require('../../Outgoing/User/GetIgnoreListComposer');
const GetUserFlatCategoriesComposer = require('../../Outgoing/User/GetUserFlatCategoriesComposer');
const MarketplaceCanMakeOfferComposer = require('../../Outgoing/User/MarketplaceCanMakeOfferComposer');

class OkEvent extends MessageHandler {
  handle() {
    this.packetHandler.sendMessages([new GetGdprRequestComposer(), new SubscriptionGetUserInfoComposer('club_habbo'), new InfoRetrieveComposer()]);
    this.packetHandler.sendMessages([new GetInventoryPeerComposer(), new GetPetInventoryComposer(), new GetCreditsComposer(), new GetAvailableBadgesComposer()]);
    this.packetHandler.sendMessages([new GetUserAchievementsComposer(), new GetAccountPreferencesComposer(), new GetAvatarListComposer(), new GetEmailStatusComposer()]);
    this.packetHandler.sendMessages([new MessengerInitComposer(), new GetFriendRequestsComposer(), new GetIgnoreListComposer(), new GetUserFlatCategoriesComposer()]);
    this.packetHandler.sendMessages([new MarketplaceCanMakeOfferComposer()]);
  }
}

module.exports = OkEvent;