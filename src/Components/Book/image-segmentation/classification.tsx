import * as React from 'react';
import { NestedClassificationField, OnAnswer } from './types';
import { DropdownQuestion } from './dropdown-question';
import { Container, LabelControlGrouping } from './styled-components';
import { Row } from '../ui';

export function toggleValue(items: string[] = [], item: string) {
  const index = items.findIndex((str) => str === item);
  if (index === -1) {
    return [...items, item];
  } else {
    return [...items.slice(0, index), ...items.slice(index + 1)];
  }
}

export function Classification({
  highlighted,
  field,
  answer,
  onAnswer
}: {
  highlighted: boolean;
  field: NestedClassificationField;
  answer: string[];
  onAnswer: OnAnswer;
}) {
  return (
    <Row>
      <Container highlighted={highlighted}>
        <LabelControlGrouping>
          <span>{field.instructions}</span>
        </LabelControlGrouping>
        <DropdownQuestion
          answer={answer}
          field={field}
          highlighted={highlighted}
          onAnswer={onAnswer}
        />
      </Container>
    </Row>
  );
}
