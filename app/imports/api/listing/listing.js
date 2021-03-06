import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Listings = new Mongo.Collection('Listings');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ListingSchema = new SimpleSchema({
  name: String,
  price: Number,
  seller: String,
  image: String,
  description: String,
  category: {
    type: String,
    allowedValues: ['Furniture', 'Textbooks', 'School Supplies', 'Electronics',
      'Electronic Accessories', 'Transportation', 'Sporting Goods',
      'Mens Clothing', 'Womens Clothing', 'Miscellaneous'],
    defaultValue: 'Miscellaneous',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Listings.attachSchema(ListingSchema);

/** Make the collection and schema available to other code. */
export { Listings, ListingSchema };
