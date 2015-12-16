/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
  get
} = Ember;

export default Ember.Controller.extend({
  showAlert: false,
  isRegistered: false,
  showCode: false,
  didValidate: false,

  actions: {
    showCode() {
        this.toggleProperty('showCode');
      },

      submit() {
        var model = this.get('model');
        model.validate().then(({
          model, validations
        }) => {
          if (validations.get('isValid')) {
            this.setProperties({
              showAlert: false,
              isRegistered: true,
              showCode: false
            });
          } else {
            this.set('showAlert', true);
          }
          this.set('didValidate', true);
        }, (errors) => {

        });
      },

      dismissAlert() {
        this.set('showAlert', false);
      },

      reset() {
        let model = this.get('model');
        let details = model.get('details');
        get(model.constructor, 'attributes').forEach((value, attr) => {
          model.set(attr, null);
        });
        get(details.constructor, 'attributes').forEach((value, attr) => {
          details.set(attr, null);
        });
        model.set('emailConfirmation', null); // Dummy attribute used to confirm the email address so it's not defined in the constructor
        this.set('didValidate', false);
        this.send('dismissAlert');
      }
  }
});
