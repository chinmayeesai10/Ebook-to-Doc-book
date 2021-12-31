import * as React from 'react';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { Value } from 'react-powerplug';
import Collapse from '@material-ui/core/Collapse/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip/Chip';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Paper from '@material-ui/core/Paper/Paper';
import {
  OnAnswer,
  NestedOption,
  OptionProps,
  DropdownProps,
  NestedClassificationField
} from './types';
import {
  DropdownContainer,
  DropdownItem,
  StyledAnswer,
  DropdownList
} from './styled-components';

const CollapsableList: React.SFC<{
  depth: number;
  currentValue: string;
  onAnswer: OnAnswer;
  onOpen: (s: string) => void;
  options: NestedOption[];
  value: string;
}> = ({ depth, options, currentValue, value, onAnswer, onOpen }) => (
  <Collapse in={currentValue === value}>
    <Value initial={''}>
      {({ value: openOption, set }) => (
        <List dense={true} disablePadding={true}>
          {options.map((option, index) => (
            <DropdownQuestionOption
              first={index === 0}
              depth={depth + 1}
              openOption={openOption}
              onOpen={set}
              key={index}
              {...option}
              onAnswer={(v: string[]) => {
                onOpen('');
                onAnswer([value, ...v]);
              }}
            />
          ))}
        </List>
      )}
    </Value>
  </Collapse>
);

function DropdownQuestionOption({
  depth,
  label,
  value,
  options = [],
  onAnswer,
  openOption,
  onOpen
}: OptionProps) {
  const liClicked = options.length
    ? (current: string) => onOpen(current === value ? '' : value)
    : () => {
        onOpen('');
        onAnswer([value]);
      };

  const displayOptions = options.filter(option => Boolean(option.value));

  return (
    <DropdownContainer
      backgroundColor={
        value === openOption
          ? '#fff'
          : openOption !== ''
          ? '#dcdcdc'
          : depth === 0
          ? '#fff'
          : '#eee'
      }
    >
      <ListItem
        color="inherit"
        button={true}
        // value={value}
        onClick={() => liClicked(openOption)}
      >
        {/* TODO: Somewhere in here needs a check for empty options. Should not render the component if empty */}
        <ListItemText color="inherit">
          <Tooltip title={label}>
            <DropdownItem options={displayOptions} depth={depth}>
              {label}
            </DropdownItem>
          </Tooltip>
        </ListItemText>
        {displayOptions.length > 0 &&
          (value === openOption ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {value === openOption && displayOptions.length > 0 && (
        <CollapsableList
          depth={depth}
          currentValue={openOption}
          onAnswer={onAnswer}
          onOpen={onOpen}
          options={displayOptions}
          value={value}
        />
      )}
    </DropdownContainer>
  );
}

const answerDisplayValue = (
  answer: string[],
  field: NestedClassificationField
) => {
  const display = [];
  let { options } = field;
  for (let level = 0; level < answer.length; level++) {
    const { label, options: newOptions } = options.find(
      ({ value }) => answer[level] === value
    ) || { label: undefined, options: undefined };
    display.push(label);
    if (newOptions) {
      options = newOptions;
    }
  }
  const result = display.join(' > ');
  return (
    <Tooltip title={result}>
      <StyledAnswer>{result}</StyledAnswer>
    </Tooltip>
  );
};

export const DropdownQuestion: React.SFC<DropdownProps> = ({
  answer,
  field,
  onAnswer
}) => {
  return (
    <Value initial={''}>
      {({ value, set }) => (
        <>
          {answer.length > 0 && (
            <Chip
              color="default"
              style={{ marginTop: '10px' }}
              label={answerDisplayValue(answer || [], field)}
              onDelete={() => onAnswer([])}
            />
          )}
          <Paper>
            <DropdownList dense={true} disablePadding={true}>
              {(field.options || []).map((option, i) => {
                return (
                  <DropdownQuestionOption
                    first={false}
                    depth={0}
                    openOption={value}
                    onOpen={set}
                    key={i}
                    {...option}
                    onAnswer={onAnswer}
                  />
                );
              })}
            </DropdownList>
          </Paper>
        </>
      )}
    </Value>
  );
};
