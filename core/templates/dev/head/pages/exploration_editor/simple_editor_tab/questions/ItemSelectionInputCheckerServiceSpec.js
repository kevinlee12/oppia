// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for ItemSelectionInputCheckerService.
 */

describe('Checkbox input checker service', function() {
  beforeEach(module('oppia'));

  var AnswerGroupObjectFactory;
  var isics;

  var customizationArgs = {
    choices: {
      value: [
        '<p>Option 1</p>',
        '<p>Option 2</p>',
        '<p>Option 3</p>'
      ]
    }
  };

  beforeEach(inject(function($injector) {
    AnswerGroupObjectFactory = $injector.get('AnswerGroupObjectFactory');
    isics = $injector.get('ItemSelectionInputCheckerService');
  }));

  it('should return false for two Equals rules', function() {
    var answerGroupsFalse = [{
      rules: [{
        type: 'Equals',
        inputs: {
          x: []
        }
      }, {
        type: 'Equals',
        inputs: {
          x: []
        }
      }],
      outcome: {
        param_changes: [],
        feedback: [],
        dest: 'Question 1'
      },
      correct: false
    }];
    expect(isics.isValid(customizationArgs, answerGroupsFalse)).toBe(false);
  });

  it('should return true for one Equals rules', function() {
    var answerGroupsTrue = [{
      rules: [{
        type: 'Equals',
        inputs: {
          x: []
        }
      }],
      outcome: {
        feedback: [],
        param_changes: [],
        dest: 'Question 2'
      },
      correct: false
    }];
    expect(isics.isValid(customizationArgs, answerGroupsTrue)).toBe(true);
  });

  it('should return false for duplicate rules', function() {
    var answerGroupsTrue = [{
      rules: [{
        type: 'Equals',
        inputs: {
          x: []
        }
      }],
      outcome: {
        feedback: [],
        param_changes: [],
        dest: 'Question 2'
      },
      correct: false
    }, {
      rules: [{
        type: 'Equals',
        inputs: {
          x: []
        }
      }],
      outcome: {
        feedback: [],
        param_changes: [],
        dest: 'Question 2'
      },
      correct: false
    }];
    expect(isics.isValid(customizationArgs, answerGroupsTrue)).toBe(false);
  });

  it('should return false for rules not included in customization args', 
  function() {
    var answerGroupsFalse = [{
      rules: [{
        type: 'Equals',
        inputs: {
          x: [
            '<p>Option 1</p>',
            '<p>Option 2</p>',
            '<p>Option 4</p>',
          ]
        }
      }],
      outcome: {
        feedback: [],
        param_changes: [],
        dest: 'Question 1'
      },
      correct: false
    }];
    expect(isics.isValid(customizationArgs, answerGroupsFalse)).toBe(false);
  });
});
