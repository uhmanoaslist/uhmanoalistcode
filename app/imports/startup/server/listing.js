import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Listings } from '../../api/listing/listing.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.seller})`);
  Listings.insert(data);
}

/** Initialize the collection if empty. */
if (Listings.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating default items.');
    Meteor.settings.defaultItems.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Listings', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Listings.find({ seller: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ListingAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Listings.find();
  }
  return this.ready();
});
