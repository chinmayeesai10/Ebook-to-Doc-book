import { Classification, ClassificationFieldType } from './app/types';

type State = {
  answer: [];
  dropdownPath: number[];
  classification: Classification;
};

export const defaultState: State = {
  answer: [],
  dropdownPath: [0],
  classification: {
    name: 'Root',
    instructions: 'Make a Selection',
    type: ClassificationFieldType.dropdown,
    options : [
      {
        value: 'Book Title',
        label : 'Book Title',
       /* options: [{
          value: 'Chapter 1',
          label: 'Chapter 1',
          options: [
            {
              value: 'Para 1',
              label: 'Para 1',
              options: []
            },
            {
              value: 'Para 2',
              label: 'Para 2',
              options: []
            }  
          ]
        },
        {
          value: 'Chapter 2',
          label: 'Chapter 2',
          options: [
            {
              value: 'Para 1',
              label: 'Para 1',
              options: []
            },
            {
              value: 'Para 2',
              label: 'Para 2',
              options: []
            }  
          ]
        }]*/
        options: []
      },
    ]
  }
};
