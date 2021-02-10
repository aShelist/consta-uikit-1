import './TableFilterTooltip.css';

import React from 'react';

import { IconFunnel } from '../../../icons/IconFunnel/IconFunnel';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Popover } from '../../Popover/Popover';
import { Text } from '../../Text/Text';

const cnTableFilterTooltip = cn('TableFilterTooltip');

type Values = string[];

type Props = {
  options: Array<{
    value: Values[number];
    label: string;
  }>;
  values: Values;
  field: string;
  isOpened: boolean;
  onChange: (field: string, values: Values) => void;
  onToggle: () => void;
  className?: string;
};

export const TableFilterTooltip: React.FC<Props> = ({
  field,
  isOpened,
  options,
  values,
  className,
  onChange,
  onToggle,
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setSearch('');
  }, [isOpened]);

  const filteredOptions = React.useCallback(
    (options) => {
      return options.filter((option: { value: Values[number]; label: string }) =>
        option.label.includes(search),
      );
    },
    [search],
  );

  return (
    <>
      <Button
        ref={buttonRef}
        size="xs"
        iconSize="s"
        view="clear"
        onlyIcon
        onClick={onToggle}
        className={cnTableFilterTooltip('Button', { isOpened }, [className])}
        iconLeft={IconFunnel}
      />
      {isOpened && buttonRef.current && (
        <Popover
          anchorRef={buttonRef}
          possibleDirections={['downRight', 'downLeft']}
          direction="downRight"
          offset={4}
          arrowOffset={12}
          onClickOutside={onToggle}
        >
          <div className={cnTableFilterTooltip('Content')}>
            <Text as="div" size="xs" view="primary" className={cnTableFilterTooltip('Title')}>
              Фильтровать по условию
            </Text>
            <input
              placeholder="Поиск по фильтрам"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cnTableFilterTooltip('Input')}
            />
            <select
              className={cnTableFilterTooltip('Select')}
              value={[...values]}
              multiple
              onChange={(e): void => {
                onChange(
                  field,
                  Array.from(e.target.selectedOptions).map((option) => option.value),
                );
              }}
            >
              {filteredOptions(options).map((option: { value: Values[number]; label: string }) => (
                <option
                  key={option.value}
                  className={cnTableFilterTooltip('Option')}
                  value={option.value}
                  title={option.label}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </Popover>
      )}
    </>
  );
};
