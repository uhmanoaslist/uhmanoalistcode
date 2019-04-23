import { Meteor } from 'meteor/meteor';
import { Reports } from '../../api/report/report.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: (${data.seller})`);
  Reports.insert(data);
}

/** Initialize the collection if empty. */
if (Reports.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating default items.');
    Meteor.settings.defaultItems.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Reports', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Reports.find({ seller: username });
  }
  return this.ready();
});
